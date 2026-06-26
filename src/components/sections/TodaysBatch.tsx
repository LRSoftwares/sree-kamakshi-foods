"use client";

import { useState, useEffect } from "react";

export default function TodaysBatch() {
  const [batchData, setBatchData] = useState({
    capacity: 30,
    filled: 18,
    closingTime: "7:00 PM",
    preparationTime: "24 Hours",
    status: "open" as "open" | "closed" | "full",
  });

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const closing = new Date();
      closing.setHours(19, 0, 0, 0);
      if (now > closing) {
        setTimeLeft("Closed for today");
        return;
      }
      const diff = closing.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m remaining`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const remaining = batchData.capacity - batchData.filled;
  const fillPercentage = (batchData.filled / batchData.capacity) * 100;
  const isBatchOpen = batchData.status === "open" && remaining > 0;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Today&apos;s Fresh Batch
          </h2>
          <p className="text-text-light">
            Every pickle is prepared fresh. Check today&apos;s availability.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div
            className={`rounded-2xl p-8 shadow-xl border-2 ${
              isBatchOpen
                ? "bg-white border-primary/20"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text">
                Today&apos;s Fresh Batch
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isBatchOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isBatchOpen ? "Available" : "Batch Full"}
              </span>
            </div>

            {isBatchOpen ? (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-light">Order Closes</span>
                    <span className="font-semibold text-text">
                      {batchData.closingTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-light">Preparation Time</span>
                    <span className="font-semibold text-text">
                      {batchData.preparationTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-light">Time Left</span>
                    <span className="font-semibold text-accent">{timeLeft}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-light">Capacity</span>
                    <span className="text-sm font-semibold text-primary">
                      {remaining} Orders Left
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-primary-light rounded-full h-3 transition-all duration-500"
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-text-muted">
                      {batchData.filled} filled
                    </span>
                    <span className="text-xs text-text-muted">
                      {batchData.capacity} total
                    </span>
                  </div>
                </div>

                <a
                  href="#order"
                  className="mt-6 block w-full bg-primary text-white text-center py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md"
                >
                  Order Now — {remaining} Slots Left
                </a>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-lg font-semibold text-text mb-2">
                  Today&apos;s Batch Full
                </p>
                <p className="text-text-light">
                  Next batch opens tomorrow at 8:00 AM
                </p>
                <a
                  href={`https://wa.me/919876543210?text=Hi, I'd like to pre-order for tomorrow's batch`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1da851] transition-colors"
                >
                  Pre-order via WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
