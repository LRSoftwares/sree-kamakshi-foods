export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function generateBatchId(): string {
  const year = new Date().getFullYear();
  const count = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0");
  return `GK-${year}-${count}`;
}

export function getDeliveryRecommendation(distanceKm: number): {
  method: string;
  message: string;
} {
  if (distanceKm < 5) {
    return {
      method: "pickup",
      message: `Save ₹100+ by picking up yourself! Only ${distanceKm.toFixed(1)} km away.`,
    };
  }
  if (distanceKm <= 12) {
    return {
      method: "rapido",
      message: "Rapido Parcel is the most affordable option for your distance.",
    };
  }
  return {
    method: "uber",
    message: "Uber Package recommended for reliable long-distance delivery.",
  };
}

export function estimateDeliveryCost(
  distanceKm: number,
  method: string
): number {
  if (method === "pickup") return 0;
  const baseRate = method === "rapido" ? 30 : 45;
  const perKmRate = method === "rapido" ? 8 : 10;
  return Math.round(baseRate + distanceKm * perKmRate);
}

export function estimateDeliveryTime(
  distanceKm: number,
  method: string
): string {
  if (method === "pickup") return "Ready for pickup";
  const baseMinutes = method === "rapido" ? 10 : 15;
  const minutes = Math.round(baseMinutes + distanceKm * 2);
  return `${minutes} mins`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
