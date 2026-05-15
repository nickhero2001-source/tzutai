// === Stars ===
(function(){
  const c=document.getElementById('starsCanvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  let stars=[];
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight}
  function initStars(){
    stars=[];
    for(let i=0;i<120;i++){
      stars.push({
        x:Math.random()*c.width,
        y:Math.random()*c.height,
        r:Math.random()*1.5+.3,
        a:Math.random(),
        speed:Math.random()*.015+.005,
        phase:Math.random()*Math.PI*2
      });
    }
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    const t=Date.now()/1000;
    stars.forEach(s=>{
      const opacity=(Math.sin(t*s.speed*6+s.phase)+1)/2*.6+.2;
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(246,198,91,${opacity*s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',()=>{resize();initStars()});
  resize();initStars();draw();
})();

// === Nav scroll ===
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>60);
});

// === Hamburger ===
document.getElementById('hamburger')?.addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('open');
});

document.querySelectorAll('#navLinks a').forEach(a=>{
  a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open'));
});

// === Scroll reveal ===
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('visible')
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// === Email protection ===
(function(){
  const u = 'service';
  const d = 'tzutai.org.tw';
  const email = u + '@' + d;
  const mailto = 'mailto:' + email;

  const footerLink = document.getElementById('footerEmailLink');
  if(footerLink){
    footerLink.textContent = email;
    footerLink.href = mailto;
  }

  const contactBtn = document.getElementById('contactEmailBtn');
  if(contactBtn){
    contactBtn.href = mailto;
  }
})();
