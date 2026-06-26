import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TodaysBatch from "@/components/sections/TodaysBatch";
import Products from "@/components/sections/Products";
import OrderForm from "@/components/sections/OrderForm";
import FreshnessTimeline from "@/components/sections/FreshnessTimeline";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <TodaysBatch />
        <Products />
        <OrderForm />
        <FreshnessTimeline />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
