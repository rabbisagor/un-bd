import React from 'react';
import { TravelPost } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: TravelPost;
  onSelect: (post: TravelPost) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(post)}
      className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-emerald-700/50 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/hero_bangladesh_landscape_1791485381259.jpg';
          }}
        />
        {/* Division & District Overlay Text */}
        <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
          {post.division} · {post.district}
        </div>

        {post.isUserCreated && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            আপনার পোস্ট
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Zero-pill format */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 mb-2 leading-snug">
            {post.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {post.summary}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-5 h-5 rounded-full border border-stone-200"
            />
            <span className="font-medium text-stone-700">{post.author.name}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-800 font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>বাজেট: {post.budgetEst}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
