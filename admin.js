const API_URL='YOUR_GAS_WEBAPP_URL';
const units=['💗carino💗','🌷cantabile🌷','☁️ragazzo☁️','🎈infanzia🎈','🍀questi giovanni🍀','❄️mixing❄️','⭐️fresco⭐️','🪐supernova🪐','📚albore📚','📚colore📚','👑運営👑'];
const unitMembers={
'☁️ragazzo☁️':['☁⚡️上條 慧','☁🎲白太 李白','☁💎月見里 藍','☁🔮天崎 瑠叶'],
'❄️mixing❄️':['❄️🐬山野 裕希','❄️⚜️西園寺 倭','❄️⛩冴木 まち','❄️☔️清水 灯雨'],
'⭐️fresco⭐️':['⭐️🐯前原 玲音','⭐️💠神崎 澪','⭐️🦊桜狐 零','⭐️🔑桃居 折'],
'🌷cantabile🌷':['🌷🔅水樹 果歩','🌷🍳近衛 睦月','🌷👒宍戸 優羽','🌷🪽福丸 うい'],
'🍀questi giovanni🍀':['🍀🐱西島 音夢','🍀⛵️蒼井 奏','🍀🎀知花 望彩','🍀🥢橋本 鈴'],
'🎈infanzia🎈':['🎈🌙花園 恋雪','🎈🫧小花依 美銀','🎈💘春姫 空恋咲','🎈🐰星月 結夢'],
'💗carino💗':['💗🍃有間 葵','💗🐠青峰 宝','💗🏵琴宮 遥歌','💗🍥月宮 愛来'],
'🪐supernova🪐':['🪐🦈伊吹 悠','🪐🎞幽谷 帳','🪐👓栗原 青','🪐🐺真神 紅狼'],
'📚albore📚':[],
'📚colore📚':[],
'👑運営👑':['🎈🌙花園 恋雪','☁⚡️上條 慧','☁🎲白太 李白','🍀⛵️蒼井 奏','⭐️💠神崎 澪']
};
const members=['☁⚡️上條 慧','☁🎲白太 李白','☁💎月見里 藍','☁🔮天崎 瑠叶','❄️🐬山野 裕希','❄️⚜️西園寺 倭','❄️⛩冴木 まち','❄️☔️清水 灯雨','⭐️🐯前原 玲音','⭐️💠神崎 澪','⭐️🦊桜狐 零','⭐️🔑桃居 折','🌷🔅水樹 果歩','🌷🍳近衛 睦月','🌷👒宍戸 優羽','🌷🪽福丸 うい','🍀🐱西島 音夢','🍀⛵️蒼井 奏','🍀🎀知花 望彩','🍀🥢橋本 鈴','🎈🌙花園 恋雪','🎈🫧小花依 美銀','🎈💘春姫 空恋咲','🎈🐰星月 結夢','💗🍃有間 葵','💗🐠青峰 宝','💗🏵琴宮 遥歌','💗🍥月宮 愛来','🪐🦈伊吹 悠','🪐🎞幽谷 帳','🪐👓栗原 青','🪐🐺真神 紅狼'];
window.onload=()=>{unit.innerHTML=units.map(u=>`<option>${u}</option>`).join('');memberBox.innerHTML=members.map((m,i)=>`<label><input type="checkbox" value="${m}">${m}</label>`).join('');};
function syncMembersByUnit(){document.querySelectorAll('#memberBox input').forEach(x=>x.checked=false);(unitMembers[unit.value]||[]).forEach(name=>{const el=[...document.querySelectorAll('#memberBox input')].find(x=>x.value===name);if(el)el.checked=true;});}
function submitData(){const checked=[...document.querySelectorAll('#memberBox input:checked')].map(x=>x.value).join(',');const payload={title:title.value||autoTitle(url.value),url:url.value,unit:unit.value,tags:tags.value,members:checked,post_date:post_date.value};fetch(API_URL,{method:'POST',body:JSON.stringify(payload)}).then(r=>r.text()).then(()=>out.textContent='登録完了');}
function autoTitle(url){const id=(url.match(/sounds\/([^/?]+)/)||[])[1]||'';return 'sound-'+id;}
