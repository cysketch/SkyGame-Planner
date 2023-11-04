// nanoid - https://github.com/ai/nanoid
// MIT License - https://github.com/ai/nanoid/blob/main/LICENSE
// https://cdnjs.cloudflare.com/ajax/libs/nanoid/5.0.2/index.browser.min.js
export{urlAlphabet}from"./url-alphabet/index.js";let random=t=>crypto.getRandomValues(new Uint8Array(t)),customRandom=(n,t,a)=>{let l=(2<<Math.log(n.length-1)/Math.LN2)-1,m=-~(1.6*l*t/n.length);return(e=t)=>{let o="";for(;;){var r=a(m);let t=m;for(;t--;)if((o+=n[r[t]&l]||"").length===e)return o}}},customAlphabet=(t,e=21)=>customRandom(t,e,random),nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():62<e?"-":"_","");export{random,customRandom,customAlphabet,nanoid};
