import Navbar from "@/components/sections/Navbar";
import OrderTracker from "@/components/order/OrderTracker";

export const metadata = {
  title: "Track Order | Sree Kamakshi Foods",
  description: "Track your fresh pickle order status",
};

export default function TrackPage() {
  return (
    <>
      <Navbar />
      <OrderTracker />
    </>
  );
}
