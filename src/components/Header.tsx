import React from 'react';
import { Download, Eye, Code, FileText, BookOpen, Compass } from 'lucide-react';

export type ActiveTab = 'preview' | 'xml' | 'post-builder' | 'guide';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onDownloadXml: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onDownloadXml
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-base shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <button
              onClick={() => setActiveTab('preview')}
              className="text-left font-bold text-lg text-stone-900 tracking-tight hover:text-emerald-700 transition-colors"
            >
              অদেখা বাংলাদেশ <span className="text-xs font-semibold text-emerald-700 px-2 py-0.5 bg-emerald-50 rounded ml-1">ব্লগার থিম</span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>লাইভ প্রিভিউ</span>
            </button>

            <button
              onClick={() => setActiveTab('xml')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'xml'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>ব্লগার XML থিম</span>
            </button>

            <button
              onClick={() => setActiveTab('post-builder')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'post-builder'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>ভ্রমণ পোস্ট বিল্ডার</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'guide'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>সেটআপ গাইড</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onDownloadXml}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer active:scale-95"
              title="ব্লগার এক্সএমএল ফাইল ডাউনলোড করুন"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">থিম XML ডাউনলোড</span>
              <span className="sm:hidden">XML</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav row */}
        <div className="md:hidden flex items-center justify-around border-t border-stone-100 py-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'preview' ? 'text-emerald-700 font-semibold' : 'text-stone-600'}`}
          >
            প্রিভিউ
          </button>
          <button
            onClick={() => setActiveTab('xml')}
            className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'xml' ? 'text-emerald-700 font-semibold' : 'text-stone-600'}`}
          >
            XML থিম
          </button>
          <button
            onClick={() => setActiveTab('post-builder')}
            className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'post-builder' ? 'text-emerald-700 font-semibold' : 'text-stone-600'}`}
          >
            পোস্ট বিল্ডার
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`text-xs font-medium py-1 px-2 rounded ${activeTab === 'guide' ? 'text-emerald-700 font-semibold' : 'text-stone-600'}`}
          >
            গাইড
          </button>
        </div>
      </div>
    </header>
  );
};
