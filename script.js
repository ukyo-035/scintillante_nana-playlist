
const units=['💗carino💗','🌷cantabile🌷','☁️ragazzo☁️','🎈infanzia🎈','🍀questi giovanni🍀','❄️mixing❄️','⭐️fresco⭐️','🪐supernova🪐','📚albore📚','📚colore📚','👑運営👑'];

let rows=[];
let view=[];
let queue=[];
let current=0;

let favOnly=false;
let tagWord='';
let selectedUnit=null;

const favs=JSON.parse(localStorage.getItem('favs')||'[]');
const master=JSON.parse(localStorage.getItem('members_master')||'[]');

fetch(API_URL)
.then(r=>r.json())
.then(data=>{
  rows=data;
  view=data;
  buildFilters();
  buildMemberFilters();
  render(view);
});

/* =====================
   UNIT FILTER (single select)
===================== */
function buildFilters(){
  filters.innerHTML=`<button class="unitBtn ${!selectedUnit?'active':''}" onclick="selectUnit(null,this)">全表示</button>`
  + units.map(u=>`<button type="button" class="unitBtn ${selectedUnit===u?'active':''}" data-unit="${u}" onclick="selectUnit('${u}',this)">${u}</button>`).join('');
}

function selectUnit(u,el){
  selectedUnit = (selectedUnit===u)? null : u;
  buildFilters();
  applyFilters();
}

/* =====================
   MEMBER FILTER (multi AND)
===================== */
function buildMemberFilters(){
  const active=master.filter(m=>m.active).map(m=>m.name);
  memberFilters.innerHTML=active.map(m=>
    `<label><input type="checkbox" value="${m}" onchange="applyFilters()">${m}</label>`
  ).join('');
  buildTagFilters();
}

/* =====================
   TAG FILTER
===================== */
function buildTagFilters(){
  tagFilters.innerHTML=`
    <button type="button" class="unitBtn" onclick="filterTag('誕生日',this)">誕生日</button>
    <button type="button" class="unitBtn" onclick="filterTag('有志',this)">有志</button>
    <button type="button" class="unitBtn" onclick="filterTag('周年',this)">周年</button>
    <button type="button" class="unitBtn" onclick="filterTag('',this)">解除</button>
  `;
}

function filterTag(t,el){
  tagWord = (t==='') ? '' : t;
  applyFilters();
}

/* =====================
   FILTER ENGINE (AND logic)
===================== */
function applyFilters(){

  const mem=[...document.querySelectorAll('#memberFilters input:checked')]
    .map(x=>x.value);

  view = rows.filter(r=>{

    // unit filter
    if(selectedUnit && r.unit!==selectedUnit) return false;

    // member AND filter
    if(mem.length){
      if(!mem.every(m=>(r.members||'').includes(m))) return false;
    }

    // tag filter
    if(tagWord){
      if(!(r.tags||'').includes(tagWord)) return false;
    }

    // search
    if(search.value){
      if(!(r.title||'').includes(search.value)) return false;
    }

    // fav
    if(favOnly){
      if(!favs.includes(r.url)) return false;
    }

    return true;
  });

  render(view);
}

search.oninput=applyFilters;

/* =====================
   RENDER
===================== */
function render(data){
  list.innerHTML='';
  count.textContent=data.length+'件';
  queue=data;

  data.forEach(item=>{
    const isFav=favs.includes(item.url);
    const div=document.createElement('div');
    div.className='card';
    div.innerHTML=`
      <span class="fav">
        <button onclick="toggleFav('${item.url}')">${isFav?'★':'☆'}</button>
      </span>
      <div class='songTitle'>${item.title}</div>
      <div class='meta'>${item.unit}</div>
      <div class='meta'>${item.post_date||''}</div>
      <div class='meta'>${item.tags||''}</div>
      <button onclick="play('${item.url}')">再生</button>
    `;
    list.appendChild(div);
  });
}

/* =====================
   PLAYER
===================== */
function play(url){
  player.src=url;
  player.onload=()=>setTimeout(nextPlay,180000);
}

function shufflePlay(){
  queue=[...view].sort(()=>Math.random()-0.5);
  current=0;
  if(queue[0])play(queue[0].url);
}

function nextPlay(){
  current++;
  if(queue[current])play(queue[current].url);
}

/* =====================
   SORT
===================== */
function sortNewest(){
  view=[...view].sort((a,b)=>(b.post_date||'').localeCompare(a.post_date||''));
  render(view);
}

function sortOldest(){
  view=[...view].sort((a,b)=>(a.post_date||'').localeCompare(b.post_date||''));
  render(view);
}

/* =====================
   FAVORITE
===================== */
function toggleFav(url){
  const i=favs.indexOf(url);
  if(i>=0)favs.splice(i,1);
  else favs.push(url);
  localStorage.setItem('favs',JSON.stringify(favs));
  applyFilters();
}

function toggleFavOnly(){
  favOnly=!favOnly;
  applyFilters();
}
