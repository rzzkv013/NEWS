'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Search, Sparkles, Sun, Moon, Film, Trophy, Laptop, Gamepad2, Briefcase, Globe, ExternalLink, Calendar } from 'lucide-react';

interface Article {
  source: { name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

const CATEGORIES = [
  { id: 'all', name: 'Barchasi', query: 'latest', icon: Globe },
  { id: 'cartoons', name: 'Multfilmlar', query: 'cartoon OR animation OR disney', icon: Film },
  { id: 'sport', name: 'Sport', query: 'sports OR football OR basketball', icon: Trophy },
  { id: 'tech', name: 'Texnologiya', query: 'technology OR software', icon: Laptop },
  { id: 'gaming', name: "O'yinlar", query: 'gaming OR esports', icon: Gamepad2 },
  { id: 'business', name: 'Biznes', query: 'business OR economy', icon: Briefcase },
];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fetchNews = async (query: string) => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      if (!apiKey) {
        console.error("API Kalit topilmadi!");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=12&sortBy=publishedAt&apiKey=${apiKey}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
        }
      );
      
      const data = await res.json();
      if (res.ok) {
        setArticles(data.articles || []);
      } else {
        console.error("News API Xatoligi:", data);
        setArticles([]);
      }
    } catch (err) {
      console.error("Fetch xatoligi:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory.query);
  }, [selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(searchQuery);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white ${
      isDarkMode ? 'bg-[#0a0d14] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>

      {/* ===== ORQA FONDA SUZIB YURUVCHI MOTION ANIMATSIYALAR ===== */}
      <motion.div
        animate={{
          x: [0, 100, -80, 0],
          y: [0, -120, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-indigo-600/30 dark:bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -120, 100, 0],
          y: [0, 100, -90, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-purple-600/30 dark:bg-purple-600/20 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, 80, -100, 0],
          y: [0, -80, 100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 left-1/3 w-[380px] h-[380px] bg-pink-500/20 dark:bg-pink-600/15 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">

        {/* TOP BAR / Oq Qora Rejim Almashtirgich */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 font-bold text-lg tracking-wide text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>NEWS PORTAL</span>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md hover:scale-110 active:scale-95 transition-all text-indigo-500"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>

        {/* Header Sarlavha */}
        <header className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-white dark:via-slate-200 dark:to-indigo-300"
          >
            Eng So'nggi Yangiliklar
          </motion.h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Multfilmlar, Sport va Dunyo yangiliklarini real-vaqt rejimida kuzatib boring
          </p>
        </header>

        {/* QIDIRUV VA O'ZBEKCHA FILTRLAR */}
        <div className="space-y-6 mb-12">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group">
            <input
              type="text"
              placeholder="Kalit so'z bo'yicha qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-28 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-lg placeholder:text-slate-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
            >
              Qidirish
            </button>
          </form>

          {/* O'zbekcha Filtr Tugmalari */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory.id === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSearchQuery('');
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : 'text-indigo-500'}`} />
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING YOKI YANGILIKLAR GRIDI */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-300 dark:bg-slate-800 rounded-2xl" />
                <div className="h-6 bg-slate-300 dark:bg-slate-800 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800/60 rounded-lg w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800/60 rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <NewsCardItem key={index} article={article} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// Alohida Karta Komponenti (Shu faylning o'zida turadi)
function NewsCardItem({ article, index }: { article: Article; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-4 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-500">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              YANGILIK
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
          
          <span className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg border border-indigo-400/30">
            {article.source.name || 'Manba'}
          </span>
        </div>

        <div style={{ transform: 'translateZ(20px)' }} className="space-y-2.5 px-1">
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {article.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
            {article.description || "Ushbu ma'lumot bo'yicha qisqacha tavsif berilmagan."}
          </p>
        </div>
      </div>

      <div style={{ transform: 'translateZ(10px)' }} className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-xl shadow-md hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          O'qish
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}