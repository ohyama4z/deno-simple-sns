import{d as m,r as _,o as i,c,a as t,w as v,v as g,t as d,b,e as B,f as h,F as x,g as $,h as A,i as F}from"./vendor.2f4a48db.js";const C=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}};C();const p="https://deno-simple-sns-4tg7zmbcjpag.deno.dev",L=t("div",null,"\u30E6\u30FC\u30B6\u540D",-1),M=t("div",null,"\u30E1\u30C3\u30BB\u30FC\u30B8",-1),w=m({emits:["submit"],setup(a,{emit:o}){const n=_(""),r=_(""),e=async()=>{const s=JSON.stringify({username:n.value,message:r.value});await fetch(`${p}/messages`,{method:"POST",mode:"cors",body:s}),o("submit")};return(s,u)=>(i(),c("div",null,[L,t("div",null,[v(t("input",{type:"text","onUpdate:modelValue":u[0]||(u[0]=l=>n.value=l)},null,512),[[g,n.value]])]),M,t("div",null,[v(t("textarea",{placeholder:"\u6295\u7A3F\u3057\u305F\u3044\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u5165\u529B","onUpdate:modelValue":u[1]||(u[1]=l=>r.value=l)},null,512),[[g,r.value]])]),t("div",null,[t("button",{onClick:e},"\u6295\u7A3F")])]))}});var f=(a,o)=>{const n=a.__vccOpts||a;for(const[r,e]of o)n[r]=e;return n};const E={class:"message"},O=b(),N={class:"messageValue"},S={class:"like"},V=m({props:{id:null,username:null,message:null,likes:null,createdAt:null},emits:["like"],setup(a,{emit:o}){const n=a,r=async()=>{await fetch(`${p}/messages/like?id=${n.id}`,{method:"POST",mode:"cors"}),o("like")};return(e,s)=>(i(),c("div",E,[t("div",null,[t("strong",null,d(a.username),1),O,t("small",null,d(a.createdAt),1)]),t("div",N,[t("div",null,d(a.message),1),t("div",S,[t("span",null,"LIKE\u3055\u308C\u305F\u6570 : "+d(a.likes),1),t("button",{onClick:r,class:"likeButton"},"+1 LIKE")])])]))}});var D=f(V,[["__scopeId","data-v-7c2769f4"]]);const I={};function T(a,o){return i(),c("h1",null,"deno-simple-sns")}var P=f(I,[["render",T]]);const j={class:"main"},K={class:"messages"},U=m({setup(a){const o=_([]),n=async()=>{const s=[...await(await fetch(`${p}/messages`,{method:"GET",mode:"cors"})).json()].sort((u,l)=>u.id<l.id?-1:1);o.value=s};return B(async()=>{await n()}),(r,e)=>(i(),c("div",j,[h(P),t("div",K,[(i(!0),c(x,null,$(o.value,({id:s,username:u,message:l,likes:y,created_at:k})=>(i(),A(D,{key:s,id:s,username:u,message:l,likes:y,createdAt:k,onLike:n},null,8,["id","username","message","likes","createdAt"]))),128))]),h(w,{onSubmit:n})]))}});var q=f(U,[["__scopeId","data-v-9fb59124"]]);F(q).mount("#app");
