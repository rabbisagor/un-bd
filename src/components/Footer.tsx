import React from 'react';
import { Compass, Github, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onOpenDeployModal: () => void;
  onOpenEcoModal: () => void;
  onSelectDivision: (div: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDeployModal,
  onOpenEcoModal,
  onSelectDivision,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-md bg-emerald-700 flex items-center justify-center font-bold text-sm">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">অদেখা বাংলাদেশ</span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              বাংলাদেশের অচেনা প্রাকৃতিক সৌন্দর্য, আদিবাসী জীবনধারা ও নদীমাতৃক জনপদ সকলের সামনে দায়িত্বশীলভাবে তুলে ধরার একটি উন্মুক্ত ভ্রমণ প্রকাশনা।
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs">
              <button
                onClick={onOpenDeployModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md transition-colors cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub &amp; Vercel Ready</span>
              </button>
            </div>
          </div>

          {/* Division links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              বিভাগ অনুযায়ী ভ্রমণ
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {['চট্টগ্রাম', 'সিলেট', 'বরিশাল', 'খুলনা', 'রাজশাহী', 'রংপুর', 'ময়মনসিংহ', 'ঢাকা'].map((div) => (
                <button
                  key={div}
                  onClick={() => onSelectDivision(div)}
                  className="text-left text-stone-400 hover:text-emerald-400 transition-colors py-0.5 cursor-pointer"
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          {/* Important guidelines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <button
                  onClick={onOpenEcoModal}
                  className="hover:text-emerald-400 text-left transition-colors cursor-pointer"
                >
                  পরিবেশ ও নিরাপত্তা নীতি
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeployModal}
                  className="hover:text-emerald-400 text-left transition-colors cursor-pointer"
                >
                  ভার্সেল ডেপলয় নির্দেশিকা
                </button>
              </li>
              <li className="text-stone-500 pt-1">
                ট্যুরিস্ট পুলিশ: <strong>০১৩২০-২২২২২২</strong>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <span>© ২০২৬ অদেখা বাংলাদেশ · Unseen Bangladesh</span>
          </div>
          <div className="flex items-center gap-1">
            <span>নির্মিত হয়েছে প্রকৃতির প্রতি ভালোবাসায়</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
