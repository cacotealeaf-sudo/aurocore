/**
 * 安全性 Headers 配置
 * 
 * 🔒 版本: 2.0 (2025-11-16 更新)
 * 
 * 這個 JavaScript 文件提供客戶端的安全性增強
 * 注意：真正的安全性應該在伺服器端配置 HTTP Headers
 */

const SecurityHeaders = {
  /**
   * 檢測並警告不安全的配置
   */
  checkSecurityIssues() {
    const issues = [];

    // 1. 檢查是否使用 HTTPS
    if (window.location.protocol !== 'https:' && 
        window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1') {
      issues.push({
        severity: 'high',
        type: 'protocol',
        message: '⚠️ 網站未使用 HTTPS 加密連線',
        solution: '建議啟用 SSL/TLS 證書（推薦 Let\'s Encrypt 免費證書）'
      });
    }

    // 2. 檢查是否有不安全的外部腳本 (HTTP)
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (script.src.startsWith('http://') && !script.src.includes('localhost')) {
        issues.push({
          severity: 'high',
          type: 'mixed-content',
          message: `⚠️ 發現不安全的 HTTP 腳本: ${script.src}`,
          solution: '將所有外部資源改為 HTTPS'
        });
      }
    });

    // 3. 檢查 CSS 混合內容
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
      if (link.href.startsWith('http://') && !link.href.includes('localhost')) {
        issues.push({
          severity: 'high',
          type: 'mixed-content',
          message: `⚠️ 發現不安全的 HTTP 樣式表: ${link.href}`,
          solution: '將所有外部資源改為 HTTPS'
        });
      }
    });

    // 4. 檢查外部連結是否有 noopener
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    let unsafeLinks = 0;
    externalLinks.forEach(link => {
      if (!link.rel || !link.rel.includes('noopener')) {
        unsafeLinks++;
      }
    });
    if (unsafeLinks > 0) {
      issues.push({
        severity: 'medium',
        type: 'tabnabbing',
        message: `⚠️ 發現 ${unsafeLinks} 個外部連結缺少 rel="noopener noreferrer"`,
        solution: '為所有 target="_blank" 的連結添加 rel="noopener noreferrer"'
      });
    }

    // 5. 檢查是否有 inline scripts 沒有 nonce
    const inlineScripts = document.querySelectorAll('script:not([src])');
    if (inlineScripts.length > 5) {
      issues.push({
        severity: 'low',
        type: 'inline-script',
        message: `⚠️ 發現 ${inlineScripts.length} 個內嵌腳本`,
        solution: '考慮將腳本移到外部文件，或使用 CSP nonce'
      });
    }

    // 6. 檢查表單是否有 honeypot
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
      const honeypot = form.querySelector('input[name="website"]');
      if (!honeypot) {
        issues.push({
          severity: 'medium',
          type: 'form-security',
          message: `⚠️ 表單 #${index + 1} 缺少 honeypot 防機器人欄位`,
          solution: '添加隱藏的 honeypot 欄位來防止垃圾郵件機器人'
        });
      }
    });

    // 7. 檢查 iframe 是否有 sandbox
    const iframes = document.querySelectorAll('iframe[src]');
    iframes.forEach((iframe, index) => {
      if (!iframe.sandbox && !iframe.src.includes('google.com/maps')) {
        issues.push({
          severity: 'low',
          type: 'iframe-security',
          message: `⚠️ iframe #${index + 1} 缺少 sandbox 屬性`,
          solution: '為 iframe 添加適當的 sandbox 屬性限制行為'
        });
      }
    });

    return issues;
  },

  /**
   * 添加安全性 Meta 標籤（客戶端方案）
   */
  addSecurityMetas() {
    const head = document.head;

    // X-Content-Type-Options
    if (!document.querySelector('meta[http-equiv="X-Content-Type-Options"]')) {
      const meta1 = document.createElement('meta');
      meta1.httpEquiv = 'X-Content-Type-Options';
      meta1.content = 'nosniff';
      head.appendChild(meta1);
    }

    // X-Frame-Options (防止 Clickjacking)
    if (!document.querySelector('meta[http-equiv="X-Frame-Options"]')) {
      const meta2 = document.createElement('meta');
      meta2.httpEquiv = 'X-Frame-Options';
      meta2.content = 'SAMEORIGIN';
      head.appendChild(meta2);
    }

    // Referrer Policy
    if (!document.querySelector('meta[name="referrer"]')) {
      const meta3 = document.createElement('meta');
      meta3.name = 'referrer';
      meta3.content = 'strict-origin-when-cross-origin';
      head.appendChild(meta3);
    }
  },

  /**
   * 防止 XSS 攻擊 - 清理用戶輸入
   * @param {string} input - 用戶輸入
   * @returns {string} - 清理後的輸入
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * 🔒 增強版: 檢查並清理潛在的 XSS 內容
   * @param {string} input - 用戶輸入
   * @returns {string} - 清理後的輸入
   */
  cleanXSS(input) {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '');
  },

  /**
   * 安全的 HTML 插入
   * @param {HTMLElement} element - 目標元素
   * @param {string} html - HTML 內容
   */
  safeInnerHTML(element, html) {
    // 移除危險的標籤和屬性
    const cleaned = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/<iframe[^>]*>/gi, '')
      .replace(/<\/iframe>/gi, '');
    
    element.innerHTML = cleaned;
  },

  /**
   * Cookie 安全設定
   * @param {string} name - Cookie 名稱
   * @param {string} value - Cookie 值
   * @param {number} days - 過期天數
   */
  setSecureCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const cookieOptions = [
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
      `expires=${expires.toUTCString()}`,
      'path=/',
      'SameSite=Strict'
    ];

    // 如果是 HTTPS，添加 Secure 標記
    if (window.location.protocol === 'https:') {
      cookieOptions.push('Secure');
    }

    document.cookie = cookieOptions.join('; ');
  },

  /**
   * 獲取 Cookie 值
   * @param {string} name - Cookie 名稱
   * @returns {string|null} - Cookie 值
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${encodeURIComponent(name)}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
  },

  /**
   * 防止表單重複提交
   * @param {HTMLFormElement} formElement - 表單元素
   */
  preventDoubleSubmit(formElement) {
    let submitted = false;
    
    formElement.addEventListener('submit', function(e) {
      if (submitted) {
        e.preventDefault();
        return false;
      }
      
      submitted = true;
      
      // 禁用提交按鈕
      const submitBtn = formElement.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
      }
      
      // 5秒後重置（如果頁面沒有跳轉）
      setTimeout(() => {
        submitted = false;
        if (submitBtn) {
          submitBtn.disabled = false;
        }
      }, 5000);
    });
  },

  /**
   * CSRF Token 生成
   * @returns {string} - 32 字節的隨機 Token
   */
  generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * 添加 CSRF Token 到表單
   * @param {HTMLFormElement} formElement - 表單元素
   */
  addCSRFToForm(formElement) {
    // 檢查是否已存在
    if (formElement.querySelector('input[name="csrf_token"]')) return;
    
    const token = this.generateCSRFToken();
    sessionStorage.setItem('csrf_token', token);

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'csrf_token';
    input.value = token;
    formElement.appendChild(input);
  },

  /**
   * 驗證外部連結 - 自動添加安全屬性
   */
  secureExternalLinks() {
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
      // 確保有 noopener 和 noreferrer
      const relValues = new Set((link.rel || '').split(' ').filter(Boolean));
      relValues.add('noopener');
      relValues.add('noreferrer');
      link.rel = Array.from(relValues).join(' ');
    });
  },

  /**
   * 🔒 新增: 為表單添加 Honeypot 欄位
   */
  addHoneypotToForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      // 如果已經有 honeypot，跳過
      if (form.querySelector('input[name="website"]')) return;
      
      const honeypot = document.createElement('input');
      honeypot.type = 'text';
      honeypot.name = 'website';
      honeypot.style.cssText = 'position: absolute; left: -9999px;';
      honeypot.setAttribute('tabindex', '-1');
      honeypot.setAttribute('autocomplete', 'off');
      honeypot.setAttribute('aria-hidden', 'true');
      
      form.appendChild(honeypot);
    });
  },

  /**
   * 🔒 新增: 驗證 Honeypot（在表單提交時調用）
   * @param {HTMLFormElement} form - 表單元素
   * @returns {boolean} - true 表示是機器人
   */
  isBot(form) {
    const honeypot = form.querySelector('input[name="website"]');
    return honeypot && honeypot.value !== '';
  },

  /**
   * 監測可疑活動
   */
  detectSuspiciousActivity() {
    let clickCount = 0;
    let lastClickTime = 0;
    const clickThreshold = 10; // 1秒內超過10次點擊視為可疑
    const timeWindow = 1000; // 1秒

    document.addEventListener('click', (e) => {
      const now = Date.now();
      
      if (now - lastClickTime < timeWindow) {
        clickCount++;
      } else {
        clickCount = 1;
      }
      
      lastClickTime = now;
      
      if (clickCount > clickThreshold) {
        console.warn('⚠️ 偵測到異常點擊行為 - 可能是機器人或攻擊');
        // 可以在這裡添加更多防護措施，如暫時禁用點擊
      }
    });

    // 監測快速鍵盤輸入（可能是自動填表機器人）
    let keyCount = 0;
    let lastKeyTime = 0;
    const keyThreshold = 30; // 1秒內超過30次按鍵視為可疑

    document.addEventListener('keydown', () => {
      const now = Date.now();
      
      if (now - lastKeyTime < timeWindow) {
        keyCount++;
      } else {
        keyCount = 1;
      }
      
      lastKeyTime = now;
      
      if (keyCount > keyThreshold) {
        console.warn('⚠️ 偵測到異常鍵盤輸入 - 可能是自動填表機器人');
      }
    });
  },

  /**
   * 🔒 新增: 防止 Clickjacking（JavaScript 備用方案）
   */
  preventClickjacking() {
    if (top !== self) {
      // 頁面在 iframe 中被載入
      try {
        top.location = self.location;
      } catch (e) {
        // 如果無法跳出，隱藏頁面內容
        document.body.style.display = 'none';
        console.error('⚠️ 偵測到 Clickjacking 嘗試');
      }
    }
  },

  /**
   * 初始化所有安全性功能
   */
  init() {
    // 防止 Clickjacking
    this.preventClickjacking();
    
    // 添加安全性 Meta 標籤
    this.addSecurityMetas();

    // 保護外部連結
    this.secureExternalLinks();

    // 為表單添加 Honeypot
    this.addHoneypotToForms();

    // 為所有表單添加防重複提交和 CSRF
    document.querySelectorAll('form').forEach(form => {
      this.preventDoubleSubmit(form);
      // Google Forms 不需要 CSRF（由 Google 處理）
      if (!form.action.includes('google.com')) {
        this.addCSRFToForm(form);
      }
    });

    // 監測可疑活動
    this.detectSuspiciousActivity();

    // 檢查安全性問題（僅開發環境）
    const isDev = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1';
    
    if (isDev) {
      const issues = this.checkSecurityIssues();
      if (issues.length > 0) {
        console.group('🔒 安全性檢查報告');
        console.log(`發現 ${issues.length} 個問題:`);
        issues.forEach((issue, index) => {
          const color = issue.severity === 'high' ? 'color: red' : 
                       issue.severity === 'medium' ? 'color: orange' : 'color: yellow';
          console.log(`%c${index + 1}. [${issue.severity.toUpperCase()}] ${issue.message}`, color);
          console.log(`   💡 解決方案: ${issue.solution}`);
        });
        console.groupEnd();
      } else {
        console.log('✅ 安全性檢查通過，未發現明顯問題');
      }
    }

    console.log('🔒 安全性模組 v2.0 已初始化');
  }
};

// 自動初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SecurityHeaders.init());
} else {
  SecurityHeaders.init();
}

// 導出供外部使用
window.SecurityHeaders = SecurityHeaders;
