<div align="center">

<img src="https://img.shields.io/badge/%20-%20?style=for-the-badge&color=1a0b2e" width="1" height="4"/>

# ✦ LEAVE MANAGEMENT SYSTEM ✦

### *AI-Generated Full-Stack Leave Request Approval Platform*

<img src="https://img.shields.io/badge/FastAPI-6D28D9?style=for-the-badge&logo=fastapi&logoColor=E9D5FF" />
<img src="https://img.shields.io/badge/React-4C1D95?style=for-the-badge&logo=react&logoColor=C4B5FD" />
<img src="https://img.shields.io/badge/TypeScript-5B21B6?style=for-the-badge&logo=typescript&logoColor=DDD6FE" />
<img src="https://img.shields.io/badge/SQLite-3B0764?style=for-the-badge&logo=sqlite&logoColor=E9D5FF" />
<img src="https://img.shields.io/badge/SQLAlchemy-7C3AED?style=for-the-badge&logo=sqlalchemy&logoColor=F3E8FF" />

<br/>

<img src="https://img.shields.io/badge/Built%20with-Lovable%20AI-A855F7?style=flat-square&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Status-POC-8B5CF6?style=flat-square&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/License-MIT-C084FC?style=flat-square&labelColor=1E1B4B" />

<br/><br/>

**A Full-Stack Leave Request Approval System built with FastAPI, React, TypeScript and SQLite**

*This project was generated as a Proof of Concept (POC) using **Lovable AI** and demonstrates how AI can generate a functional full-stack CRUD application from a single prompt.*

</div>

<br/>

<div align="center">
<img src="https://img.shields.io/badge/────────────────────────────────────────────-6D28D9?style=flat-square&labelColor=1E1B4B" />
</div>

<br/>

## <img src="https://img.shields.io/badge/📌-1E1B4B?style=flat-square" height="22"/> Overview

This project demonstrates a minimal **Leave Management System** where:

- Employees can submit leave requests.
- Managers can review submitted requests.
- Managers can approve or reject leave applications.
- Data is stored persistently using SQLite.
- Backend APIs are built using FastAPI.
- Frontend is built using React + TypeScript.

The objective of this repository is to evaluate how effectively **Lovable AI** can generate a complete full-stack application from a structured prompt.

<br/>

## <img src="https://img.shields.io/badge/✨-1E1B4B?style=flat-square" height="22"/> Features

<table>
<tr>
<td valign="top" width="50%">

### 🧑‍💼 Employee Portal

- Submit Leave Request
- Select Leave Type
- Choose Leave Duration
- Add Leave Reason

</td>
<td valign="top" width="50%">

### 🗂️ Manager Portal

- View all leave requests
- Approve pending requests
- Reject pending requests
- View request status

</td>
</tr>
</table>

### ⚙️ Backend

<img src="https://img.shields.io/badge/FastAPI%20REST%20APIs-2D1B4E?style=flat-square&color=2D1B4E" />
<img src="https://img.shields.io/badge/SQLAlchemy%20ORM-2D1B4E?style=flat-square&color=2D1B4E" />
<img src="https://img.shields.io/badge/SQLite%20Database-2D1B4E?style=flat-square&color=2D1B4E" />
<img src="https://img.shields.io/badge/Auto%20DB%20Creation-2D1B4E?style=flat-square&color=2D1B4E" />
<img src="https://img.shields.io/badge/Sample%20Data%20Seeding-2D1B4E?style=flat-square&color=2D1B4E" />
<img src="https://img.shields.io/badge/CORS%20Enabled-2D1B4E?style=flat-square&color=2D1B4E" />
<img src="https://img.shields.io/badge/Swagger%20Docs-2D1B4E?style=flat-square&color=2D1B4E" />

<br/>

## <img src="https://img.shields.io/badge/🖼️-1E1B4B?style=flat-square" height="22"/> Application Screenshots

<div align="center">

### Employee View

<img src="docs/images/employee-view.png" width="900"/>

<br/><br/>

### Manager View

<img src="docs/images/manager-view.png" width="900"/>

<br/><br/>

### FastAPI Swagger Documentation



<img src="docs/images/swagger.png" width="900"/>

</div>

<br/>

## <img src="https://img.shields.io/badge/🏗-1E1B4B?style=flat-square" height="22"/> System Architecture

```
                     React + TypeScript (Frontend)

                           Employee / Manager UI
                                      │
                                      │
                                      ▼
                           REST API (Fetch Calls)
                                      │
                                      ▼
                         FastAPI Backend (main.py)
                                      │
                                      ▼
                          SQLAlchemy ORM Layer
                                      │
                                      ▼
                             SQLite Database
                                leave.db
```

<br/>

