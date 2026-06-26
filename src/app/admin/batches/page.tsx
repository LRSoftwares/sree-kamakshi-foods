"use client";

import { useState } from "react";

interface Batch {
  id: string;
  date: string;
  capacity: number;
  filled: number;
  closingTime: string;
  preparationHours: number;
  status: "open" | "closed" | "full";
}

const initialBatches: Batch[] = [
  { id: "B-2026-06-26", date: "2026-06-26", capacity: 30, filled: 18, closingTime: "19:00", preparationHours: 24, status: "open" },
  { id: "B-2026-06-25", date: "2026-06-25", capacity: 30, filled: 30, closingTime: "19:00", preparationHours: 24, status: "full" },
  { id: "B-2026-06-24", date: "2026-06-24", capacity: 25, filled: 22, closingTime: "19:00", preparationHours: 24, status: "closed" },
  { id: "B-2026-06-23", date: "2026-06-23", capacity: 30, filled: 28, closingTime: "19:00", preparationHours: 24, status: "closed" },
];

export default function BatchesPage() {
  const [batches, setBatches] = useState(initialBatches);
  const [editingId, setEditingId] = useState<string | null>(null);

  const todaysBatch = batches[0];
  const remaining = todaysBatch.capacity - todaysBatch.filled;
  const fillPercent = (todaysBatch.filled / todaysBatch.capacity) * 100;

  const updateBatch = (id: string, updates: Partial<Batch>) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Batch Management</h1>
          <p className="text-text-light">Manage daily production batches</p>
        </div>
      </div>

      {/* Today's Batch - Large Card */}
      <div className="bg-white rounded-2xl p-8 border-2 border-primary/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text">Today&apos;s Batch</h2>
            <p className="text-text-light">{todaysBatch.date}</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
            todaysBatch.status === "open"
              ? "bg-green-100 text-green-700"
              : todaysBatch.status === "full"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
          }`}>
            {todaysBatch.status.toUpperCase()}
          </span>
        </div>

        <div className="grid sm:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-sm text-text-muted">Daily Capacity</p>
            <p className="text-3xl font-bold text-text">{todaysBatch.capacity}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted">Orders Filled</p>
            <p className="text-3xl font-bold text-primary">{todaysBatch.filled}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted">Remaining Slots</p>
            <p className="text-3xl font-bold text-accent">{remaining}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted">Closing Time</p>
            <p className="text-3xl font-bold text-text">7:00 PM</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-muted">Capacity Usage</span>
            <span className="font-semibold">{fillPercent.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`rounded-full h-4 transition-all ${
                fillPercent > 80
                  ? "bg-accent"
                  : fillPercent > 50
                    ? "bg-secondary"
                    : "bg-primary"
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => updateBatch(todaysBatch.id, { capacity: todaysBatch.capacity + 5 })}
            className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/20"
          >
            + Increase Capacity
          </button>
          <button
            onClick={() => updateBatch(todaysBatch.id, { status: "closed" })}
            className="bg-accent/10 text-accent px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent/20"
          >
            Close Batch
          </button>
        </div>
      </div>

      {/* Previous Batches */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold text-text">Batch History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Capacity</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Filled</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Usage</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id} className="border-t border-border">
                  <td className="px-6 py-4 text-sm font-medium">{batch.date}</td>
                  <td className="px-6 py-4 text-sm">{batch.capacity}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{batch.filled}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary rounded-full h-2" style={{ width: `${(batch.filled / batch.capacity) * 100}%` }} />
                      </div>
                      <span className="text-xs text-text-muted">{((batch.filled / batch.capacity) * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      batch.status === "open" ? "bg-green-100 text-green-700" :
                      batch.status === "full" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
