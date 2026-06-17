import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, type LeaveRequest, type LeaveType, type LeaveStatus, type CreateLeaveInput } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leave Request Approval" },
      { name: "description", content: "Submit and approve leave requests." },
    ],
  }),
  component: LeavePage,
});

type View = "employee" | "manager";

function LeavePage() {
  const [view, setView] = useState<View>("employee");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">Leave Request Approval</h1>
          <div className="inline-flex rounded-md border border-border bg-card p-1 text-sm">
            <button
              onClick={() => setView("employee")}
              className={`rounded px-3 py-1.5 transition ${
                view === "employee" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Employee
            </button>
            <button
              onClick={() => setView("manager")}
              className={`rounded px-3 py-1.5 transition ${
                view === "manager" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Manager
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        {view === "employee" ? <EmployeeView /> : <ManagerView />}
      </main>
    </div>
  );
}

function EmployeeView() {
  const [form, setForm] = useState<CreateLeaveInput>({
    employee_name: "",
    leave_type: "Sick",
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      await api.createLeave(form);
      setMessage("Leave request submitted.");
      setForm({ employee_name: "", leave_type: "Sick", start_date: "", end_date: "", reason: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4 rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Submit a leave request</h2>

      <Field label="Employee name">
        <input
          required
          value={form.employee_name}
          onChange={(e) => setForm({ ...form, employee_name: e.target.value })}
          className="input"
        />
      </Field>

      <Field label="Leave type">
        <select
          value={form.leave_type}
          onChange={(e) => setForm({ ...form, leave_type: e.target.value as LeaveType })}
          className="input"
        >
          <option>Sick</option>
          <option>Casual</option>
          <option>Annual</option>
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Start date">
          <input
            type="date"
            required
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="End date">
          <input
            type="date"
            required
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            className="input"
          />
        </Field>
      </div>

      <Field label="Reason">
        <textarea
          rows={3}
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="input"
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit request"}
      </button>

      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
        }
        .input:focus { outline: 2px solid var(--color-ring); outline-offset: 1px; }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function ManagerView() {
  const [items, setItems] = useState<LeaveRequest[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      setItems(await api.listLeaves());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (id: number, action: "approve" | "reject") => {
    try {
      await (action === "approve" ? api.approve(id) : api.reject(id));
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">All leave requests</h2>
        <button onClick={load} className="text-sm text-muted-foreground hover:text-foreground">
          Refresh
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-muted-foreground">
            <tr>
              <Th>Employee</Th>
              <Th>Type</Th>
              <Th>Dates</Th>
              <Th>Reason</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items === null ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No requests yet.</td></tr>
            ) : items.map((it) => (
              <tr key={it.id} className="border-t border-border">
                <Td>{it.employee_name}</Td>
                <Td>{it.leave_type}</Td>
                <Td>{it.start_date} → {it.end_date}</Td>
                <Td className="max-w-xs truncate" title={it.reason}>{it.reason}</Td>
                <Td><StatusBadge status={it.status} /></Td>
                <Td>
                  {it.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => act(it.id, "approve")}
                        className="rounded-md bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => act(it.id, "reject")}
                        className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2 font-medium">{children}</th>;
}
function Td({ children, className = "", title }: { children: React.ReactNode; className?: string; title?: string }) {
  return <td className={`px-4 py-2 ${className}`} title={title}>{children}</td>;
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles: Record<LeaveStatus, string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
