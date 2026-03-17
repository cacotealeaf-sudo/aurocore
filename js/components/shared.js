/**
 * Shared Components - 可重用的頁面組件
 * 遵循 "Good Taste" 原則：消除重複代碼
 * 
 * 🔒 安全性更新 2025-11-16:
 *    - 所有外部連結添加 rel="noopener noreferrer"
 *    - iframe 添加 sandbox 屬性
 *    - 表單添加 honeypot 防機器人
 *    - 移除 inline event handlers
 */

const SharedComponents = {
  /**
   * Navbar 組件
   */
  navbar: `
    <!-- Topbar Start -->
    <div class="container-fluid bg-dark p-0">
        <div class="row gx-0 d-none d-lg-flex">
            <div class="col-lg-7 px-5 text-start">
                <div class="h-100 d-inline-flex align-items-center me-4">
                    <small class="fa fa-map-marker-alt text-primary me-2"></small>
                    <small>台北市內湖區洲子街101號2樓</small>
                </div>
                <div class="h-100 d-inline-flex align-items-center">
                    <small class="far fa-clock text-primary me-2"></small>
                    <small>星期一 - 星期五 : 09.00 - 18.00</small>
                </div>
            </div>
            <div class="col-lg-5 px-5 text-end">
                <div class="h-100 d-inline-flex align-items-center me-4">
                    <small class="fa fa-phone-alt text-primary me-2"></small>
                    <small>+886-2-5568-4688</small>
                </div>
                <div class="h-100 d-inline-flex align-items-center mx-n2">
                    <a class="btn btn-square btn-link rounded-0 border-0 border-end border-secondary" href="https://www.facebook.com/AurobaseTW/?fref=ts" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>
        </div>
    </div>
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 shadow-sm">
        <a href="index.html" class="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
            <h2 class="m-0 text-primary">特聿科技行銷</h2>
        </a>
        <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto p-4 p-lg-0">
                <a href="index.html" class="nav-item nav-link">首頁</a>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">解決方案</a>
                    <div class="dropdown-menu nav-link scrollto bg-light m-0">
                        <a href="index.html#inboundservice" class="dropdown-item">Inbound Service</a>
                        <a href="index.html#outboundservice" class="dropdown-item">Outbound Service</a>
                        <a href="index.html#cleaninglist" class="dropdown-item">名單清整</a>
                        <a href="index.html#leadgeneration" class="dropdown-item">潛在客戶開發</a>
                        <a href="index.html#clientwakesup" class="dropdown-item">沉睡客戶喚醒</a>
                        <a href="index.html#cretention" class="dropdown-item">活躍客戶維繫</a>
                        <a href="index.html#promotion" class="dropdown-item">商品/活動推廣</a>
                    </div>
                </div>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">案例分享</a>
                    <div class="dropdown-menu bg-light m-0">
                        <a href="index.html#auropartner" class="dropdown-item">合作夥伴</a>
                        <a href="index.html#projects" class="dropdown-item">成功經驗</a>
                    </div>
                </div>
                <a href="blog.html" class="nav-item nav-link">新聞中心</a>
                <a href="about.html" class="nav-item nav-link">關於特聿</a>
                <a href="#quote" class="nav-item nav-link">聯絡我們</a>
                <a href="#quote" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">免費諮詢<i class="fa fa-arrow-right ms-3"></i></a>
            </div>
        </div>
    </nav>
    <!-- Navbar End -->
  `,

  /**
   * Footer 組件
   */
  footer: `
    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-body footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-white mb-4">聯絡資訊</h5>
                    <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>台北市內湖區洲子街101號2樓</p>
                    <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+886-2-5568-4688</p>
                    <p class="mb-2"><i class="fa fa-envelope me-3"></i>ad@aurocore.com</p>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-white mb-4">快速連結</h5>
                    <a class="btn btn-link" href="index.html#inboundservice">Inbound Service</a>
                    <a class="btn btn-link" href="index.html#outboundservice">Outbound Service</a>
                    <a class="btn btn-link" href="index.html#cleaninglist">名單清整</a>
                    <a class="btn btn-link" href="#quote">聯絡我們</a>
                    <a class="btn btn-link" href="privacypolicy.html">隱私權政策</a>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-white mb-4">成功案例</h5>
                    <div class="row g-2">
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-1.jpg" alt="新安東京海上產險">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-2.jpg" alt="克緹國際">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-3.jpg" alt="雀巢">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-4.jpg" alt="綠色和平">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="copyright">
                <div class="row">
                    <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a href="#">特聿科技行銷</a>, All Right Reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->

    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i class="bi bi-arrow-up"></i></a>
  `,

  /**
   * Contact Form 組件
   * 🔒 安全性增強:
   *    - Google Maps iframe 添加 sandbox 和 loading="lazy"
   *    - 表單添加 honeypot 欄位
   *    - 移除 inline onload，改用 JavaScript 事件監聽
   *    - 添加基本輸入驗證
   */
  contactForm: `
    <section id="quote" class="quote">
    <div class="container-fluid bg-light overflow-hidden my-5 px-lg-0">
        <div class="container quote px-lg-0">
            <div class="row g-0 mx-lg-0">
                <div class="col-lg-6 ps-lg-0 wow fadeIn" data-wow-delay="0.1s" style="min-height: 400px;">
                    <div class="position-relative h-100">
                        <iframe 
                            class="position-absolute w-100 h-100" 
                            style="object-fit: cover;"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14454.491407392406!2d121.569899!3d25.080769!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac6f755c2fb3%3A0xd1e120b473f5358f!2zMTE05Y-w54Gj5Y-w5YyX5biC5YWn5rmW5Y2A5rSy5a2Q6KGXMTAx6Jmf!5e0!3m2!1szh-TW!2sus!4v1542970493175"
                            frameborder="0" 
                            allowfullscreen="" 
                            aria-hidden="false"
                            tabindex="0"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                            title="公司位置地圖"></iframe>
                    </div>
                </div>
                <div class="col-lg-6 quote-text py-5 wow fadeIn" data-wow-delay="0.5s">
                    <div class="p-lg-5 pe-lg-0">
                        <h6 class="text-primary">免費諮詢</h6>
                        <h1 class="mb-4">創造事業的下一個高峰！</h1>
                        <p class="mb-4 pb-2">立即填寫諮詢表單，將有專人與您聯繫。</p>
                        
                        <!-- 🔒 安全: 移除 inline onload，改用 ID 讓 JS 處理 -->
                        <iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" title="表單提交框架"></iframe>
                        
                        <form id="contact-form" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfM2B41v2YPS6iFr6I-V2NNPJjB30MM2bKXXFY4EzFalRp7SQ/formResponse" method="POST" target="hidden_iframe">
                            <div class="row g-3">
                                <!-- 🔒 Honeypot 欄位 - 機器人會填寫這個，正常用戶看不到 -->
                                <div style="position: absolute; left: -9999px;" aria-hidden="true">
                                    <input type="text" name="website" tabindex="-1" autocomplete="off" placeholder="Leave this empty">
                                </div>
                                
                                <div class="col-12 col-sm-6">
                                    <input type="text" name="entry.379469669" required class="form-control border-0" placeholder="您的姓名(必填)" style="height: 55px;" maxlength="50" pattern="[^<>]*">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="email" name="entry.428782431" required class="form-control border-0" placeholder="您的E-mail(必填)" style="height: 55px;" maxlength="100">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="tel" name="entry.1965807021" required class="form-control border-0" placeholder="您的電話(必填)" style="height: 55px;" maxlength="20" pattern="[0-9+\\-\\s()]*">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="text" name="entry.49213615" class="form-control border-0" placeholder="您的公司名稱" style="height: 55px;" maxlength="100" pattern="[^<>]*">
                                </div>
                                <label class="col-12 col-form-label">詢問類型</label>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="entry.899689515" value="Inbound Service" id="inbound-service" style="height: 18px; width: 18px;">
                                        <label class="form-check-label" for="inbound-service">
                                            Inbound Service
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="entry.899689515" value="Outbound Service" id="outbound-service" style="height: 18px; width: 18px;">
                                        <label class="form-check-label" for="outbound-service">
                                            Outbound Service
                                        </label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <textarea class="form-control border-0" name="entry.1318423812" placeholder="需求說明" maxlength="1000"></textarea>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary rounded-pill py-3 px-5" type="submit" id="submit-btn">送出</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
  `,

  /**
   * 載入組件到指定位置
   */
  load(componentName, targetSelector) {
    const element = document.querySelector(targetSelector);
    if (element && this[componentName]) {
      element.innerHTML = this[componentName];
      return true;
    }
    return false;
  },

  /**
   * 初始化表單安全性
   */
  initFormSecurity() {
    const form = document.getElementById('contact-form');
    const hiddenIframe = document.getElementById('hidden_iframe');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!form || !hiddenIframe) return;
    
    let formSubmitted = false;
    let submitCount = 0;
    
    // 🔒 監聽 iframe 載入事件（替代 inline onload）
    hiddenIframe.addEventListener('load', function() {
      if (formSubmitted) {
        // 延遲跳轉，確保表單提交完成
        setTimeout(() => {
          window.location.href = 'thanks.html';
        }, 500);
      }
    });
    
    // 🔒 表單提交前驗證
    form.addEventListener('submit', function(e) {
      // 檢查 honeypot
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value !== '') {
        e.preventDefault();
        console.warn('🤖 機器人偵測：honeypot 被填寫');
        return false;
      }
      
      // 防止快速重複提交
      submitCount++;
      if (submitCount > 3) {
        e.preventDefault();
        alert('提交次數過多，請稍後再試。');
        return false;
      }
      
      // 🔒 基本 XSS 檢查
      const inputs = form.querySelectorAll('input[type="text"], textarea');
      for (let input of inputs) {
        if (/<script|javascript:|on\w+=/i.test(input.value)) {
          e.preventDefault();
          alert('輸入內容包含不允許的字元，請修改後重試。');
          return false;
        }
      }
      
      // 禁用提交按鈕防止重複點擊
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '送出中...';
      }
      
      formSubmitted = true;
      
      // 3 秒後重新啟用（如果跳轉失敗）
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '送出';
        }
      }, 3000);
    });
    
    // 🔒 輸入即時驗證
    const textInputs = form.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
      input.addEventListener('input', function() {
        // 移除潛在的 XSS 字元
        this.value = this.value.replace(/<[^>]*>/g, '');
      });
    });
  },

  /**
   * 載入所有共用組件
   */
  loadAll() {
    this.load('navbar', '#app-navbar');
    this.load('footer', '#app-footer');
    
    // 只在有 #app-contact-form 容器時載入聯絡表單
    const hasContactForm = document.querySelector('#app-contact-form');
    if (hasContactForm) {
      this.load('contactForm', '#app-contact-form');
      // 初始化表單安全性
      this.initFormSecurity();
    }
  },

  /**
   * 設置當前頁面的 active 導航項目
   */
  setActiveNavItem(currentPage) {
    // 等待 DOM 載入完成後再設置
    setTimeout(() => {
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
        }
      });
    }, 100);
  }
};

// 自動初始化
document.addEventListener('DOMContentLoaded', () => {
  SharedComponents.loadAll();
  
  // 自動設置 active 狀態
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  SharedComponents.setActiveNavItem(currentPage);
});
