import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X } from 'lucide-react';

const App = () => {
  // Состояния для языка, позиции мыши и открытого изображения
  const [lang, setLang] = useState('DE');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [selectedImg, setSelectedImg] = useState(null);

  // Генерация анимированных частиц для фона
  const dustMotes = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 15,
      tx: (Math.random() - 0.5) * 100,
      ty: (Math.random() - 1) * 150,
    }));
  }, []);

  // Обработка движения мыши для 3D-эффектов
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 45, 
        y: (e.clientY / window.innerHeight - 0.5) * 45,
      });

      document.querySelectorAll('.glass-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const content = {
    DE: {
      slogan: "FUSION VON DIGITALER PRÄZISION UND HANDWERKLICHER INTUITION",
      bio: "„I'm an engineer, a dancer, an actor... rooted in Latin energy yet shaped by a global rhythm.“",
      ghostTitle: "NEON GHOST",
      ghostDesc: "Two ghosts started it all... Created through instinct rather than plan.",
      portfolioTitle: "PORTFOLIO (Hauptwerke)",
      btn: "KÜNSTLER KONTAKTIEREN",
      cards: [
        { id: 1, title: "DATENSTROM-FUSION\nData Stream Fusion", ref: "S. 6", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1200" },
        { id: 2, title: "ECHTHEIT & GLITCH\nAuthenticity & Glitch", ref: "S. 11", img: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=1200" },
        { id: 3, title: "ANALOGES ECHO\nAnalog Echo", ref: "S. 15", img: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80&w=1200" },
        { id: 4, title: "METAMORPHOSE\nMetamorphosis", ref: "S. 19", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1200" }
      ]
    },
    EN: {
      slogan: "FUSION OF DIGITAL PRECISION AND ARTISANAL INTUITION",
      bio: "“I'm an engineer, a dancer, an actor... rooted in Latin energy yet shaped by a global rhythm.”",
      ghostTitle: "NEON GHOST",
      ghostDesc: "Two ghosts started it all... Created through instinct rather than plan.",
      portfolioTitle: "PORTFOLIO (Key Works)",
      btn: "CONTACT ARTIST",
      cards: [
        { id: 1, title: "DATENSTROM-FUSION\nData Stream Fusion", ref: "P. 6", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1200" },
        { id: 2, title: "ECHTHEIT & GLITCH\nAuthenticity & Glitch", ref: "P. 11", img: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=1200" },
        { id: 3, title: "ANALOGES ECHO\nAnalog Echo", ref: "P. 15", img: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80&w=1200" },
        { id: 4, title: "METAMORPHOSE\nMetamorphosis", ref: "P. 19", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=1200" }
      ]
    }
  };

  const t = content[lang];
  const mainImage = "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=1200";

  // Вспомогательный компонент для карточек
  const ImagePlaceholder = ({ src, className }) => (
    <div className={`relative ${className}`}>
      <img src={src} alt="Artwork" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity">
         <span className="border border-white/20 px-2 py-1 text-[8px] tracking-[0.2em] bg-black/40 text-white font-mono backdrop-blur-sm">VIEW</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white relative flex flex-col justify-between overflow-hidden selection:bg-cyan-500/30">
      {/* Элементы фона и освещения */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1920')", backgroundSize: 'cover' }} />
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top center, rgba(160, 230, 255, 0.1) 0%, #050505 100%)' }} />
      <div className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-150 ease-out mix-blend-screen" style={{ background: `radial-gradient(circle 800px at ${cursorPos.x}px ${cursorPos.y}px, rgba(34, 211, 238, 0.08), transparent 70%)` }} />
      
      {/* Пылинки */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {dustMotes.map((m) => (
          <div key={m.id} className="dust-mote absolute rounded-full bg-white/40" style={{ '--tx': `${m.tx}px`, '--ty': `${m.ty}px`, width: m.size, height: m.size, left: `${m.left}%`, top: `${m.top}%`, animationDuration: `${m.duration}s`, animationDelay: `${m.delay}s` }} />
        ))}
      </div>

      {/* Навигация */}
      <header className="relative z-20 flex justify-between items-center px-8 py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-xl bg-black/20 border border-white/10 overflow-hidden backdrop-blur-md">
            <img src="/logo.jpg" alt="Logo" class="w-full h-full object-cover" onError={(e) => e.target.src='https://via.placeholder.com/150'} />
          </div>
          <div className="flex flex-col font-montserrat leading-none">
            <span className="font-black text-xl tracking-[0.15em]">JOSE</span>
            <span className="text-cyan-400 font-light text-lg tracking-[0.2em] mt-1">SANCHEZ</span>
          </div>
        </motion.div>
        <div className="flex items-center gap-4 border border-white/10 rounded-full px-5 py-2 backdrop-blur-2xl bg-white/[0.03]">
          <Globe size={16} className="text-white/40" />
          <button onClick={() => setLang('DE')} className={lang === 'DE' ? 'text-white font-bold' : 'text-white/40'}>DE</button>
          <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'text-white font-bold' : 'text-white/40'}>EN</button>
        </div>
      </header>

      {/* Основная часть сайта */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-8 lg:px-16 py-10 preserve-3d">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/3">
          <h1 className="font-montserrat font-black text-6xl xl:text-8xl leading-none tracking-tighter">JOSE<br/>SANCHEZ</h1>
          <h2 className="mt-4 font-montserrat font-bold text-lg text-cyan-300 tracking-widest uppercase">{t.slogan}</h2>
          <button className="mt-8 px-6 py-4 rounded-full border border-white/20 bg-white/5 font-montserrat font-bold text-[10px] tracking-widest uppercase hover:border-cyan-400 transition-all">{t.btn}</button>
        </motion.div>

        {/* Центральный 3D холст */}
        <motion.div 
          animate={{ rotateY: mousePosition.x, rotateX: -mousePosition.y }} 
          onClick={() => setSelectedImg(mainImage)}
          className="relative w-72 h-96 border border-white/20 bg-black overflow-hidden shadow-2xl cursor-pointer group"
        >
          <ImagePlaceholder src={mainImage} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black to-transparent w-full">
            <h3 className="text-cyan-300 font-black text-3xl uppercase tracking-tighter">{t.ghostTitle}</h3>
            <p className="text-sm italic text-white/70">"{t.ghostDesc}"</p>
          </div>
        </motion.div>

        {/* Сетка дополнительных работ */}
        <div className="w-full lg:w-1/3 grid grid-cols-2 gap-4">
          {t.cards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => setSelectedImg(card.img)}
              className="glass-card group p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-3xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <img src={card.img} className="w-full h-full object-cover grayscale brightness-50" />
              </div>
              <span className="relative z-10 text-[9px] text-cyan-400 font-mono">REF {card.ref}</span>
              <h4 className="relative z-10 font-montserrat font-bold text-xs mt-2 uppercase text-white/90">{card.title}</h4>
            </div>
          ))}
        </div>
      </main>

      {/* Лайтбокс: Полноэкранный просмотр изображений */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.button 
              className="absolute top-8 right-8 text-white/50 hover:text-white"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={selectedImg} 
              className="max-w-full max-h-[90vh] shadow-2xl border border-white/10"
              alt="Full view"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-20 w-full flex justify-center pb-8 opacity-50">
        <span className="font-inter text-[10px] tracking-[0.2em] uppercase">© 2026 Jose Sanchez | IPTV</span>
      </footer>
    </div>
  );
};

export default App;
