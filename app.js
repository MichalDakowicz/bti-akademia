(function(){
'use strict';
const CATS=['cyber','db','azure','frontend','cpp','csharp','python','ai'];
const SHORT={cyber:'Cyberbezpieczeństwo',db:'Bazy danych',azure:'Azure',frontend:'Frontend',cpp:'C++',csharp:'C# / .NET',python:'Python',ai:'AI'};
const BANK=window.BANK,CHECKS=window.CHECKS||{};
CATS.forEach(c=>BANK[c].qs.forEach((q,i)=>{q.id=c+i;q.c=c;}));
const ALLQ=CATS.flatMap(c=>BANK[c].qs);
const $app=document.getElementById('app');
const NARROW=matchMedia('(max-width:860px),(max-height:520px)');

/* ---------- state ---------- */
let S={prog:{},star:{},seen:{},last:null};
try{S=Object.assign(S,JSON.parse(localStorage.getItem('bti_akademia')||'{}'))}catch(e){}
function save(){try{localStorage.setItem('bti_akademia',JSON.stringify(S))}catch(e){}}
try{const t=localStorage.getItem('bti_theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
document.getElementById('theme').onclick=()=>{
  const cur=document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
  const n=cur==='dark'?'light':'dark';document.documentElement.dataset.theme=n;
  try{localStorage.setItem('bti_theme',n)}catch(e){}
};

/* ---------- helpers ---------- */
const h=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const fmt=n=>(Math.round(n*100)/100).toString().replace('.',',');
function grade(q,sel){
  const ok=q.o.map(o=>!!o[1]);const nOk=ok.filter(Boolean).length;let got=0,wrong=0;
  sel.forEach(i=>{ok[i]?got++:wrong++});
  const pts=q.p||1;const score=wrong?0:pts*got/nOk;
  return {got,wrong,nOk,score,pts,full:!wrong&&got===nOk};
}
const mastered=cat=>BANK[cat].qs.filter(q=>S.prog[q.id]&&S.prog[q.id].l).length;
function record(q,full){const p=S.prog[q.id]||(S.prog[q.id]={n:0,l:false});p.n++;p.l=full;save()}
function ring(pct,color,size=54){
  const r=size/2-5,c=2*Math.PI*r;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="5"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c*pct} ${c}" transform="rotate(-90 ${size/2} ${size/2})"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="${size/4.4}" font-weight="800" style="fill:var(--ink)">${Math.round(pct*100)}%</text></svg>`;
}
let cleanup=null;           // czyszczenie listenerów widoku
let keyFn=null;
document.addEventListener('keydown',e=>{if(keyFn&&!/TEXTAREA|SELECT/.test(e.target.tagName)&&!e.ctrlKey&&!e.metaKey&&!e.altKey)keyFn(e)});

/* ---------- powiększanie rysunków ---------- */
function openZoom(fig){
  const svg=fig.querySelector('svg');if(!svg)return;
  const ov=h('div','zoom');const box=h('div');box.appendChild(svg.cloneNode(true));ov.appendChild(box);
  const close=()=>{ov.remove();document.removeEventListener('keydown',esc,true)};
  const esc=e=>{if(e.key==='Escape'){e.stopPropagation();close()}};
  ov.onclick=close;document.addEventListener('keydown',esc,true);document.body.appendChild(ov);
}

/* ---------- budowa pytania ---------- */
function buildQ(q){
  const cat=BANK[q.c];
  const order=shuffle(q.o.map((_,i)=>i));
  const el=h('section','qcard');
  el.innerHTML=`<div class="qp"><i style="width:0"></i></div>
  <div class="qleft"><div class="qmeta"><span class="chip" style="--c:${cat.color}">${cat.icon} ${SHORT[q.c]}</span><span class="badge ${q.src==='o'?'off':''}">${q.src==='o'?'Oficjalny test próbny':'Autorskie, styl BTI'}</span><span class="badge">${q.p||1} pkt</span><span class="sp"></span><span class="cnt"></span><button class="star ${S.star[q.id]?'on':''}" title="Oznacz jako trudne" aria-label="Oznacz jako trudne">${S.star[q.id]?'★':'☆'}</button></div>
  <div class="qtext">${q.q}</div><pre class="code" hidden></pre><p class="hint">Zaznacz <b>wszystkie</b> poprawne. Jedna błędna = 0 pkt za pytanie.</p><div class="fb"></div><div class="qact"></div></div>
  <div class="qright"><div class="opts"></div></div>`;
  if(q.code){const p=el.querySelector('pre');p.hidden=false;p.textContent=q.code}
  const optsEl=el.querySelector('.opts'),labels=[];
  order.forEach((oi,k)=>{
    const lab=h('label','opt');
    lab.innerHTML=`<input type="checkbox" data-i="${oi}"><span class="mark"></span><span class="otxt"><b>${'abcdef'[k]}.</b> ${q.o[oi][0]}</span><div class="why"></div>`;
    lab.querySelector('input').onchange=e=>lab.classList.toggle('sel',e.target.checked);
    optsEl.appendChild(lab);labels.push([lab,oi]);
  });
  const star=el.querySelector('.star');
  star.onclick=()=>{S.star[q.id]=!S.star[q.id];if(!S.star[q.id])delete S.star[q.id];save();star.classList.toggle('on',!!S.star[q.id]);star.textContent=S.star[q.id]?'★':'☆'};
  return {el,meta:el.querySelector('.qmeta'),act:el.querySelector('.qact'),
    setProgress(i,n){el.querySelector('.qp i').style.width=((i+1)/n*100)+'%';el.querySelector('.cnt').textContent=(i+1)+' / '+n},
    toggle(k){const l=labels[k];if(l&&!el.classList.contains('done')){const inp=l[0].querySelector('input');inp.checked=!inp.checked;inp.dispatchEvent(new Event('change'))}},
    sel(){const s=new Set();labels.forEach(([l,oi])=>{if(l.querySelector('input').checked)s.add(oi)});return s},
    reveal(sel,showFb=true){
      const g=grade(q,sel);el.classList.add('done');
      labels.forEach(([l,oi])=>{
        const o=q.o[oi],picked=sel.has(oi);const inp=l.querySelector('input');inp.disabled=true;
        l.classList.remove('sel');
        if(o[1]&&picked)l.classList.add('good');else if(!o[1]&&picked)l.classList.add('bad');else if(o[1]&&!picked)l.classList.add('miss');
        l.querySelector('.why').innerHTML=`<b class="${o[1]?'t':'f'}">${o[1]?'✔ Prawda':'✘ Fałsz'}</b> – ${o[2]}`;
        if(picked)inp.checked=true;
      });
      if(showFb){
        let v;
        if(g.full)v=`<div class="verdict good">Pełne punkty: ${fmt(g.pts)} z ${fmt(g.pts)}</div>`;
        else if(g.wrong)v=`<div class="verdict bad">0 z ${fmt(g.pts)} pkt: zaznaczono błędną opcję<small>W BTI jedna błędna opcja zeruje całe pytanie.</small></div>`;
        else v=`<div class="verdict part">${fmt(g.score)} z ${fmt(g.pts)} pkt: bez błędów, ale brakuje ${g.nOk-g.got} z ${g.nOk}<small>Pominięte poprawne opcje oznaczono „!”.</small></div>`;
        el.querySelector('.fb').innerHTML=v+(q.tip?`<div class="explain"><b>Zapamiętaj:</b> ${q.tip}</div>`:'');
      }
      return g;
    }};
}

/* ---------- nawigacja ---------- */
function setNav(r){document.querySelectorAll('.top .nl').forEach(a=>a.classList.toggle('on',a.dataset.r===r))}

/* ---------- strona główna ---------- */
function viewHome(){
  setNav('');
  const days=Math.ceil((new Date('2026-11-25T00:00:00')-new Date())/86400000);
  const total=ALLQ.length,mast=ALLQ.filter(q=>S.prog[q.id]&&S.prog[q.id].l).length;
  const mistakes=ALLQ.filter(q=>S.prog[q.id]&&!S.prog[q.id].l).length;
  const count=days>0?`<span class="count"><b>${days}</b> ${days===1?'dzień':'dni'} do BTI</span>`:days===0?`<span class="count"><b>Dziś</b> BTI 2026</span>`:'';
  $app.innerHTML=`<div class="homebar">${count}<span class="muted">${mast} / ${total} pytań opanowane${mistakes?` · <a href="#/practice/mistakes">${mistakes} do powtórki</a>`:''}</span><span class="sp"></span><a class="btn sm" href="#/learn">Lekcje</a><a class="btn sm" href="#/practice">Ćwiczenia</a><a class="btn sm ghost" href="#/exam">Egzamin próbny</a><a class="btn sm ghost" href="#/rules">Zasady punktacji</a></div>
  <div class="hgrid">${CATS.map(c=>{const b=BANK[c],m=mastered(c),n=b.qs.length;return `<div class="hc" style="--c:${b.color}"><div class="top2"><span class="ic">${b.icon}</span><div><h3>${SHORT[c]}</h3><small>${b.lessons.length} lekcji · ${n} pytań</small></div><span class="ring">${ring(n?m/n:0,b.color)}</span></div><div class="acts"><a class="btn sm" style="background:${b.color};color:#fff" href="#/learn/${c}/0">Lekcje</a><a class="btn sm ghost" href="#/practice/${c}">Ćwicz</a></div></div>`}).join('')}</div>
  <div class="plan"><div class="pl"><b>1. Zasady</b> – punktacja to połowa sukcesu</div><div class="pl"><b>2. Lekcje</b> – slajdy z rysunkami i mini-sprawdzianem</div><div class="pl"><b>3. Ćwiczenia</b> – wyjaśnienie każdej opcji</div><div class="pl"><b>4. Egzamin</b> – 16 pytań na czas</div></div>`;
}

/* ---------- zasady (zakładki) ---------- */
function viewRules(tab){
  setNav('rules');tab=tab||'reg';
  const tabs=[['reg','Regulamin'],['pkt','Punktacja'],['sym','Symulator'],['inf','O pytaniach']];
  $app.innerHTML=`<div class="tabs">${tabs.map(([k,l])=>`<button class="tab ${k===tab?'on':''}" data-k="${k}">${l}</button>`).join('')}</div><div class="tbody"></div>`;
  $app.querySelectorAll('.tab').forEach(b=>b.onclick=()=>viewRules(b.dataset.k));
  const body=$app.querySelector('.tbody');
  if(tab==='reg'){
    body.innerHTML=`<div class="card"><div class="facts">
    <div class="fact"><b class="n">80</b>pytań w ciągu <b>60 minut</b>. Po zatwierdzeniu lub upływie czasu nie da się wrócić do testu.</div>
    <div class="fact"><b class="n">8 × 10</b>osiem kategorii po 10 pytań: cyber, bazy danych, Azure, frontend, C++, C#/.NET, Python, AI.</div>
    <div class="fact"><b class="n">5 + 5</b>w każdej kategorii 5 pytań za <b>1 pkt</b> i 5 za <b>3 pkt</b>. Maksimum: 160 pkt.</div>
    <div class="fact"><b class="n">1…4</b>wielokrotny wybór: poprawna może być jedna, kilka lub wszystkie opcje.</div>
    <div class="fact"><b class="n">0 kary</b>pytania i całe kategorie można pomijać. Brak odpowiedzi to 0 pkt, bez minusów.</div>
    <div class="fact"><b class="n">Ta sama pula</b>studenci i uczniowie rozwiązują zadania losowane z jednej puli.</div></div></div>`;
  }else if(tab==='pkt'){
    body.innerHTML=`<div class="card"><p style="margin-top:0">Pytanie ma 4 opcje, 3 poprawne. Każda trafnie zaznaczona daje <b>1/3 punktów pytania</b>. Ale <b>jedna błędna zaznaczona opcja zeruje całe pytanie</b>.</p>
    <figure class="diagram" style="cursor:default"><svg viewBox="0 0 640 150" role="img" aria-label="Schemat punktacji"><g font-size="14"><rect class="bx" x="10" y="14" width="190" height="110" rx="12"/><text x="105" y="42" text-anchor="middle" font-weight="700">Same dobre</text><text x="105" y="68" text-anchor="middle" class="t2">2 z 3 poprawnych</text><text x="105" y="102" text-anchor="middle" font-size="22" font-weight="800" style="fill:#15803d">2/3 pkt</text>
    <rect class="bx" x="225" y="14" width="190" height="110" rx="12"/><text x="320" y="42" text-anchor="middle" font-weight="700">Wszystkie dobre</text><text x="320" y="68" text-anchor="middle" class="t2">3 z 3 poprawnych</text><text x="320" y="102" text-anchor="middle" font-size="22" font-weight="800" style="fill:#15803d">3/3 pkt</text>
    <rect class="bx" x="440" y="14" width="190" height="110" rx="12"/><text x="535" y="42" text-anchor="middle" font-weight="700">3 dobre + 1 zła</text><text x="535" y="68" text-anchor="middle" class="t2">jedna pomyłka</text><text x="535" y="102" text-anchor="middle" font-size="22" font-weight="800" style="fill:#b91c1c">0 pkt</text></g></svg></figure>
    <div class="callout tip" style="margin:.6em 0"><b>Taktyka:</b> zaznaczaj tylko to, czego jesteś pewny. Pewne 2 z 3 poprawnych w pytaniu za 3 pkt to 2 pkt, a zgadywanie trzeciej ryzykuje zero.</div>
    <div class="callout trap" style="margin:.6em 0">Kategorie, w których czujesz się słabo, możesz zostawić puste. Sześć mocnych kategorii bije osiem zgadywanek.</div></div>`;
  }else if(tab==='sym'){
    const demo={c:'cyber',src:'a',p:3,id:'demo',q:'Pytanie za 3 pkt: które algorytmy są symetryczne?',o:[['AES',1,'Szyfr blokowy, jeden klucz.'],['ChaCha20',1,'Szyfr strumieniowy, jeden klucz.'],['RSA',0,'Asymetryczny: para kluczy.'],['SHA-256',0,'Funkcja skrótu, nie szyfr.']]};
    const b=buildQ(demo);b.el.querySelector('.cnt').textContent='symulator';b.el.querySelector('.star').remove();body.appendChild(b.el);
    const btn=h('button','btn','Sprawdź'),again=h('button','btn ghost','Od nowa');
    btn.onclick=()=>{b.reveal(b.sel());btn.disabled=true};again.onclick=()=>viewRules('sym');b.act.append(btn,again);
  }else{
    const o=ALLQ.filter(q=>q.src==='o').length;
    body.innerHTML=`<div class="card"><p style="margin-top:0"><b>${o}</b> pytań pochodzi z oficjalnego testu próbnego BTI 2026 (konkursy.wi.pb.edu.pl). Ich poprawne odpowiedzi wyprowadziłem z dokumentacji, bo platforma nie ujawnia klucza przed zakończeniem próby. Jedno z nich (C#, nazwy zmiennych) jest niejednoznaczne i opisano to przy pytaniu.</p>
    <p><b>${ALLQ.length-o}</b> pytań jest autorskich, w stylu BTI. To nie są pytania z archiwum: organizator nie publikuje pytań z poprzednich edycji (pb.edu.pl/bti ma tylko relacje i wyniki).</p>
    <p class="muted">Postępy zapisują się w tej przeglądarce (localStorage).</p><button class="btn ghost sm" id="reset">Zresetuj postępy</button></div>`;
    body.querySelector('#reset').onclick=()=>{if(confirm('Usunąć wszystkie postępy i gwiazdki?')){S={prog:{},star:{},seen:{},last:null};save();viewRules('inf')}};
  }
}

/* ---------- lekcje: slajdy bez przewijania ---------- */
function paginate(html,W,H){
  const meas=h('div','sl-in');meas.style.cssText=`position:absolute;visibility:hidden;left:-99999px;top:0;width:${W}px;animation:none`;
  document.body.appendChild(meas);
  const tmp=h('div','',html),bl=[...tmp.children],groups=[];
  for(let i=0;i<bl.length;i++){
    const b=bl[i];
    if(bl[i+1]&&(b.tagName==='H3'||b.tagName==='H4'||(b.tagName==='P'&&/:\s*$/.test(b.textContent.trim())))){groups.push([b,bl[++i]])}
    else groups.push([b]);
  }
  const slides=[];let cur=[],scale=1;
  const flush=()=>{if(cur.length){slides.push({html:cur.map(n=>n.outerHTML).join(''),scale});}cur=[];scale=1;meas.innerHTML=''};
  groups.forEach(g=>{
    g.forEach(n=>meas.appendChild(n));
    if(meas.offsetHeight>H&&cur.length){
      g.forEach(n=>meas.removeChild(n));flush();g.forEach(n=>meas.appendChild(n));
    }
    cur.push(...g);
    if(meas.offsetHeight>H)scale=Math.max(.55,H/meas.offsetHeight);
  });
  flush();meas.remove();return slides;
}

function buildCheck(items,cat,onDone){
  const el=h('div','tf');let i=0,score=0;
  function show(){
    if(i>=items.length){
      onDone&&onDone(score,items.length);
      el.innerHTML=`<div class="tfend"><div class="big">${score} / ${items.length}</div><p>${score===items.length?'Komplet! Lekcja opanowana.':score>=items.length-1?'Prawie. Wróć do slajdu z pomyłką.':'Przejrzyj slajdy jeszcze raz i spróbuj ponownie.'}</p><div class="row" style="justify-content:center"><button class="btn sm again">Jeszcze raz</button><a class="btn sm ghost" href="#/practice/${cat}">Ćwicz pytania z kategorii</a></div></div>`;
      el.querySelector('.again').onclick=()=>{i=0;score=0;show()};return;
    }
    const [s,v,w]=items[i];
    el.innerHTML=`<div class="tfh"><b>Prawda czy fałsz?</b><span class="muted">${i+1} / ${items.length}</span></div><div class="tfq">${s}</div><div class="tfb"><button class="btn tfT" data-v="1">✔ Prawda</button><button class="btn tfF" data-v="0">✘ Fałsz</button></div><div class="tfx"></div>`;
    el.querySelectorAll('[data-v]').forEach(btn=>btn.onclick=()=>{
      const ok=(+btn.dataset.v===v);if(ok)score++;
      el.querySelectorAll('[data-v]').forEach(b=>{
        b.disabled=true;
        if(+b.dataset.v===v){b.classList.add('right');b.insertAdjacentHTML('beforeend',' &nbsp;← poprawna')}
        else if(b===btn){b.classList.add('wrong');b.insertAdjacentHTML('beforeend',' &nbsp;← twój wybór')}
        else b.classList.add('dim');
      });
      const x=el.querySelector('.tfx');
      const mine=+btn.dataset.v?'Prawda':'Fałsz',right=v?'Prawda':'Fałsz';
      x.innerHTML=`<div class="verdict ${ok?'good':'bad'}">${ok?`Dobrze! Odpowiedź: ${right}.`:`Odpowiedziałeś: ${mine}. Poprawna odpowiedź: ${right}.`}<small>${w}</small></div><button class="btn sm next">${i+1<items.length?'Dalej →':'Zobacz wynik'}</button>`;
      const nx=x.querySelector('.next');nx.onclick=()=>{i++;show()};nx.focus();
    });
  }
  show();return el;
}

function viewLearn(cat,idx,slideArg){
  setNav('learn');
  if(!BANK[cat]){cat=(S.last&&S.last.cat)||'cyber';idx=(S.last&&S.last.i)||0}
  const b=BANK[cat];idx=Math.max(0,Math.min(b.lessons.length-1,+idx||0));
  S.last={cat,i:idx};save();
  const lesson=b.lessons[idx],checks=(CHECKS[cat]||[])[idx]||null;
  const side=CATS.map(c=>{const bb=BANK[c];return `<a class="cb ${c===cat?'on':''}" style="--c:${bb.color}" href="#/learn/${c}/0">${bb.icon} ${SHORT[c]}</a>`+(c===cat?bb.lessons.map((l,j)=>`<a class="lsn ${j===idx?'on':''}" href="#/learn/${c}/${j}">${j+1}. ${l.h}${S.seen[c+j]?' <span class="ok">✓</span>':''}</a>`).join(''):'')}).join('');
  const opts=CATS.flatMap(c=>BANK[c].lessons.map((l,j)=>`<option value="${c}/${j}" ${c===cat&&j===idx?'selected':''}>${SHORT[c]} – ${j+1}. ${l.h}</option>`)).join('');
  $app.innerHTML=`<div class="lv" style="--c:${b.color}"><aside class="ls">${side}</aside><section class="lm"><select class="lsel">${opts}</select><div class="sl"></div><div class="lmf"><button class="navb" id="pv" aria-label="Wstecz">◀</button><span class="lt">${idx+1}. ${lesson.h}</span><div class="dots"></div><button class="navb" id="nx" aria-label="Dalej">▶</button></div></section></div>`;
  $app.querySelector('.lsel').onchange=e=>{location.hash='#/learn/'+e.target.value};
  const sl=$app.querySelector('.sl'),dots=$app.querySelector('.dots'),pv=$app.querySelector('#pv'),nx=$app.querySelector('#nx');
  let slides=[],cur=0;
  const lastLesson=idx===b.lessons.length-1;
  function compute(){
    const st=getComputedStyle(sl);
    const W=sl.clientWidth-parseFloat(st.paddingLeft)-parseFloat(st.paddingRight);
    const H=NARROW.matches?1e6:sl.clientHeight-parseFloat(st.paddingTop)-parseFloat(st.paddingBottom)-4;
    slides=paginate(`<h3>${lesson.h}</h3>`+lesson.html,W,H);
    if(checks)slides.push({check:true});
  }
  function render(){
    const s=slides[cur];sl.innerHTML='';
    if(s.check){
      const c=buildCheck(checks,cat,()=>{S.seen[cat+idx]=true;save();const a=$app.querySelector('.lsn.on');if(a&&!a.querySelector('.ok'))a.insertAdjacentHTML('beforeend',' <span class="ok">✓</span>')});
      sl.appendChild(c);
    }else{
      const d=h('div','sl-in',s.html);
      if(s.scale<1){d.style.zoom=s.scale;d.style.width=(100/s.scale)+'%'}
      d.querySelectorAll('.diagram').forEach(f=>f.onclick=()=>openZoom(f));
      sl.appendChild(d);
    }
    dots.innerHTML=slides.map((x,k)=>`<button class="dot ${x.check?'chk':''} ${k===cur?'on':''}" data-k="${k}" title="${x.check?'Mini-sprawdzian':'Slajd '+(k+1)}"></button>`).join('');
    dots.querySelectorAll('.dot').forEach(d=>d.onclick=()=>{cur=+d.dataset.k;render()});
    pv.disabled=(cur===0&&idx===0&&CATS.indexOf(cat)===0);
    nx.disabled=false;
    nx.textContent=(cur===slides.length-1&&lastLesson)?'Ćwicz ↗':'▶';
    nx.style.width=nx.textContent==='▶'?'':'auto';nx.style.padding=nx.textContent==='▶'?'':'0 12px';
    if(!checks&&cur===slides.length-1){S.seen[cat+idx]=true;save()}
  }
  function go(d){
    if(d>0){
      if(cur<slides.length-1){cur++;render()}
      else if(!lastLesson)location.hash=`#/learn/${cat}/${idx+1}`;
      else location.hash=`#/practice/${cat}`;
    }else{
      if(cur>0){cur--;render()}
      else if(idx>0)location.hash=`#/learn/${cat}/${idx-1}/last`;
      else{const ci=CATS.indexOf(cat);if(ci>0){const pc=CATS[ci-1];location.hash=`#/learn/${pc}/${BANK[pc].lessons.length-1}/last`}}
    }
  }
  pv.onclick=()=>go(-1);nx.onclick=()=>go(1);
  keyFn=e=>{if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();go(1)}else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(-1)}};
  let timer;const onResize=()=>{clearTimeout(timer);timer=setTimeout(()=>{const frac=slides.length>1?cur/(slides.length-1):0;compute();cur=Math.round(frac*(slides.length-1));render()},150)};
  window.addEventListener('resize',onResize);
  cleanup=()=>{window.removeEventListener('resize',onResize);clearTimeout(timer)};
  requestAnimationFrame(()=>{compute();cur=slideArg==='last'?slides.length-1:0;render()});
}

/* ---------- ćwiczenia ---------- */
function viewPracticeIndex(){
  setNav('practice');
  const mistakes=ALLQ.filter(q=>S.prog[q.id]&&!S.prog[q.id].l).length,stars=Object.keys(S.star).length;
  const off=ALLQ.filter(q=>q.src==='o').length;
  const sp=[['all','🎲','Wszystko wymieszane',ALLQ.length+' pytań'],['official','📌','Oficjalny test próbny',off+' pytań z platformy'],['mistakes','🔁','Powtórka błędów',mistakes+' pytań'],['starred','★','Oznaczone jako trudne',stars+' pytań']];
  $app.innerHTML=`<div class="pgrid">${sp.map(([k,i,t,s])=>`<a class="pick" href="#/practice/${k}"><span class="ic">${i}</span><div><b>${t}</b><small>${s}</small></div></a>`).join('')}${CATS.map(c=>{const b=BANK[c],m=mastered(c),n=b.qs.length;return `<a class="pick" style="--c:${b.color}" href="#/practice/${c}"><span class="ic">${b.icon}</span><div style="flex:1"><b>${SHORT[c]}</b><small>${m}/${n} opanowane</small><div class="bar" style="--c:${b.color}"><i style="width:${n?m/n*100:0}%"></i></div></div></a>`}).join('')}</div>`;
}

function viewPractice(key){
  setNav('practice');
  let pool,title;
  if(BANK[key]){pool=BANK[key].qs;title=SHORT[key]}
  else if(key==='all'){pool=ALLQ;title='Wszystko'}
  else if(key==='official'){pool=ALLQ.filter(q=>q.src==='o');title='Oficjalny test próbny'}
  else if(key==='mistakes'){pool=ALLQ.filter(q=>S.prog[q.id]&&!S.prog[q.id].l);title='Powtórka błędów'}
  else if(key==='starred'){pool=ALLQ.filter(q=>S.star[q.id]);title='Trudne'}
  else return viewPracticeIndex();
  if(!pool.length){$app.innerHTML=`<div class="card">Brak pytań w zestawie „${title}”. <a href="#/practice">Wróć do listy zestawów</a>.</div>`;return}
  const queue=shuffle(pool);let i=0,session={ok:0,pts:0,max:0};
  function show(){
    if(i>=queue.length){
      $app.innerHTML=`<div class="card" style="text-align:center;margin:auto;max-width:520px"><div class="big">${fmt(session.pts)} / ${fmt(session.max)} pkt</div><p>${title}: pełnych trafień <b>${session.ok}</b> z ${queue.length}. Punkty liczone jak w BTI.</p><div class="row" style="justify-content:center"><button class="btn" id="again">Jeszcze raz</button><a class="btn ghost" href="#/practice/mistakes">Powtórz błędy</a><a class="btn ghost" href="#/practice">Inne zestawy</a></div></div>`;
      $app.querySelector('#again').onclick=()=>viewPractice(key);keyFn=null;return;
    }
    const q=queue[i];$app.innerHTML='';
    const b=buildQ(q);b.setProgress(i,queue.length);$app.appendChild(b.el);
    const chk=h('button','btn','Sprawdź'),nxt=h('button','btn','Dalej →'),skip=h('button','btn ghost','Pomiń');nxt.hidden=true;
    const next=()=>{i++;show()};
    chk.onclick=()=>{const g=b.reveal(b.sel());record(q,g.full);session.pts+=g.score;session.max+=g.pts;if(g.full)session.ok++;chk.hidden=true;skip.hidden=true;nxt.hidden=false;nxt.focus()};
    nxt.onclick=next;skip.onclick=next;
    b.act.append(chk,skip,nxt);
    keyFn=e=>{
      if(/^[1-6]$/.test(e.key)){b.toggle(+e.key-1)}
      else if(e.key==='Enter'){e.preventDefault();(!chk.hidden?chk:nxt).click()}
    };
  }
  show();
}

/* ---------- egzamin ---------- */
function viewExam(){
  setNav('exam');
  $app.innerHTML=`<div class="card" style="margin:auto;max-width:560px;text-align:center"><div class="big">16 pytań · 15 min</div><p>Po 2 pytania z każdej kategorii: jedno za mniej, jedno za więcej punktów. Odpowiedzi poznasz po zakończeniu. Punkty liczone dokładnie jak w BTI. Pytania możesz pomijać.</p><button class="btn" id="go">Start</button></div>`;
  $app.querySelector('#go').onclick=startExam;
}
function startExam(){
  const picks=[];
  CATS.forEach(c=>{
    const qs=BANK[c].qs;const lo=shuffle(qs.filter(q=>(q.p||1)<3)),hi=shuffle(qs.filter(q=>(q.p||1)>=3));
    if(lo[0])picks.push(lo[0]);if(hi[0])picks.push(hi[0]);else if(lo[1])picks.push(lo[1]);
  });
  const qs=shuffle(picks);let i=0,left=15*60,done=false;
  const builds=qs.map(q=>buildQ(q));const answers=qs.map(()=>new Set());
  const tm=h('span','timer','15:00');
  const nav=h('div','');nav.style.cssText='display:flex;gap:8px;align-items:center;flex-wrap:wrap;width:100%';
  const prev=h('button','btn ghost','← Wstecz'),next=h('button','btn','Dalej →'),fin=h('button','btn ghost','Zakończ test');
  nav.append(prev,next,h('span','sp'),fin);
  const iv=setInterval(()=>{left--;const m=Math.floor(left/60),s=left%60;tm.textContent=`${m}:${String(s).padStart(2,'0')}`;tm.classList.toggle('low',left<=120);if(left<=0)finish()},1000);
  cleanup=()=>clearInterval(iv);
  function sync(){answers[i]=builds[i].sel()}
  function show(){
    $app.innerHTML='';const b=builds[i];b.setProgress(i,qs.length);
    b.meta.insertBefore(tm,b.meta.querySelector('.cnt'));b.el.querySelector('.star').style.display='none';
    b.act.appendChild(nav);$app.appendChild(b.el);prev.disabled=i===0;next.disabled=i===qs.length-1;
  }
  prev.onclick=()=>{sync();i--;show()};next.onclick=()=>{sync();i++;show()};
  keyFn=e=>{if(/^[1-6]$/.test(e.key))builds[i].toggle(+e.key-1)};
  function finish(){
    if(done)return;done=true;clearInterval(iv);sync();keyFn=null;
    const per={};let tot=0,max=0;const reviews=[];
    qs.forEach((q,k)=>{
      const g=grade(q,answers[k]);tot+=g.score;max+=g.pts;
      const p=per[q.c]||(per[q.c]={s:0,m:0});p.s+=g.score;p.m+=g.pts;
      if(answers[k].size)record(q,g.full);
      const bb=buildQ(q);
      bb.el.querySelectorAll('input').forEach(inp=>{inp.checked=answers[k].has(+inp.dataset.i)});
      bb.reveal(answers[k]);
      if(!answers[k].size)bb.el.querySelector('.fb').insertAdjacentHTML('afterbegin','<div class="verdict part">Pominięte: 0 pkt, bez kary</div>');
      bb.setProgress(k,qs.length);reviews.push(bb);
    });
    const showSummary=()=>{keyFn=null;$app.innerHTML=`<div class="card" style="margin:auto;width:100%;max-width:820px"><div class="resgrid"><div style="text-align:center"><div class="big">${fmt(tot)} / ${fmt(max)}</div><p class="muted" style="margin:.2em 0 0">${Math.round(tot/max*100)}% punktów</p></div><div class="res" style="margin:0">${CATS.map(c=>{const p=per[c];if(!p)return '';const bb=BANK[c];return `<div class="r"><span>${bb.icon} ${SHORT[c]}</span><div class="bar" style="--c:${bb.color}"><i style="width:${p.s/p.m*100}%"></i></div><b>${fmt(p.s)}/${fmt(p.m)}</b></div>`}).join('')}</div></div><div class="row" style="margin-top:14px"><button class="btn" id="rv">Przegląd odpowiedzi</button><button class="btn ghost" id="ne">Nowy egzamin</button><a class="btn ghost" href="#/practice/mistakes">Powtórz błędy</a></div></div>`;
    $app.querySelector('#ne').onclick=startExam;
    $app.querySelector('#rv').onclick=()=>review(0);};
    function review(k){
      $app.innerHTML='';const r=reviews[k];$app.appendChild(r.el);
      const p=h('button','btn ghost','← Wstecz'),n=h('button','btn','Dalej →'),sm=h('button','btn ghost','Podsumowanie');
      p.disabled=k===0;n.disabled=k===reviews.length-1;
      p.onclick=()=>review(k-1);n.onclick=()=>review(k+1);sm.onclick=showSummary;
      r.act.append(p,n,sm);
      keyFn=e=>{if(e.key==='ArrowRight'&&!n.disabled)n.click();else if(e.key==='ArrowLeft'&&!p.disabled)p.click()};
    }
    showSummary();
  }
  fin.onclick=()=>{if(confirm('Zakończyć test? Nie wrócisz do pytań.'))finish()};
  show();
}

/* ---------- router ---------- */
function route(){
  if(cleanup){cleanup();cleanup=null}keyFn=null;
  const p=(location.hash||'#/').slice(2).split('/');
  switch(p[0]){
    case 'rules':return viewRules();
    case 'learn':return viewLearn(p[1],p[2],p[3]);
    case 'practice':return p[1]?viewPractice(p[1]):viewPracticeIndex();
    case 'exam':return viewExam();
    default:return viewHome();
  }
}
window.addEventListener('hashchange',route);
route();
})();
