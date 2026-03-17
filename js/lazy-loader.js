/**
 * 按需載入 JavaScript 庫
 * 遵循 "Be Pragmatic" 原則：只載入真正需要的庫
 */

const LazyLoader = {
  /**
   * 已載入的腳本記錄
   */
  loadedScripts: new Set(),

  /**
   * 載入單一腳本
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      // 如果已載入，直接返回
      if (this.loadedScripts.has(src)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        this.loadedScripts.add(src);
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  },

  /**
   * 條件載入：只在元素存在時載入
   */
  loadWhenExists(scriptPath, selector) {
    if (document.querySelector(selector)) {
      return this.loadScript(scriptPath);
    }
    return Promise.resolve();
  },

  /**
   * 延遲載入：當用戶滾動到特定區域時載入
   */
  loadOnScroll(scriptPath, selector, threshold = 200) {
    const element = document.querySelector(selector);
    if (!element) return Promise.resolve();

    return new Promise((resolve) => {
      const checkScroll = () => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + threshold;

        if (isVisible) {
          window.removeEventListener('scroll', checkScroll);
          this.loadScript(scriptPath).then(resolve);
        }
      };

      window.addEventListener('scroll', checkScroll);
      checkScroll(); // 初始檢查
    });
  },

  /**
   * 首頁專用庫載入
   */
  loadIndexPageLibraries() {
    const promises = [];

    // Isotope 用於 portfolio 過濾
    if (document.querySelector('.portfolio-container')) {
      promises.push(this.loadScript('lib/isotope/isotope.pkgd.min.js'));
    }

    // Counter 用於數字動畫
    if (document.querySelector('[data-toggle="counter-up"]')) {
      promises.push(
        this.loadScript('lib/waypoints/waypoints.min.js').then(() => 
          this.loadScript('lib/counterup/counterup.min.js')
        )
      );
    }

    // Lightbox 用於圖片畫廊
    if (document.querySelector('[data-lightbox]')) {
      promises.push(this.loadScript('lib/lightbox/js/lightbox.min.js'));
    }

    return Promise.all(promises);
  },

  /**
   * 部落格頁面專用庫載入
   */
  loadBlogPageLibraries() {
    // 目前部落格頁面沒有特殊需求
    return Promise.resolve();
  }
};

/**
 * 頁面類型偵測與自動載入
 */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  // 根據頁面類型載入對應庫
  if (page === 'index.html' || page === '') {
    LazyLoader.loadIndexPageLibraries().then(() => {
      console.log('Index page libraries loaded');
    });
  } else if (page === 'blog.html' || page.startsWith('blog-details')) {
    LazyLoader.loadBlogPageLibraries().then(() => {
      console.log('Blog page libraries loaded');
    });
  }
});

// 導出供其他模組使用
window.LazyLoader = LazyLoader;