## <img src="https://img.shields.io/badge/📁-1E1B4B?style=flat-square" height="22"/> Project Structure

```
leave-management-system
│
├── backend
│   ├── main.py
│   ├── requirements.txt
│   └── leave.db
│
├── src
│
├── package.json
├── vite.config.ts
├── tsconfig.json
│
└── README.md
```

<br/>

## <img src="https://img.shields.io/badge/⚙️-1E1B4B?style=flat-square" height="22"/> Backend Workflow

The backend is implemented using **FastAPI**.

When the application starts:

```
FastAPI Starts
        │
        ▼
Creates SQLite Database
        │
        ▼
Creates leave_requests Table
        │
        ▼
Seeds 3 Sample Records
        │
        ▼
Starts REST APIs
```

<br/>

### Database Schema

Table:

```
leave_requests
```

| Column | Type |
|:----------|:---------|
| `id` | Integer |
| `employee_name` | String |
| `leave_type` | String |
| `start_date` | Date |
| `end_date` | Date |
| `reason` | String |
| `status` | String |
| `created_at` | DateTime |

**Status values:**

<img src="https://img.shields.io/badge/Pending-A78BFA?style=flat-square&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Approved-34D399?style=flat-square&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Rejected-F87171?style=flat-square&labelColor=1E1B4B" />

<br/><br/>

## <img src="https://img.shields.io/badge/🔌-1E1B4B?style=flat-square" height="22"/> API Endpoints

