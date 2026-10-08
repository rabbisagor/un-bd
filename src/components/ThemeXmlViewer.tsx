import React, { useState, useMemo } from 'react';
import { generateBloggerXml, DEFAULT_THEME_CONFIG, ThemeConfig } from '../utils/bloggerThemeXml';
import { Download, Copy, Check, Sliders, Code2, Sparkles, AlertCircle } from 'lucide-react';

interface ThemeXmlViewerProps {
  onDownload: () => void;
}

export const ThemeXmlViewer: React.FC<ThemeXmlViewerProps> = ({ onDownload }) => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'customize'>('customize');

  const xmlCode = useMemo(() => {
    return generateBloggerXml(config);
  }, [config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const colorPresets = [
    { name: 'সুন্দরবন পান্না সবুজ (Emerald)', primary: '#059669', accent: '#d97706' },
    { name: 'পাহাড়ের গোধূলি কমলা (Sunset)', primary: '#ea580c', accent: '#0284c7' },
    { name: 'মেঘালয় ও নীল নদী (Ocean Blue)', primary: '#0284c7', accent: '#059669' },
    { name: 'টেরাকোটা মাটির রঙ (Terracotta)', primary: '#b45309', accent: '#047857' },
    { name: 'গভীর অরণ্য (Deep Forest)', primary: '#15803d', accent: '#b45309' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Actions */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>১০০% ভ্যালিড ব্লগার (Blogspot) এক্সএমএল থিম</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
              অদেখা বাংলাদেশ ব্লগার থিম ইঞ্জিন
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              এই থিমটি আপনার Google Blogger ব্লগে মুহূর্তের মধ্যে ইনস্টল করতে পারবেন। এটি মোবাইল ও ডেস্কটপে দ্রুত লোড হয় এবং এতে ট্রাভেল ব্লগের জন্য বিশেষ স্টাইলিং ও বাংলা ফন্ট অন্তর্ভুক্ত রয়েছে।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কোড কপি হয়েছে!' : 'সম্পূর্ণ XML কপি করুন'}</span>
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>.xml ফাইল ডাউনলোড করুন</span>
            </button>
          </div>
        </div>

        {/* Highlight features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>হিন্দ শিলিগুড়ি বাংলা ফন্ট</span>
          </div>
          <div className="flex items-center gap-2 text-stone-700">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>মোবাইল রেসপনসিভ গ্রিড</span>
          </div>
          <div className="flex items-center gap-2 text-stone-700">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>ইনবিল্ট ট্রাভেল আইটিনারি স্টাইল</span>
          </div>
          <div className="flex items-center gap-2 text-stone-700">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>অ্যাডসেন্স ও এসইও অপটিমাইজড</span>
          </div>
        </div>
      </div>

      {/* Tabs: Customizer vs Raw XML Code */}
      <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('customize')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'customize'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>থিম কাস্টমাইজেশন</span>
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'code'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>XML কোড ভিউয়ার</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'customize' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Customizer settings */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 space-y-6">
            <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-700" />
              আপনার ব্লগের তথ্য ও সেটিংস
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ব্লগের নাম (Blog Title)
                </label>
                <input
                  type="text"
                  value={config.blogName}
                  onChange={(e) => setConfig({ ...config, blogName: e.target.value })}
                  placeholder="যেমন: অদেখা বাংলাদেশ"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ফেসবুক পেজ লিঙ্ক (Facebook URL)
                </label>
                <input
                  type="text"
                  value={config.facebookUrl}
                  onChange={(e) => setConfig({ ...config, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                ব্লগের বিবরণ / স্লোগান (Description)
              </label>
              <textarea
                rows={2}
                value={config.blogDescription}
                onChange={(e) => setConfig({ ...config, blogDescription: e.target.value })}
                placeholder="ব্লগের উদ্দেশ্য ও স্লোগান লিখুন..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Color Palette Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                থিমের প্রধান কালার প্যালেট (Theme Color Theme)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {colorPresets.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => setConfig({ ...config, primaryColor: preset.primary, accentColor: preset.accent })}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      config.primaryColor === preset.primary
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <span className="text-xs font-medium text-stone-800">{preset.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full border border-stone-300" style={{ backgroundColor: preset.primary }} />
                      <span className="w-5 h-5 rounded-full border border-stone-300" style={{ backgroundColor: preset.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ইনস্টাগ্রাম লিঙ্ক (Instagram URL)
                </label>
                <input
                  type="text"
                  value={config.instagramUrl}
                  onChange={(e) => setConfig({ ...config, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ইউটিউব চ্যানেল লিঙ্ক (YouTube URL)
                </label>
                <input
                  type="text"
                  value={config.youtubeUrl}
                  onChange={(e) => setConfig({ ...config, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Quick instructions sidebar */}
          <div className="space-y-6">
            <div className="bg-emerald-900 text-white p-6 rounded-xl shadow-sm">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <span>🚀</span> দ্রুত ইনস্টল করার ধাপ
              </h3>
              <ol className="text-xs text-emerald-100 space-y-3 leading-relaxed list-decimal pl-4">
                <li>
                  প্রথমে ওপরের <strong>'.xml ফাইল ডাউনলোড করুন'</strong> বাটনে ক্লিক করে ফাইলটি সেভ করুন।
                </li>
                <li>
                  আপনার <strong>Blogger.com</strong> ড্যাশবোর্ডে গিয়ে বামের মেন্যু থেকে <strong>'Theme'</strong> এ যান।
                </li>
                <li>
                  'Customize' বাটনের পাশের <strong>ড্রপডাউন তীরে</strong> ক্লিক করে <strong>'Restore'</strong> সিলেক্ট করুন।
                </li>
                <li>
                  ডাউনলোড করা <strong>unseen-bangladesh-theme.xml</strong> ফাইলটি আপলোড করলেই কাজ সম্পন্ন!
                </li>
              </ol>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-xs text-amber-900">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-1">গুরুত্বপূর্ণ টিপস:</strong>
                  ব্লগারে নতুন থিম ইনস্টল করার আগে আপনার পুরনো থিমটির ব্যাকআপ (Backup) ডাউনলোড করে রাখা বুদ্ধিমানের কাজ।
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Raw XML Code Tab */
        <div className="bg-stone-900 rounded-xl overflow-hidden border border-stone-800 shadow-xl">
          <div className="bg-stone-950 px-4 py-3 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>unseen-bangladesh-theme.xml</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কোড কপি'}</span>
            </button>
          </div>
          <pre className="p-4 sm:p-6 text-xs text-emerald-300 font-mono overflow-x-auto max-h-[600px] leading-relaxed">
            <code>{xmlCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
