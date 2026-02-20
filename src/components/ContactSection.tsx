import { WHATSAPP_NUMBER, PHONE_NUMBER, WHATSAPP_MESSAGE } from "@/data/salonData";

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const socialLinks = [
  { icon: "📸", label: "إنستقرام", href: "https://instagram.com", color: "bg-[#E1306C]" },
  { icon: "👻", label: "سناب شات", href: "https://snapchat.com", color: "bg-[#FFFC00] text-foreground" },
  { icon: "🎵", label: "تيك توك", href: "https://tiktok.com", color: "bg-foreground" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block arabic-ornament">تواصل معنا</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">نحن هنا من أجلك</h2>
          <p className="text-muted-foreground max-w-md mx-auto">لا تترددي في التواصل معنا في أي وقت، فريقنا جاهز دائماً</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact cards */}
          <div className="space-y-4">
            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-5 hover:opacity-90 transition-opacity shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💬</div>
              <div>
                <div className="font-bold text-base">واتساب</div>
                <div className="text-white/80 text-sm">{PHONE_NUMBER}</div>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary transition-all shadow-card hover:-translate-y-1 duration-200"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📞</div>
              <div>
                <div className="font-bold text-foreground text-base">اتصلي بنا</div>
                <div className="text-muted-foreground text-sm">{PHONE_NUMBER}</div>
              </div>
            </a>

            {/* Working hours */}
            <div className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🕐</div>
              <div>
                <div className="font-bold text-foreground text-base mb-2">أوقات الدوام</div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-8 text-sm">
                    <span className="text-muted-foreground">الأحد - الخميس</span>
                    <span className="font-semibold text-foreground">9:00 ص - 10:00 م</span>
                  </div>
                  <div className="flex justify-between gap-8 text-sm">
                    <span className="text-muted-foreground">الجمعة - السبت</span>
                    <span className="font-semibold text-foreground">10:00 ص - 11:00 م</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social + Book card */}
          <div className="space-y-4">
            {/* Social */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h3 className="font-bold text-foreground text-base mb-4 flex items-center gap-2">
                <span>🌐</span> تابعينا على السوشيال ميديا
              </h3>
              <div className="space-y-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 ${s.color} text-white px-4 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all hover:-translate-y-0.5 duration-200`}
                  >
                    <span className="text-lg">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Book CTA */}
            <div className="gradient-rose rounded-2xl p-6 text-center shadow-gold">
              <div className="text-3xl mb-3">💖</div>
              <h3 className="font-black text-primary-foreground text-xl mb-2">احجزي موعدك الآن</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">الاستشارة الأولى مجانية لكل عميلة جديدة</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-secondary transition-colors shadow-card"
              >
                احجزي الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
