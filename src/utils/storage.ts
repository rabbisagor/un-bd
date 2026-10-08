import { TravelPost, PostComment } from '../types';
import { INITIAL_POSTS } from '../data/samplePosts';

const STORAGE_POSTS_KEY = 'unseen_bangladesh_posts_v2';
const STORAGE_COMMENTS_KEY = 'unseen_bangladesh_comments_v2';

export function getStoredPosts(): TravelPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_POSTS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_POSTS;
  } catch {
    return INITIAL_POSTS;
  }
}

export function savePosts(posts: TravelPost[]): void {
  try {
    localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save posts to localStorage', err);
  }
}

export function getStoredComments(): PostComment[] {
  try {
    const raw = localStorage.getItem(STORAGE_COMMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveComments(comments: PostComment[]): void {
  try {
    localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(comments));
  } catch (err) {
    console.error('Failed to save comments', err);
  }
}

export function exportPostsToJsonFile(posts: TravelPost[]): void {
  const jsonStr = JSON.stringify(posts, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `unseen-bangladesh-posts-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
