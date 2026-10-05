"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
export function VisitTracker() {
  const pathname=usePathname();
  useEffect(()=>{
    if (!/^(logusstudio\.com|www\.logusstudio\.com|test\.logusstudio\.com)$/.test(location.hostname) || /^(\/admin|\/manage|\/api)/.test(pathname) || navigator.doNotTrack==="1") return;
    let session:string;
    try { session=sessionStorage.getItem("logus-visit") || crypto.randomUUID(); sessionStorage.setItem("logus-visit",session); } catch { return; }
    let path=pathname+(pathname==="/" ? location.hash : ""), visit=crypto.randomUUID(), elapsed=0, last=performance.now(), visible=document.visibilityState==="visible";
    const tick=()=>{const now=performance.now(); if(visible) elapsed+=now-last; last=now; visible=document.visibilityState==="visible";};
    const send=()=>{tick(); navigator.sendBeacon("/api/visits",JSON.stringify({session,visit,path,seconds:Math.min(3600,Math.floor(elapsed/1000))}));};
    const visibility=()=>{send(); last=performance.now();};
    const hash=()=>{send(); path=pathname+location.hash;visit=crypto.randomUUID();elapsed=0;last=performance.now();send();};
    send(); const timer=setInterval(send,60000);
    document.addEventListener("visibilitychange",visibility); window.addEventListener("pagehide",send); window.addEventListener("hashchange",hash);
    return ()=>{send();clearInterval(timer);document.removeEventListener("visibilitychange",visibility);window.removeEventListener("pagehide",send);window.removeEventListener("hashchange",hash);};
  },[pathname]);
  return null;
}
