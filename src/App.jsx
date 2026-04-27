import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X } from 'lucide-react';

const App = () => {
  // Базовые состояния: язык, позиция мыши и выбранный объект для просмотра
  const [lang, setLang] = useState('DE');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  // Генерация пылинок (Dust motes) для атмосферы
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

  // Параллакс и слежение за курсором
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

  // РАСШИРЕННАЯ БАЗА ДАННЫХ (Картины и Статуи)
  const content = {
    DE: {
      slogan: "FUSION VON DIGITALER PRÄZISION UND HANDWERKLICHER INTUITION",
      ghostTitle: "NEON GHOST",
      portfolioTitle: "PORTFOLIO",
      btn: "WERK BESTELLEN",
      infoLabels: { year: "Jahr", theme: "Thema", creator: "Schöpfer" },
      cards: [
        { id: 1, title: "DATA STREAM FUSION", year: "2024", theme: "Digital Art", creator: "Jose Sanchez", ref: "S. 6", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200" },
        { id: 2, title: "AUTHENTICITY & GLITCH", year: "2023", theme: "Modern Abstract", creator: "Jose Sanchez", ref: "S. 11", img: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?w=1200" },
        { id: 3, title: "ANALOG ECHO", year: "2024", theme: "Sculpture", creator: "Jose Sanchez", ref: "S. 15", img: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=1200" },
        { id: 4, title: "METAMORPHOSE", year: "2025", theme: "Surrealism", creator: "Jose Sanchez", ref: "S. 19", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200" },
        { id: 5, title: "CYBER STATUE", year: "2024", theme: "Conceptual", creator: "Jose Sanchez", ref: "S. 22", img: "https://images.unsplash.com/photo-1554188248-986adbb73be4?w=1200" },
        { id: 6, title: "SILENT RHYTHM", year: "2023", theme: "Minimalism", creator: "Jose Sanchez", ref: "S. 25", img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=1200" }
      ]
    },
    EN: {
      slogan: "FUSION OF DIGITAL PRECISION AND ARTISANAL INTUITION",
      ghostTitle: "NEON GHOST",
      portfolioTitle: "PORTFOLIO",
      btn: "COMMISSION WORK",
      infoLabels: { year: "Year", theme: "Theme", creator: "Creator" },
      cards: [
        { id: 1, title: "DATA STREAM FUSION", year: "2024", theme: "Digital Art", creator: "Jose Sanchez", ref: "P. 6", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200" },
        { id: 2, title: "AUTHENTICITY & GLITCH", year: "2023", theme: "Modern Abstract", creator: "Jose Sanchez", ref: "P. 11", img: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?w=1200" },
        { id: 3, title: "ANALOG ECHO", year: "2024", theme: "Sculpture", creator: "Jose Sanchez", ref: "P. 15", img: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=1200" },
        { id: 4, title: "METAMORPHOSE", year: "2025", theme: "Surrealism", creator: "Jose Sanchez", ref: "P. 19", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200" },
        { id: 5, title: "CYBER STATUE", year: "2024", theme: "Conceptual", creator: "Jose Sanchez", ref: "P. 22", img: "https://images.unsplash.com/photo-1554188248-986adbb73be4?w=1200" },
        { id: 6, title: "SILENT RHYTHM", year: "2023", theme: "Minimalism", creator: "Jose Sanchez", ref: "P. 25", img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=1200" }
      ]
    }
  };

  const t = content[lang];
  const mainWork = { title: "NEON GHOST", year: "2025", theme: "Masterpiece / Light Art", creator: "Jose Sanchez", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200" };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative flex flex-col justify-between overflow-hidden selection:bg-cyan-500/30">
      
      {/* ФОНОВЫЕ ЭФФЕКТЫ (IPTV Style) */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1920')`, backgroundSize: 'cover' }} />
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at top center, rgba(160, 230, 255, 0.1) 0%, #050505 100%)' }} />
      <div className="noise-bg fixed inset-0 z-[60] opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' ...")` }} />

      {/* HEADER */}
      <header className="relative z-20 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-14 h-14 rounded-xl bg-black/20 border border-white/10 overflow-hidden backdrop-blur-md">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => e.target.src='https://via.placeholder.com/150'} />
          </div>
          <div className="flex flex-col font-montserrat">
            <span className="font-black text-xl tracking-[0.15em]">JOSE</span>
            <span className="text-cyan-400 font-light text-lg tracking-[0.2em]">SANCHEZ</span>
          </div>
        </div>
        <div className="flex items-center gap-4 border border-white/10 rounded-full px-5 py-2 backdrop-blur-2xl bg-white/[0.03]">
          <Globe size={16} className="text-white/40" />
          <button onClick={() => setLang('DE')} className={lang === 'DE' ? 'text-white font-bold' : 'text-white/30'}>DE</button>
          <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'text-white font-bold' : 'text-white/30'}>EN</button>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-8 lg:px-16 py-10 preserve-3d">
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/4 flex flex-col gap-6">
          <div className="glitch-wrapper" onMouseEnter={() => setIsHoveringTitle(true)} onMouseLeave={() => setIsHoveringTitle(false)}>
            <h1 data-text="JOSE SANCHEZ" className={`glitch-text font-montserrat font-black text-6xl xl:text-7xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 transition-all ${isHoveringTitle ? 'scale-[1.02]' : ''}`}>
              JOSE<br/>SANCHEZ
            </h1>
          </div>
          <h2 className="font-montserrat font-bold text-lg text-cyan-300 tracking-widest uppercase leading-snug">{t.slogan}</h2>
          <button className="px-6 py-4 rounded-full border border-white/20 bg-white/5 font-montserrat font-bold text-[10px] tracking-widest uppercase hover:border-cyan-400 transition-all w-fit">
            {t.btn}
          </button>
        </motion.div>

        {/* ЦЕНТРАЛЬНЫЙ ХОЛСТ (УВЕЛИЧЕННЫЙ) */}
        <div className="w-full lg:w-2/5 flex justify-center perspective-[2000px] z-10 preserve-3d">
          <motion.div 
            animate={{ rotateY: mousePosition.x, rotateX: -mousePosition.y }} 
            onClick={() => setSelectedWork(mainWork)}
            className="relative w-full max-w-[480px] aspect-[4/5] group cursor-pointer preserve-3d"
          >
            <div className="absolute inset-[-20px] bg-cyan-500/30 blur-[60px] animate-breath rounded-full" />
            <div className="absolute inset-0 bg-[#0a0a0a] border border-white/20 overflow-hidden preserve-3d shadow-2xl">
              <img src={mainWork.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-10">
                <h3 className="font-montserrat font-black text-5xl tracking-widest text-cyan-300 mb-2 uppercase">{t.ghostTitle}</h3>
                <p className="text-white/60 italic text-sm">"{mainWork.theme}"</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ПРАВАЯ СЕТКА (КАРТОЧКИ) */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-1/3 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
          {t.cards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => setSelectedWork(card)}
              className="glass-card group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-white/[0.02] backdrop-blur-3xl transition-all hover:-translate-y-2"
            >
              <img src={card.img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[9px] text-cyan-400 font-mono uppercase tracking-widest">Ref {card.ref}</span>
                <h4 className="font-montserrat font-bold text-xs mt-1 uppercase text-white/90">{card.title}</h4>
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* ЛАЙТБОКС С ОПИСАНИЕМ (ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ) */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex flex-col lg:flex-row items-center justify-center p-6 lg:p-20 gap-10"
          >
            <button onClick={() => setSelectedWork(null)} className="absolute top-10 right-10 text-white/40 hover:text-cyan-400 transition-colors">
              <X size={48} strokeWidth={1} />
            </button>

            {/* Фото работы */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={selectedWork.img} className="max-w-full lg:max-w-[50%] max-h-[80vh] shadow-[0_0_50px_rgba(34,211,238,0.2)] border border-white/10 object-contain" 
            />

            {/* Описание работы */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-6 max-w-md">
               <h3 className="font-montserrat font-black text-4xl text-white tracking-tighter uppercase">{selectedWork.title}</h3>
               <div className="h-[1px] w-20 bg-cyan-400" />
               <div className="grid grid-cols-2 gap-6 font-montserrat">
                  <div>
                    <p className="text-cyan-400 text-[10px] uppercase tracking-widest mb-1">{t.infoLabels.year}</p>
                    <p className="text-xl font-light">{selectedWork.year}</p>
                  </div>
                  <div>
                    <p className="text-cyan-400 text-[10px] uppercase tracking-widest mb-1">{t.infoLabels.creator}</p>
                    <p className="text-xl font-light">{selectedWork.creator}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-cyan-400 text-[10px] uppercase tracking-widest mb-1">{t.infoLabels.theme}</p>
                    <p className="text-xl font-light italic">{selectedWork.theme}</p>
                  </div>
               </div>
               <p className="text-white/40 text-sm leading-relaxed mt-4 font-inter">
                 Dieses Werk ist eine Fusion aus digitaler Präzision und handwerklicher Intuition, die die Grenzen der modernen Kunst neu definiert.
               </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-20 w-full flex justify-center pb-8 opacity-30 text-[9px] tracking-[0.3em] font-mono uppercase">
         © 2026 Jose Sanchez | IPTV Portfolio
      </footer>

    </div>
  );
};

export default App;
