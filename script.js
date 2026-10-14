const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* ---------- scroll reveal + count-up ---------- */
function count(b){const n=+b.dataset.n,d=+b.dataset.d||0,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1200);b.textContent=(n*(1-Math.pow(1-p,3))).toFixed(d)+b.dataset.s;if(p<1)requestAnimationFrame(f)})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');const b=e.target.querySelector('b[data-n]');if(b)count(b);io.unobserve(e.target)}),{threshold:.15});
$$('.reveal').forEach(el=>io.observe(el));
/* ---------- sticky "how it works" story ---------- */
const dev=$('#dev');$$('.step')[0].classList.add('on');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;$$('.step').forEach(s=>s.classList.toggle('on',s===e.target));dev.dataset.s=e.target.dataset.s}),{rootMargin:'-45% 0px -45% 0px'});
$$('.step').forEach(s=>so.observe(s));
/* ---------- partner ROI calculator (the plan's example, adjustable) ---------- */
const usd=n=>n>=1e6?'$'+(n/1e6).toFixed(2)+'M':'$'+Math.round(n/1e3)+'K';
function roi(){const c=+$('#c1').value,p=+$('#c2').value/100,k=+$('#c3').value,s=+$('#c4').value/100,av=c*p,sv=av*k;
$('#v1').textContent=c.toLocaleString();$('#v2').textContent=(p*100)+'%';$('#v3').textContent='$'+k.toFixed(2);$('#v4').textContent=(s*100)+'%';
$('#o1').textContent=Math.round(av).toLocaleString();$('#o2').textContent=usd(sv);$('#o3').textContent=usd(sv*s);$('#o4').textContent=usd(sv*(1-s))}
['#c1','#c2','#c3','#c4'].forEach(i=>$(i).oninput=roi);roi();
/* ---------- live demo: one engine, two ways in ---------- */
const T={en:{open:'Show me how',ask:'What do you want to do?',tap:'Tap here',wrong:"That's not the circled button. Try the circled one.",consent:'Can NextTap look at this page? I never see passwords or card numbers, and I keep nothing after you close me.',yes:'Yes, show me',look:'Look for:',step:'Step',calls:'AI calls',plan:'planned route, no AI needed',ver:'Verified',def:'(In the product this is an AI call, made only when you press i.)',ext:'Open NextTap from the toolbar',lang:'English'},
es:{open:'Muéstreme cómo',ask:'¿Qué quiere hacer?',tap:'Toque aquí',wrong:'Ese no es el botón marcado. Pruebe el del círculo.',consent:'¿Puede NextTap mirar esta página? Nunca veo contraseñas ni números de tarjeta, y no guardo nada cuando me cierra.',yes:'Sí, muéstreme',look:'Busque:',step:'Paso',calls:'Llamadas de IA',plan:'ruta planificada, sin IA',ver:'Verificado',def:'(En el producto es una llamada de IA, solo cuando presiona i.)',ext:'Abra NextTap desde la barra',lang:'Español'}};
const bar=(c,n)=>`<div class=brandbar style="background:${c}">${n}</div>`,B='#0B5D3B',R='#B3122B';
const cards=`${bar(B,'Sample Community Bank')}<h4>Debit card ••4821</h4><button data-t=freeze>Freeze card</button><button>Report lost or stolen</button>`;
const M={
sdk:{chrome:'Sample Community Bank · NextTap SDK embedded in the app',note:'The partner adds a few lines of code. Customers get a "Show me how" button inside the app, with the partner\'s own context, masking rules and planned routes. Familiar tasks need no AI calls.',
 task:{en:'Freeze my card',es:'Congelar mi tarjeta'},
 home:`${bar(B,'Sample Community Bank')}<h4>Accounts</h4><p>Checking ••4821 · Savings ••9310</p><button data-t=cards>Cards</button><button>Statements</button><button>Alerts</button>`,
 screens:{cards,dlg:cards+'<div class=dlg><div><h4>Freeze this card?</h4><button data-t=confirm>Yes, freeze card</button><button>Cancel</button></div></div>',done:cards.replace('Freeze card','Unfreeze card')+'<div class=done>Your card is frozen.</div>'},
 steps:[{s:'home',t:'cards',term:'Cards',en:'Tap the button that says “Cards”, near the top.',es:'Toque el botón «Cards» (Tarjetas), cerca de arriba.'},
 {s:'cards',t:'freeze',term:'Freeze card',en:'Tap “Freeze card”. The card stops working until you unfreeze it.',es:'Toque «Freeze card» (Congelar tarjeta). La tarjeta deja de funcionar hasta que la descongele.'},
 {s:'dlg',t:'confirm',term:'Yes, freeze card',en:'A pop-up asks you to confirm. Tap “Yes, freeze card”.',es:'Una ventana pide confirmar. Toque «Yes, freeze card» (Sí, congelar tarjeta).'}],
 ok:{en:'Done. I can see: “Your card is frozen.”',es:'Listo. Veo: «Your card is frozen.» (Su tarjeta está congelada.)'},
 defs:{'Cards':'The page where you manage your debit card.','Freeze card':'Temporarily stops the card from being used. You can unfreeze it any time.','Yes, freeze card':'Confirms the freeze. Nothing is charged.'}},
ext:{chrome:'streambox.example · NextTap Chrome extension',note:'Works on any website, with no partner needed. This demo shows the cancellation wedge: NextTap spots a discount offer, says it is an offer, and keeps pointing at the real way out.',
 task:{en:'Cancel my subscription',es:'Cancelar mi suscripción'},
 home:`${bar(R,'StreamBox')}<h4>Welcome back</h4><button>Browse</button><button data-t=acct>Account</button>`,
 screens:{acct:`${bar(R,'StreamBox')}<h4>Account</h4><button>Profile</button><button>Update payment method</button><button data-t=member>Manage membership</button>`,
 manage:`${bar(R,'StreamBox')}<h4>Your membership</h4><p>Premium, billed monthly.</p><button data-t=cancel>Cancel membership</button>`,
 offer:`${bar(R,'StreamBox')}<h4>Wait! Stay for 50% off</h4><button data-offer=1>Keep my plan at 50% off</button><button data-offer=1>Pause instead</button><button data-t=cont>Continue to cancel</button>`,
 conf:`${bar(R,'StreamBox')}<h4>Cancel membership?</h4><button data-t=fin>Finish cancellation</button><button>Go back</button>`,
 done:`${bar(R,'StreamBox')}<h4>Membership</h4><div class=done>Your membership has been cancelled. Access ends Nov 12.</div>`},
 steps:[{s:'home',t:'acct',term:'Account',en:'Tap “Account” at the top right.',es:'Toque «Account» (Cuenta) arriba a la derecha.'},
 {s:'acct',t:'member',term:'Manage membership',en:'Tap “Manage membership”.',es:'Toque «Manage membership» (Administrar membresía).'},
 {s:'manage',t:'cancel',term:'Cancel membership',en:'Tap “Cancel membership”.',es:'Toque «Cancel membership» (Cancelar membresía).'},
 {s:'offer',t:'cont',term:'Continue to cancel',en:'That is a discount offer. To cancel, tap “Continue to cancel”.',es:'Eso es una oferta de descuento. Para cancelar, toque «Continue to cancel» (Continuar para cancelar).',offer:{en:'That one is an offer, not the cancel button. Look for “Continue to cancel”.',es:'Eso es una oferta, no el botón de cancelar. Busque «Continue to cancel».'}},
 {s:'conf',t:'fin',term:'Finish cancellation',en:'Last step. Tap “Finish cancellation”.',es:'Último paso. Toque «Finish cancellation» (Finalizar cancelación).'}],
 ok:{en:'Done. I can see: “Your membership has been cancelled.”',es:'Listo. Veo: «Your membership has been cancelled.» (Su membresía fue cancelada.)'},
 defs:{'Account':'Where your profile, payment and plan settings live.','Manage membership':'The page to change or end your plan.','Cancel membership':'Starts the process of ending your plan. You can still change your mind.','Continue to cancel':'Skips the discount and keeps going toward cancelling.','Finish cancellation':'Confirms that you want to cancel. It ends your plan.'}}};
