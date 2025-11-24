// Edition B - improved
const nameEl = document.getElementById('animated-name');
const fullName = "Fidele Elock Sadrack";
const roleEl = document.getElementById('animated-role');
const roleText = "Full Stack Developer";

let letters = fullName.split('');
let letterOnly = letters.filter(c=>c!==' ');
let spacePositions = [];
letters.forEach((c,i)=>{ if(c===' ') spacePositions.push(i) });

nameEl.innerHTML='';
letters.forEach(ch=>{
  const s=document.createElement('span');
  if(ch===' '){ s.className='space-span'; s.innerHTML='&nbsp;&nbsp;'; }
  nameEl.appendChild(s);
});

// create tiny particle elements once (visual flair during explosion)
const particleCount = 21;
const particlePool = [];
for(let i=0;i<particleCount;i++){
  const p = document.createElement('div');
  p.className='particle';
  p.style.opacity=0;
  document.body.appendChild(p);
  particlePool.push(p);
}

function shuffle(a){ let b=a.slice(); for(let i=b.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]] } return b }

function buildShuffled(){
  const s = shuffle(letterOnly);
  spacePositions.forEach(pos=> s.splice(pos,0,' '));
  return s;
}

function burstParticles(x,y){
  particlePool.forEach((p,idx)=>{
    p.style.left = (x + (Math.random()*40-20))+'px';
    p.style.top  = (y + (Math.random()*40-20))+'px';
    p.style.opacity = 1;
    p.style.transform = `translate(${Math.random()*120-60}px, ${Math.random()*120-60}px) scale(${Math.random()*1.2+.6})`;
    p.style.transition = 'all 900ms cubic-bezier(.2,.9,.2,1)';
    setTimeout(()=>{ p.style.opacity = 0; p.style.transform='translate(0,0) scale(.2)' }, 700 + idx*10);
  });
}

function animateLettersB(){
  const spans = nameEl.querySelectorAll('span');
  const shuffled = buildShuffled();
  // explosion with easing
  spans.forEach((sp,i)=>{
    if(sp.classList.contains('space-span')){ sp.style.transform='translate(0,0)'; sp.style.opacity=1; return; }
    sp.textContent = shuffled[i];
    sp.style.transition = 'transform 950ms cubic-bezier(.2,.9,.2,1), opacity 600ms';
    sp.style.transform = `translate(${Math.random()*80-40}px, ${Math.random()*80-40}px) scale(${1+Math.random()*1}) rotate(${Math.random()*360}deg)`;
    sp.style.opacity=1;
  });

  // particle burst around card center
  const rect = nameEl.getBoundingClientRect();
  burstParticles(rect.left + rect.width/2, rect.top + rect.height/2);

  // after 2s pause 1s static => reassemble with "magnetic" easing
  setTimeout(()=>{
    spans.forEach((sp,i)=>{
      setTimeout(()=>{
        sp.style.transition = 'transform 700ms cubic-bezier(.12,.74,.26,1), opacity 300ms';
        sp.style.transform = 'translate(0,0) scale(1) rotate(0deg)';
        if(!sp.classList.contains('space-span')) sp.textContent = letters[i];
      }, i*160);
    });
  }, 3000);
}

// role typing like A but smoother timing
let rI=0, rF=true;
function animateRoleB(){
  if(rF){ rI++; if(rI>roleText.length) rF=false; }
  else{ rI--; if(rI<0) rF=true; }
  roleEl.textContent = roleText.slice(0,rI);
}

// theme toggle
document.querySelector('.theme-toggle').addEventListener('click', ()=> document.body.classList.toggle('dark-mode'));

animateLettersB();
setInterval(animateLettersB, 9000);
setInterval(animateRoleB, 120);
