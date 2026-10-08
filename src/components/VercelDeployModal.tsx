import React, { useState } from 'react';
import { X, Copy, Check, Github, Globe, Terminal, FileDown, CheckCircle2 } from 'lucide-react';
import { TravelPost } from '../types';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: TravelPost[];
  onExportPosts: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({
  isOpen,
  onClose,
  posts,
  onExportPosts,
}) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedVercelJson, setCopiedVercelJson] = useState(false);

  if (!isOpen) return null;

  const gitCommands = `git init
git add .
git commit -m "feat: initial commit for Unseen Bangladesh"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/unseen-bangladesh.git
git push -u origin main`;

  const vercelJsonContent = `{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(vercelJsonContent);
    setCopiedVercelJson(true);
    setTimeout(() => setCopiedVercelJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-20 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">
                গিটহাব ও ভার্সেল ডেপলয় গাইড (GitHub &amp; Vercel)
              </h2>
              <p className="text-xs text-stone-500">
                মাত্র ২ মিনিটে আপনার ওয়েবসাইটটি লাইভ করুন
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
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          
          {/* Step 1: Push to GitHub */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                ১
              </span>
              <h3 className="font-bold text-stone-900 text-sm">
                গিটহাবে কোড পুশ করুন (Push to GitHub)
              </h3>
            </div>
            <p className="text-stone-600 text-xs">
              আপনার গিটহাবে একটি নতুন রিপোজিটরি তৈরি করুন এবং নিচের কমান্ডগুলো টার্মিনালে পেস্ট করুন:
            </p>

            <div className="relative bg-stone-900 text-emerald-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
              <button
                onClick={handleCopyCmd}
                className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-white rounded text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'কপি হয়েছে' : 'কমান্ড কপি করুন'}</span>
              </button>
              <pre><code>{gitCommands}</code></pre>
            </div>
          </div>

          {/* Step 2: Deploy on Vercel */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                ২
              </span>
              <h3 className="font-bold text-stone-900 text-sm">
                ভার্সেলে ১-ক্লিকে ডেপলয় করুন (Deploy to Vercel)
              </h3>
            </div>
            
            <ol className="text-xs text-stone-700 space-y-2 list-decimal pl-5 leading-relaxed">
              <li>
                ব্রাউজারে <strong><a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-emerald-800 underline">vercel.com</a></strong> এ গিয়ে আপনার GitHub একাউন্ট দিয়ে লগইন করুন।
              </li>
              <li>
                <strong>'Add New Project'</strong> বাটনে ক্লিক করে আপনার <strong>unseen-bangladesh</strong> রিপোজিটরিটি বেছে নিন।
              </li>
              <li>
                ফ্রেমওয়ার্ক হিসেবে স্বয়ংক্রিয়ভাবে <strong>Vite</strong> সিলেক্ট থাকবে। সরাসরি <strong>'Deploy'</strong> বাটনে ক্লিক করুন।
              </li>
              <li>
                ১ মিনিটের মধ্যে সাইটটি লাইভ হয়ে যাবে এবং একটি ফ্রি <strong>.vercel.app</strong> লিংক পাবেন!
              </li>
            </ol>
          </div>

          {/* Step 3: vercel.json information */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>vercel.json কনফিগারেশন (প্রজেক্টে যুক্ত আছে)</span>
              </span>
              <button
                onClick={handleCopyJson}
                className="text-[11px] text-emerald-800 hover:text-emerald-950 font-semibold cursor-pointer"
              >
                {copiedVercelJson ? 'কপি হয়েছে!' : 'JSON কোড কপি'}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              সিঙ্গেল পেজ অ্যাপ্লিকেশন (SPA) রাউটিং এবং রিরাইট যেন কোনো ৪০৪ ত্রুটি না দেয়, সেজন্য প্রজেক্টের রুটে <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">vercel.json</code> ফাইলটি কনফিগার করে দেওয়া হয়েছে।
            </p>
          </div>

          {/* Backup data feature */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-100">
            <div>
              <span className="font-bold text-stone-900 text-xs block">
                আপনার পোস্টের ব্যাকআপ সংগ্রহ করুন
              </span>
              <span className="text-[11px] text-stone-500">
                বর্তমানে সংরক্ষিত {posts.length}টি পোস্টের JSON ব্যাকআপ ডাউনলোড করুন
              </span>
            </div>
            <button
              onClick={onExportPosts}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>JSON ব্যাকআপ নিন</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            বুঝেছি, বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
