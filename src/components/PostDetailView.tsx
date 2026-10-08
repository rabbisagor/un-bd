import React, { useState } from 'react';
import { TravelPost, PostComment } from '../types';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  ShieldAlert, 
  Trash2, 
  Send, 
  MessageSquare,
  Compass
} from 'lucide-react';

interface PostDetailViewProps {
  post: TravelPost;
  allPosts: TravelPost[];
  comments: PostComment[];
  onBack: () => void;
  onSelectRelated: (post: TravelPost) => void;
  onDeletePost?: (postId: string) => void;
  onAddComment: (postId: string, author: string, text: string) => void;
}

export const PostDetailView: React.FC<PostDetailViewProps> = ({
  post,
  allPosts,
  comments,
  onBack,
  onSelectRelated,
  onDeletePost,
  onAddComment,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  const postComments = comments.filter((c) => c.postId === post.id);

  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.division === post.division || p.category === post.category))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;
    onAddComment(post.id, authorName.trim(), commentText.trim());
    setCommentText('');
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল ভ্রমণ পোস্টে ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          {post.isUserCreated && onDeletePost && (
            <button
              onClick={() => {
                if (window.confirm('আপনি কি এই পোস্টটি মুছে ফেলতে চান?')) {
                  onDeletePost(post.id);
                }
              }}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>মুছে ফেলুন</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'লিঙ্ক কপি হয়েছে' : 'শেয়ার করুন'}</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
          <span className="font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded">
            {post.division} বিভাগ
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedDate}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-3">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {post.subtitle}
          </p>
        )}
      </header>

      {/* Author Bar */}
      <div className="flex items-center gap-3 py-3 mb-6 border-y border-stone-100">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full border border-stone-200"
        />
        <div>
          <span className="text-sm font-bold text-stone-900 block leading-tight">
            {post.author.name}
          </span>
          <span className="text-xs text-stone-500">
            {post.author.role}
          </span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-xs border border-stone-200">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-64 sm:h-[420px] object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg';
          }}
        />
        <div className="bg-stone-50 px-4 py-2 text-center text-xs text-stone-500 italic">
          ছবি: {post.title} | {post.district}
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider block">
            অবস্থান ও জেলা
          </span>
          <span className="text-sm font-bold text-emerald-950 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            {post.district}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider block">
            ভ্রমণের সেরা সময়
          </span>
          <span className="text-sm font-bold text-emerald-950 mt-0.5 block">
            {post.bestSeason}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider block">
            আনুমানিক বাজেট
          </span>
          <span className="text-sm font-bold text-emerald-950 flex items-center gap-1 mt-0.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
            {post.budgetEst}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider block">
            সময় ও ডিফিকাল্টি
          </span>
          <span className="text-sm font-bold text-emerald-950 mt-0.5 block">
            {post.duration} ({post.difficulty})
          </span>
        </div>
      </div>

      {/* Summary Story Content */}
      <div className="text-stone-800 text-base sm:text-lg leading-relaxed mb-10 whitespace-pre-line">
        <p>{post.summary}</p>
      </div>

      {/* Day-by-Day Itinerary */}
      {post.itinerary && post.itinerary.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2 mb-5 flex items-center gap-2">
            <span>🗓️</span> দিনভিত্তিক ভ্রমণ পরিকল্পনা
          </h2>
          <div className="space-y-4">
            {post.itinerary.map((item, idx) => (
              <div key={idx} className="border-l-3 border-emerald-700 pl-4 py-1.5 bg-stone-50/50 rounded-r-lg">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  {item.day}: {item.title}
                </span>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How to Reach */}
      {post.howToGo && post.howToGo.length > 0 && (
        <section className="mb-10 bg-blue-50/70 border-l-4 border-blue-600 p-5 rounded-r-xl">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span>🚌</span> কীভাবে যাবেন (যাতায়াত ও রুট ডিরেকশন)
          </h3>
          <ul className="space-y-2 text-sm text-blue-950">
            {post.howToGo.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Where to Stay and Food */}
      {post.stayAndFood && post.stayAndFood.length > 0 && (
        <section className="mb-10">
          <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-2 mb-4 flex items-center gap-2">
            <span>🏡</span> কোথায় থাকবেন ও কী খাবেন
          </h3>
          <div className="space-y-2.5 text-sm sm:text-base text-stone-700">
            {post.stayAndFood.map((info, idx) => (
              <p key={idx} className="leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-100">
                {info}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Tips and Warnings */}
      {post.tipsAndRules && post.tipsAndRules.length > 0 && (
        <section className="mb-12 bg-amber-50/80 border-l-4 border-amber-600 p-5 rounded-r-xl">
          <h3 className="text-base sm:text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            পরিবেশ রক্ষা ও জরুরি নিরাপত্তা নিয়মাবলী
          </h3>
          <ul className="space-y-2 text-sm text-amber-950">
            {post.tipsAndRules.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">✓</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Comments Section */}
      <section className="border-t border-stone-200 pt-8 mb-12">
        <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-800" />
          <span>ভ্রমণকারীদের মন্তব্য ও অভিজ্ঞতা ({postComments.length})</span>
        </h3>

        {/* Existing comments */}
        {postComments.length === 0 ? (
          <p className="text-xs text-stone-500 italic mb-6">
            এখনও কোনো মন্তব্য করা হয়নি। আপনার অভিজ্ঞতা প্রথম শেয়ার করুন!
          </p>
        ) : (
          <div className="space-y-3 mb-6">
            {postComments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-stone-800">{comment.author}</span>
                  <span className="text-[11px] text-stone-400">{comment.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* New comment input */}
        <form onSubmit={handleCommentSubmit} className="bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
            আপনার অভিজ্ঞতা বা প্রশ্ন লিখুন
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="আপনার নাম..."
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-emerald-700"
              required
            />
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="এই স্থানটিতে ভ্রমণের অভিজ্ঞতা বা কোনো নতুন আপডেট থাকলে জানান..."
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg bg-white border border-stone-300 focus:outline-none focus:border-emerald-700"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>মন্তব্য প্রকাশ করুন</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-stone-200 pt-8">
          <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-800" />
            অনুরূপ আরও ভ্রমণ গাইড
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelated(rel)}
                className="group bg-white p-3 rounded-lg border border-stone-200 hover:border-emerald-700 cursor-pointer transition-all"
              >
                <img
                  src={rel.featuredImage}
                  alt={rel.title}
                  className="w-full h-28 object-cover rounded mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg';
                  }}
                />
                <span className="text-[10px] font-semibold text-emerald-800 block mb-0.5">
                  {rel.division} · {rel.district}
                </span>
                <h4 className="text-xs font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-800">
                  {rel.title}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
