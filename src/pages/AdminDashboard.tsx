import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Check, Trash2, Star, Clock, MessageSquare } from "lucide-react";

interface Review {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  approved: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchReviews();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin-login");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("role", "admin")
      .single();
    if (!roles) {
      await supabase.auth.signOut();
      navigate("/admin-login");
    }
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("client_reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  const approveReview = async (id: string) => {
    await supabase.from("client_reviews").update({ approved: true }).eq("id", id);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
  };

  const deleteReview = async (id: string) => {
    await supabase.from("client_reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => !r.approved).length,
    approved: reviews.filter((r) => r.approved).length,
    avgRating: reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "0",
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-rose rounded-xl flex items-center justify-center text-primary-foreground font-bold text-sm">👑</div>
            <div>
              <h1 className="font-bold text-foreground">لوحة تحكم الأدمن</h1>
              <p className="text-xs text-muted-foreground">صالون الأميرة</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut size={16} />
            خروج
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "إجمالي التقييمات", value: stats.total, icon: <MessageSquare size={20} />, color: "gradient-rose" },
            { label: "في الانتظار", value: stats.pending, icon: <Clock size={20} />, color: "bg-accent" },
            { label: "معتمدة", value: stats.approved, icon: <Check size={20} />, color: "bg-[#25D366]" },
            { label: "متوسط التقييم", value: `${stats.avgRating} ⭐`, icon: <Star size={20} />, color: "gradient-rose" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-4 shadow-card">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white mb-3`}>{s.icon}</div>
              <div className="text-2xl font-black text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                filter === f
                  ? "gradient-rose text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {f === "all" ? "الكل" : f === "pending" ? "في الانتظار" : "معتمدة"}
            </button>
          ))}
        </div>

        {/* Reviews list */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">جارِ التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">لا توجد تقييمات</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className="bg-card rounded-2xl border border-border p-5 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full gradient-rose flex items-center justify-center text-primary-foreground font-bold">
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.service}</div>
                      </div>
                      <span
                        className={`mr-auto text-xs px-3 py-1 rounded-full font-semibold ${
                          r.approved
                            ? "bg-[#25D366]/10 text-[#25D366]"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {r.approved ? "معتمد" : "في الانتظار"}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <span key={i} className="text-accent text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(r.created_at).toLocaleDateString("ar-SA")}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!r.approved && (
                      <button
                        onClick={() => approveReview(r.id)}
                        className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366]/20 transition-colors"
                        title="اعتماد"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(r.id)}
                      className="w-9 h-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
