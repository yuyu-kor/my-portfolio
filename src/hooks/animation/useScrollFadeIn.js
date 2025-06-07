import { useEffect, useRef, useState } from "react";

/**
 * 스크롤 시 fade-in 애니메이션을 위한 커스텀 훅
 * @param {number} threshold - 화면에 보이는 기준 (0~1), 기본값 0.2
 * @returns {object} - ref, isVisible (boolean)
 */
export default function useScrollFadeIn(threshold = 0.2) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 보이면 true로 설정, 이후 다시 false로는 안 바꿈
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // 성능 최적화: 한 번 보이면 옵저버 해제
        }
      },
      { threshold }
    );

    const current = elementRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  return { ref: elementRef, isVisible };
}
