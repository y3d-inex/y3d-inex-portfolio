
const list = document.getElementById('projectList');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalLocation = document.getElementById('modalLocation');
const modalCategory = document.getElementById('modalCategory');
const modalTools = document.getElementById('modalTools');
const modalDesc = document.getElementById('modalDesc');
const filters = [...document.querySelectorAll('.filter')];

const descriptions = {
  'mrt-blok-m':'Architectural visualization work presenting the MRT Blok M project through exterior and transit-space imagery.',
  'rsud-tarakan':'Architectural visualization work presenting the RSUD Tarakan project and its wider site context.',
  'asmara-coffee-cafe':'Architectural and visualization work for a café environment integrated with a lush, outdoor setting.',
  'myeongdong-topokki':'Interior visualization work exploring the restaurant identity, seating areas and customer experience.',
  'interior-rumah-tinggal':'Residential interior visualization focused on living, dining, kitchen and private-room spaces.',
  'masjid-al-hijrah':'Architectural visualization of a mosque project, presented together with selected planning drawings.',
  'rumah-tinggal-type-60':'Residential visualization combining exterior perspectives with selected plan information.',
  'rumah-tinggal-minimalis':'Minimalist residential design and visualization presented through exterior views and plans.',
  'apca-design':'Interior visualization for APCA Design, presenting reception, seating and hospitality spaces.',
  'kanakafe-desain':'Interior design and visualization for a compact café environment with a coordinated green material palette.',
  'resepsionis-kantor-uob':'Office reception interior visualization for a corporate arrival and waiting environment.'
};

function renderProjects(filter='ALL'){
  const items=window.PROJECTS.filter(p=>filter==='ALL'||p.category.includes(filter));
  if(!items.length){list.innerHTML='<div class="empty">No projects in this category yet.</div>';return}
  list.innerHTML=items.map((p,i)=>`<article class="project-item reveal visible" data-slug="${p.slug}">
    <div class="project-media"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
    <div class="project-info"><div class="index">PROJECT</div><h3>${p.title}</h3><p class="location">${p.location}</p><p class="category">${p.category}</p><button class="view-project" data-open="${p.slug}">VIEW PROJECT <span>→</span></button></div>
  </article>`).join('');
  document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>openProject(btn.dataset.open)));
}
function openProject(slug){
  const p=window.PROJECTS.find(x=>x.slug===slug); if(!p)return;
  modalImage.src=p.image; modalImage.alt=p.title; modalTitle.textContent=p.title; modalLocation.textContent=p.location; modalCategory.textContent=p.category; modalTools.textContent=p.tools; modalDesc.textContent=descriptions[p.slug]||'Project work from the Yudha 3D Design — Interior Exterior portfolio.';
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');renderProjects(f.dataset.filter)}));

const header=document.getElementById('siteHeader');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
renderProjects();
