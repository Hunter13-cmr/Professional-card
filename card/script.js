/* ================================
   PREMIUM PORTFOLIO - SCRIPT.JS
   Adds: orbiting spheres, light tracer, matrix with programming code,
   integrated with existing animations
   ================================ */

/* ---------- EXISTING NAME + PARTICLE + TILT LOGIC ---------- */
const firstNameEl = document.querySelector('.first-name');
const lastNameEl  = document.querySelector('.last-name');
const card = document.querySelector('.profile-card');
const wrapper = document.querySelector('.wrapper');

const firstName = "Fidele";
const lastName  = "Elock Sadrack";

function createLetterSpans(el, text) {
  el.innerHTML = "";
  text.split('').forEach(ch => {
    const s = document.createElement('span');
    if (ch === ' ') { s.className = 'space-span'; s.innerHTML = '\u00A0'; }
    else { s.textContent = ch; }
    el.appendChild(s);
  });
}
createLetterSpans(firstNameEl, firstName);
createLetterSpans(lastNameEl, lastName);

/* ------------------ Orbiting 3D Spheres ------------------ */
const orbitContainer = document.querySelector('.orbit-container');
const ORBIT_COUNT = 8;
const orbits = [];
for (let i = 0; i < ORBIT_COUNT; i++) {
  const s = document.createElement('div');
  s.className = 'orbit-sphere';
  orbitContainer.appendChild(s);

  orbits.push({
    el: s,
    radius: 80 + Math.random() * 70,
    speed: 0.6 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
    z: -60 + Math.random() * 180,
    size: 8 + Math.random() * 14
  });
  s.style.width = s.style.height = `${orbits[i].size}px`;
}

function animateOrbits(ts) {
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  orbits.forEach(o => {
    o.phase += o.speed * 0.006;
    const x = Math.cos(o.phase) * o.radius;
    const y = Math.sin(o.phase) * (o.radius * 0.45);
    o.el.style.transform = `translate3d(${cx + x - o.size/2}px, ${cy + y - o.size/2}px, ${o.z}px)`;
    const scale = 1 + (o.z / 600);
    o.el.style.width = o.el.style.height = `${o.size * scale}px`;
    o.el.style.opacity = 0.9 + (o.z / 600);
  });

  requestAnimationFrame(animateOrbits);
}
requestAnimationFrame(animateOrbits);

/* ------------------ Light Tracer ------------------ */
const tracer = document.getElementById('light-tracer');
let tracerVisible = false;
let tracerTimeout;
document.addEventListener('mousemove', (e) => {
  const x = e.clientX, y = e.clientY;
  tracer.style.left = (x - tracer.offsetWidth / 2) + 'px';
  tracer.style.top  = (y - tracer.offsetHeight / 2) + 'px';

  if (!tracerVisible) { tracerVisible = true; tracer.style.opacity = '1'; }
  clearTimeout(tracerTimeout);
  tracerTimeout = setTimeout(() => { tracer.style.opacity = '0'; tracerVisible = false; }, 900);
});
card.addEventListener('mouseenter', () => { tracer.style.transform = 'scale(1.12)'; tracer.style.opacity = '1'; });
card.addEventListener('mouseleave', () => { tracer.style.transform = 'scale(1)'; });

/* ------------------ Matrix Rain (programming codes) ------------------ */
const matrixCanvas = document.getElementById('matrix-canvas');
const mCtx = matrixCanvas.getContext('2d');
function resizeMatrix() { matrixCanvas.width = innerWidth; matrixCanvas.height = innerHeight; }
resizeMatrix();
window.addEventListener('resize', resizeMatrix);

const columns = Math.floor(matrixCanvas.width / 18);
const drops = new Array(columns).fill(1);

// Example programming code snippets
const progSnippets = [
  "const x = 10;", "let name = 'Fidele';", "function greet(){}", "for(let i=0;i<10;i++){ }",
  "if(user) { console.log(user); }", "class Person { constructor(){} }",
  "import React from 'react';", "return a+b;", "console.log('Hello');", "async function fetchData(){}",
  "#include <stdio.h>", "printf('Hello World');", "int main(){}", "var i = 0;", "System.out.println('Java');",
  "def my_func():", "print('Python')", "<div class='card'></div>", "let arr = [1,2,3];"
];

