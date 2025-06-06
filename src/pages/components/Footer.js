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
      style={{
        width: "100%",
        textAlign: "center",
        background: "linear-gradient(to bottom, #E4E7EB, #F7F8FA)",
        height: "62px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        marginTop: "80px",
      }}
    >
      © Powered by yuyu
    </div>
  );
}
