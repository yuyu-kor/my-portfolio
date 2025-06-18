"use client";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ref = footerRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, []);

  return (
    <div
      ref={footerRef}
      className={`w-full text-center h-[40px] md:h-[62px] md:mt-20 mt-10 text-[12px] md:text-sm font-light text-gray-500 relative flex items-center justify-center transform transition-all duration-600 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{
        background: "linear-gradient(to bottom, #E4E7EB, #F7F8FA)",
      }}
    >
      © Powered by yuyu
    </div>
  );
}
