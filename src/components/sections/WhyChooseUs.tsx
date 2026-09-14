"use client";

const features = [
  {
    icon: "🏠",
    title: "Homemade Recipes",
    description: "Traditional family recipes passed down through generations",
  },
  {
    icon: "🚫",
    title: "No Preservatives",
    description: "100% natural ingredients with zero artificial additives",
  },
  {
    icon: "✨",
    title: "Freshly Prepared",
    description: "Every batch is cooked fresh only after your order",
  },
  {
    icon: "🌶️",
    title: "Premium Ingredients",
    description: "Handpicked spices and the finest quality produce",
  },
  {
    icon: "🍛",
    title: "Traditional Andhra Taste",
    description: "Authentic flavors that remind you of home",
  },
  {
    icon: "📋",
    title: "Made Only After Ordering",
    description: "No stale stock, your pickle is made just for you",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Why Choose <span className="text-primary">Sree Kamakshi Foods</span>?
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            We believe in delivering the purest, freshest homemade pickles,
            just like your grandmother used to make.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-light text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
