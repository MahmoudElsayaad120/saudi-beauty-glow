import { useState } from "react";
import { testimonials as initialTestimonials } from "@/data/salonData";
import ClientReviewForm from "./ClientReviewForm";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-base">★</span>
      ))}
    </div>
  );
}

interface Review {
  name: string;
  service: string;
  rating: number;
  text: string;
  date?: string;
}

export default function TestimonialsSection() {
  const [clientReviews, setClientReviews] = useState<Review[]>([]);

  const allReviews = [
    ...initialTestimonials.map((t) => ({ ...t, date: undefined })),
    ...clientReviews,
  ];

  const avgRating =
    allReviews.length > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
      : "5.0";

  return (
    <section id="testimonials" className="py-20 gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block arabic-ornament">آراء العملاء</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">ماذا قالت عميلاتنا؟</h2>
          <p className="text-muted-foreground max-w-md mx-auto">رضاكِ هو أجمل جائزة نحصل عليها</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allReviews.map((t, i) => (
              <div
                key={`review-${i}`}
                className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full gradient-rose flex items-center justify-center text-primary-foreground font-black text-lg mb-4">
                  {t.name[0]}
                </div>
                <Stars count={t.rating} />
                <p className="text-sm text-muted-foreground leading-relaxed my-3 line-clamp-4">
                  "{t.text}"
                </p>
                <div className="border-t border-border pt-3 mt-auto">
                  <div className="font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-gold font-medium">{t.service}</div>
                  {t.date && <div className="text-xs text-muted-foreground mt-1">{t.date}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Review form */}
          <div className="lg:col-span-1">
            <ClientReviewForm
              onSubmit={(review) => setClientReviews((prev) => [review, ...prev])}
            />
          </div>
        </div>

        {/* Trust badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-4 shadow-card">
            <span className="text-2xl">⭐</span>
            <div className="text-right">
              <div className="font-black text-foreground text-lg">{avgRating} / 5</div>
              <div className="text-muted-foreground text-sm">متوسط تقييم {allReviews.length} عميلة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
