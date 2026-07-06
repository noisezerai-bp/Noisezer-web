"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Download, Share2 } from "lucide-react";
import Link from "next/link";

export default function MagazineViewer({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const pages = [
    { type: "cover", title: "THE AGENTIC SHIFT", subtitle: "ISSUE #01", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" },
    { type: "content", title: "Editorial", body: "The transition from human-led to agent-led liquidity is no longer a prediction. It is the current state of Base." },
    { type: "content", title: "Market Intel", body: "USDC inflows have hit a record high this week, signaling a massive rotation into agent-managed vaults." },
    { type: "back", title: "NOISEZER", subtitle: "END OF ISSUE" }
  ];

  const next = () => setCurrentPage((p) => Math.min(pages.length - 1, p + 1));
  const prev = () => setCurrentPage((p) => Math.max(0, p - 1));

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col">
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={20} />
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">
            Issue #01: The Agentic Shift
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Share2 size={18} /></button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Download size={18} /></button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-4 lg:p-12">
        <div className="relative w-full max-w-4xl aspect-[3/4] bg-white text-black shadow-2xl overflow-hidden transition-all duration-500">
          {pages[currentPage].type === "cover" ? (
            <div className="h-full relative">
              <img src={pages[currentPage].image} className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">{pages[currentPage].title}</h1>
                <p className="text-xl font-bold tracking-[0.3em] opacity-60">{pages[currentPage].subtitle}</p>
              </div>
            </div>
          ) : (
            <div className="h-full p-16 flex flex-col justify-center">
              <h2 className="text-4xl font-black tracking-tighter mb-8 uppercase border-b-4 border-black pb-4 inline-block">
                {pages[currentPage].title}
              </h2>
              <p className="text-2xl leading-relaxed font-serif italic text-black/80">
                "{pages[currentPage].body}"
              </p>
            </div>
          )}
          
          <div className="absolute bottom-6 right-8 text-[10px] font-bold tracking-widest opacity-30">
            PAGE {currentPage + 1} / {pages.length}
          </div>
        </div>

        <button 
          onClick={prev}
          disabled={currentPage === 0}
          className="absolute left-4 lg:left-8 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-0"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={next}
          disabled={currentPage === pages.length - 1}
          className="absolute right-4 lg:right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-0"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}