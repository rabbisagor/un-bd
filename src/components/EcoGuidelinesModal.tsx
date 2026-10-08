import React from 'react';
import { X, ShieldCheck, Heart, PhoneCall, AlertTriangle } from 'lucide-react';

interface EcoGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EcoGuidelinesModal: React.FC<EcoGuidelinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-20 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">
                দায়িত্বশীল ভ্রমণ ও পরিবেশ রক্ষা নীতি
              </h2>
              <p className="text-xs text-stone-500">
                Leave No Trace — প্রকৃতির ভারসাম্য বজায় রাখার অঙ্গীকার
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <Heart className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-950 font-bold mb-1">
                "শুধু পদচিহ্ন রেখে আসুন, আর সঙ্গে নিয়ে আসুন স্মৃতি"
              </strong>
              <p className="text-emerald-900 text-xs">
                বাংলাদেশের পাহাড়, হাওর, বন ও নদী আমাদের অমূল্য জাতীয় সম্পদ। আমাদের অসচেতনতায় যেন কোনো প্রাকৃতিক আবাসস্থল ক্ষতিগ্রস্ত না হয়।
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">
              মৌলিক ৭টি পরিবেশ নীতি (Core Principles):
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold flex items-center justify-center shrink-0">১</span>
                <div>
                  <strong className="text-stone-900">প্লাস্টিক বর্জন ও বর্জ্য ব্যবস্থাপনা:</strong>
                  <p className="text-stone-600 text-xs">পাহাড়ে বা হাওরে চিপসের প্যাকেট, পানির বোতল বা অপচনশীল কোনো ময়লা ফেলবেন না। নিজের বর্জ্য ব্যাগে করে শহরে ফিরিয়ে আনুন।</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold flex items-center justify-center shrink-0">২</span>
                <div>
                  <strong className="text-stone-900">স্থানীয় সংস্কৃতির প্রতি সম্মান:</strong>
                  <p className="text-stone-600 text-xs">পার্বত্য চট্টগ্রামের আদিবাসী মারমা, চাকমা, ত্রিপুরা ও মুরং জনগোষ্ঠীর আচার ও সংস্কৃতির প্রতি শ্রদ্ধাশীল থাকুন। অনুমতি ছাড়া কারও ছবি তুলবেন না।</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold flex items-center justify-center shrink-0">৩</span>
                <div>
                  <strong className="text-stone-900">শব্দদূষণ প্রতিরোধ:</strong>
                  <p className="text-stone-600 text-xs">প্রকৃতির নীরবতা বজায় রাখুন। বনে ও হাওরে উচ্চ শব্দে সাউন্ডবক্স বাজানো থেকে সম্পূর্ণ বিরত থাকুন।</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold flex items-center justify-center shrink-0">৪</span>
                <div>
                  <strong className="text-stone-900">লাইফ জ্যাকেট ব্যবহার:</strong>
                  <p className="text-stone-600 text-xs">হাওরে নৌকায় চলাচলের সময় বা সাঙ্গু নদীতে ভ্রমণের সময় সবসময় লাইফ জ্যাকেট পরিধান করুন।</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency contacts */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-bold text-amber-950 text-xs flex items-center gap-2 mb-2">
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span>জরুরি ট্রাভেল হেল্পলাইন ও যোগাযোগ:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900">
              <div>• বাংলাদেশ ট্যুরিস্ট পুলিশ: <strong>০১৩২০-২২২২২২</strong></div>
              <div>• জাতীয় জরুরি সেবা: <strong>৯৯৯</strong></div>
              <div>• রেড ক্রিসেন্ট হেল্পলাইন: <strong>০২-৪৯৩৫১১৮১</strong></div>
              <div>• বন অধিদপ্তর কন্ট্রোল রুম: <strong>০২-৮১৮১৭৮৮</strong></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            ধন্যবাদ, বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
