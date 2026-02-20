import heroImg from "@/assets/hero-salon.jpg";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, PHONE_NUMBER } from "@/data/salonData";

export default function HeroSection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const bookLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("أود حجز استشارة مجانية 💄")}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 gradient-hero" />

      {/* Gold ornament dots */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-5 py-2 text-sm font-semibold mb-8 animate-fade-in-up">
          <span className="text-gold animate-shimmer">✦</span>
          الصالون الأول للسيدات في المملكة
          <span className="text-gold animate-shimmer">✦</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          جمالك <span className="text-gold">تاجك</span>
          <br />
          واحنا نكمله لك
        </h1>

        {/* Sub description */}
        <p className="text-lg md:text-xl text-white/85 font-medium mb-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          نقدم لكِ تجربة جمالية فاخرة تليق بأنوثتك
        </p>
        <p className="text-base text-white/70 mb-10 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          خدمات الشعر، الأظافر، المكياج، والعناية بالبشرة — كل شيء في مكان واحد بأيدي متخصصات محترفات
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <a
            href={bookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 gradient-rose text-primary-foreground font-bold text-base px-8 py-4 rounded-2xl shadow-gold hover:opacity-90 transition-all hover:scale-105 duration-200"
          >
            <span>📅</span>
            احجزي استشارتك المجانية
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all hover:scale-105 duration-200"
          >
            <span>💬</span>
            تواصلي عبر واتساب
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          {[
            { num: "+500", label: "عميلة سعيدة" },
            { num: "+12", label: "خدمة متخصصة" },
            { num: "5★", label: "تقييم العملاء" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-black text-gold">{stat.num}</div>
              <div className="text-xs text-white/80 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-float">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