| Method | Endpoint | Description |
|:---------|:-----------|:----------------|
| ![POST](https://img.shields.io/badge/POST-6D28D9?style=flat-square) | `/leaves` | Create Leave Request |
| ![GET](https://img.shields.io/badge/GET-4F46E5?style=flat-square) | `/leaves` | Retrieve All Leave Requests |
| ![PUT](https://img.shields.io/badge/PUT-7C3AED?style=flat-square) | `/leaves/{id}/approve` | Approve Leave |
| ![PUT](https://img.shields.io/badge/PUT-7C3AED?style=flat-square) | `/leaves/{id}/reject` | Reject Leave |

**Swagger Documentation**

```
http://127.0.0.1:8000/docs
```

<br/>

## <img src="https://img.shields.io/badge/💻-1E1B4B?style=flat-square" height="22"/> Frontend Workflow

<table>
<tr>
<td valign="top" width="50%">

**Employee Workflow**

```
Employee
    │
    ▼
Submit Form
    │
    ▼
POST /leaves
    │
    ▼
FastAPI
    │
    ▼
SQLite
    │
    ▼
Response
    │
    ▼
React Updates UI
```

</td>
<td valign="top" width="50%">

**Manager Workflow**

```
Manager
      │
      ▼
Fetch Leave Requests
      │
      ▼
GET /leaves
      │
      ▼
Approve / Reject
      │
      ▼
PUT API
      │
      ▼
Updated Status
```

</td>
</tr>
</table>

<br/>

## <img src="https://img.shields.io/badge/🛠-1E1B4B?style=flat-square" height="22"/> Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Backend**
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn
- Pydantic

</td>
<td valign="top" width="33%">

**Frontend**
- React
- TypeScript
- TanStack Start
- Vite

</td>
<td valign="top" width="33%">

**Database**
- SQLite

</td>
</tr>
</table>

<br/>

## <img src="https://img.shields.io/badge/🚀-1E1B4B?style=flat-square" height="22"/> Running the Project

### Step 1 — Clone Repository

```bash
git clone https://github.com/Lohit720/leave-management-system.git

cd leave-management-system
```

### Step 2 — Start Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will run at

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

### Step 3 — Start Frontend

Open a **new terminal**

```bash
cd leave-management-system

npm install

npm run dev
```

Frontend

```
http://localhost:8080
```

### Step 4 — Test Application

1. Open Employee View
2. Submit Leave Request
3. Switch to Manager View
4. Approve / Reject Request
5. Refresh
6. Status updates automatically

<br/>

## <img src="https://img.shields.io/badge/🧠-1E1B4B?style=flat-square" height="22"/> Lovable Prompt Used

The application was generated using the following prompt.

> *(Paste the exact prompt here)*

```text
Build a simple Leave Request Approval app — POC only, keep it minimal.
 
━━━━━━━━━━━━━━━━━━━━━━━━
BACKEND — Python FastAPI
━━━━━━━━━━━━━━━━━━━━━━━━
Single file backend: backend/main.py
 
Use FastAPI + SQLite (no PostgreSQL setup needed for POC).
Use SQLAlchemy with a local SQLite file: leave.db
 
One table — leave_requests:
  id, employee_name, leave_type, start_date, end_date, reason, status, created_at
 
status values: pending | approved | rejected
 
API endpoints:
  POST /leaves          → submit a leave request (status = pending)
  GET  /leaves          → list all requests
  PUT  /leaves/{id}/approve  → set status to approved
  PUT  /leaves/{id}/reject   → set status to rejected
 
Enable CORS for http://localhost:5173
Include: requirements.txt with fastapi, uvicorn, sqlalchemy
 
━━━━━━━━━━━━━━━━━━━━━━━━
FRONTEND — React + TypeScript
━━━━━━━━━━━━━━━━━━━━━━━━
Two views only:
 
1. Employee view — a simple form to submit a leave request:
   - Employee name (text input)
   - Leave type (dropdown: Sick | Casual | Annual)
   - Start date, End date
   - Reason (textarea)
   - Submit button
 
2. Manager view — a table of all requests with:
   - Employee name, leave type, dates, reason, status badge
   - Approve / Reject buttons (only shown for pending requests)
 
Add a toggle at the top to switch between Employee view and Manager view.
 
Status badges: pending = amber, approved = green, rejected = red.
 
All API calls go to http://localhost:8000.
Use a single api.ts file for all fetch calls.
 
━━━━━━━━━━━━━━━━━━━━━━━━
KEEP IT SIMPLE
━━━━━━━━━━━━━━━━━━━━━━━━
- No auth, no login screen
- No complex folder structure — flat files are fine
- No migrations — just create tables on startup with SQLAlchemy
- Seed 3 sample leave requests on first run
```



<br/>

## <img src="https://img.shields.io/badge/🤖-1E1B4B?style=flat-square" height="22"/> What Lovable Generated

<img src="https://img.shields.io/badge/✅-FastAPI%20Backend-2D1B4E?style=flat-square" />
<img src="https://img.shields.io/badge/✅-SQLite%20Database-2D1B4E?style=flat-square" />
<img src="https://img.shields.io/badge/✅-SQLAlchemy%20ORM-2D1B4E?style=flat-square" />
<img src="https://img.shields.io/badge/✅-REST%20APIs-2D1B4E?style=flat-square" />
<img src="https://img.shields.io/badge/✅-React%20Frontend-2D1B4E?style=flat-square" />
<img src="https://img.shields.io/badge/✅-CRUD%20Operations-2D1B4E?style=flat-square" />
<img src="https://img.shields.io/badge/✅-Seed%20Data-2D1B4E?style=flat-square" />
<img src="https://img.shields.io/badge/✅-Swagger%20Documentation-2D1B4E?style=flat-square" />

<br/>

## <img src="https://img.shields.io/badge/🔍-1E1B4B?style=flat-square" height="22"/> What Happens Behind the Scenes

```
User clicks Submit
        │
        ▼
React Form
        │
        ▼
fetch()
        │
        ▼
FastAPI Endpoint
        │
        ▼
SQLAlchemy ORM
        │
        ▼
SQLite Database
        │
        ▼
Response
        │
        ▼
React Updates Screen
```

<br/>

## <img src="https://img.shields.io/badge/📈-1E1B4B?style=flat-square" height="22"/> Future Improvements

<img src="https://img.shields.io/badge/JWT%20Authentication-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Role--Based%20Access%20Control-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/PostgreSQL-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Docker-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Alembic%20Migrations-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Unit%20Testing-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/CI%2FCD%20Pipeline-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Email%20Notifications-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Leave%20Balance-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Calendar%20Integration-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />
<img src="https://img.shields.io/badge/Audit%20Logs-1E1B4B?style=flat-square&color=1E1B4B&labelColor=1E1B4B" />

<br/>

## <img src="https://img.shields.io/badge/🎯-1E1B4B?style=flat-square" height="22"/> Purpose of this Project

This project was created to evaluate how effectively **Lovable AI** can generate a production-style full-stack application from a well-defined prompt.

It demonstrates AI-assisted development for:

- Backend API generation
- Database integration
- React frontend generation
- CRUD operations
- End-to-end application flow

<br/>

<div align="center">

<img src="https://img.shields.io/badge/────────────────────────────────────────────-6D28D9?style=flat-square&labelColor=1E1B4B" />

## <img src="https://img.shields.io/badge/👨‍💻-1E1B4B?style=flat-square" height="22"/> Author

### **Lohit Mishra**

<img src="https://img.shields.io/badge/GitHub-Lohit720-1E1B4B?style=for-the-badge&logo=github&logoColor=C4B5FD" />

[https://github.com/Lohit720](https://github.com/Lohit720)

<br/>

### ⭐ If you found this project useful, consider giving it a star!

<img src="https://img.shields.io/badge/─────%20✦%20─────-6D28D9?style=flat-square&labelColor=1E1B4B" />

</div>
