import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X } from 'lucide-react'; // Добавили X для закрытия

const App = () => {
  // Твои оригинальные состояния
  const [lang, setLang] = useState('DE');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  
  // Новое состояние для просмотра картинки во весь экран
  const [selectedImg, setSelectedImg] = useState(null);

  // Твоя генерация пылинок
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

  // Твоя логика мыши и параллакса
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 45, 
        y: (e.clientY / window.innerHeight - 0.5) * 45,
      });

      document.querySelectorAll('.glass-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Твой оригинальный контент
  const content = {
    DE: {
      slogan: "FUSION VON DIGITALER PRÄZISION UND HANDWERKLICHER INTUITION",
      bio: "„I'm an engineer, a dancer, an actor... rooted in Latin energy yet shaped by a global rhythm.“",
      ghostTitle: "NEON GHOST",
      ghostDesc: "Two ghosts started it all... Created through instinct rather than plan.",
      portfolioTitle: "PORTFOLIO (Hauptwerke)",
      btn: "KÜNSTLER KONTAKTIEREN / WERK BESTELLEN",
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
      btn: "CONTACT ARTIST / COMMISSION WORK",
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

  // Твой оригинальный плейсхолдер картинок
  const ImagePlaceholder = ({ src, className }) => (
    <div className={`relative ${className}`}>
      <img src={src} alt="Artwork" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
         <span className="border border-white/40 px-3 py-2 text-[8px] md:text-[10px] tracking-widest bg-black/60 text-white/80 font-mono text-center backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            VIEW<br/>WORK
         </span>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#050505] text-white relative flex flex-col justify-between overflow-hidden selection:bg-cyan-500/30">
        
        {/* === ТВОИ ОРИГИНАЛЬНЫЕ СЛОИ ФОНА === */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1920')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 z-0 opacity-90 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top center, rgba(160, 230, 255, 0.1) 0%, rgba(5,5,5,0.85) 60%, #050505 100%)' }} />
        
        {/* Твой световой курсор */}
        <div className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-150 ease-out mix-blend-screen" style={{ background: `radial-gradient(circle 800px at ${cursorPos.x}px ${cursorPos.y}px, rgba(34, 211, 238, 0.08), transparent 70%)` }} />
        <div className="pointer-events-none fixed z-[51] transition-transform duration-75 ease-out mix-blend-screen blur-[50px] w-48 h-48 rounded-full bg-cyan-400/20" style={{ transform: `translate(${cursorPos.x - 96}px, ${cursorPos.y - 96}px)` }} />

        {/* Твой эффект шума */}
        <div className="noise-bg fixed inset-0 pointer-events-none z-[60] opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Твои частицы */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {dustMotes.map((m) => (
            <div key={m.id} className="dust-mote absolute rounded-full" style={{ '--tx': `${m.tx}px`, '--ty': `${m.ty}px`, width: `${m.size}px`, height: `${m.size}px`, left: `${m.left}%`, top: `${m.top}%`, animationDuration: `${m.duration}s`, animationDelay: `${m.delay}s`, position: 'absolute' }} />
          ))}
        </div>

        {/* === HEADER === */}
        <header className="relative z-20 flex justify-between items-center px-8 py-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 group cursor-pointer">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-black/20 border border-white/10 overflow-hidden backdrop-blur-md group-hover:border-cyan-400/50 transition-all duration-500">
               <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} />
            </div>
            <div className="flex flex-col">
               <span className="font-montserrat font-black text-xl tracking-[0.15em] text-white">JOSE</span>
               <span className="font-montserrat font-light text-lg tracking-[0.2em] text-cyan-400 opacity-80">SANCHEZ</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 border border-white/10 rounded-full px-5 py-2 backdrop-blur-2xl bg-white/[0.03]">
            <Globe size={16} className="text-white/40" />
            <button onClick={() => setLang('DE')} className={`text-sm font-bold ${lang === 'DE' ? 'text-white' : 'text-white/40'}`}>DE</button>
            <button onClick={() => setLang('EN')} className={`text-sm font-bold ${lang === 'EN' ? 'text-white' : 'text-white/40'}`}>EN</button>
          </motion.div>
        </header>

        {/* === MAIN CONTENT === */}
        <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-8 lg:px-16 py-10 preserve-3d">
          
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/3 flex flex-col gap-6 relative z-20">
            <div className="glitch-wrapper cursor-default w-fit" onMouseEnter={() => setIsHoveringTitle(true)} onMouseLeave={() => setIsHoveringTitle(false)}>
              <h1 data-text="JOSE SANCHEZ" className={`glitch-text font-montserrat font-black text-6xl xl:text-8xl leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 transition-all duration-300 ${isHoveringTitle ? 'scale-[1.02]' : ''}`}>
                JOSE<br/>SANCHEZ
              </h1>
            </div>
            <h2 className="font-montserrat font-bold text-lg text-cyan-300 tracking-widest uppercase leading-snug drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{t.slogan}</h2>
            <button className="relative px-6 py-4 rounded-full font-montserrat font-bold text-[10px] tracking-widest uppercase text-[#e0d6cd] border border-white/20 bg-white/5 backdrop-blur-md hover:border-cyan-400 hover:text-white transition-all w-fit uppercase">{t.btn}</button>
          </motion.div>

          {/* Центральный 3D Холст (теперь кликабельный) */}
          <div className="w-full lg:w-1/3 flex justify-center perspective-[2000px] z-10 preserve-3d">
            <motion.div 
              animate={{ rotateY: mousePosition.x, rotateX: -mousePosition.y }} 
              onClick={() => setSelectedImg(mainImage)}
              className="relative w-full max-w-[340px] aspect-[4/5] group cursor-pointer preserve-3d"
            >
              <div className="absolute inset-[-15px] bg-cyan-500/40 animate-breath rounded-sm preserve-3d" style={{ transform: 'translateZ(-20px)' }} />
              <div className="absolute inset-0 bg-[#0a0a0a] border border-white/20 overflow-hidden preserve-3d shadow-2xl">
                <ImagePlaceholder src={mainImage} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8">
                  <h3 className="font-montserrat font-black text-4xl tracking-widest text-cyan-300 mb-3">{t.ghostTitle}</h3>
                  <p className="font-inter text-sm text-white/90 italic leading-relaxed font-light">"{t.ghostDesc}"</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Сетка карточек (теперь кликабельные) */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/3 grid grid-cols-2 gap-4 relative z-20">
            {t.cards.map((card) => (
              <div 
                key={card.id} 
                onClick={() => setSelectedImg(card.img)}
                className="glass-card group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/20 bg-white/[0.02] backdrop-blur-3xl transition-transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <img src={card.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="relative z-20 h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="text-[9px] text-cyan-300/80 font-mono mb-2 uppercase tracking-widest">Ref {card.ref}</span>
                  <h4 className="font-montserrat font-bold text-xs leading-snug text-white/90">{card.title}</h4>
                </div>
              </div>
            ))}
          </motion.div>

        </main>

        {/* === LIGHTBOX (Всплывающее фото) === */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button className="absolute top-10 right-10 text-white/40 hover:text-cyan-400 transition-colors">
                <X size={40} strokeWidth={1} />
              </button>
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                src={selectedImg} className="max-w-full max-h-[85vh] object-contain border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.2)]" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="relative z-20 w-full flex justify-center pb-8 opacity-30 text-[10px] tracking-widest font-mono uppercase">
           © 2026 Jose Sanchez | Global Portfolio
        </footer>

      </div>
    </>
  );
};

export default App;
