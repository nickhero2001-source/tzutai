document.addEventListener('DOMContentLoaded', () => {
    // 1. Email 安全處理
    const emailUser = "2015035";
    const emailDomain = "ms.syinlu.org.tw";
    const fullEmail = emailUser + "@" + emailDomain;

    const contactEmailBtn = document.getElementById('contactEmailBtn');
    const footerEmailLink = document.getElementById('footerEmailLink');

    if (contactEmailBtn) contactEmailBtn.href = "mailto:" + fullEmail + "?subject=【企業合作洽詢】";
    if (footerEmailLink) {
        footerEmailLink.innerText = "聯絡電子信箱";
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

   // 3. 行動裝置選單 (升級優化版：打開選單時鎖定底層滾動)
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinksContainer.classList.toggle('open');
            // 如果選單是打開的，就鎖定 body 滾動；關閉則恢復
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                document.body.style.overflow = ''; // 點擊連結跳轉後，恢復滾動
            });
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
    // ===== 5. 星空背景 Canvas 動態效果 =====
    const canvas = document.getElementById('starsCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        const starCount = 80; // 星星總數，可自行調整密集度

        // 設定 Canvas 畫布大小符合視窗
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars(); // 視窗大小改變時重新初始化星星，避免失真
        }

        // 初始化星星資料
        function initStars() {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.5,           // 星星大小 (0.5px ~ 2px)
                    alpha: Math.random(),                      // 初始透明度
                    speed: Math.random() * 0.02 + 0.005,       // 閃爍速度
                    direction: Math.random() > 0.5 ? 1 : -1    // 變亮或變暗
                });
            }
        }

        // 繪製與更新閃爍動畫
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                // 調整透明度達到閃爍效果
                star.alpha += star.speed * star.direction;
                if (star.alpha >= 1) {
                    star.alpha = 1;
                    star.direction = -1;
                } else if (star.alpha <= 0.1) {
                    star.alpha = 0.1;
                    star.direction = 1;
                }

                // 開始畫星星（微小發光的圓點）
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(246, 198, 91, ${star.alpha})`; // 使用你在 CSS 裡定義的 --gold 金黃色
                ctx.fill();
            });

            requestAnimationFrame(animate); // 確保動畫流暢優雅
        }

        // 監聽視窗縮放
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200); // 加上防抖動，避免手機縮放時卡頓
        });

        // 啟動星空
        resizeCanvas();
        animate();
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 6. SDG 永續影響力區塊 — 數字跳動動畫（IntersectionObserver，手機/桌機皆穩定觸發）
    (function(){
        const numbersBlock = document.querySelector('.imp-numbers');
        if (!numbersBlock) return;

        function runCountUp(){
            numbersBlock.querySelectorAll('.num[data-count]').forEach((el) => {
                const target = parseInt(el.getAttribute('data-count'), 10);
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1200;
                let startTime = null;
                function step(ts){
                    if (!startTime) startTime = ts;
                    const progress = Math.min((ts - startTime) / duration, 1);
                    const current = Math.floor(progress * target);
                    el.textContent = current + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                requestAnimationFrame(step);
            });
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        runCountUp();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(numbersBlock);
        } else {
            // 舊瀏覽器 fallback
            runCountUp();
        }
    })();
});