let mode='sdk',lang='en',n=0,ai=0,cur=null;const stage=$('#stage'),chat=$('#chat');
const S=()=>M[mode],t=k=>T[lang][k];
function say(txt,cls,term){const d=document.createElement('div');d.className='m '+(cls||'');d.textContent=txt;
 if(term){const b=Object.assign(document.createElement('b'),{className:'t',textContent:term}),i=Object.assign(document.createElement('button'),{className:'i',textContent:'i',title:'What does this mean?'}),def=document.createElement('span');def.className='def';def.hidden=true;
  i.onclick=()=>{def.hidden=!def.hidden;def.textContent=(S().defs[term]||'')+' '+t('def')};d.append(document.createElement('br'),t('look')+' ',b,i,def)}
 chat.append(d);chat.scrollTop=chat.scrollHeight;return d}
function btn(txt,fn){const b=Object.assign(document.createElement('button'),{className:'go',textContent:txt});b.onclick=()=>{b.remove();fn()};return b}
function meter(v){$('#meter').textContent=v?`✓ ${t('ver')} · ${t('calls')}: ${mode==='ext'?ai:0}${mode==='ext'?` (≈ $${(ai*.02).toFixed(2)})`:` (${t('plan')})`}`:`${t('step')} ${Math.min(n+1,S().steps.length)}/${S().steps.length} · ${t('calls')}: ${mode==='ext'?ai:0}${mode==='ext'?'':` (${t('plan')})`}`}
function reset(){n=0;ai=0;cur=null;chat.textContent='';$('#note').textContent=S().note;$('#chrome').textContent=S().chrome;$('#lang').textContent=t('lang');
 stage.innerHTML=S().home+(mode==='sdk'?`<button class=fab data-fab=1 style="position:absolute;right:16px;bottom:16px;background:${B};color:#fff;border-color:#fff;border-radius:999px;box-shadow:0 6px 20px rgba(0,0,0,.35)">${t('open')}</button>`:'');
 meter();if(mode==='ext'){const d=say(t('ext'));d.append(btn(lang==='en'?'Click the icon':'Haga clic en el icono',openChat))}else say(lang==='en'?'Press “Show me how” in the app.':'Presione «Muéstreme cómo» en la app.')}
