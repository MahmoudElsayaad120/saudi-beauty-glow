import { useState } from "react";
import { Send, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  onSubmitted?: () => void;
}

const serviceOptions = [
  "قص وتشكيل الشعر", "صبغ الشعر", "كيراتين", "مانيكير", "باديكير",
  "جل براق", "مكياج عروس", "مكياج سهرة", "مكياج يومي",
  "تنظيف بشرة", "ميزوثيرابي", "ماسك ذهبي", "باقة الوردة", "باقة اللؤلؤة", "باقة الألماسة",
];

export default function ClientReviewForm({ onSubmitted }: Props) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !service || !rating || !text.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("client_reviews").insert({
      name: name.trim(),
      service,
      rating,
      text: text.trim(),
    });
    setLoading(false);
    if (!error) {
      setName(""); setService(""); setRating(0); setText("");
      setSubmitted(true);
      onSubmitted?.();
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
      <h3 className="text-xl font-bold text-foreground mb-1">شاركينا رأيك ✨</h3>
      <p className="text-sm text-muted-foreground mb-6">نحب نسمع تجربتك معنا</p>

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">💕</div>
          <p className="text-lg font-bold text-foreground">شكراً لمشاركتك!</p>
          <p className="text-sm text-muted-foreground mt-1">تقييمك سيظهر بعد مراجعة الإدارة</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">الاسم</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="اكتبي اسمك..." dir="rtl" required
              className="w-full bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">الخدمة</label>
            <select value={service} onChange={(e) => setService(e.target.value)} dir="rtl" required
              className="w-full bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors appearance-none">
              <option value="">اختاري الخدمة...</option>
              {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">التقييم</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-125">
                  <Star size={28} className={`transition-colors ${star <= (hoverRating || rating) ? "fill-accent text-accent" : "text-border"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">تجربتك</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} dir="rtl" required
              placeholder="شاركينا تجربتك مع الصالون..."
              className="w-full bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors resize-none" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full gradient-rose text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            <Send size={16} />
            {loading ? "جارِ الإرسال..." : "أرسلي تقييمك"}
          </button>
        </form>
      )}
    </div>
  );
}
