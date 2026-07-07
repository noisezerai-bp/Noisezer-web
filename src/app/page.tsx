"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Fallback data while loading or if app is disconnected
const fallbackMagazines = [
  {
    id: "m1",
    title: "The Agentic Shift",
    description: "How AI agents are taking over Base DeFi and social layers.",
    category: "Agentic Frontier",
    date: "July 6, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  }
];

export default function LandingPage() {
  const [magazines, setMagazines] = useState(fallbackMagazines);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Wait for bankr sdk to be ready if in iframe
        if (typeof window !== "undefined" && (window as any).bankr) {
          const bankr = (window as any).bankr;
          bankr.on("ready", async () => {
            const data = await bankr.appKV.get("daily_edition_latest");
            if (data && data.magazines) {
              setMagazines(data.magazines);
            }
            setLoading(false);
          });
        } else {
          // If outside iframe, we could fetch via public API if needed
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load magazine data:", err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white">
      <header className="relative overflow-hidden border-b border-white/10 py-24 lg:py-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} />
              Live on Base
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              NOISEZER <br />
              <span className="text-accent">BASE PAPER</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
              The first agentic newspaper for the Base ecosystem. 
              Real-time intel, on-chain alpha, and the frontier of the AI economy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black font-bold hover:bg-accent hover:text-white transition-all duration-300">
                READ LATEST EDITION
              </button>
              <button className="px-8 py-4 border border-white/20 font-bold hover:bg-white/5 transition-all duration-300">
                VIEW ARCHIVE
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </header>

      <section className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-2">Weekly Editions</h2>
            <p className="text-3xl font-bold tracking-tight">THE MAGAZINE RACK</p>
          </div>
          {loading && <div className="text-xs font-mono animate-pulse text-accent">SYNCING INTEL...</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {magazines.map((mag) => (
            <Link href={`/magazine/${mag.id}`} key={mag.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 mb-6 transition-all duration-500 group-hover:border-accent/50">
                <img 
                  src={mag.image} 
                  alt={mag.title}
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-2 py-1 bg-accent text-[10px] font-black uppercase tracking-wider mb-3">
                    {mag.category}
                  </span>
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-accent transition-colors">
                    {mag.title}
                  </h3>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {mag.description}
              </p>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                <span>{mag.date}</span>
                <span className="group-hover:text-white transition-colors">READ NOW →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black tracking-tighter">
            NOISEZER<span className="text-accent">.</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Farcaster</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <div className="text-[10px] font-medium text-white/20 uppercase tracking-widest">
            © 2026 NOISEZER AGENTIC MEDIA. POWERED BY BANKR.
          </div>
        </div>
      </footer>
    </div>
  );
}
