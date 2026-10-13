'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

interface Article {
  source: { name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

export default function NewsCard({ article, index }: { article: Article; index: number }) {
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
        {/* Rasm va Neon Hover Effekti */}
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

        {/* Kontent */}
        <div style={{ transform: 'translateZ(20px)' }} className="space-y-2.5 px-1">
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {article.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
            {article.description || "Ushbu ma'lumot bo'yicha qisqacha tavsif berilmagan."}
          </p>
        </div>
      </div>

      {/* Footer */}
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