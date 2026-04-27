import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const App = () => {
  // Инициализация базовых состояний интерфейса и позиции курсора
  const [lang, setLang] = useState('DE');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);

  // Мемоизация генерации пылинок (Dust motes) для оптимизации рендеринга
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

  // Отслеживание позиции мыши для 3D параллакса и эффектов глобального освещения
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Настройка углов наклона для 3D холста относительно центра экрана
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 45, 
        y: (e.clientY / window.innerHeight - 0.5) * 45,
      });

      // Динамический эффект внутреннего освещения (Spotlight) для стеклянных карточек
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

  // Словари мультиязычного контента (База данных текстов из PDF)
  const content = {
    DE: {
      slogan: "FUSION VON DIGITALER PRÄZISION UND HANDWERKLICHER INTUITION",
      bio: "„I'm an engineer, a dancer, an actor... rooted in Latin energy yet shaped by a global rhythm.“",
      ghostTitle: "NEON GHOST",
      ghostDesc: "Two ghosts started it all... Created through instinct rather than plan.",
      portfolioTitle: "PORTFOLIO (Hauptwerke)",
      btn: "KÜNSTLER KONTAKTIEREN / WERK BESTELLEN",
      cards: [
        { id: 1, title: "DATENSTROM-FUSION\nData Stream Fusion", ref: "S. 6", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600" },
        { id: 2, title: "ECHTHEIT & GLITCH\nAuthenticity & Glitch", ref: "S. 11", img: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=600" },
        { id: 3, title: "ANALOGES ECHO\nAnalog Echo", ref: "S. 15", img: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80&w=600" },
        { id: 4, title: "METAMORPHOSE\nMetamorphosis", ref: "S. 19", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=600" }
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
        { id: 1, title: "DATENSTROM-FUSION\nData Stream Fusion", ref: "P. 6", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600" },
        { id: 2, title: "ECHTHEIT & GLITCH\nAuthenticity & Glitch", ref: "P. 11", img: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=600" },
        { id: 3, title: "ANALOGES ECHO\nAnalog Echo", ref: "P. 15", img: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80&w=600" },
        { id: 4, title: "METAMORPHOSE\nMetamorphosis", ref: "P. 19", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=600" }
      ]
    }
  };

  const t = content[lang];
  const mainImage = "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800";

  // Вспомогательный компонент-модуль для заглушек изображений
  const ImagePlaceholder = ({ src, className }) => (
    <div className={`relative ${className}`}>
      <img src={src} alt="Artwork" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
         <span className="border border-white/40 px-3 py-2 text-[8px] md:text-[10px] tracking-widest bg-black/60 text-white/80 font-mono text-center backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]">
           INSERT<br/>ARTWORK<br/>HERE
         </span>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@300;400;700;800;900&display=swap');
          
          :root { --bg-color: #050505; }
          body { background-color: var(--bg-color); color: #ffffff; font-family: 'Inter', sans-serif; overflow-x: hidden; margin: 0; cursor: default; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
          
          /* Custom Scrollbar */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.4); border-radius: 10px; }
          
          /* Эффект шума (Grain) */
          .noise-bg {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            pointer-events: none;
            z-index: 50;
            opacity: 0.05;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }

          /* Пульсирующее "дышащее" свечение */
          @keyframes breathGlow {
            0%, 100% { opacity: 0.5; transform: scale(0.95); filter: blur(50px); }
            50% { opacity: 0.9; transform: scale(1.05); filter: blur(60px); }
          }
          .animate-breath {
            animation: breathGlow 5s ease-in-out infinite;
          }

          /* Пылинки в луче света */
          @keyframes driftMote {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
          }
          .dust-mote {
            animation: driftMote linear infinite;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(34,211,238,0.4) 50%, transparent 100%);
          }

          /* Утилитный класс для 3D */
          .preserve-3d {
            transform-style: preserve-3d;
          }

          /* Spotlight Effect для карточек */
          .glass-card::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(
              600px circle at var(--mouse-x) var(--mouse-y),
              rgba(255, 255, 255, 0.1),
              transparent 40%
            );
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: 2;
          }
          .glass-card:hover::before {
            opacity: 1;
          }

          /* Кинематографичный Glitch-эффект текста */
          .glitch-wrapper {
            position: relative;
          }
          .glitch-text {
            position: relative;
            z-index: 1;
          }
          .glitch-wrapper:hover .glitch-text::before,
          .glitch-wrapper:hover .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
          }
          .glitch-wrapper:hover .glitch-text::before {
            left: 3px;
            text-shadow: -2px 0 #ff00c1;
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            animation: glitch-anim 2s infinite linear alternate-reverse;
          }
          .glitch-wrapper:hover .glitch-text::after {
            left: -3px;
            text-shadow: -2px 0 #00fff9;
            clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
            animation: glitch-anim2 3s infinite linear alternate-reverse;
          }
          @keyframes glitch-anim {
            0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); transform: translate(2px, -2px); }
            20% { clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%); transform: translate(-2px, 2px); }
            40% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(2px, 2px); }
            60% { clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%); transform: translate(-2px, -2px); }
            80% { clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%); transform: translate(1px, 1px); }
            100% { clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%); transform: translate(-1px, -1px); }
          }
          @keyframes glitch-anim2 {
            0% { clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%); transform: translate(-2px, 2px); }
            20% { clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%); transform: translate(2px, -2px); }
            40% { clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%); transform: translate(-2px, -2px); }
            60% { clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%); transform: translate(2px, 2px); }
            80% { clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%); transform: translate(-1px, 1px); }
            100% { clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%); transform: translate(1px, -1px); }
          }
        `}
      </style>

      <div className="min-h-screen bg-[#050505] text-white relative flex flex-col justify-between overflow-hidden selection:bg-cyan-500/30">
        
        {/* === СЛОИ ФОНА === */}
        <div 
          className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=1920&q=80')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }} 
        />
        
        <div 
          className="absolute inset-0 z-0 opacity-90 pointer-events-none"
          style={{ 
            background: 'radial-gradient(ellipse at top center, rgba(160, 230, 255, 0.1) 0%, rgba(5,5,5,0.85) 60%, #050505 100%)' 
          }} 
        />

        {/* Интерактивный световой курсор */}
        <div 
          className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-150 ease-out mix-blend-screen"
          style={{ background: `radial-gradient(circle 800px at ${cursorPos.x}px ${cursorPos.y}px, rgba(34, 211, 238, 0.08), transparent 70%)` }}
        />
        <div 
          className="pointer-events-none fixed z-[51] transition-transform duration-75 ease-out mix-blend-screen blur-[50px] w-48 h-48 rounded-full bg-cyan-400/20"
          style={{ transform: `translate(${cursorPos.x - 96}px, ${cursorPos.y - 96}px)` }}
        />

        {/* Эффект шума (Grain) поверх всего */}
        <div className="noise-bg" />

        {/* Частицы / Пылинки в луче */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {dustMotes.map((m) => (
            <div
              key={m.id}
              className="dust-mote absolute rounded-full"
              style={{
                '--tx': `${m.tx}px`,
                '--ty': `${m.ty}px`,
                width: `${m.size}px`,
                height: `${m.size}px`,
                left: `${m.left}%`,
                top: `${m.top}%`,
                animationDuration: `${m.duration}s`,
                animationDelay: `${m.delay}s`,
              }}
            />
          ))}
        </div>

        {/* === HEADER / MODULE: LOGO & IDENTITY === */}
        <header className="relative z-20 flex justify-between items-center px-8 py-6">
          
          {/* ЛЕВАЯ ЧАСТЬ: Загруженный Логотип (logo.jpg) и Имя */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} 
            className="flex items-center gap-4 group cursor-pointer"
          >
            {/* Контейнер для загруженного изображения логотипа */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-black/20 border border-white/10 overflow-hidden group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-500 backdrop-blur-md">
               <img 
                  src="logo.jpg" 
                  alt="Jose Sanchez Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Фолбэк на случай если файл logo.jpg не найден
                    e.target.src = 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=150&h=150&fit=crop';
                  }}
               />
            </div>
            {/* Текстовая визитка */}
            <div className="flex flex-col">
               <div className="flex items-center gap-2">
                 <span className="font-montserrat font-black text-xl tracking-[0.15em] text-white leading-none drop-shadow-md">JOSE</span>
               </div>
               <div className="flex items-center gap-2 mt-2">
                 <span className="font-montserrat font-light text-lg tracking-[0.2em] text-cyan-400 leading-none opacity-80 group-hover:opacity-100 transition-opacity">
                   SANCHEZ
                 </span>
               </div>
            </div>
          </motion.div>

          {/* ПРАВАЯ ЧАСТЬ: Языковой переключатель */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-4 border border-white/10 rounded-full px-5 py-2 backdrop-blur-2xl bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-400/30 transition-all duration-300 z-20 shadow-xl group">
            <Globe size={16} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
            <button onClick={() => setLang('DE')} className={`text-sm font-bold tracking-wider transition-colors ${lang === 'DE' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-white/40 hover:text-white/80'}`}>DE</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setLang('EN')} className={`text-sm font-bold tracking-wider transition-colors ${lang === 'EN' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-white/40 hover:text-white/80'}`}>EN</button>
          </motion.div>

        </header>

        {/* === MAIN CONTENT === */}
        <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-8 lg:px-16 py-10 preserve-3d">
          
          {/* --- Левая колонка --- */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full lg:w-1/3 flex flex-col gap-6 relative z-20">
            
            {/* GLITCH Заголовок (Только JOSE SANCHEZ) */}
            <div 
              className="glitch-wrapper cursor-default w-fit"
              onMouseEnter={() => setIsHoveringTitle(true)}
              onMouseLeave={() => setIsHoveringTitle(false)}
            >
              <h1 
                data-text="JOSE SANCHEZ"
                className={`glitch-text font-montserrat font-black text-6xl xl:text-8xl leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-300 ${isHoveringTitle ? 'scale-[1.02]' : ''}`}
              >
                JOSE<br/>SANCHEZ
              </h1>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={lang + 'slogan'} 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} 
                className="mt-2 space-y-2"
              >
                <h2 className="font-montserrat font-bold text-lg xl:text-xl text-cyan-300 tracking-widest uppercase leading-snug drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  {lang === 'DE' ? "FUSION VON DIGITALER PRÄZISION UND HANDWERKLICHER INTUITION." : "FUSION OF DIGITAL PRECISION AND ARTISANAL INTUITION."}
                </h2>
                <p className="font-inter font-light text-[#e0d6cd]/60 italic text-base border-l border-cyan-400/50 pl-4 py-1">
                  {lang === 'DE' ? "Fusion of Digital Precision and Artisanal Intuition." : "Fusion von digitaler Präzision und handwerklicher Intuition."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Кнопки действий (только одна кнопка) */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 relative">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group flex items-center justify-center px-6 py-4 rounded-full font-montserrat font-bold text-[10px] xl:text-xs tracking-widest uppercase text-[#e0d6cd] transition-all duration-300 w-fit border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:text-white hover:bg-cyan-500/10 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                {t.btn}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              </motion.button>
            </div>
          </motion.div>

          {/* --- Центральная колонка: Интерактивный 3D Холст --- */}
          <div className="w-full lg:w-1/3 flex justify-center perspective-[2000px] z-10 preserve-3d mt-10 lg:mt-0">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: mousePosition.x, 
                rotateX: -mousePosition.y 
              }} 
              transition={{ 
                type: 'spring', 
                stiffness: 80, 
                damping: 30, 
                mass: 0.5,
                opacity: { duration: 1, delay: 0.4 } 
              }} 
              className="relative w-full max-w-[340px] xl:max-w-[420px] aspect-[4/5] group cursor-pointer preserve-3d"
            >
              {/* Контровое пульсирующее свечение (Rim Light) */}
              <div 
                className="absolute inset-[-15px] bg-cyan-500/40 animate-breath rounded-sm preserve-3d" 
                style={{ transform: 'translateZ(-20px)' }} 
              />
              <div 
                className="absolute inset-[-30px] bg-purple-600/20 blur-[60px] animate-breath rounded-full preserve-3d" 
                style={{ transform: 'translateZ(-40px)', animationDelay: '2s' }} 
              />
              
              {/* 3D КОНСТРУКЦИЯ ХОЛСТА */}
              <div className="absolute inset-0 preserve-3d shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-105">
                
                {/* Задняя грань */}
                <div className="absolute inset-0 bg-black" style={{ transform: 'translateZ(-15px)' }} />

                {/* Боковые грани */}
                <div className="absolute top-0 left-0 h-full w-[30px] bg-gradient-to-r from-[#111] to-[#222] border-y border-l border-white/5" style={{ transformOrigin: 'left', transform: 'rotateY(90deg)' }} />
                <div className="absolute top-0 right-0 h-full w-[30px] bg-gradient-to-l from-[#111] to-[#222] border-y border-r border-white/5" style={{ transformOrigin: 'right', transform: 'rotateY(-90deg)' }} />
                <div className="absolute top-0 left-0 w-full h-[30px] bg-[#2a2a2a] border-x border-t border-white/5" style={{ transformOrigin: 'top', transform: 'rotateX(-90deg)' }} />
                <div className="absolute bottom-0 left-0 w-full h-[30px] bg-black border-x border-b border-white/5" style={{ transformOrigin: 'bottom', transform: 'rotateX(90deg)' }} />

                {/* ПЕРЕДНЯЯ ГРАНЬ С ПАРАЛЛАКСОМ */}
                <div 
                  className="absolute inset-0 bg-[#0a0a0a] border border-white/20 overflow-hidden preserve-3d"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <div className="absolute inset-0 preserve-3d" style={{ transform: 'translateZ(-10px)' }}>
                     <ImagePlaceholder src={mainImage} className="w-full h-full transform scale-110" />
                  </div>
                  
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 transition-transform duration-500 preserve-3d"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <motion.div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-montserrat font-black text-4xl tracking-widest text-cyan-300 drop-shadow-[0_5px_15px_rgba(34,211,238,1)] mb-3">
                        {t.ghostTitle}
                      </h3>
                      <p className="font-inter text-sm text-white/90 italic leading-relaxed font-light drop-shadow-md">
                        "{t.ghostDesc}"
                      </p>
                    </motion.div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* --- Правая колонка: Запотевшее стекло --- */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="w-full lg:w-1/3 flex flex-col gap-4 relative z-20">
            <div className="flex flex-col gap-1 mb-2">
              <h3 className="font-montserrat font-light text-cyan-300 tracking-[0.2em] text-sm uppercase">{t.portfolioTitle.split(' ')[0]}</h3>
              <span className="font-inter text-xs text-white/40 italic">{lang === 'DE' ? "(Hauptwerke)" : "(Key Works)"}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {t.cards.map((card, index) => (
                <motion.div 
                  key={card.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }} 
                  className="glass-card group relative aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.6)] border-[0.5px] border-white/20 bg-white/[0.02] backdrop-blur-3xl transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen">
                     <ImagePlaceholder src={card.img} className="w-full h-full transform scale-110 group-hover:scale-100 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" />
                  </div>
                  
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />
                  
                  <div className="relative z-20 h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/10 to-transparent">
                    <span className="text-[9px] xl:text-[10px] text-cyan-300/80 font-mono mb-2 uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Ref {card.ref}</span>
                    <h4 className="font-montserrat font-bold text-xs xl:text-sm leading-snug text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-pre-line group-hover:text-cyan-100 transition-colors">
                      {card.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </main>

        {/* Скролл индикатор */}
        <div className="relative z-20 w-full flex justify-center pb-8">
           <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group">
              <span className="font-inter text-[10px] tracking-[0.2em] uppercase group-hover:text-cyan-400 transition-colors">{lang === 'DE' ? "Nach unten scrollen" : "Scroll down"}</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                 <svg className="group-hover:text-cyan-400 transition-colors" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1L6 6L11 1"/></svg>
              </motion.div>
           </div>
        </div>

      </div>
    </>
  );
};

export default App;
