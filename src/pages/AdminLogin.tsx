import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      // Check admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("role", "admin")
        .single();

      if (!roles) {
        await supabase.auth.signOut();
        throw new Error("ليس لديك صلاحيات الأدمن");
      }

      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "حدث خطأ في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-rose rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary-foreground" size={28} />
          </div>
          <h1 className="text-2xl font-black text-foreground">لوحة تحكم الأدمن</h1>
          <p className="text-muted-foreground text-sm mt-1">سجّل الدخول للوصول للوحة التحكم</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-xl px-4 py-3 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary rounded-xl pr-10 pl-4 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">كلمة المرور</label>
            <div className="relative">
              <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary rounded-xl pr-10 pl-4 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-rose text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "جارِ التحقق..." : "دخول"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← العودة للموقع
          </a>
        </div>
      </div>
    </div>
  );
}
