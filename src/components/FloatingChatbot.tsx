import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { chatbotResponses, WHATSAPP_NUMBER } from "@/data/salonData";

interface Message {
  role: "bot" | "user";
  text: string;
  waLink?: boolean;
}

const initialMessages: Message[] = [
  { role: "bot", text: "أهلاً بكِ في صالون الأميرة! 💕\nكيف أقدر أساعدك اليوم؟\n\nاسأليني عن: الأسعار، الخدمات، الموقع، أوقات العمل، أو العروض 🌸" },
];

const quickReplies = ["الأسعار", "الخدمات", "ساعات العمل", "العروض", "حجز"];

function getResponse(text: string): { text: string; waLink?: boolean } {
  const lower = text.toLowerCase().trim();
  if (lower.includes("واتساب") || lower.includes("تحويل") || lower.includes("حجز") || lower.includes("تواصل")) {
    return { text: "يسعدني تحويلك للواتساب الآن للتواصل المباشر مع فريقنا! 💬", waLink: true };
  }
  for (const key of Object.keys(chatbotResponses)) {
    if (lower.includes(key)) return { text: chatbotResponses[key] };
  }
  return { text: chatbotResponses.default, waLink: true };
}

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    const response = getResponse(text);
    const botMsg: Message = { role: "bot", ...response };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحباً، أود التواصل مع صالون الأميرة 💕")}`;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full gradient-rose shadow-gold text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform duration-200 ${open ? "hidden" : "flex"}`}
        aria-label="فتح الدردشة"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#25D366] rounded-full animate-pulse border-2 border-background" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 left-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-card rounded-3xl shadow-lg-custom border border-border overflow-hidden flex flex-col">
          {/* Header */}
          <div className="gradient-rose p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">💄</div>
            <div className="flex-1 text-right">
              <div className="font-bold text-primary-foreground text-sm">صالون الأميرة</div>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
                <span className="text-primary-foreground/80 text-xs">متاحون الآن</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-64 overflow-y-auto p-4 space-y-3 bg-background/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm chatbot-message ${
                    msg.role === "user"
                      ? "bg-secondary text-secondary-foreground rounded-tl-none"
                      : "gradient-rose text-primary-foreground rounded-tr-none"
                  }`}
                >
                  {msg.text}
                  {msg.waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-center text-xs bg-[#25D366] text-white py-1.5 rounded-xl font-semibold hover:opacity-90"
                    >
                      💬 انتقلي للواتساب
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-background/50 border-t border-border">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="flex-shrink-0 text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card flex gap-2">
            <button
              onClick={() => send(input)}
              className="w-10 h-10 gradient-rose rounded-xl flex items-center justify-center text-primary-foreground flex-shrink-0 hover:opacity-90"
            >
              <Send size={16} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="اكتبي سؤالك هنا..."
              className="flex-1 bg-secondary rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border-none"
              dir="rtl"
            />
          </div>
        </div>
      )}
    </>
  );
}
