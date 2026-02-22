import { useState } from "react";
import { Send, Star } from "lucide-react";

interface Review {
  name: string;
  service: string;
  rating: number;
  text: string;
  date: string;
}

interface Props {
  onSubmit: (review: Review) => void;
}

const serviceOptions = [
  "قص وتشكيل الشعر", "صبغ الشعر", "كيراتين", "مانيكير", "باديكير",
  "جل براق", "مكياج عروس", "مكياج سهرة", "مكياج يومي",
  "تنظيف بشرة", "ميزوثيرابي", "ماسك ذهبي", "باقة الوردة", "باقة اللؤلؤة", "باقة الألماسة",
];

export default function ClientReviewForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !service || !rating || !text.trim()) return;
    onSubmit({
      name: name.trim(),
      service,
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("ar-SA"),
    });
    setName("");
    setService("");
    setRating(0);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
      <h3 className="text-xl font-bold text-foreground mb-1">شاركينا رأيك ✨</h3>
      <p className="text-sm text-muted-foreground mb-6">نحب نسمع تجربتك معنا</p>

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">💕</div>
          <p className="text-lg font-bold text-foreground">شكراً لمشاركتك!</p>
          <p className="text-sm text-muted-foreground mt-1">تقييمك يهمنا ويساعدنا نطور خدماتنا</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">الاسم</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتبي اسمك..."
              className="w-full bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors"
              dir="rtl"
              required
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">الخدمة</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors appearance-none"
              dir="rtl"
              required
            >
              <option value="">اختاري الخدمة...</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">التقييم</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    size={28}
                    className={`transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-accent text-accent"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">تجربتك</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="شاركينا تجربتك مع الصالون..."
              rows={3}
              className="w-full bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors resize-none"
              dir="rtl"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full gradient-rose text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Send size={16} />
            أرسلي تقييمك
          </button>
        </form>
      )}
    </div>
  );
}
