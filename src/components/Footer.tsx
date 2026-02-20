import { WHATSAPP_NUMBER, PHONE_NUMBER, WHATSAPP_MESSAGE } from "@/data/salonData";

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-right">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <span className="text-gold text-2xl">✦</span>
              <div>
                <div className="text-xl font-black">صالون الأميرة</div>
                <div className="text-xs text-background/60">للجمال والأناقة</div>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              وجهتك الأولى للجمال والأناقة في المملكة العربية السعودية. نؤمن أن كل امرأة تستحق الأفضل.
            </p>
          </div>

          {/* Quick links */}
          <div className="text-center">
            <h4 className="font-bold mb-4 text-gold">روابط سريعة</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              {["الرئيسية", "خدماتنا", "الباقات", "معرض الصور", "تواصل معنا"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => document.querySelector(`#${l === "الرئيسية" ? "hero" : l === "خدماتنا" ? "services" : l === "الباقات" ? "packages" : l === "معرض الصور" ? "gallery" : "contact"}`)?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-gold transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-4 text-gold">تواصل معنا</h4>
            <div className="space-y-2 text-sm text-background/70">
              <div>📞 {PHONE_NUMBER}</div>
              <div>💬 واتساب: {PHONE_NUMBER}</div>
              <div>🕐 يومياً: 9 صباحاً - 10 مساءً</div>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              💬 تواصل الآن
            </a>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-xs text-background/50">
          © {new Date().getFullYear()} صالون الأميرة. جميع الحقوق محفوظة. صُنع بـ 💕
        </div>
      </div>
    </footer>
  );
}
