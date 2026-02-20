import { useState } from "react";
import { faqs } from "@/data/salonData";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block arabic-ornament">الأسئلة الشائعة</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">أسئلة تهمك</h2>
          <p className="text-muted-foreground">كل ما تريدين معرفته قبل زيارتك الأولى</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.id}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-lg-custom transition-all duration-200 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-right font-bold text-foreground hover:text-primary transition-colors"
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gold font-black text-sm w-6 text-center">{i + 1}</span>
                  <span className="text-sm md:text-base">{faq.q}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-primary transition-transform duration-300 ${open === faq.id ? "rotate-180" : ""}`}
                />
              </button>
              {open === faq.id && (
                <div className="px-5 pb-5 pt-0">
                  <div className="h-px bg-border mb-4" />
                  <p className="text-sm text-muted-foreground leading-loose">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
