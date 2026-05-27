document.addEventListener('DOMContentLoaded', () => {
    // 1. Email 安全處理
    const emailUser = "tzutai.bremen";
    const emailDomain = "gmail.com";
    const fullEmail = emailUser + "@" + emailDomain;

    const contactEmailBtn = document.getElementById('contactEmailBtn');
    const footerEmailLink = document.getElementById('footerEmailLink');

    if (contactEmailBtn) contactEmailBtn.href = "mailto:" + fullEmail + "?subject=【企業合作洽詢】";
    if (footerEmailLink) {
        footerEmailLink.innerText = fullEmail;
        footerEmailLink.href = "mailto:" + fullEmail;
    }

    // 2. 導覽列滾動效果
    const mainNav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // 3. 行動裝置選單
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('open');
        });
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => navLinksContainer.classList.remove('open'));
        });
    }

    // 4. 滾動浮現動畫 (這就是控制後面卡片跑不跑得出來的關鍵！)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.88;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
