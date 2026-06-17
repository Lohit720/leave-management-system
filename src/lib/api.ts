const API_BASE = "http://localhost:8000";

export type LeaveType = "Sick" | "Casual" | "Annual";
export type LeaveStatus = "pending" | "approved" | "rejected";

export interface LeaveRequest {
  id: number;
  employee_name: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  reason: string;
  status: LeaveStatus;
  created_at: string;
}

export interface CreateLeaveInput {
  employee_name: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  reason: string;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  listLeaves: () => fetch(`${API_BASE}/leaves`).then(handle<LeaveRequest[]>),
  createLeave: (input: CreateLeaveInput) =>
    fetch(`${API_BASE}/leaves`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }).then(handle<LeaveRequest>),
  approve: (id: number) =>
    fetch(`${API_BASE}/leaves/${id}/approve`, { method: "PUT" }).then(handle<LeaveRequest>),
  reject: (id: number) =>
    fetch(`${API_BASE}/leaves/${id}/reject`, { method: "PUT" }).then(handle<LeaveRequest>),
};
