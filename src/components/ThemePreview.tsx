import React, { useState } from 'react';
import { SAMPLE_POSTS, TravelPost } from '../data/samplePosts';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  Share2, 
  Clock, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ShieldAlert, 
  ArrowLeft, 
  Check, 
  Search,
  MessageSquare,
  Send,
  Compass
} from 'lucide-react';

interface ThemePreviewProps {
  onOpenXmlTab: () => void;
  onOpenPostBuilder: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

const DIVISIONS = ['সকল', 'চট্টগ্রাম', 'সিলেট', 'বরিশাল', 'খুলনা', 'রাজশাহী', 'রংপুর'];

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  onOpenXmlTab,
  onOpenPostBuilder
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [selectedDivision, setSelectedDivision] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<TravelPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState<{ id: string; name: string; text: string; date: string }[]>([
    {
      id: '1',
      name: 'আরিফুল হক',
      text: 'অসাধারণ বিস্তারিত গাইড! আগামী মাসে সাজেক যাওয়ার প্ল্যান করছি, এই তথ্যাবলি খুব কাজে দেবে।',
      date: 'আজকে'
    },
    {
      id: '2',
      name: 'মিতু আক্তার',
      text: 'পরিবেশ রক্ষার বিষয়টি তুলে ধরা খুব প্রশংসনীয়। সুন্দর ভ্রমণ ব্লগ!',
      date: 'গতকাল'
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const filteredPosts = SAMPLE_POSTS.filter(post => {
    const matchDivision = selectedDivision === 'সকল' || post.division === selectedDivision;
    const matchSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDivision && matchSearch;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        name: newCommentName.trim(),
        text: newCommentText.trim(),
        date: 'এইমাত্র'
      }
    ]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const containerWidthClass = 
    deviceMode === 'mobile' 
      ? 'max-w-[420px] shadow-2xl border-x-4 border-stone-800 rounded-3xl overflow-hidden' 
      : deviceMode === 'tablet' 
      ? 'max-w-[820px] shadow-xl border-stone-300 rounded-xl' 
      : 'w-full';

  return (
    <div className="bg-stone-100 min-h-screen py-6 px-2 sm:px-4">
      {/* Top Controls Bar for Preview */}
      <div className="max-w-7xl mx-auto mb-6 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            ব্লগার প্রিভিউ মোড:
          </span>
          <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                deviceMode === 'desktop' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="ডেস্কটপ ভিউ"
            >
              <Laptop className="w-4 h-4" />
              <span className="hidden sm:inline">ডেস্কটপ</span>
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                deviceMode === 'tablet' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="ট্যাবলেট ভিউ"
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden sm:inline">ট্যাবলেট</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                deviceMode === 'mobile' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="মোবাইল ভিউ"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">মোবাইল</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenPostBuilder}
            className="text-xs font-semibold px-3 py-1.5 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
          >
            + নতুন পোস্ট কোড লিখুন
          </button>
          <button
            onClick={onOpenXmlTab}
            className="text-xs font-semibold px-3 py-1.5 text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
          >
            থিম XML কোড দেখুন
          </button>
        </div>
      </div>

      {/* Preview Frame Wrapper */}
      <div className={`mx-auto transition-all duration-300 bg-white border border-stone-200 ${containerWidthClass}`}>
        
        {/* Blog Mock Header */}
        <header className="border-b border-stone-200 bg-white sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => setActivePost(null)}
              className="text-left group flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-stone-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  অদেখা বাংলাদেশ
                </span>
                <span className="block text-[11px] text-stone-500 font-normal">
                  ভ্রমণকাহিনী ও রুট গাইড
                </span>
              </div>
            </button>

            {/* Top Search bar */}
            <div className="relative hidden sm:block max-w-xs w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="গন্তব্য বা জেলা খুঁজুন..."
                className="w-full text-xs pl-9 pr-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Division Filter Bar */}
          <div className="bg-stone-50 border-t border-stone-100 px-4 sm:px-6 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none">
            {DIVISIONS.map((division) => (
              <button
                key={division}
                onClick={() => {
                  setSelectedDivision(division);
                  setActivePost(null);
                }}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDivision === division && !activePost
                    ? 'bg-emerald-700 text-white font-medium shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {division}
              </button>
            ))}
          </div>
        </header>

        {/* Content Area: Either Single Post or Archive */}
        {activePost ? (
          /* ================= SINGLE POST VIEW ================= */
          <article className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => setActivePost(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              সকল ভ্রমণ পোস্টে ফিরে যান
            </button>

            {/* Header info */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {activePost.division} বিভাগ
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activePost.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activePost.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-3">
                {activePost.title}
              </h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                {activePost.subtitle}
              </p>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-xl overflow-hidden shadow-sm border border-stone-200">
              <img
                src={activePost.featuredImage}
                alt={activePost.title}
                className="w-full h-64 sm:h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg';
                }}
              />
              <div className="bg-stone-50 p-2 text-center text-xs text-stone-500 italic">
                ছবি: {activePost.title} | {activePost.district}
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                  অবস্থান
                </span>
                <span className="text-sm font-bold text-emerald-950 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  {activePost.district}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                  ভ্রমণের সেরা সময়
                </span>
                <span className="text-sm font-bold text-emerald-950 mt-0.5 block">
                  {activePost.bestSeason}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                  আনুমানিক বাজেট
                </span>
                <span className="text-sm font-bold text-emerald-950 flex items-center gap-1 mt-0.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                  {activePost.budgetEst}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                  ট্রেইল ডিফিকাল্টি
                </span>
                <span className="text-sm font-bold text-emerald-950 mt-0.5 block">
                  {activePost.difficulty}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="text-stone-800 text-base sm:text-lg leading-relaxed mb-8">
              <p>{activePost.summary}</p>
            </div>

            {/* Day-by-Day Itinerary */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-2 mb-4 flex items-center gap-2">
                <span>🗓️</span> দিনভিত্তিক ভ্রমণ পরিকল্পনা
              </h2>
              <div className="space-y-4">
                {activePost.itinerary.map((item, idx) => (
                  <div key={idx} className="border-l-3 border-emerald-600 pl-4 py-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      {item.day}: {item.title}
                    </span>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Reach */}
            <section className="mb-8 bg-blue-50/60 border-l-4 border-blue-600 p-5 rounded-r-xl">
              <h3 className="text-base font-bold text-blue-900 mb-2">
                🚌 কীভাবে যাবেন (রুট ডিরেকশন)
              </h3>
              <ul className="space-y-1.5 text-sm text-blue-950">
                {activePost.howToGo.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Where to Stay and Food */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-2 mb-4">
                🏡 থাকা ও খাওয়ার পরামর্শ
              </h3>
              <div className="space-y-2 text-sm text-stone-700">
                {activePost.stayAndFood.map((info, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {info}
                  </p>
                ))}
              </div>
            </section>

            {/* Tips and Warnings */}
            <section className="mb-10 bg-amber-50/70 border-l-4 border-amber-500 p-5 rounded-r-xl">
              <h3 className="text-base font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                পরিবেশ রক্ষা ও জরুরি নিয়মাবলী
              </h3>
              <ul className="space-y-1.5 text-sm text-amber-950">
                {activePost.tipsAndRules.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Author Card & Share */}
            <div className="border-t border-b border-stone-200 py-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  className="w-12 h-12 rounded-full border border-stone-200"
                />
                <div>
                  <span className="text-sm font-bold text-stone-900 block">
                    {activePost.author.name}
                  </span>
                  <span className="text-xs text-stone-500">
                    {activePost.author.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'লিঙ্ক কপি হয়েছে' : 'শেয়ার করুন'}</span>
                </button>
              </div>
            </div>

            {/* Blogger Style Comments Section */}
            <section className="mb-12">
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                মন্তব্যসমূহ ({comments.length})
              </h3>

              {/* Comments list */}
              <div className="space-y-3 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-800">{comment.name}</span>
                      <span className="text-[11px] text-stone-400">{comment.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Add comment box */}
              <form onSubmit={handleAddComment} className="bg-white border border-stone-200 p-4 rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
                  আপনার মন্তব্য লিখুন
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <input
                    type="text"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    placeholder="আপনার নাম..."
                    className="text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-emerald-600"
                    required
                  />
                  <textarea
                    rows={3}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="ভ্রমণ বা রুট সম্পর্কে আপনার কোনো অভিজ্ঞতা বা প্রশ্ন আছে কি?"
                    className="text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-emerald-600"
                    required
                  />
                  <button
                    type="submit"
                    className="self-end flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    মন্তব্য প্রকাশ করুন
                  </button>
                </div>
              </form>
            </section>
          </article>
        ) : (
          /* ================= HOMEPAGE / ARCHIVE VIEW ================= */
          <div>
            {/* Hero Showcase */}
            <div className="relative bg-stone-900 text-white overflow-hidden py-16 sm:py-24 px-6 sm:px-12">
              <div className="absolute inset-0 z-0">
                <img
                  src="/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg"
                  alt="Unseen Bangladesh Landscape"
                  className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
              </div>

              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <span className="inline-block text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/40">
                  অদেখা বাংলাদেশ এক্সপিডিশন
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
                  বাংলাদেশের অজানা রূপ ও গোপন ট্রেইল
                </h1>
                <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                  পাহাড়ের মায়াবী মেঘ, হাওরের জলরাশি, গহীন সুন্দরবনের ম্যানগ্রোভ আর ঐতিহাসিক টেরাকোটার প্রাচীন গল্প। দায়িত্বশীল ভ্রমণের পূর্ণাঙ্গ গাইড।
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const firstPost = SAMPLE_POSTS[0];
                      if (firstPost) setActivePost(firstPost);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-md transition-colors shadow-md cursor-pointer"
                  >
                    ফিচার্ড সাজেক ট্রেইল পড়ুন
                  </button>
                  <button
                    onClick={() => {
                      const tanguar = SAMPLE_POSTS.find(p => p.id === 'tanguar-haor-expedition');
                      if (tanguar) setActivePost(tanguar);
                    }}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium rounded-md backdrop-blur-xs border border-white/20 transition-colors cursor-pointer"
                  >
                    টাঙ্গুয়ার হাওর গাইড
                  </button>
                </div>
              </div>
            </div>

            {/* Main Layout: Post Grid + Sidebar */}
            <div className="max-w-7xl mx-auto p-4 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Posts Column */}
                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
                    <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                      <span>📌</span> {selectedDivision === 'সকল' ? 'সাম্প্রতিক ভ্রমণ পোস্টসমূহ' : `${selectedDivision} বিভাগের গন্তব্য`}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {filteredPosts.length}টি পোস্ট পাওয়া গেছে
                    </span>
                  </div>

                  {filteredPosts.length === 0 ? (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-12 text-center">
                      <p className="text-stone-500 text-sm mb-3">এই বিভাগে কোনো পোস্ট খুঁজে পাওয়া যায়নি।</p>
                      <button
                        onClick={() => { setSelectedDivision('সকল'); setSearchQuery(''); }}
                        className="text-xs font-semibold text-emerald-700 underline"
                      >
                        সকল পোস্ট দেখুন
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => setActivePost(post)}
                          className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-stone-100 overflow-hidden">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg';
                              }}
                            />
                            <span className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                              {post.division} • {post.district}
                            </span>
                          </div>

                          {/* Body */}
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                                <span>{post.publishedDate}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                              </div>
                              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
                                {post.title}
                              </h3>
                              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                                {post.summary}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                              <span className="text-stone-500">
                                বাজেট: <strong className="text-stone-800">{post.budgetEst}</strong>
                              </span>
                              <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                                পড়ুন →
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* About Widget */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 border-b border-stone-200 pb-2">
                      অদেখা বাংলাদেশ সম্পর্কে
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      আমাদের লক্ষ্য বাংলাদেশের লুকানো ট্রেইল, আদিবাসী জনপদ এবং নদীমাতৃক প্রকৃতির অজানা রূপ সকলের সামনে দায়িত্বশীলভাবে তুলে ধরা।
                    </p>
                    <div className="text-xs text-stone-500 space-y-1">
                      <div>🌿 ইকো-ট্যুরিজম ও পরিবেশ সচেতনতা</div>
                      <div>🗺️ পরীক্ষিত রুট গাইড ও বাজেট হিসাব</div>
                    </div>
                  </div>

                  {/* Tourist Police & Helplines */}
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-emerald-900 mb-2">
                      জরুরি ট্রাভেল হেল্পলাইন
                    </h3>
                    <ul className="text-xs text-emerald-950 space-y-1.5">
                      <li>• ট্যুরিস্ট পুলিশ কন্ট্রোল: <strong>০১৩২০-২২২২২২</strong></li>
                      <li>• জাতীয় জরুরি সেবা: <strong>৯৯৯</strong></li>
                      <li>• বাংলাদেশ পর্যটন কর্পোরেশন: <strong>০২-৮৮৩৪৬০০</strong></li>
                    </ul>
                  </div>

                  {/* Quick Categories */}
                  <div className="bg-white border border-stone-200 rounded-xl p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 border-b border-stone-200 pb-2">
                      ভ্রমণের ধরন অনুযায়ী
                    </h3>
                    <div className="space-y-2">
                      {[
                        { name: 'পাহাড় ও ঝরনা ট্রেইল', count: '১২টি গাইড' },
                        { name: 'হাওর ও নদীমাতৃক জীবন', count: '৮টি গাইড' },
                        { name: 'সুন্দরবন ও ওয়াইল্ডলাইফ', count: '৫টি গাইড' },
                        { name: 'প্রাচীন প্রত্নতত্ত্ব ও হেরিটেজ', count: '৯টি গাইড' },
                      ].map((cat, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1 hover:text-emerald-700 cursor-pointer">
                          <span className="text-stone-700">{cat.name}</span>
                          <span className="text-stone-400 font-mono text-[11px]">{cat.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-400 py-10 px-6 sm:px-12 border-t border-stone-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-semibold text-stone-200 text-sm">অদেখা বাংলাদেশ · Unseen Bangladesh</p>
              <p className="text-stone-500 mt-1">প্রকৃতির প্রতি যত্নশীল হোন, কোনো বর্জ্য ফেলে আসবেন না।</p>
            </div>
            <div className="text-center sm:text-right text-stone-500">
              <p>ব্লগার (Blogspot.com) ফ্রেন্ডলি ট্রাভেল থিম</p>
              <p className="mt-0.5">© ২০২৬ সর্বস্বত্ব সংরক্ষিত</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
