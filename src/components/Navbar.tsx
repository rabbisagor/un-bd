import React from 'react';
import { Compass, PlusCircle, Github, Globe, FileDown } from 'lucide-react';

interface NavbarProps {
  onOpenCreatePost: () => void;
  onOpenDeployModal: () => void;
  onOpenEcoModal: () => void;
  onResetFilters: () => void;
  onExportPosts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCreatePost,
  onOpenDeployModal,
  onOpenEcoModal,
  onResetFilters,
  onExportPosts,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Single text element Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={onResetFilters}
              className="group flex items-center gap-2.5 text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-emerald-700 transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-stone-900 tracking-tight group-hover:text-emerald-800 transition-colors block leading-tight">
                  অদেখা বাংলাদেশ
                </span>
                <span className="text-[10px] text-stone-500 font-medium tracking-wide">
                  UNSEEN BANGLADESH
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single line text) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={onResetFilters}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              সকল গন্তব্য
            </button>
            <button
              onClick={onOpenEcoModal}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              পরিবেশ ও নিরাপত্তা নীতি
            </button>
            <button
              onClick={onOpenDeployModal}
              className="flex items-center gap-1.5 text-emerald-800 font-semibold hover:text-emerald-950 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>গিটহাব ও ভার্সেল ডেপলয়</span>
            </button>
            <button
              onClick={onExportPosts}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors whitespace-nowrap cursor-pointer"
              title="সকল পোস্ট JSON ফাইলে ডাউনলোড করুন"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>ব্যাকআপ</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenDeployModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>Vercel Deploy</span>
            </button>

            <button
              onClick={onOpenCreatePost}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ ভ্রমণ পোস্ট করুন</span>
            </button>
          </div>

        </div>

        {/* Mobile secondary row */}
        <div className="md:hidden flex items-center justify-between border-t border-stone-100 py-2 text-xs">
          <button
            onClick={onResetFilters}
            className="text-stone-600 hover:text-stone-900 font-medium py-1 px-2"
          >
            সকল গন্তব্য
          </button>
          <button
            onClick={onOpenEcoModal}
            className="text-stone-600 hover:text-stone-900 font-medium py-1 px-2"
          >
            পরিবেশ নীতি
          </button>
          <button
            onClick={onOpenDeployModal}
            className="text-emerald-800 font-semibold py-1 px-2 flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            গিটহাব / ভার্সেল
          </button>
        </div>
      </div>
    </header>
  );
};
