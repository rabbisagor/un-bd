import React, { useState } from 'react';
import { generatePostBloggerHtml, PostInputData } from '../utils/postHtmlGenerator';
import { 
  FileText, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Eye, 
  Code, 
  Sparkles, 
  HelpCircle,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

const PRESET_TEMPLATES: Record<string, PostInputData> = {
  sajek: {
    title: 'মেঘের রাজ্য সাজেক ভ্যালি ভ্রমণ গাইড: অপার্থিব সূর্যোদয় ও কংলাক চূড়া',
    division: 'চট্টগ্রাম',
    district: 'রাঙামাটি (বাঘাইছড়ি)',
    bestSeason: 'বর্ষা ও শরৎ (জুলাই - নভেম্বর)',
    duration: '২ দিন / ১ রাত',
    budgetEst: '৪,৫০০ - ৬,৫০০ টাকা',
    difficulty: 'সহজ',
    featuredImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
    summary: 'সমুদ্রপৃষ্ঠ থেকে প্রায় ১৮০০ ফুট উঁচুতে অবস্থিত সাজেক ভ্যালিতে মেঘের সাথে খেলা করার অভিজ্ঞতা অনন্য। খাগড়াছড়ির সবুজ পাহাড় আর আঁকাবাঁকা পথ বেয়ে চান্দের গাড়ির রোমাঞ্চকর যাত্রা প্রতিটি ভ্রমণপিপাসুর স্বপ্নের মতো।',
    howToGo: '১. ঢাকা থেকে শান্তি বা সেন্টমার্টিন বাসে খাগড়াছড়ি শহর (ভাড়া ৭০০-৯০০ টাকা)।\n২. খাগড়াছড়ি থেকে চান্দের গাড়ি রিজার্ভ নিয়ে দীঘিনালা হয়ে সাজেক (যাওয়া-আসা ৮,৫০০ - ১০,৫০০ টাকা)।\n৩. সকাল ১০:০০টা অথবা দুপুর ২:৩০টার আর্মি এসকর্ট ধরতে হবে।',
    whereToStay: 'সাজেকে রুন্ময়, মেঘমাচং, লুসাই কটেজ অথবা মেঘকাব্য রিসোর্টে থাকা যায়। আগে থেকে বুকিং দিয়ে রাখা ভালো।',
    foodTips: 'আদিবাসী ঐতিহ্যবাহী বাঁশ মুরগি (Bamboo Chicken), জুমের চালের ভাত ও পাহাড়ি পেঁপে ভর্তা অবশ্যই ট্রাই করবেন।',
    itinerary: [
      {
        day: '১ম দিন',
        title: 'দীঘিনালা থেকে সাজেক যাত্রা ও কংলাক পাহাড়ে সূর্যাস্ত',
        desc: 'সকালে এসকর্ট ধরে সাজেক পৌঁছানো। দুপুরে কটেজে চেক-ইন করে একটু বিশ্রাম নিয়ে কংলাক পাহাড়ে সূর্যাস্ত দর্শন।'
      },
      {
        day: '২য় দিন',
        title: 'হেলিপ্যাডে মেঘের খেলা ও আলুটিলা গুহা',
        desc: 'ভোরে হেলিপ্যাডে দাঁড়িয়ে মেঘের সাগরে সূর্যোদয় দেখা। সকালের নাস্তা সেরে খাগড়াছড়ি ফিরে আলুটিলা রহস্যময় গুহা পরিদর্শন।'
      }
    ],
    cautions: 'পাহাড়ের পবিত্রতা রক্ষা করুন, অপচনশীল কোনো প্লাস্টিক বা বোতল ফেলবেন না। আদিবাসীদের ছবি তোলার আগে অনুমতি নিন।'
  },
  tanguar: {
    title: 'টাঙ্গুয়ার হাওর ও নীলাদ্রি লেক: জোছনায় বজরায় ভেসে থাকার রোমাঞ্চ',
    subtitle: '',
    division: 'সিলেট',
    district: 'সুনামগঞ্জ (তাহিরপুর)',
    bestSeason: 'বর্ষাকাল (জুলাই - সেপ্টেম্বর)',
    duration: '২ দিন / ২ রাত',
    budgetEst: '৫,০০০ - ৭,৫০০ টাকা',
    difficulty: 'সহজ',
    featuredImageUrl: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=1200&q=80',
    summary: 'মেঘালয় পাহাড়ের কোল ঘেঁষা রামসার সাইট টাঙ্গুয়ার হাওরে বর্ষার রূপ দেখার মতো। স্বচ্ছ জলরাশি, হিজল-করচের বন এবং হাউজবোটে রাত্রিযাপন এক অন্যরকম প্রশান্তি এনে দেয়।',
    howToGo: '১. ঢাকা থেকে সরাসরি এনা বা শ্যামলী বাসে সুনামগঞ্জ শহর।\n২. সুনামগঞ্জ থেকে সিএনজি বা বাইকে তাহিরপুর ঘাট (ভাড়া ১৫০-২০০ টাকা)।\n৩. ঘাট থেকে প্রিমিয়াম বা সাধারণ হাউজবোটে ভ্রমণ শুরু।',
    whereToStay: 'হাউজবোটে থাকাই সবচেয়ে ভালো। বিকল্প হিসেবে টেকেরঘাট বাজারে সাধারণ গেস্টহাউস রয়েছে।',
    foodTips: 'হাওরের তাজা বোয়াল, রুই ও ছোট মাছের ভুনা এবং হাঁসের মাংস অত্যন্ত জনপ্রিয়।',
    itinerary: [
      {
        day: '১ম দিন',
        title: 'তাহিরপুর ঘাট থেকে হাউজবোটে ওয়াচ টাওয়ার ও জাদুকাটা নদী',
        desc: 'সকালে হাউজবোটে উঠে হাওরের বুকে যাত্রা। দুপুরে জাদুকাটা নদীর স্ফটিক স্বচ্ছ জলে সাঁতার ও বারিক্কা টিলা দর্শন।'
      },
      {
        day: '২য় দিন',
        title: 'শিমুল বাগান ও টেকেরঘাট নীলাদ্রি লেক',
        desc: 'ভোরে নীলাদ্রি চুনাপাথর লেকে সূর্যোদয় এবং বিখ্যাত রূপের নদী জাদুকাটার পাড়ে সময় কাটানো।'
      }
    ],
    cautions: 'হাওরের জলে নামার আগে সবসময় লাইফ জ্যাকেট ব্যবহার করুন। পানির স্রোত তীব্র হতে পারে।'
  }
};

export const PostBuilder: React.FC = () => {
  const [postData, setPostData] = useState<PostInputData>(PRESET_TEMPLATES.sajek);
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'html'>('form');
  const [copied, setCopied] = useState(false);

  const generatedHtml = generatePostBloggerHtml(postData);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddItineraryDay = () => {
    setPostData({
      ...postData,
      itinerary: [
        ...postData.itinerary,
        {
          day: `${postData.itinerary.length + 1}ম দিন`,
          title: '',
          desc: ''
        }
      ]
    });
  };

  const handleRemoveItineraryDay = (index: number) => {
    const updated = [...postData.itinerary];
    updated.splice(index, 1);
    setPostData({ ...postData, itinerary: updated });
  };

  const handleUpdateItinerary = (index: number, field: 'title' | 'desc', val: string) => {
    const updated = [...postData.itinerary];
    updated[index][field] = val;
    setPostData({ ...postData, itinerary: updated });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ব্লগার রেডিমেড ট্রাভেল পোস্ট ফরম্যাটার</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
              ভ্রমণ পোস্ট বিল্ডার ও এইচটিএমএল কোডার
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              এখানে সহজে আপনার ট্রাভেল পোস্ট লিখুন। সিস্টেমটি স্বয়ংক্রিয়ভাবে একটি আকর্ষণীয় পোস্ট তৈরি করবে যা সরাসরি <strong>Blogger.com</strong> এর HTML View তে পেস্ট করে পাবলিশ করতে পারবেন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কোড কপি হয়েছে!' : 'ব্লগার HTML কপি করুন'}</span>
            </button>
          </div>
        </div>

        {/* Template Presets */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-stone-100 flex-wrap">
          <span className="text-xs font-semibold text-stone-500">নমুনা টেমপ্লেট নির্বাচন করুন:</span>
          <button
            onClick={() => setPostData(PRESET_TEMPLATES.sajek)}
            className="text-xs px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full font-medium transition-colors"
          >
            🏔️ সাজেক ভ্যালি গাইড
          </button>
          <button
            onClick={() => setPostData(PRESET_TEMPLATES.tanguar)}
            className="text-xs px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full font-medium transition-colors"
          >
            🛶 টাঙ্গুয়ার হাওর গাইড
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'form'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>পোস্ট এডিটর</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'preview'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>লাইভ পোস্ট লুক প্রিভিউ</span>
        </button>
        <button
          onClick={() => setActiveTab('html')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'html'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>ব্লগার HTML কোড</span>
        </button>
      </div>

      {/* Form Tab */}
      {activeTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                পোস্টের শিরোনাম (Post Title)
              </label>
              <input
                type="text"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                placeholder="যেমন: মেঘের রাজ্য সাজেক ভ্যালি ভ্রমণ গাইড..."
                className="w-full text-sm sm:text-base font-semibold px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Division & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  বিভাগ (Division)
                </label>
                <select
                  value={postData.division}
                  onChange={(e) => setPostData({ ...postData, division: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                >
                  {['চট্টগ্রাম', 'সিলেট', 'বরিশাল', 'খুলনা', 'রাজশাহী', 'রংপুর', 'ময়মনসিংহ', 'ঢাকা'].map(div => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  জেলা ও উপজেলা (District / Location)
                </label>
                <input
                  type="text"
                  value={postData.district}
                  onChange={(e) => setPostData({ ...postData, district: e.target.value })}
                  placeholder="যেমন: রাঙামাটি (বাঘাইছড়ি)"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Travel metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ভ্রমণের সেরা সময়
                </label>
                <input
                  type="text"
                  value={postData.bestSeason}
                  onChange={(e) => setPostData({ ...postData, bestSeason: e.target.value })}
                  placeholder="যেমন: জুলাই - নভেম্বর"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  সময়কাল
                </label>
                <input
                  type="text"
                  value={postData.duration}
                  onChange={(e) => setPostData({ ...postData, duration: e.target.value })}
                  placeholder="যেমন: ২ দিন / ১ রাত"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  আনুমানিক বাজেট
                </label>
                <input
                  type="text"
                  value={postData.budgetEst}
                  onChange={(e) => setPostData({ ...postData, budgetEst: e.target.value })}
                  placeholder="যেমন: ৪,৫০০ - ৬,৫০০ টাকা"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Featured Image URL */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                ফিচার্ড ছবির লিঙ্ক (Image URL)
              </label>
              <input
                type="text"
                value={postData.featuredImageUrl}
                onChange={(e) => setPostData({ ...postData, featuredImageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                ভ্রমণ ভূমিকা ও মূল আকর্ষণ (Overview Summary)
              </label>
              <textarea
                rows={3}
                value={postData.summary}
                onChange={(e) => setPostData({ ...postData, summary: e.target.value })}
                placeholder="গন্তব্যটির মূল রূপ ও অনুভূতির কথা লিখুন..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Day by Day Itinerary Builder */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-stone-800">
                  দিনভিত্তিক ভ্রমণ পরিকল্পনা (Day-by-Day Itinerary)
                </label>
                <button
                  type="button"
                  onClick={handleAddItineraryDay}
                  className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  নতুন দিন যোগ করুন
                </button>
              </div>

              <div className="space-y-3">
                {postData.itinerary.map((item, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-700">{item.day}</span>
                      {postData.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(idx)}
                          className="text-stone-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateItinerary(idx, 'title', e.target.value)}
                      placeholder="শিরোনাম (যেমন: সাজেক যাত্রা ও কংলাক পাহাড়ে সূর্যাস্ত)"
                      className="w-full text-xs px-3 py-1.5 mb-2 rounded border border-stone-300 bg-white"
                    />
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => handleUpdateItinerary(idx, 'desc', e.target.value)}
                      placeholder="দিনের বিস্তারিত বর্ণনা..."
                      className="w-full text-xs px-3 py-1.5 rounded border border-stone-300 bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* How to Reach & Route */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                কীভাবে যাবেন (রুট ডিরেকশন ও যাতায়াত)
              </label>
              <textarea
                rows={3}
                value={postData.howToGo}
                onChange={(e) => setPostData({ ...postData, howToGo: e.target.value })}
                placeholder="বাস, ট্রেন বা জিপের বিবরণ..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Stay and Food */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  কোথায় থাকবেন (হোটেল/কটেজ)
                </label>
                <input
                  type="text"
                  value={postData.whereToStay}
                  onChange={(e) => setPostData({ ...postData, whereToStay: e.target.value })}
                  placeholder="কটেজ বা রিসোর্টের নাম..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  খাবার দাবার ও স্থানীয় স্বাদ
                </label>
                <input
                  type="text"
                  value={postData.foodTips}
                  onChange={(e) => setPostData({ ...postData, foodTips: e.target.value })}
                  placeholder="ঐতিহ্যবাহী খাবারের টিপস..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>
            </div>

            {/* Cautions */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                সতর্কতা ও পরিবেশ রক্ষা নির্দেশনা
              </label>
              <textarea
                rows={2}
                value={postData.cautions}
                onChange={(e) => setPostData({ ...postData, cautions: e.target.value })}
                placeholder="প্লাস্টিক বর্জন, স্থানীয় সংস্কৃতি সম্মান ইত্যাদি..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
              />
            </div>
          </div>

          {/* Quick instructions side card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-emerald-900 text-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                ব্লগারে পোস্ট করার নিয়ম
              </h3>
              <ol className="text-xs text-emerald-100 space-y-3 leading-relaxed list-decimal pl-4">
                <li>
                  ওপরের <strong>'ব্লগার HTML কপি করুন'</strong> বাটনে ক্লিক করে এইচটিএমএল কোডটি কপি করে নিন।
                </li>
                <li>
                  আপনার <strong>Blogger.com</strong> এ লগইন করে বাম পাশের <strong>'+ New Post' (নতুন পোস্ট)</strong> বাটনে ক্লিক করুন।
                </li>
                <li>
                  পোস্টের শিরোনামে আপনার পোস্টের নাম লিখুন।
                </li>
                <li>
                  পোস্ট এডিটরের ওপরের বাঁদিকের পেন্সিল আইকনে ক্লিক করে <strong>'HTML View' (&lt; &gt;)</strong> সিলেক্ট করুন।
                </li>
                <li>
                  কপি করা কোডটি পেস্ট করুন এবং <strong>'Publish' (প্রকাশ করুন)</strong> বাটনে ক্লিক করুন!
                </li>
              </ol>
            </div>

            <div className="bg-white border border-stone-200 p-5 rounded-xl text-xs space-y-2">
              <span className="font-bold text-stone-900 block">লেবেল (Label / Tag) ব্যবহার টিপস:</span>
              <p className="text-stone-600">
                ব্লগারে পোস্টের ডানপাশে 'Labels' অপশনে আপনার বিভাগের নাম (যেমন: <code className="bg-stone-100 px-1 py-0.5 rounded text-emerald-700">চট্টগ্রাম</code> অথবা <code className="bg-stone-100 px-1 py-0.5 rounded text-emerald-700">সিলেট</code>) লিখে দিলে স্বয়ংক্রিয়ভাবে মেনু ফিল্টারে চলে আসবে!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-stone-200 max-w-4xl mx-auto shadow-sm">
          <div className="mb-6 pb-4 border-b border-stone-200">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
              {postData.division} • {postData.district}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-3 mb-2">
              {postData.title}
            </h1>
          </div>

          {postData.featuredImageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={postData.featuredImageUrl}
                alt={postData.title}
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
          )}

          {/* Quick Summary Grid */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">অবস্থান</span>
              <span className="text-sm font-bold text-emerald-950 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                {postData.district}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">ভ্রমণের সেরা সময়</span>
              <span className="text-sm font-bold text-emerald-950 mt-0.5 block">{postData.bestSeason}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">বাজেট</span>
              <span className="text-sm font-bold text-emerald-950 flex items-center gap-1 mt-0.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                {postData.budgetEst}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">সময়কাল</span>
              <span className="text-sm font-bold text-emerald-950 mt-0.5 block">{postData.duration}</span>
            </div>
          </div>

          <p className="text-base text-stone-700 leading-relaxed mb-6">{postData.summary}</p>

          {/* Itinerary */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-emerald-800 border-b border-stone-200 pb-2 mb-4">
              🗓️ দিনভিত্তিক ভ্রমণ পরিকল্পনা
            </h3>
            <div className="space-y-4">
              {postData.itinerary.map((item, idx) => (
                <div key={idx} className="border-l-3 border-emerald-600 pl-4">
                  <h4 className="text-sm font-bold text-stone-900">{item.day}: {item.title}</h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to go */}
          <div className="bg-blue-50/70 border-l-4 border-blue-600 p-5 rounded-r-lg mb-6">
            <h4 className="text-sm font-bold text-blue-900 mb-2">🚌 কীভাবে যাবেন (রুট ডিরেকশন)</h4>
            <p className="text-xs sm:text-sm text-blue-950 whitespace-pre-line">{postData.howToGo}</p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50/70 border-l-4 border-amber-600 p-5 rounded-r-lg">
            <h4 className="text-sm font-bold text-amber-900 mb-1">⚠️ বিশেষ সতর্কতা ও পরিবেশ রক্ষা</h4>
            <p className="text-xs sm:text-sm text-amber-950">{postData.cautions}</p>
          </div>
        </div>
      )}

      {/* HTML Tab */}
      {activeTab === 'html' && (
        <div className="bg-stone-900 rounded-xl overflow-hidden border border-stone-800 shadow-xl">
          <div className="bg-stone-950 px-4 py-3 flex items-center justify-between border-b border-stone-800">
            <span className="text-xs font-mono text-emerald-400">blogger-post-template.html</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কোড কপি করুন'}</span>
            </button>
          </div>
          <pre className="p-4 sm:p-6 text-xs text-emerald-300 font-mono overflow-x-auto max-h-[600px] leading-relaxed">
            <code>{generatedHtml}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