function drawMatrix() {
  mCtx.fillStyle = 'rgba(2,8,18,0.12)';
  mCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);
  mCtx.font = '14px monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = progSnippets[Math.floor(Math.random() * progSnippets.length)];
    const x = i * 18;
    const y = drops[i] * 18;
    mCtx.fillStyle = 'rgba(140,255,180,0.95)';
    mCtx.fillText(text, x, y);
    if (y > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
requestAnimationFrame(drawMatrix);

/* ------------------ Enhanced 3D Tilt & Elasticity ------------------ */
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const cx = rect.width / 2, cy = rect.height / 2;
  const rotateY = ((x - cx) / cx) * 22;
  const rotateX = -((y - cy) / cy) * 22;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
});
card.addEventListener('mouseleave', () => { card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; });

/* ------------------ Particle3D (name burst) ------------------ */
const particleCount = 28;
const particles = [];
for (let i=0; i<particleCount; i++){
  const p = document.createElement('div');
  p.className = 'particle3d';
  document.body.appendChild(p);
  particles.push(p);
}
function burst3D(x, y) {
  particles.forEach((p, idx) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 160;
    const z = -60 + Math.random() * 240;
    p.style.left = x + 'px';
    p.style.top  = y + 'px';
    p.style.opacity = 1;
    p.style.transform = `translate3d(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px, ${z}px) scale(${0.6 + Math.random()*1.3})`;
    p.style.transition = `transform 900ms cubic-bezier(.2,.9,.2,1), opacity 900ms`;
    setTimeout(()=> { p.style.opacity = 0; p.style.transform = `translate3d(0,0,0) scale(.2)`; }, 750 + idx * 10);
  });
}

/* ------------------ Random letters + explosion effect ------------------ */
function randomizeSpans(spans, originalText){
  const pool="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  spans.forEach((sp,i)=>{ if(!sp.classList.contains('space-span')) sp.textContent=pool[Math.floor(Math.random()*pool.length)]; });
  setTimeout(()=>{explodeSpans(spans, originalText);}, 500);
}
function explodeSpans(spans, originalText){
  spans.forEach((sp,i)=>{
    if(!sp.classList.contains('space-span')){
      sp.style.transition='transform 900ms cubic-bezier(.2,.9,.2,1), opacity 600ms';
      sp.style.transform=`translate(${(Math.random()*160-80)}px,${(Math.random()*160-80)}px) rotate(${(Math.random()*720-360)}deg) scale(${1+Math.random()*1.2})`;
      sp.style.opacity=1;
    }
  });
  setTimeout(()=>{reassembleSpans(spans, originalText);}, 900);
}
function reassembleSpans(spans,text){
  spans.forEach((sp,i)=>{
    setTimeout(()=>{
      sp.style.transition='transform 700ms cubic-bezier(.12,.74,.26,1), opacity 300ms';
      sp.style.transform='translate(0,0) rotate(0deg) scale(1)';
      sp.textContent=text[i];
    },i*120);
  });
}
function animateNameLetters(el, text){
  const spans=Array.from(el.querySelectorAll('span'));
  randomizeSpans(spans,text);
}
function animateFullName(){
  animateNameLetters(firstNameEl, firstName);
  setTimeout(()=>animateNameLetters(lastNameEl,lastName), 220);
  const rect1 = firstNameEl.getBoundingClientRect();
  const rect2 = lastNameEl.getBoundingClientRect();
  burst3D(rect1.left+rect1.width/2, rect1.top+rect1.height/2);
  burst3D(rect2.left+rect2.width/2, rect2.top+rect2.height/2);
}
animateFullName();
setInterval(animateFullName, 9000);

/* ------------------ Role typing effect ------------------ */
const roleEl = document.getElementById('animated-role');
const roleText = "Full Stack Developer";
let rI = 0, rF = true;
function animateRoleB(){
  if(rF){ rI++; if(rI>roleText.length) rF=false; }
  else{ rI--; if(rI<0) rF=true; }
  roleEl.textContent = roleText.slice(0,rI);
}
setInterval(animateRoleB, 120);

/* ------------------ Theme toggle ------------------ */
const themeBtn = document.querySelector('.theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light');
  const pressed = document.body.classList.contains('dark-mode');
  themeBtn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
});

/* ------------------ Accessibility / clean-up touches ------------------ */
const observer = new MutationObserver(() => {
  const canvas = document.getElementById('matrix-canvas');
  if (document.body.classList.contains('light')) canvas.style.opacity = '0.07';
  else canvas.style.opacity = '0.16';
});
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
