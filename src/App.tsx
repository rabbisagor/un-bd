import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TravelPost, PostComment } from './types';
import { getStoredPosts, savePosts, getStoredComments, saveComments, exportPostsToJsonFile } from './utils/storage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PostCard } from './components/PostCard';
import { PostDetailView } from './components/PostDetailView';
import { PostCreateModal } from './components/PostCreateModal';
import { VercelDeployModal } from './components/VercelDeployModal';
import { EcoGuidelinesModal } from './components/EcoGuidelinesModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  MapPin, 
  Filter, 
  PlusCircle, 
  Compass, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

const DIVISIONS = ['সকল', 'চট্টগ্রাম', 'সিলেট', 'বরিশাল', 'খুলনা', 'রাজশাহী', 'রংপুর', 'ময়মনসিংহ', 'ঢাকা'];
const CATEGORIES = ['সকল ক্যাটাগরি', 'পাহাড় ও ঝরনা', 'হাওর ও নদী', 'ম্যানগ্রোভ ও বন্যপ্রাণী', 'হেরিটেজ ও ইতিহাস', 'দ্বীপ ও উপকূল'];

export default function App() {
  const [posts, setPosts] = useState<TravelPost[]>([]);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [activePost, setActivePost] = useState<TravelPost | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string>('সকল');
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল ক্যাটাগরি');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isEcoModalOpen, setIsEcoModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const postsSectionRef = useRef<HTMLDivElement>(null);

  // Load stored posts & comments
  useEffect(() => {
    const loadedPosts = getStoredPosts();
    setPosts(loadedPosts);
    const loadedComments = getStoredComments();
    setComments(loadedComments);
  }, []);

  // Sync to localStorage
  const handleSavePost = (newPost: TravelPost) => {
    const updated = [newPost, ...posts];
    setPosts(updated);
    savePosts(updated);
    setActivePost(newPost);
    showToast('আপনার নতুন ভ্রমণ পোস্টটি সফলভাবে প্রকাশিত হয়েছে!');
  };

  const handleDeletePost = (postId: string) => {
    const updated = posts.filter((p) => p.id !== postId);
    setPosts(updated);
    savePosts(updated);
    setActivePost(null);
    showToast('পোস্টটি মুছে ফেলা হয়েছে।');
  };

  const handleAddComment = (postId: string, author: string, text: string) => {
    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      postId,
      author,
      text,
      date: 'এইমাত্র',
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    saveComments(updated);
    showToast('আপনার মন্তব্য প্রকাশিত হয়েছে!');
  };

  const handleExportPosts = () => {
    exportPostsToJsonFile(posts);
    showToast('সকল ভ্রমণ পোস্টের JSON ফাইল ডাউনলোড হয়েছে!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const scrollToPosts = () => {
    if (activePost) {
      setActivePost(null);
    }
    setTimeout(() => {
      postsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleResetFilters = () => {
    setSelectedDivision('সকল');
    setSelectedCategory('সকল ক্যাটাগরি');
    setSearchQuery('');
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchDivision = selectedDivision === 'সকল' || post.division === selectedDivision;
      const matchCategory = selectedCategory === 'সকল ক্যাটাগরি' || post.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDivision && matchCategory && matchQuery;
    });
  }, [posts, selectedDivision, selectedCategory, searchQuery]);

  // Featured spotlight post
  const featuredSpotlight = useMemo(() => {
    return posts.find((p) => p.id === 'sajek-valley-guide') || posts[0];
  }, [posts]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-['Hind_Siliguri',sans-serif] text-stone-900">
      
      {/* Top Navbar */}
      <Navbar
        onOpenCreatePost={() => setIsCreateModalOpen(true)}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenEcoModal={() => setIsEcoModalOpen(true)}
        onResetFilters={handleResetFilters}
        onExportPosts={handleExportPosts}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activePost ? (
          /* Single Article Reader View */
          <PostDetailView
            post={activePost}
            allPosts={posts}
            comments={comments}
            onBack={() => {
              setActivePost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectRelated={(p) => {
              setActivePost(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDeletePost={handleDeletePost}
            onAddComment={handleAddComment}
          />
        ) : (
          /* Homepage: Feed View */
          <div>
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExploreClick={scrollToPosts}
              onOpenCreatePost={() => setIsCreateModalOpen(true)}
            />

            {/* Division & Filter Strip */}
            <div ref={postsSectionRef} className="sticky top-16 z-30 bg-white border-b border-stone-200 shadow-xs">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between gap-4">
                  {/* Division Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                    {DIVISIONS.map((div) => {
                      const count = div === 'সকল' 
                        ? posts.length 
                        : posts.filter((p) => p.division === div).length;
                      return (
                        <button
                          key={div}
                          onClick={() => setSelectedDivision(div)}
                          className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                            selectedDivision === div
                              ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                              : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                          }`}
                        >
                          <span>{div}</span>
                          <span className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-full ${
                            selectedDivision === div ? 'bg-emerald-900 text-emerald-100' : 'bg-stone-200 text-stone-500'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Category Selector Dropdown */}
                  <div className="hidden lg:flex items-center gap-2 shrink-0">
                    <Filter className="w-3.5 h-3.5 text-stone-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-xs bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none focus:border-emerald-700"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Featured Destination Bento Spotlight (Shows when no active search/division) */}
              {selectedDivision === 'সকল' && !searchQuery && featuredSpotlight && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>ফিচার্ড ট্রাভেল স্পটলাইট</span>
                    </span>
                  </div>

                  <div
                    onClick={() => setActivePost(featuredSpotlight)}
                    className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
                  >
                    <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                      <img
                        src={featuredSpotlight.featuredImage}
                        alt={featuredSpotlight.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg';
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded">
                        {featuredSpotlight.division} · {featuredSpotlight.district}
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                          <span>{featuredSpotlight.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{featuredSpotlight.readTime}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug mb-3">
                          {featuredSpotlight.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-6">
                          {featuredSpotlight.summary}
                        </p>

                        <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl text-xs mb-6">
                          <div>
                            <span className="text-stone-400 block text-[11px]">ভ্রমণের সময়</span>
                            <strong className="text-stone-800">{featuredSpotlight.bestSeason}</strong>
                          </div>
                          <div>
                            <span className="text-stone-400 block text-[11px]">আনুমানিক বাজেট</span>
                            <strong className="text-emerald-800">{featuredSpotlight.budgetEst}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                        <div className="flex items-center gap-2 text-xs text-stone-600">
                          <img
                            src={featuredSpotlight.author.avatar}
                            alt={featuredSpotlight.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{featuredSpotlight.author.name}</span>
                        </div>

                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-800 group-hover:translate-x-1 transition-transform">
                          <span>পূর্ণাঙ্গ গাইড পড়ুন</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feed Grid & Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Posts Column */}
                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
                    <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-800" />
                      <span>
                        {selectedDivision === 'সকল'
                          ? 'সাম্প্রতিক ভ্রমণ পোস্টসমূহ'
                          : `${selectedDivision} বিভাগের গন্তব্য`}
                      </span>
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {filteredPosts.length}টি পোস্ট পাওয়া গেছে
                    </span>
                  </div>

                  {filteredPosts.length === 0 ? (
                    <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center shadow-xs">
                      <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-stone-800 mb-1">
                        কোনো ভ্রমণ পোস্ট খুঁজে পাওয়া যায়নি
                      </h3>
                      <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
                        আপনার সার্চ কুয়েরি বা ফিল্টার পরিবর্তন করুন, অথবা নতুন কোনো ভ্রমণ গল্প যোগ করুন।
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
                      >
                        সকল ফিল্টার রিসেট করুন
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredPosts.map((post) => (
                        <PostCard
                          key={post.id}
                          post={post}
                          onSelect={(p) => {
                            setActivePost(p);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Sidebar Column */}
                <aside className="lg:col-span-4 space-y-6">
                  
                  {/* Create post CTA widget */}
                  <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center mb-3 text-emerald-300">
                      <PlusCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">
                      আপনার ভ্রমণ গল্প লিখুন
                    </h3>
                    <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                      আপনি কি সম্প্রতি বাংলাদেশের কোনো অফবিট বা সুন্দর জায়গায় ভ্রমণ করেছেন? রুট গাইড ও ছবি দিয়ে কমিউনিটিতে শেয়ার করুন।
                    </p>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="w-full py-2.5 bg-white text-emerald-950 font-bold text-xs rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      + নতুন পোস্ট তৈরি করুন
                    </button>
                  </div>

                  {/* Tourist Police & Helplines Widget */}
                  <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
                      <PhoneCall className="w-4 h-4 text-emerald-800" />
                      <h3 className="text-sm font-bold text-stone-900">
                        জরুরি ট্রাভেল হেল্পলাইন
                      </h3>
                    </div>
                    <ul className="text-xs text-stone-700 space-y-2.5">
                      <li className="flex items-center justify-between">
                        <span>ট্যুরিস্ট পুলিশ কন্ট্রোল:</span>
                        <strong className="text-emerald-900 font-mono">০১৩২০-২২২২২২</strong>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>জাতীয় জরুরি সেবা:</span>
                        <strong className="text-emerald-900 font-mono">৯৯৯</strong>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>রেড ক্রিসেন্ট উদ্ধার সেবা:</span>
                        <strong className="text-emerald-900 font-mono">০২-৪৯৩৫১১৮১</strong>
                      </li>
                    </ul>
                  </div>

                  {/* Eco-ethics widget */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                        দায়িত্বশীল ইকো-ট্যুরিজম
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      পাহাড়ে, হাওরে বা বনে কোনো প্রকার প্লাস্টিক বা বোতল ফেলে আসবেন না। প্রকৃতির পবিত্রতা রক্ষা করা প্রতিটি ভ্রমণকারীর পবিত্র দায়িত্ব।
                    </p>
                    <button
                      onClick={() => setIsEcoModalOpen(true)}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                    >
                      পরিবেশ নীতি বিস্তারিত জানুন →
                    </button>
                  </div>

                  {/* GitHub & Vercel deployment card */}
                  <div className="bg-stone-900 text-stone-300 p-5 rounded-2xl border border-stone-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                      গিটহাব ও ভার্সেল ডেপলয়
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed mb-3">
                      এই সম্পূর্ণ ওয়েবসাইটটি যেকোনো সময় GitHub রিপোজিটরিতে পুশ করে Vercel-এ ১-ক্লিকে বিনামূল্যে হোস্ট করতে পারবেন।
                    </p>
                    <button
                      onClick={() => setIsDeployModalOpen(true)}
                      className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      ডেপলয় গাইড দেখুন →
                    </button>
                  </div>

                </aside>

              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenEcoModal={() => setIsEcoModalOpen(true)}
        onSelectDivision={(div) => {
          setSelectedDivision(div);
          setActivePost(null);
          scrollToPosts();
        }}
      />

      {/* Modals */}
      <PostCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSavePost={handleSavePost}
      />

      <VercelDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        posts={posts}
        onExportPosts={handleExportPosts}
      />

      <EcoGuidelinesModal
        isOpen={isEcoModalOpen}
        onClose={() => setIsEcoModalOpen(false)}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
