import React from 'react';
import { 
  Download, 
  Settings, 
  Upload, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  Smartphone,
  Tag,
  ShieldCheck
} from 'lucide-react';

interface SetupGuideProps {
  onDownloadXml: () => void;
  onOpenPostBuilder: () => void;
}

export const SetupGuide: React.FC<SetupGuideProps> = ({
  onDownloadXml,
  onOpenPostBuilder
}) => {
  const steps = [
    {
      num: '১',
      title: 'থিম XML ফাইলটি ডাউনলোড করুন',
      desc: 'আমাদের অ্যাপের "XML ডাউনলোড" বাটনে ক্লিক করে unseen-bangladesh-theme.xml ফাইলটি আপনার কম্পিউটার বা মোবাইলে সেভ করে নিন।',
      icon: Download,
      actionText: 'XML ফাইল ডাউনলোড করুন',
      action: onDownloadXml
    },
    {
      num: '২',
      title: 'ব্লগার (Blogger.com) এ লগইন করুন',
      desc: 'আপনার ব্রাউজারে blogger.com এ যান এবং আপনার Google একাউন্ট দিয়ে লগইন করে আপনার ট্রাভেল ব্লগটি সিলেক্ট করুন।',
      icon: ExternalLink,
      link: 'https://blogger.com'
    },
    {
      num: '৩',
      title: 'থিম (Theme) মেন্যুতে প্রবেশ করুন',
      desc: 'ব্লগার ড্যাশবোর্ডের বাম পাশের প্রধান মেন্যু থেকে "Theme" (থিম) অপশনে ক্লিক করুন।',
      icon: Settings
    },
    {
      num: '৪',
      title: 'Restore (পুনরুদ্ধার) অপশন নির্বাচন করুন',
      desc: 'কমলা রঙের "Customize" বাটনের ঠিক পাশে একটি ছোট ড্রপডাউন তীর চিহ্ন (▼) দেখতে পাবেন। সেখানে ক্লিক করে "Restore" (পুনরুদ্ধার) অপশনটি বেছে নিন।',
      icon: Upload
    },
    {
      num: '৫',
      title: 'XML ফাইলটি আপলোড করুন',
      desc: 'পপআপ বক্সে "Upload" এ ক্লিক করুন এবং আপনার ডাউনলোড করা unseen-bangladesh-theme.xml ফাইলটি সিলেক্ট করে আপলোড করে দিন। কয়েক সেকেন্ডের মধ্যে থিম সক্রিয় হয়ে যাবে!',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          সহজ টিউটোরিয়াল
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">
          ব্লগারে (Blogger.com) থিম সেটআপ করার নিয়মাবলী
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          মাত্র ৫টি সহজ ধাপে আপনার ব্লগে "অদেখা বাংলাদেশ" এর আধুনিক, মোবাইল রেসপনসিভ ও বাংলা ফন্ট সমৃদ্ধ ট্রাভেল থিম যুক্ত করুন।
        </p>
      </div>

      {/* Step by step cards */}
      <div className="space-y-6 mb-16">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs hover:border-emerald-600 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1 flex items-center gap-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </div>

              {step.action && (
                <button
                  onClick={step.action}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer"
                >
                  {step.actionText}
                </button>
              )}

              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors"
                >
                  <span>ব্লগারে যান</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Pro-Tips & Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Mobile View Config */}
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-2">
            ১. মোবাইল ভিউ ঠিক রাখা (Responsive Setup)
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            ব্লগারের ডিফল্ট মোবাইল ভিউ যেন আমাদের নতুন থিমকে বিকৃত না করে, সেজন্য:
          </p>
          <ul className="text-xs text-stone-700 space-y-2 list-disc pl-4">
            <li>Blogger &gt; Theme &gt; Customize এর পাশে ক্লিক করুন।</li>
            <li><strong>'Mobile settings' (মোবাইল সেটিংস)</strong> এ যান।</li>
            <li>সেখানে <strong>'Desktop'</strong> সিলেক্ট করে সেভ করুন। এতে আমাদের আধুনিক রেসপনসিভ CSS মোবাইলেও নিখুঁতভাবে প্রদর্শিত হবে।</li>
          </ul>
        </div>

        {/* Labels & Menu Setup */}
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
            <Tag className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-2">
            ২. বিভাগ অনুযায়ী পোস্ট সাজানো (Labels)
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            মেন্যুতে বিভাগভিত্তিক (চট্টগ্রাম, সিলেট, খুলনা ইত্যাদি) ক্লিক করলে স্বয়ংক্রিয়ভাবে ফিল্টার হওয়ার জন্য:
          </p>
          <ul className="text-xs text-stone-700 space-y-2 list-disc pl-4">
            <li>পোস্ট লেখার সময় ডানপাশের <strong>'Labels'</strong> বক্সে বিভাগের নাম লিখুন (যেমন: <code className="bg-stone-100 px-1 py-0.5 rounded text-emerald-700">চট্টগ্রাম</code>)।</li>
            <li>থিমটিতে স্বয়ংক্রিয়ভাবে <code className="bg-stone-100 px-1 py-0.5 rounded text-emerald-700">/search/label/চট্টগ্রাম</code> লিঙ্ক যুক্ত করা রয়েছে।</li>
          </ul>
        </div>

      </div>

      {/* CTA Box */}
      <div className="bg-emerald-900 text-white rounded-2xl p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-3">
          আপনার প্রথম ভ্রমণ পোস্টটি তৈরি করতে প্রস্তুত?
        </h2>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto mb-6">
          আমাদের ভ্রমণ পোস্ট বিল্ডার ব্যবহার করে দিনভিত্তিক ভ্রমণ প্ল্যান, রুট ডিরেকশন ও খরচের হিসাব সহ আকর্ষণীয় পোস্ট তৈরি করুন।
        </p>
        <button
          onClick={onOpenPostBuilder}
          className="px-6 py-3 bg-white text-emerald-950 font-bold text-xs sm:text-sm rounded-lg hover:bg-emerald-50 transition-colors shadow-sm cursor-pointer"
        >
          পোস্ট বিল্ডার খুলুন →
        </button>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-stone-900 mb-6 text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          সাধারণ জিজ্ঞাসা (FAQ)
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <h4 className="text-sm font-bold text-stone-900 mb-1">
              প্রশ্ন: আমি কি এই থিম দিয়ে গুগল অ্যাডসেন্স (AdSense) থেকে আয় করতে পারব?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              উত্তর: হ্যাঁ, অবশ্যই! এই থিমটি ১০০% গুগল অ্যাডসেন্স ফ্রেন্ডলি এবং এর সাইডবার ও পোস্টের ভেতর বিজ্ঞাপন বসানোর উপযুক্ত জায়গা রয়েছে।
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <h4 className="text-sm font-bold text-stone-900 mb-1">
              প্রশ্ন: আমার ব্লগের জন্য কাস্টম ডোমেইন (যেমন: mytravelbd.com) কীভাবে যুক্ত করব?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              উত্তর: ব্লগার ড্যাশবোর্ডের Settings &gt; Publishing &gt; Custom domain এ গিয়ে আপনার কেনা ডোমেইনটি যুক্ত করতে পারবেন সম্পূর্ণ বিনামূল্যে।
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5">
            <h4 className="text-sm font-bold text-stone-900 mb-1">
              প্রশ্ন: থিমের ফন্ট কি যেকোনো ডিভাইসে স্পষ্ট দেখাবে?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              উত্তর: হ্যাঁ, এই থিমে স্বয়ংক্রিয়ভাবে গুগলের 'Hind Siliguri' বাংলা ফন্ট যুক্ত করা হয়েছে, যা সকল মোবাইল, ট্যাবলেট ও কম্পিউটারে অত্যন্ত স্পষ্ট এবং আকর্ষণীয়ভাবে লোড হয়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
