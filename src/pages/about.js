"use client";

import { useEffect, useRef, useState } from "react";
import Banner from "./components/Banner";

export default function About() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <>
      <Banner />
      <div className="flex items-center justify-center border-b border-zinc-500">
        <img src="/profile_sub2.png" alt="프로필사진" width={380} />
        <div
          ref={ref}
          className={`text-xl transform transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } -translate-y-12`}
        >
          <span className="h-fit px-2 py-1 bg-purple-100 text-purple-800 text-sm font-bold rounded-full shadow-sm inline-block mb-3">
            ENTJ
          </span>
          <p>Yujin Lee (yuyu)</p>
          <p className="text-lg">
            <strong>遺</strong> 끼칠 <strong>유</strong>
            <br />
            <strong>珍</strong> 보배 <strong>진</strong>
          </p>
        </div>
      </div>
    </>
  );
}
