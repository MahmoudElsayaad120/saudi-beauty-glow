import { packages } from "@/data/salonData";
import { WHATSAPP_NUMBER } from "@/data/salonData";
import { Check } from "lucide-react";

const colorConfig = {
  basic: {
    badge: "bg-secondary text-secondary-foreground",
    button: "bg-secondary text-primary hover:bg-primary hover:text-primary-foreground",
    ring: "border-border",
    icon: "🌹",
  },
  standard: {
    badge: "gradient-gold text-white",
    button: "gradient-rose text-primary-foreground shadow-gold hover:opacity-90",
    ring: "border-primary ring-2 ring-primary/20",
    icon: "🤍",
  },
  premium: {
    badge: "bg-foreground text-background",
    button: "bg-foreground text-background hover:opacity-80",
    ring: "border-foreground/30",
    icon: "💎",
  },
};

export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 gradient-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block arabic-ornament">الباقات</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">اختاري الباقة المناسبة لك</h2>
          <p className="text-muted-foreground max-w-md mx-auto">باقات مصممة لتناسب كل احتياجاتك بأفضل الأسعار</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => {
            const conf = colorConfig[pkg.color as keyof typeof colorConfig];
            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`أود الاشتراك في ${pkg.name} - ${pkg.nameEn}`)}`;
            return (
              <div
                key={pkg.id}
                className={`relative bg-card rounded-3xl p-7 border-2 ${conf.ring} shadow-card hover:shadow-lg-custom hover:-translate-y-2 transition-all duration-300 animate-fade-in-up flex flex-col`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="gradient-gold text-white text-xs font-bold px-5 py-2 rounded-full shadow-gold">
                      ⭐ الأكثر طلبًا
                    </span>
                  </div>
                )}

                {/* Package header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{conf.icon}</div>
                  <h3 className="text-2xl font-black text-foreground mb-1">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-4xl font-black text-primary">{pkg.price}</span>
                    <span className="text-muted-foreground text-sm mb-1">{pkg.currency}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {pkg.features.map((feat, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm text-foreground">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center font-bold py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 ${conf.button}`}
                >
                  احجزي الباقة الآن
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
