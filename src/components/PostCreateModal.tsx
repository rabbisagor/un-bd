import React, { useState } from 'react';
import { TravelPost, TravelItineraryItem } from '../types';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';

interface PostCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePost: (post: TravelPost) => void;
}

const PHOTO_PRESETS = [
  {
    name: 'পাহাড় ও মেঘ (সাজেক)',
    url: '/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg',
  },
  {
    name: 'টাঙ্গুয়ার হাওর (সিলেট)',
    url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=1200&q=80',
  },
  {
    name: 'নাফাখুম জলপ্রপাত (বান্দরবান)',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
  },
  {
    name: 'সুন্দরবন ম্যানগ্রোভ (খুলনা)',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
  },
  {
    name: 'কান্তজিউ টেরাকোটা (দিনাজপুর)',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
  },
  {
    name: 'ভাসমান পেয়ারা হাট (বরিশাল)',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
  },
];

export const PostCreateModal: React.FC<PostCreateModalProps> = ({
  isOpen,
  onClose,
  onSavePost,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [division, setDivision] = useState<TravelPost['division']>('চট্টগ্রাম');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState<TravelPost['category']>('পাহাড় ও ঝরনা');
  const [difficulty, setDifficulty] = useState<TravelPost['difficulty']>('সহজ');
  const [bestSeason, setBestSeason] = useState('বর্ষা ও শরৎ (জুলাই - নভেম্বর)');
  const [duration, setDuration] = useState('২ দিন / ১ রাত');
  const [budgetEst, setBudgetEst] = useState('৪,০০০ - ৬,০০০ টাকা');
  const [featuredImage, setFeaturedImage] = useState(PHOTO_PRESETS[0].url);
  const [summary, setSummary] = useState('');
  const [authorName, setAuthorName] = useState('ভ্রমণপিপাসু');
  
  const [itinerary, setItinerary] = useState<TravelItineraryItem[]>([
    { day: '১ম দিন', title: 'গন্তব্যে পৌঁছানো ও লোকাল সাইটসিয়িং', desc: 'সকালে পৌঁছে চেক-ইন ও চারপাশের মনোরম পরিবেশ উপভোগ।' },
    { day: '২য় দিন', title: 'প্রধান আকর্ষণ দর্শন ও ফিরতি যাত্রা', desc: 'ভোরে আকর্ষণীয় পয়েন্ট ভ্রমণ ও স্মৃতি নিয়ে বাড়ির পথে রওনা।' },
  ]);

  const [howToGo, setHowToGo] = useState('ঢাকা থেকে বাসে সরাসরি জেলা শহরে যান।\nসেখান থেকে লোকাল জিপ বা সিএনজি নিয়ে নির্দিষ্ট স্পটে পৌঁছান।');
  const [stayAndFood, setStayAndFood] = useState('নিকটস্থ পর্যটন মোটেল বা স্থানীয় রিসোর্টে রাত্রিযাপন করুন।\nএলাকার ঐতিহ্যবাহী পাহাড়ি/নদীমাতৃক তাজা খাবার উপভোগ করুন।');
  const [tipsAndRules, setTipsAndRules] = useState('পাহাড়ে বা নদীতে অপচনশীল প্লাস্টিক ফেলবেন না।\nস্থানীয় সংস্কৃতি ও মানুষের প্রতি বিনম্র শ্রদ্ধা রাখুন।\nজরুরি ট্যুরিস্ট পুলিশ হেল্পলাইন: ০১৩২০-২২২২২২');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFeaturedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItineraryDay = () => {
    setItinerary([
      ...itinerary,
      {
        day: `${itinerary.length + 1}ম দিন`,
        title: '',
        desc: '',
      },
    ]);
  };

  const handleRemoveItineraryDay = (index: number) => {
    const next = [...itinerary];
    next.splice(index, 1);
    setItinerary(next);
  };

  const handleUpdateItinerary = (index: number, field: 'title' | 'desc', val: string) => {
    const next = [...itinerary];
    next[index][field] = val;
    setItinerary(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('অনুগ্রহ করে শিরোনাম ও সংক্ষিপ্ত বিবরণ লিখুন!');
      return;
    }

    const newPost: TravelPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `${district} ভ্রমণের সম্পূর্ণ অভিজ্ঞতা ও রুট গাইড`,
      division,
      district: district.trim() || division,
      category,
      difficulty,
      bestSeason,
      duration,
      budgetEst,
      featuredImage: featuredImage || PHOTO_PRESETS[0].url,
      readTime: '৫ মিনিট',
      publishedDate: 'আজকে',
      author: {
        name: authorName.trim() || 'ভ্রমণকারী',
        role: 'কমিউনিটি এক্সপ্লোরার',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`,
      },
      summary: summary.trim(),
      itinerary: itinerary.filter((i) => i.title.trim()),
      howToGo: howToGo.split('\n').filter((l) => l.trim()),
      stayAndFood: stayAndFood.split('\n').filter((l) => l.trim()),
      tipsAndRules: tipsAndRules.split('\n').filter((l) => l.trim()),
      isUserCreated: true,
    };

    onSavePost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs z-20 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">
                নতুন ভ্রমণ ব্লগ পোস্ট প্রকাশ করুন
              </h2>
              <p className="text-xs text-stone-500">
                আপনার অভিজ্ঞতার গল্প ও ট্রাভেল গাইড শেয়ার করুন
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          
          {/* Post Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1.5">
              পোস্টের শিরোনাম (Post Title) *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: মায়াবী সাজেক ভ্যালির অপার্থিব সূর্যোদয় ও মেঘের ভেলা..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-700 font-semibold text-stone-900"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1.5">
              উপ-শিরোনাম / সংক্ষিপ্ত হাইলাইট (Subtitle)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="যেমন: রাঙামাটির বাঘাইছড়িতে পাহাড়ের চূড়ায় ২ দিন কাটানোর পূর্ণাঙ্গ অভিজ্ঞতা..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-700"
            />
          </div>

          {/* Division, District, Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                বিভাগ (Division)
              </label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value as TravelPost['division'])}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-700"
              >
                {['চট্টগ্রাম', 'সিলেট', 'বরিশাল', 'খুলনা', 'রাজশাহী', 'রংপুর', 'ময়মনসিংহ', 'ঢাকা'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                জেলা ও উপজেলা (Location)
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="যেমন: রাঙামাটি / থানচি / তাহিরপুর"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                ক্যাটাগরি (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TravelPost['category'])}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-700"
              >
                {['পাহাড় ও ঝরনা', 'হাওর ও নদী', 'ম্যানগ্রোভ ও বন্যপ্রাণী', 'হেরিটেজ ও ইতিহাস', 'দ্বীপ ও উপকূল', 'অফবিট গ্রাম'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                ভ্রমণের সেরা সময়
              </label>
              <input
                type="text"
                value={bestSeason}
                onChange={(e) => setBestSeason(e.target.value)}
                placeholder="যেমন: জুলাই - নভেম্বর"
                className="w-full px-3 py-2 rounded-lg border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                আনুমানিক বাজেট
              </label>
              <input
                type="text"
                value={budgetEst}
                onChange={(e) => setBudgetEst(e.target.value)}
                placeholder="যেমন: ৪,৫০০ - ৬,০০০ টাকা"
                className="w-full px-3 py-2 rounded-lg border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                ডিফিকাল্টি মাত্রা
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as TravelPost['difficulty'])}
                className="w-full px-3 py-2 rounded-lg border border-stone-300"
              >
                <option value="সহজ">সহজ (ফ্যামিলি ফ্রেন্ডলি)</option>
                <option value="মাঝারি">মাঝারি</option>
                <option value="অ্যাডভেঞ্চার / ট্র্যাকিং">অ্যাডভেঞ্চার / ট্র্যাকিং</option>
              </select>
            </div>
          </div>

          {/* Featured Image selection */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <label className="block text-xs font-semibold text-stone-800 mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-emerald-800" />
              <span>ফিচার্ড ছবি নির্বাচন (Featured Photo)</span>
            </label>

            {/* Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {PHOTO_PRESETS.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFeaturedImage(p.url)}
                  className={`text-left p-2 rounded-lg border text-[11px] transition-all flex items-center gap-2 cursor-pointer ${
                    featuredImage === p.url
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <img src={p.url} alt={p.name} className="w-6 h-6 rounded object-cover" />
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="অথবা সরাসরি ছবির লিঙ্ক (Image URL) দিন..."
                className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
              />
              <label className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-xs font-medium cursor-pointer shrink-0 flex items-center justify-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>কম্পিউটার থেকে ছবি আপলোড</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Summary / Story */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1.5">
              ভ্রমণ কাহিনী ও ভূমিকা (Travel Story & Overview) *
            </label>
            <textarea
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="এই স্থানটিতে ভ্রমণের অনুভূতি, প্রকৃতি, স্থানীয় পরিবেশ ও অভিজ্ঞতার কথা বিস্তারিত লিখুন..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-700 text-stone-900 leading-relaxed"
              required
            />
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-stone-800">
                দিনভিত্তিক ভ্রমণ পরিকল্পনা (Day-by-Day Itinerary)
              </label>
              <button
                type="button"
                onClick={handleAddItineraryDay}
                className="flex items-center gap-1 text-xs text-emerald-800 font-semibold hover:text-emerald-950 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন দিন যোগ করুন</span>
              </button>
            </div>

            <div className="space-y-3">
              {itinerary.map((item, idx) => (
                <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-800">{item.day}</span>
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryDay(idx)}
                        className="text-stone-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateItinerary(idx, 'title', e.target.value)}
                    placeholder="দিনের শিরোনাম (যেমন: পাহাড়ে সূর্যোদয় দর্শন ও ট্র্যাকিং)"
                    className="w-full text-xs px-3 py-1.5 mb-2 rounded border border-stone-300 bg-white"
                  />
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => handleUpdateItinerary(idx, 'desc', e.target.value)}
                    placeholder="দিনের পূর্ণ বিবরণ..."
                    className="w-full text-xs px-3 py-1.5 rounded border border-stone-300 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Route & Transport */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1.5">
              কীভাবে যাবেন (যাতায়াত ও রুট ডিরেকশন - প্রতি লাইনে একটি ধাপ)
            </label>
            <textarea
              rows={3}
              value={howToGo}
              onChange={(e) => setHowToGo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900"
            />
          </div>

          {/* Stay and Food */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                কোথায় থাকবেন ও খাবেন
              </label>
              <textarea
                rows={3}
                value={stayAndFood}
                onChange={(e) => setStayAndFood(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                পরিবেশ রক্ষা ও সতর্কতা
              </label>
              <textarea
                rows={3}
                value={tipsAndRules}
                onChange={(e) => setTipsAndRules(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-stone-900"
              />
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1.5">
              লেখকের নাম (Author Name)
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="আপনার নাম..."
              className="w-full max-w-xs px-3 py-2 rounded-lg border border-stone-300"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
            >
              পোস্ট প্রকাশ করুন
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
