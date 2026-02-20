import { useState } from "react";
import { services } from "@/data/salonData";

const categories = [
  { key: "all", label: "الكل", icon: "✨" },
  { key: "hair", label: "شعر", icon: "✂️" },
  { key: "nails", label: "أظافر", icon: "💅" },
  { key: "makeup", label: "مكياج", icon: "💄" },
  { key: "skincare", label: "بشرة", icon: "🧖" },
];

export default function ServicesSection() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block arabic-ornament">خدماتنا</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">كل ما تحتاجينه في مكان واحد</h2>
          <p className="text-muted-foreground max-w-md mx-auto">نقدم باقة متكاملة من خدمات الجمال بأيدي متخصصات محترفات</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                active === cat.key
                  ? "gradient-rose text-primary-foreground shadow-card"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, i) => (
            <div
              key={service.id}
              className="group bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl w-14 h-14 flex items-center justify-center bg-secondary rounded-xl group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-foreground text-base">{service.name}</h3>
                    <span className="text-xs bg-blush text-primary font-semibold px-2 py-1 rounded-full">{service.categoryLabel}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-sm">{service.price}</span>
                    <a
                      href={`https://wa.me/201014756248?text=${encodeURIComponent(`أود الاستفسار عن خدمة ${service.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold font-semibold hover:underline"
                    >
                      احجزي الآن ←
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
