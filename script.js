const grid=document.getElementById("projectGrid");
const filters=document.querySelectorAll(".filter");
const modal=document.getElementById("modal");
const modalImage=document.getElementById("modalImage");
const modalTitle=document.getElementById("modalTitle");
const modalLocation=document.getElementById("modalLocation");
const modalCategory=document.getElementById("modalCategory");
const modalDescription=document.getElementById("modalDescription");
const modalYear=document.getElementById("modalYear");

function renderProjects(filter="all"){
  grid.innerHTML="";
  PROJECTS.forEach((p,index)=>{
    if(filter!=="all" && !p.filters.includes(filter)) return;
    const card=document.createElement("article");
    card.className="project-card reveal";
    card.innerHTML=`
      <div class="image-wrap"><img src="${p.image}" alt="${p.name}" loading="${index<2?"eager":"lazy"}"></div>
      <div class="project-info">
        <div>
          <div class="project-title">${p.name}</div>
          <div class="project-location">${p.location}</div>
          <div class="project-view">VIEW PROJECT →</div>
        </div>
        <div class="project-meta">${p.category}<br>${p.year}</div>
      </div>`;
    card.addEventListener("click",()=>openModal(p));
    grid.appendChild(card);
  });
  observeReveals();
}
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  renderProjects(btn.dataset.filter);
}));

function openModal(p){
  modalImage.src=p.image;
  modalImage.alt=p.name;
  modalTitle.textContent=p.name;
  modalLocation.textContent=p.location;
  modalCategory.textContent=p.category;
  modalDescription.textContent=p.description;
  modalYear.textContent=p.year;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelector(".modal-close").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

function observeReveals(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}})
  },{threshold:.08});
  document.querySelectorAll(".reveal:not(.visible)").forEach(el=>io.observe(el));
}
document.addEventListener("mousemove",e=>{
  const c=document.querySelector(".cursor");
  if(c){c.style.left=e.clientX+"px";c.style.top=e.clientY+"px"}
});
document.getElementById("year").textContent=new Date().getFullYear();
renderProjects();
