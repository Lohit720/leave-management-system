from datetime import date, datetime
from typing import List, Literal
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Date, DateTime, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# --- DB setup ---
engine = create_engine("sqlite:///./leave.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


class LeaveRequest(Base):
    __tablename__ = "leave_requests"
    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String, nullable=False)
    leave_type = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    reason = Column(String, nullable=False, default="")
    status = Column(String, nullable=False, default="pending")
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


# --- Schemas ---
class LeaveCreate(BaseModel):
    employee_name: str
    leave_type: Literal["Sick", "Casual", "Annual"]
    start_date: date
    end_date: date
    reason: str = ""


class LeaveOut(BaseModel):
    id: int
    employee_name: str
    leave_type: str
    start_date: date
    end_date: date
    reason: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# --- Seed + lifespan ---
def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(LeaveRequest).count() == 0:
            db.add_all([
                LeaveRequest(employee_name="Alice Johnson", leave_type="Sick",
                             start_date=date(2026, 6, 20), end_date=date(2026, 6, 22),
                             reason="Flu", status="pending"),
                LeaveRequest(employee_name="Bob Smith", leave_type="Annual",
                             start_date=date(2026, 7, 1), end_date=date(2026, 7, 10),
                             reason="Family vacation", status="approved"),
                LeaveRequest(employee_name="Carol Davis", leave_type="Casual",
                             start_date=date(2026, 6, 18), end_date=date(2026, 6, 18),
                             reason="Personal errand", status="rejected"),
            ])
            db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed()
    yield


app = FastAPI(title="Leave Request Approval", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    return SessionLocal()


@app.post("/leaves", response_model=LeaveOut)
def create_leave(payload: LeaveCreate):
    db = get_db()
    try:
        item = LeaveRequest(
            employee_name=payload.employee_name,
            leave_type=payload.leave_type,
            start_date=payload.start_date,
            end_date=payload.end_date,
            reason=payload.reason,
            status="pending",
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        return item
    finally:
        db.close()


@app.get("/leaves", response_model=List[LeaveOut])
def list_leaves():
    db = get_db()
    try:
        return db.query(LeaveRequest).order_by(LeaveRequest.created_at.desc()).all()
    finally:
        db.close()


def _set_status(leave_id: int, status: str):
    db = get_db()
    try:
        item = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Leave request not found")
        item.status = status
        db.commit()
        db.refresh(item)
        return item
    finally:
        db.close()


@app.put("/leaves/{leave_id}/approve", response_model=LeaveOut)
def approve_leave(leave_id: int):
    return _set_status(leave_id, "approved")


@app.put("/leaves/{leave_id}/reject", response_model=LeaveOut)
def reject_leave(leave_id: int):
    return _set_status(leave_id, "rejected")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
