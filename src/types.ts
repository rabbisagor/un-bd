export interface TravelItineraryItem {
  day: string;
  title: string;
  desc: string;
}

export interface TravelPost {
  id: string;
  title: string;
  subtitle: string;
  division: 'চট্টগ্রাম' | 'সিলেট' | 'খুলনা' | 'বরিশাল' | 'রাজশাহী' | 'রংপুর' | 'ময়মনসিংহ' | 'ঢাকা';
  district: string;
  bestSeason: string;
  duration: string;
  budgetEst: string;
  difficulty: 'সহজ' | 'মাঝারি' | 'অ্যাডভেঞ্চার / ট্র্যাকিং';
  category: 'পাহাড় ও ঝরনা' | 'হাওর ও নদী' | 'ম্যানগ্রোভ ও বন্যপ্রাণী' | 'হেরিটেজ ও ইতিহাস' | 'দ্বীপ ও উপকূল' | 'অফবিট গ্রাম';
  featuredImage: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  itinerary: TravelItineraryItem[];
  howToGo: string[];
  stayAndFood: string[];
  tipsAndRules: string[];
  isUserCreated?: boolean;
}

export interface PostComment {
  id: string;
  postId: string;
  author: string;
  text: string;
  date: string;
}
