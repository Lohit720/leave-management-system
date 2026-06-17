import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

function ParticleField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dots = Array.from({ length: 60 }, () => ({
      x: 0, y: 0, vx: 0, vy: 0,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const seed = () => {
      for (const d of dots) {
        d.x = Math.random() * w;
        d.y = Math.random() * h;
        d.vx = (Math.random() - 0.5) * 0.25;
        d.vy = (Math.random() - 0.5) * 0.25;
      }
    };
    resize();
    seed();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }
      // lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(160,120,255,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // dots
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    />
  );
}

function LeavePage() {
  const [view, setView] = useState<View>("employee");

  return (
    <div className="relative min-h-screen app-bg text-[rgba(255,255,255,0.85)]">
      <ParticleField />
      <header className="relative">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-xl font-semibold tracking-tight">Leave Request Approval</h1>
          <div className="glass-pill inline-flex p-1 text-sm">
            <button
              onClick={() => setView("employee")}
              className={`pill-btn ${view === "employee" ? "pill-active" : ""}`}
            >
              Employee
            </button>
            <button
              onClick={() => setView("manager")}
              className={`pill-btn ${view === "manager" ? "pill-active" : ""}`}
            >
              Manager
            </button>
          </div>
        </div>
      </header>
      <main className="relative mx-auto max-w-5xl px-6 pb-16 animate-[fadeUp_0.8s_ease-out]">
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
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-5 glass p-7">
      <h2 className="text-lg font-semibold">Submit a leave request</h2>

      <Field label="Employee name">
        <input
          required
          value={form.employee_name}
          onChange={(e) => setForm({ ...form, employee_name: e.target.value })}
          className="glass-input"
        />
      </Field>

      <Field label="Leave type">
        <select
          value={form.leave_type}
          onChange={(e) => setForm({ ...form, leave_type: e.target.value as LeaveType })}
          className="glass-input"
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
            className="glass-input"
          />
        </Field>
        <Field label="End date">
          <input
            type="date"
            required
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            className="glass-input"
          />
        </Field>
      </div>

      <Field label="Reason">
        <textarea
          rows={3}
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="glass-input"
        />
      </Field>

      <button type="submit" disabled={submitting} className="glass-btn w-full">
        {submitting ? "Submitting…" : "Submit request"}
      </button>

      {message && <p className="text-sm text-[#9be7b4]">{message}</p>}
      {error && <p className="text-sm text-[#ff9a9a]">{error}</p>}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-[rgba(255,255,255,0.45)]">{label}</span>
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
        <button onClick={load} className="text-sm text-[rgba(255,255,255,0.45)] hover:text-[#d4b8ff] transition">
          Refresh
        </button>
      </div>

      {error && <p className="text-sm text-[#ff9a9a]">{error}</p>}

      <div className="glass overflow-x-auto p-1">
        <table className="w-full text-sm">
          <thead>
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
              <tr><td colSpan={6} className="px-4 py-6 text-center text-[rgba(255,255,255,0.45)]">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-[rgba(255,255,255,0.45)]">No requests yet.</td></tr>
            ) : items.map((it, idx) => (
              <tr key={it.id} className={idx % 2 === 1 ? "bg-[rgba(255,255,255,0.03)]" : ""}>
                <Td>{it.employee_name}</Td>
                <Td>{it.leave_type}</Td>
                <Td className="text-[rgba(255,255,255,0.7)]">{it.start_date} → {it.end_date}</Td>
                <Td className="max-w-xs truncate text-[rgba(255,255,255,0.7)]" title={it.reason}>{it.reason}</Td>
                <Td><StatusBadge status={it.status} /></Td>
                <Td>
                  {it.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => act(it.id, "approve")}
                        className="action-btn action-approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => act(it.id, "reject")}
                        className="action-btn action-reject"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-[rgba(255,255,255,0.35)]">—</span>
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
  return <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.45)]">{children}</th>;
}
function Td({ children, className = "", title }: { children: React.ReactNode; className?: string; title?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`} title={title}>{children}</td>;
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles: Record<LeaveStatus, string> = {
    pending: "bg-[rgba(245,180,70,0.12)] text-[#fbd58a] shadow-[0_0_12px_rgba(245,180,70,0.35)] border border-[rgba(245,180,70,0.3)]",
    approved: "bg-[rgba(80,220,140,0.12)] text-[#9be7b4] shadow-[0_0_12px_rgba(80,220,140,0.35)] border border-[rgba(80,220,140,0.3)]",
    rejected: "bg-[rgba(255,90,110,0.12)] text-[#ff9a9a] shadow-[0_0_12px_rgba(255,90,110,0.35)] border border-[rgba(255,90,110,0.3)]",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
