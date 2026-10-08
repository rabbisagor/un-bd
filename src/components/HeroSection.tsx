import React from 'react';
import { Search, MapPin, Compass } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExploreClick: () => void;
  onOpenCreatePost: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onExploreClick,
  onOpenCreatePost,
}) => {
  return (
    <div className="relative bg-stone-900 text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      {/* Background with real generated landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg"
          alt="Unseen Bangladesh Landscape"
          className="w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Natural Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-300 text-xs font-semibold mb-4 backdrop-blur-xs">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>অদেখা বাংলাদেশ এক্সপ্লোরার কালেক্টিভ</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight sm:leading-tight">
          প্রকৃতির আদিম রূপ ও অচেনা জনপদের গল্প
        </h1>

        <p className="text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          মেঘে ঢাকা পাহাড়ের চূড়া, হাওরের শান্ত জলরাশি, গহীন সুন্দরবনের ম্যানগ্রোভ খাল আর শতবর্ষী মাটির স্থাপত্য। নিখুঁত রুট ম্যাপ, বাজেট ও পরিবেশবান্ধব ভ্রমণ নির্দেশিকা।
        </p>

        {/* Search Input Box */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/20 shadow-lg focus-within:border-emerald-400 focus-within:bg-white/20 transition-all">
            <Search className="w-5 h-5 text-emerald-300 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="গন্তব্য, জেলা বা আকর্ষণ খুঁজুন (যেমন: সাজেক, নাফাখুম, টাঙ্গুয়ার হাওর)..."
              className="w-full text-xs sm:text-sm px-3 py-2 bg-transparent text-white placeholder-stone-300 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
          >
            গন্তব্যগুলো দেখুন
          </button>
          <button
            onClick={onOpenCreatePost}
            className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-medium rounded-lg backdrop-blur-xs border border-white/20 transition-colors cursor-pointer"
          >
            + আপনার ভ্রমণ ডায়েরি লিখুন
          </button>
        </div>

        {/* Minimal metrics row */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12 pt-8 border-t border-white/10 text-xs sm:text-sm text-stone-300">
          <div>
            <span className="block text-lg sm:text-2xl font-extrabold text-emerald-400 tabular-nums">৮টি</span>
            <span className="text-[11px] text-stone-400">বিভাগীয় গন্তব্য</span>
          </div>
          <div>
            <span className="block text-lg sm:text-2xl font-extrabold text-emerald-400 tabular-nums">১০০%</span>
            <span className="text-[11px] text-stone-400">যাচাইকৃত রুট গাইড</span>
          </div>
          <div>
            <span className="block text-lg sm:text-2xl font-extrabold text-emerald-400 tabular-nums">ইকো</span>
            <span className="text-[11px] text-stone-400">পরিবেশবান্ধব ভ্রমণ</span>
          </div>
        </div>

      </div>
    </div>
  );
};