function openChat(){say(t('ask'));chat.lastChild.append(btn(S().task[lang],()=>{say(S().task[lang],'u');const d=say(t('consent'));d.append(btn(t('yes'),()=>step(0)))}))}
function mark(el){const r=el.getBoundingClientRect(),o=stage.getBoundingClientRect();$$('.ring,.tag').forEach(x=>x.remove());
 const g=document.createElement('div');g.className='ring';Object.assign(g.style,{left:r.left-o.left-6+'px',top:r.top-o.top-6+'px',width:r.width+12+'px',height:r.height+12+'px'});
 const a=document.createElement('div');a.className='tag';a.textContent=t('tap');stage.append(g,a);const w=a.offsetWidth,h=a.offsetHeight,below=r.bottom-o.top+36+h<=o.height;a.className='tag '+(below?'below':'above');
 a.style.left=Math.min(Math.max(6,r.left-o.left+r.width/2-w/2),o.width-w-6)+'px';a.style.top=(below?r.bottom-o.top+36:Math.max(4,r.top-o.top-36-h))+'px'}
function step(i){n=i;const s=S().steps[i];if(!s){cur=null;$$('.ring,.tag').forEach(x=>x.remove());const last=S().steps[S().steps.length-1];stage.innerHTML=S().screens.done;say(S().ok[lang],'ok');meter(1);return}
 cur=s;stage.innerHTML=s.s==='home'?S().home:S().screens[s.s];if(mode==='ext')ai++;
 say(s[lang],'',s.term);meter();const nxt=stage.querySelector(`[data-t="${s.t}"]`);if(nxt)mark(nxt)}
stage.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.fab)return void openChat();if(!cur)return;
 if(b.dataset.t===cur.t)step(n+1);else say(b.dataset.offer&&cur.offer?cur.offer[lang]:t('wrong'))};
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));mode=b.dataset.m;reset()});
$('#lang').onclick=()=>{lang=lang==='en'?'es':'en';reset()};$('#restart').onclick=reset;reset();

const PH=['Toque aquí','点这里','Nhấn vào đây','اضغط هنا','यहाँ टैप करें','Appuyez ici','Tippen Sie hier','Нажмите здесь','여기를 누르세요','ここをタップ','Clique aqui','Pindutin dito','Peze isit la','Buraya dokunun','Dotknij tutaj','Tocca qui','Tryck här','Gonga hapa','Tap here'];
$('#mq').innerHTML=[...PH,...PH].map(p=>`<span class="pill" dir="auto">${p}</span>`).join('');

addEventListener('resize',()=>{if(!cur)return;const e=stage.querySelector(`[data-t="${cur.t}"]`);if(e)mark(e)});
document.getElementById("pilotBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const subject = "NextTap Pilot Inquiry";

    const body = `Hello NextTap Team,

I'm interested in learning more about running a NextTap pilot.

My details:
Name: [Your name]
Organization: [Company / organization]
Role: [Your role]
Work email: [Your email]
Phone (optional): [Your phone number]

About our organization:
[Briefly describe your organization and the customers you serve.]

Pilot goals:
[What would you like to test or improve with NextTap?]

Estimated number of participants:
[Approximate number of customers]

Preferred timeline:
[When would you like to start?]

Additional questions or information:
[Anything else you'd like us to know.]

I look forward to hearing from you.

Best regards,
[Your name]`;

    const mailto = "mailto:shyam.nexttap@gmail.com"
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
});
