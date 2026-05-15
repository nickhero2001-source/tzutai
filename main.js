/* =============================================
TZU-TAI Bremen | main.js
============================================= */

document.addEventListener(‘DOMContentLoaded’, function () {

/* ===== NAV 滾動效果 ===== */
var nav = document.getElementById(‘mainNav’);
window.addEventListener(‘scroll’, function () {
if (window.scrollY > 40) {
nav.classList.add(‘scrolled’);
} else {
nav.classList.remove(‘scrolled’);
}
});

/* ===== 漢堡選單 ===== */
var hamburger = document.getElementById(‘hamburger’);
var navLinks = document.getElementById(‘navLinks’);
if (hamburger && navLinks) {
hamburger.addEventListener(‘click’, function () {
navLinks.classList.toggle(‘open’);
});
navLinks.querySelectorAll(‘a’).forEach(function (link) {
link.addEventListener(‘click’, function () {
navLinks.classList.remove(‘open’);
});
});
}

/* ===== SCROLL REVEAL ===== */
var revealEls = document.querySelectorAll(’.reveal’);
var revealObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add(‘visible’);
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.15 });
revealEls.forEach(function (el) { revealObserver.observe(el); });

/* ===== EMAIL 防爬蟲動態產生 ===== */
var emailUser = ‘service’;
var emailDomain = ‘tzutai.org.tw’;
var emailAddress = emailUser + ‘@’ + emailDomain;

var footerEmailLink = document.getElementById(‘footerEmailLink’);
if (footerEmailLink) {
footerEmailLink.textContent = emailAddress;
footerEmailLink.href = ‘mailto:’ + emailAddress;
}

var contactEmailBtn = document.getElementById(‘contactEmailBtn’);
if (contactEmailBtn) {
contactEmailBtn.href = ‘mailto:’ + emailAddress;
}

/* =============================================
META PIXEL 事件追蹤
============================================= */

// 安全包裝：避免 fbq 未載入時報錯
function trackEvent(eventName, params) {
if (typeof fbq === ‘function’) {
if (params) {
fbq(‘track’, eventName, params);
} else {
fbq(‘track’, eventName);
}
}
}

// 「立即洽詢企業合作」按鈕
if (contactEmailBtn) {
contactEmailBtn.addEventListener(‘click’, function () {
trackEvent(‘Contact’, { content_name: ‘企業合作按鈕’ });
});
}

// Footer Email 連結
if (footerEmailLink) {
footerEmailLink.addEventListener(‘click’, function () {
trackEvent(‘Contact’, { content_name: ‘Footer Email’ });
});
}

// 導覽列「洽詢採購」按鈕
var navCta = document.querySelector(’.nav-cta’);
if (navCta) {
navCta.addEventListener(‘click’, function () {
trackEvent(‘Contact’, { content_name: ‘導覽列洽詢’ });
});
}

// Hero「探索我們的商品」按鈕
var heroProduct = document.querySelector(‘a[href=”#products”].btn-gold’);
if (heroProduct) {
heroProduct.addEventListener(‘click’, function () {
trackEvent(‘ViewContent’, { content_name: ‘產品頁’ });
});
}

// Hero「了解更多」按鈕
var heroStory = document.querySelector(‘a[href=”#story”].btn-outline’);
if (heroStory) {
heroStory.addEventListener(‘click’, function () {
trackEvent(‘ViewContent’, { content_name: ‘我們的故事’ });
});
}

// 滾動到企業合作區塊（只觸發一次）
var enterpriseSection = document.getElementById(‘enterprise’);
if (enterpriseSection) {
var enterpriseObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
trackEvent(‘ViewContent’, { content_name: ‘企業合作區塊’ });
enterpriseObserver.unobserve(entry.target);
}
});
}, { threshold: 0.3 });
enterpriseObserver.observe(enterpriseSection);
}

});
