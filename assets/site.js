(function(){
  var d=document,h=d.documentElement;
  var b=d.querySelector('.burger'),hd=d.querySelector('.hdr');
  if(b&&hd)b.addEventListener('click',function(){hd.classList.toggle('open')});
  var fs=parseFloat(localStorage.getItem('vfs')||'1');
  function setfs(v){fs=Math.max(1,Math.min(1.3,v));h.style.setProperty('--fs',fs);localStorage.setItem('vfs',fs)}
  setfs(fs);
  if(localStorage.getItem('vhc')==='1')h.setAttribute('data-hc','1');
  var ak=d.body&&d.body.getAttribute('data-altkind'),va=localStorage.getItem('valt');
  if(va==='1'||(va===null&&ak==='dark'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches))h.setAttribute('data-alt','1');
  d.addEventListener('click',function(e){
    var t=e.target.closest('[data-a]');if(!t)return;
    var a=t.getAttribute('data-a');
    if(a==='plus')setfs(fs+.15);
    if(a==='minus')setfs(fs-.15);
    if(a==='hc'){var on=h.getAttribute('data-hc')==='1';if(on)h.removeAttribute('data-hc');else h.setAttribute('data-hc','1');localStorage.setItem('vhc',on?'0':'1')}
    if(a==='alt'){var o=h.getAttribute('data-alt')==='1';if(o)h.removeAttribute('data-alt');else h.setAttribute('data-alt','1');localStorage.setItem('valt',o?'0':'1')}
    if(a==='rec'){e.preventDefault();d.getElementById('rec').classList.add('on')}
    if(a==='close'){d.getElementById('rec').classList.remove('on')}
  });
  var m=d.getElementById('rec');if(m)m.addEventListener('click',function(e){if(e.target===m)m.classList.remove('on')});
  var q=d.getElementById('pq');
  if(q)q.addEventListener('input',function(){var v=q.value.toLowerCase();d.querySelectorAll('[data-row]').forEach(function(r){r.style.display=r.textContent.toLowerCase().indexOf(v)>=0?'':'none'})});

  // длинное слово в заголовке не рвём посередине: уменьшаем шрифт, пока каждое слово не влезет в строку
  function ov(e){var r=d.createRange();r.selectNodeContents(e);var a=r.getBoundingClientRect(),b=e.getBoundingClientRect(),c=getComputedStyle(e);return e.scrollWidth>e.clientWidth||a.right>b.right-parseFloat(c.paddingRight)-parseFloat(c.borderRightWidth)-.5}
  function fit(){var hs=d.querySelectorAll('h1');for(var i=0;i<hs.length;i++){var e=hs[i];if(!e.getAttribute('data-j')){e.innerHTML=e.innerHTML.replace(/»\s*:/g,'»\u2060:');e.setAttribute('data-j','1')}e.style.fontSize='';e.style.width='';var w=e.getBoundingClientRect().width;e.style.boxSizing='border-box';e.style.width=w+'px';e.style.overflowWrap='normal';var f=parseFloat(getComputedStyle(e).fontSize),mn=f*.5,k=0;while(ov(e)&&f>mn&&k<40){f*=.94;e.style.fontSize=f+'px';k++}e.style.overflowWrap='';e.style.width='';e.style.boxSizing=''}}
  fit();window.addEventListener('resize',fit);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fit);window.addEventListener('load',fit);
  d.addEventListener('click',function(e){var t=e.target.closest('[data-a]');if(t&&/plus|minus/.test(t.getAttribute('data-a')))setTimeout(fit,0)});
})();
