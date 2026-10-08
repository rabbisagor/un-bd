export interface PostInputData {
  title: string;
  subtitle?: string;
  division: string;
  district: string;
  bestSeason: string;
  duration: string;
  budgetEst: string;
  difficulty: string;
  featuredImageUrl: string;
  summary: string;
  howToGo: string;
  whereToStay: string;
  foodTips: string;
  itinerary: { day: string; title: string; desc: string }[];
  cautions: string;
}

export function generatePostBloggerHtml(data: PostInputData): string {
  const itineraryHtml = data.itinerary
    .filter(item => item.title.trim())
    .map(
      (item) => `
    <div style="border-left: 3px solid #059669; padding-left: 18px; margin: 18px 0;">
      <h4 style="margin: 0 0 6px 0; color: #1c1917; font-size: 17px; font-weight: 600;">📍 ${item.day}: ${item.title}</h4>
      <p style="margin: 0; color: #57534e; line-height: 1.6; font-size: 15px;">${item.desc}</p>
    </div>`
    )
    .join('');

  return `<!-- ==============================================
  Unseen Bangladesh Travel Post Template for Blogger
  পদ্ধতি: ব্লগারে পোস্ট করার সময় 'HTML View' তে পেস্ট করুন
============================================== -->

<!-- ট্রাভেল সামারি কার্ড (Quick Facts) -->
<div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px 24px; margin: 24px 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
  <div>
    <span style="font-size: 12px; color: #166534; font-weight: 600; text-transform: uppercase; display: block;">📍 অবস্থান ও জেলা</span>
    <strong style="font-size: 15px; color: #14532d;">${data.district || 'বাংলাদেশ'}, ${data.division}</strong>
  </div>
  <div>
    <span style="font-size: 12px; color: #166534; font-weight: 600; text-transform: uppercase; display: block;">☀️ ভ্রমণের সেরা সময়</span>
    <strong style="font-size: 15px; color: #14532d;">${data.bestSeason || 'যেকোনো সময়'}</strong>
  </div>
  <div>
    <span style="font-size: 12px; color: #166534; font-weight: 600; text-transform: uppercase; display: block;">💰 আনুমানিক বাজেট</span>
    <strong style="font-size: 15px; color: #14532d;">${data.budgetEst || 'স্বল্প বাজেট'}</strong>
  </div>
  <div>
    <span style="font-size: 12px; color: #166534; font-weight: 600; text-transform: uppercase; display: block;">⏱️ সময়কাল ও মাত্রা</span>
    <strong style="font-size: 15px; color: #14532d;">${data.duration} (${data.difficulty})</strong>
  </div>
</div>

<!-- ভূমিকা / সারসংক্ষেপ -->
<div style="font-size: 17px; line-height: 1.8; color: #292524; margin-bottom: 28px;">
  <p>${data.summary}</p>
</div>

${
  data.featuredImageUrl
    ? `<!-- ফিচার্ড ফটো -->
<div style="margin: 24px 0; border-radius: 10px; overflow: hidden; text-align: center;">
  <img src="${data.featuredImageUrl}" alt="${data.title}" style="width: 100%; border-radius: 8px; max-height: 520px; object-fit: cover;" />
  <p style="font-size: 13px; color: #78716c; margin-top: 8px; font-style: italic;">ছবি: ${data.title} (${data.district})</p>
</div>`
    : ''
}

<!-- দিনভিত্তিক ভ্রমণ পরিকল্পনা (Itinerary) -->
<h3 style="color: #059669; font-size: 22px; font-weight: 700; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 36px;">
  🗓️ দিনভিত্তিক ভ্রমণ পরিকল্পনা
</h3>
${itineraryHtml || '<p style="color: #78716c;">পরিকল্পনা বিস্তারিত বর্ণিত হবে।</p>'}

<!-- যাতায়াত ও রুট গাইড -->
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 0 8px 8px 0; margin: 30px 0;">
  <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 19px; font-weight: 700;">🚌 কীভাবে যাবেন (রুট ডিরেকশন)</h3>
  <div style="color: #1e3a8a; line-height: 1.7; font-size: 15px;">
    ${data.howToGo ? data.howToGo.replace(/\\n/g, '<br/>') : 'লোকাল বাস বা ট্রেনে সরাসরি যাওয়া যায়।'}
  </div>
</div>

<!-- থাকা ও খাওয়া -->
<h3 style="color: #059669; font-size: 22px; font-weight: 700; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 36px;">
  🏡 কোথায় থাকবেন ও কী খাবেন
</h3>
<p style="font-size: 16px; line-height: 1.7; color: #3f3f46;">
  <strong>থাকার ব্যবস্থা:</strong> ${data.whereToStay || 'নিকটস্থ পর্যটন মোটেল বা স্থানীয় রিসোর্ট।'}
</p>
<p style="font-size: 16px; line-height: 1.7; color: #3f3f46;">
  <strong>খাবার দাবার:</strong> ${data.foodTips || 'স্থানীয় ঐতিহ্যবাহী খাবার পরখ করে দেখুন।'}
</p>

<!-- পরিবেশ রক্ষা ও সতর্কতা -->
<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 0 8px 8px 0; margin: 30px 0;">
  <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 19px; font-weight: 700;">⚠️ বিশেষ সতর্কতা ও পরিবেশ রক্ষা</h3>
  <p style="color: #78350f; line-height: 1.7; font-size: 15px; margin: 0;">
    ${data.cautions || 'প্রকৃতির পবিত্রতা রক্ষা করুন, অপচনশীল কোনো প্লাস্টিক ফেলে আসবেন না। স্থানীয় মানুষদের সংস্কৃতির প্রতি সম্মান রাখুন।'}
  </p>
</div>
`;
}
