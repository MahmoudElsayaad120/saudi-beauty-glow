import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, label: "تسريح الشعر" },
  { src: gallery2, label: "الأظافر" },
  { src: gallery3, label: "مكياج العروس" },
  { src: gallery4, label: "العناية بالبشرة" },
  { src: gallery5, label: "أجواء الصالون" },
  { src: gallery6, label: "منتجات الشعر" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block arabic-ornament">معرض الصور</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">لحظات من الجمال</h2>
          <p className="text-muted-foreground max-w-md mx-auto">شاهدي نماذج من أعمالنا المميزة التي تعكس مهارة فريقنا</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-lg-custom transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 gradient-hero opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-bold text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
