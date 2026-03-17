/**
 * Main JavaScript - 模組化重構版本
 * 遵循 "Simplicity Rules" 和 "Good Taste" 原則
 */

/**
 * Cookie Alert 管理
 */
const CookieAlert = {
  init() {
    const cookieAlert = document.querySelector('.cookiealert');
    const acceptButton = document.querySelector('.acceptcookies');
    
    if (!cookieAlert) return;

    // 檢查是否已接受 cookies
    if (!this.getCookie('acceptCookies')) {
      cookieAlert.classList.add('show');
    }

    // 綁定接受按鈕
    if (acceptButton) {
      acceptButton.addEventListener('click', () => {
        this.acceptCookies();
        cookieAlert.classList.remove('show');
      });
    }
  },

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  },

  acceptCookies() {
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `acceptCookies=true;expires=${expiry.toUTCString()};path=/`;
    window.dispatchEvent(new Event('cookieAlertAccept'));
  }
};

/**
 * 頁面載入動畫 (Spinner)
 */
const Spinner = {
  init() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
      setTimeout(() => {
        spinner.classList.remove('show');
      }, 100);
    }
  }
};

/**
 * 導航列控制
 */
const Navigation = {
  init() {
    this.initStickyNav();
    this.initBackToTop();
    this.initSmoothScroll();
  },

  initStickyNav() {
    const navbar = document.querySelector('.sticky-top');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        navbar.classList.add('shadow-sm');
        navbar.style.top = '0px';
      } else {
        navbar.classList.remove('shadow-sm');
        navbar.style.top = '-100px';
      }
    };

    window.addEventListener('scroll', handleScroll);
  },

  initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    };

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', handleScroll);
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // 忽略空錨點和無效選擇器
        if (href === '#' || href === '#quote') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

/**
 * 動畫效果管理
 */
const Animations = {
  init() {
    // WOW.js 動畫初始化
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }
  }
};

/**
 * Carousel 輪播
 */
const Carousel = {
  init() {
    this.initHeaderCarousel();
    this.initTestimonialCarousel();
  },

  initHeaderCarousel() {
    const headerCarousel = $('.header-carousel');
    if (headerCarousel.length === 0) return;

    headerCarousel.owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      dotsData: true
    });
  },

  initTestimonialCarousel() {
    const testimonialCarousel = $('.testimonial-carousel');
    if (testimonialCarousel.length === 0) return;

    testimonialCarousel.owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>'
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 2 }
      }
    });
  }
};

/**
 * Portfolio 過濾器
 */
const Portfolio = {
  init() {
    const container = $('.portfolio-container');
    if (container.length === 0) return;

    // 初始化 Isotope
    const iso = container.isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    // 綁定過濾按鈕
    $('#portfolio-flters li').on('click', function() {
      $('#portfolio-flters li').removeClass('active');
      $(this).addClass('active');
      
      iso.isotope({
        filter: $(this).data('filter')
      });
    });
  }
};

/**
 * Counter 數字動畫
 */
const Counter = {
  init() {
    const counters = $('[data-toggle="counter-up"]');
    if (counters.length === 0) return;

    counters.counterUp({
      delay: 10,
      time: 2000
    });
  }
};

/**
 * 主初始化函數
 */
const App = {
  init() {
    // 基礎功能（所有頁面）
    Spinner.init();
    CookieAlert.init();
    Navigation.init();
    Animations.init();

    // 首頁特定功能
    if (this.isIndexPage()) {
      Carousel.init();
      
      // 等待 Isotope 載入後初始化
      if (typeof $.fn.isotope !== 'undefined') {
        Portfolio.init();
      }
      
      // 等待 Counter 載入後初始化
      if (typeof $.fn.counterUp !== 'undefined') {
        Counter.init();
      }
    }
  },

  isIndexPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page === 'index.html' || page === '' || page === 'index-optimized.html';
  }
};

// jQuery Ready
$(document).ready(() => {
  App.init();
});

// 原生 JS DOMContentLoaded（備用）
document.addEventListener('DOMContentLoaded', () => {
  // 如果 jQuery 未載入，使用原生實現
  if (typeof $ === 'undefined') {
    console.warn('jQuery not loaded, some features may not work');
    
    // 至少初始化基礎功能
    Spinner.init();
    CookieAlert.init();
    Navigation.init();
  }
});
