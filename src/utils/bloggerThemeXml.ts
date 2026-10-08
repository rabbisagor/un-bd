export interface ThemeConfig {
  blogName: string;
  blogDescription: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  blogName: 'অদেখা বাংলাদেশ',
  blogDescription: 'বাংলাদেশের নদী, পাহাড়, বন ও লোকালয়ের অজানা রূপ ও ট্রাভেল গাইড',
  primaryColor: '#059669', // Emerald 600
  accentColor: '#d97706',  // Amber 600
  fontFamily: "'Hind Siliguri', 'Plus Jakarta Sans', sans-serif",
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
};

export function generateBloggerXml(config: ThemeConfig = DEFAULT_THEME_CONFIG): string {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsversion='3' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
  <title><b:if cond='data:view.isHomepage'>${config.blogName} - ${config.blogDescription}<b:else/><data:blog.pageTitle/></b:if></title>
  
  <!-- SEO & Meta Tags -->
  <b:include data='blog' name='all-head-content'/>
  <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
  <meta content='${config.blogDescription}' name='description'/>
  <meta content='${config.primaryColor}' name='theme-color'/>

  <!-- Google Fonts: Hind Siliguri (Bangla) & Plus Jakarta Sans -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap' rel='stylesheet'/>

  <b:skin><![CDATA[
  /*
  * -------------------------------------------------------------
  * Theme Name: Unseen Bangladesh (অদেখা বাংলাদেশ)
  * Design Inspiration: unseenbangladesh.com
  * Version: 2.5.0
  * Author: AI Studio Travel Design
  * Description: Premium Responsive Travel & Storytelling Blogger Theme
  * -------------------------------------------------------------
  */

  :root {
    --primary: ${config.primaryColor};
    --primary-dark: #047857;
    --primary-light: #ecfdf5;
    --accent: ${config.accentColor};
    --bg-page: #fbfbfa;
    --bg-card: #ffffff;
    --text-main: #1c1917;
    --text-muted: #57534e;
    --border-color: #e7e5e4;
    --shadow-soft: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
    --font-family: ${config.fontFamily};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--bg-page);
    color: var(--text-main);
    font-family: var(--font-family);
    line-height: 1.7;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Containers */
  .ub-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Top Bar */
  .ub-header {
    background: #ffffff;
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .ub-nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  .ub-brand {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-main);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ub-brand span {
    color: var(--primary);
  }

  .ub-nav-menu {
    display: flex;
    gap: 28px;
    list-style: none;
  }

  .ub-nav-menu a {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-muted);
  }

  .ub-nav-menu a:hover {
    color: var(--primary);
  }

  .ub-header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ub-action-btn {
    background: var(--primary);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 18px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .ub-action-btn:hover {
    background: var(--primary-dark);
  }

  /* Hero Section */
  .ub-hero {
    background: linear-gradient(180deg, #18221b 0%, #0d130f 100%);
    color: #ffffff;
    padding: 60px 0 80px 0;
    position: relative;
    overflow: hidden;
  }

  .ub-hero-content {
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
  }

  .ub-hero-kicker {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #34d399;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .ub-hero-title {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 700;
    margin-bottom: 18px;
  }

  .ub-hero-subtitle {
    font-size: 17px;
    color: #cbd5e1;
    margin-bottom: 30px;
  }

  /* Division Filter Strip */
  .ub-division-strip {
    background: #ffffff;
    border-bottom: 1px solid var(--border-color);
    padding: 12px 0;
  }

  .ub-division-list {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .ub-division-btn {
    font-size: 14px;
    font-weight: 500;
    padding: 6px 16px;
    border-radius: 999px;
    background: #f5f5f4;
    color: var(--text-muted);
    white-space: nowrap;
    border: 1px solid transparent;
  }

  .ub-division-btn:hover, .ub-division-btn.active {
    background: var(--primary-light);
    color: var(--primary-dark);
    border-color: #a7f3d0;
  }

  /* Layout Structure */
  .ub-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 40px;
    padding: 50px 0;
  }

  /* Post Cards Grid */
  .ub-posts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  .ub-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .ub-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft);
  }

  .ub-card-thumb {
    position: relative;
    aspect-ratio: 16/10;
    background: #e7e5e4;
    overflow: hidden;
  }

  .ub-card-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .ub-card:hover .ub-card-thumb img {
    transform: scale(1.05);
  }

  .ub-badge-division {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(15, 23, 42, 0.85);
    color: #ffffff;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 4px;
    backdrop-filter: blur(4px);
  }

  .ub-card-body {
    padding: 22px;
  }

  .ub-card-meta {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ub-card-title {
    font-size: 19px;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 10px;
    color: var(--text-main);
  }

  .ub-card-title a:hover {
    color: var(--primary);
  }

  .ub-card-snippet {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .ub-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f5f5f4;
    padding-top: 14px;
    font-size: 13px;
  }

  .ub-author {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }

  .ub-author img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

  /* Single Post Styling */
  .ub-single-post {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 40px;
  }

  .ub-post-header {
    margin-bottom: 28px;
  }

  .ub-post-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 14px;
  }

  .ub-post-title {
    font-size: 34px;
    line-height: 1.3;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 16px;
  }

  /* Travel Specific Formatted Boxes for Post Content */
  .ub-quick-facts {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 10px;
    padding: 20px 24px;
    margin: 28px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .ub-fact-item {
    font-size: 13px;
  }

  .ub-fact-label {
    color: #166534;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .ub-fact-val {
    font-size: 15px;
    font-weight: 700;
    color: #14532d;
  }

  .ub-itinerary-step {
    border-left: 3px solid var(--primary);
    padding-left: 18px;
    margin: 20px 0;
  }

  .ub-itinerary-step h4 {
    font-size: 17px;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 4px;
  }

  .ub-itinerary-step p {
    font-size: 15px;
    color: var(--text-muted);
  }

  .ub-route-box {
    background: #eff6ff;
    border-left: 4px solid #3b82f6;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin: 24px 0;
  }

  .ub-warning-box {
    background: #fffbeb;
    border-left: 4px solid #f59e0b;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin: 24px 0;
  }

  /* Sidebar */
  .ub-sidebar {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .ub-widget {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
  }

  .ub-widget-title {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f5f5f4;
    position: relative;
  }

  .ub-widget-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--primary);
  }

  /* Footer */
  .ub-footer {
    background: #1c1917;
    color: #a8a29e;
    padding: 50px 0 30px 0;
    margin-top: 60px;
  }

  .ub-footer a {
    color: #e7e5e4;
  }

  .ub-footer-bottom {
    border-top: 1px solid #292524;
    padding-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }

  /* Responsive Rules */
  @media (max-width: 992px) {
    .ub-layout {
      grid-template-columns: 1fr;
    }
    .ub-posts-grid {
      grid-template-columns: 1fr;
    }
    .ub-quick-facts {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .ub-nav-menu {
      display: none;
    }
    .ub-hero-title {
      font-size: 28px;
    }
    .ub-single-post {
      padding: 20px;
    }
  }
  ]]></b:skin>
</head>

<body>
  <!-- Top Navigation Header -->
  <header class='ub-header'>
    <div class='ub-container ub-nav-inner'>
      <a class='ub-brand' expr:href='data:blog.homepageUrl'>
        <span>🌲</span> ${config.blogName}
      </a>

      <nav class='ub-nav-menu'>
        <a expr:href='data:blog.homepageUrl'>হোম</a>
        <a href='/search/label/পাহাড়'>পাহাড় ও ঝরনা</a>
        <a href='/search/label/হাওর'>হাওর ও নদী</a>
        <a href='/search/label/বন'>সুন্দরবন</a>
        <a href='/search/label/হেরিটেজ'>ঐতিহ্য</a>
        <a href='#about'>আমাদের সম্পর্কে</a>
      </nav>

      <div class='ub-header-actions'>
        <a class='ub-action-btn' href='${config.facebookUrl}' target='_blank'>
          ফেসবুক পেজ
        </a>
      </div>
    </div>
  </header>

  <!-- Homepage Hero Section (Only shows on homepage) -->
  <b:if cond='data:view.isHomepage'>
    <section class='ub-hero'>
      <div class='ub-container'>
        <div class='ub-hero-content'>
          <p class='ub-hero-kicker'>অদেখা বাংলাদেশ ট্রাভেল ডায়েরি</p>
          <h1 class='ub-hero-title'>বাংলাদেশের অজানা পাহাড়, নদী ও লোকালয়ের সন্ধান</h1>
          <p class='ub-hero-subtitle'>প্রকৃতির আদিম সৌন্দর্যের রোমাঞ্চকর ভ্রমণ কাহিনী, নিখুঁত রুট ম্যাপ ও স্থানীয় সংস্কৃতির পূর্ণাঙ্গ বিবরণী</p>
        </div>
      </div>
    </section>
  </b:if>

  <!-- Division Navigation Tabs -->
  <div class='ub-division-strip'>
    <div class='ub-container'>
      <div class='ub-division-list'>
        <a class='ub-division-btn active' expr:href='data:blog.homepageUrl'>সকল গন্তব্য</a>
        <a class='ub-division-btn' href='/search/label/চট্টগ্রাম'>চট্টগ্রাম</a>
        <a class='ub-division-btn' href='/search/label/সিলেট'>সিলেট</a>
        <a class='ub-division-btn' href='/search/label/বরিশাল'>বরিশাল</a>
        <a class='ub-division-btn' href='/search/label/খুলনা'>খুলনা</a>
        <a class='ub-division-btn' href='/search/label/রাজশাহী'>রাজশাহী</a>
        <a class='ub-division-btn' href='/search/label/রংপুর'>রংপুর</a>
        <a class='ub-division-btn' href='/search/label/ময়মনসিংহ'>ময়মনসিংহ</a>
        <a class='ub-division-btn' href='/search/label/ঢাকা'>ঢাকা</a>
      </div>
    </div>
  </div>

  <!-- Main Body Content -->
  <main class='ub-container'>
    <div class='ub-layout'>
      <!-- Posts Section -->
      <div class='ub-main-content'>
        <b:section class='main' id='main' showaddelement='yes'>
          <b:widget id='Blog1' locked='true' title='ভ্রমণ পোস্টসমূহ' type='Blog' version='2'>
            <b:includable id='main' var='this'>
              <!-- Post List Loop -->
              <b:if cond='data:view.isMultipleItems'>
                <div class='ub-posts-grid'>
                  <b:loop values='data:posts' var='post'>
                    <article class='ub-card'>
                      <div class='ub-card-thumb'>
                        <b:if cond='data:post.featuredImage'>
                          <img expr:alt='data:post.title' expr:src='data:post.featuredImage'/>
                        <b:else/>
                          <img alt='Unseen Bangladesh' src='https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&amp;q=80'/>
                        </b:if>
                        <b:if cond='data:post.labels'>
                          <span class='ub-badge-division'><data:post.labels.first.name/></span>
                        </b:if>
                      </div>
                      <div class='ub-card-body'>
                        <div class='ub-card-meta'>
                          <span>📅 <data:post.date/></span>
                          <span>•</span>
                          <span>⏱️ ৫ মিনিট পড়া</span>
                        </div>
                        <h2 class='ub-card-title'>
                          <a expr:href='data:post.url'><data:post.title/></a>
                        </h2>
                        <p class='ub-card-snippet'>
                          <data:post.snippets.short/>
                        </p>
                        <div class='ub-card-footer'>
                          <div class='ub-author'>
                            <span>✍️ <data:post.author.name/></span>
                          </div>
                          <a expr:href='data:post.url' style='color: var(--primary); font-weight: 600;'>বিস্তারিত পড়ুন →</a>
                        </div>
                      </div>
                    </article>
                  </b:loop>
                </div>
              </b:if>

              <!-- Single Post View -->
              <b:if cond='data:view.isPost'>
                <b:loop values='data:posts' var='post'>
                  <article class='ub-single-post'>
                    <header class='ub-post-header'>
                      <div class='ub-post-meta'>
                        <span>📅 <data:post.date/></span>
                        <span>•</span>
                        <span>✍️ <data:post.author.name/></span>
                        <b:if cond='data:post.labels'>
                          <span>•</span>
                          <span>🏷️ <b:loop values='data:post.labels' var='label'><data:label.name/> </b:loop></span>
                        </b:if>
                      </div>
                      <h1 class='ub-post-title'><data:post.title/></h1>
                    </header>

                    <!-- Post Body Content -->
                    <div class='ub-post-body' id='post-body'>
                      <data:post.body/>
                    </div>

                    <!-- Author Box & Share -->
                    <div style='margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;'>
                      <div>
                        <strong>লিখেছেন:</strong> <data:post.author.name/>
                      </div>
                      <div style='display: flex; gap: 10px;'>
                        <a expr:href='"https://www.facebook.com/sharer/sharer.php?u=" + data:post.url' style='background: #1877f2; color: #fff; padding: 6px 14px; border-radius: 6px; font-size: 13px;' target='_blank'>ফেসবুকে শেয়ার</a>
                      </div>
                    </div>
                  </article>
                </b:loop>
              </b:if>
            </b:includable>
          </b:widget>
        </b:section>
      </div>

      <!-- Sidebar -->
      <aside class='ub-sidebar'>
        <b:section class='sidebar' id='sidebar' showaddelement='yes'>
          <b:widget id='AboutWidget' locked='false' title='অদেখা বাংলাদেশ' type='HTML' version='2'>
            <b:includable id='main'>
              <div class='ub-widget' id='about'>
                <h3 class='ub-widget-title'>আমাদের কথা</h3>
                <p style='font-size: 14px; color: var(--text-muted); line-height: 1.6;'>
                  ${config.blogDescription}। আমাদের লক্ষ্য বাংলাদেশের অজানা সৌন্দর্য ও রূপকে দায়িত্বশীল ভ্রমণের মাধ্যমে তুলে ধরা।
                </p>
                <div style='margin-top: 16px; display: flex; gap: 12px;'>
                  <a href='${config.facebookUrl}' target='_blank'>📘 Facebook</a>
                  <a href='${config.instagramUrl}' target='_blank'>📷 Instagram</a>
                  <a href='${config.youtubeUrl}' target='_blank'>▶️ YouTube</a>
                </div>
              </div>
            </b:includable>
          </b:widget>

          <b:widget id='TravelTipsWidget' locked='false' title='ভ্রমণের নিয়মাবলী' type='HTML' version='2'>
            <b:includable id='main'>
              <div class='ub-widget'>
                <h3 class='ub-widget-title'>দায়িত্বশীল ভ্রমণ নীতি</h3>
                <ul style='font-size: 14px; color: var(--text-muted); padding-left: 18px; line-height: 1.7;'>
                  <li>পাহাড় ও হাওরে অপচনশীল কোনো প্লাস্টিক ফেলবেন না।</li>
                  <li>স্থানীয় আদিবাসী সংস্কৃতির প্রতি পূর্ণ সম্মান প্রদর্শন করুন।</li>
                  <li>জরুরি ট্যুরিস্ট পুলিশ হেল্পলাইন: <strong>০১৩২০-২২২২২২</strong></li>
                </ul>
              </div>
            </b:includable>
          </b:widget>
        </b:section>
      </aside>
    </div>
  </main>

  <!-- Footer -->
  <footer class='ub-footer'>
    <div class='ub-container'>
      <div class='ub-footer-bottom'>
        <p>© <data:blog.title/> - সর্বস্বত্ব সংরক্ষিত। Powered by Blogger.</p>
        <p>থিম ডিজাইন: <strong>অদেখা বাংলাদেশ ট্রাভেল থিম</strong></p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
