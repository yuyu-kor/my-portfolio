"use client";
import { useState, useEffect } from "react";

// ✅ 공통 타이핑 로직
const useTypingEffect = (texts, speed = 80, pause = 1000) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index % texts.length];
    let timeout;

    if (!isDeleting && charIndex <= current.length) {
      setText(current.substring(0, charIndex));
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), speed);
    } else if (isDeleting && charIndex >= 0) {
      setText(current.substring(0, charIndex));
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), speed / 2);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) return;
        setIndex((prev) => prev + 1);
      }, pause);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts, speed, pause]);

  return text;
};

const TypingText = () => {
  const text1 = useTypingEffect([
    "트렌드에 민감한",
    "성과에 집착하는",
    "개발이 가능한",
    "컨텐츠가 끊임없는",
  ]);
  const text2 = useTypingEffect(["이유진", "yuyu"]);

  return (
    <div className="text-left md:text-4xl text-2xl md:leading-12 leading-8 whitespace-nowrap overflow-visible z-10">
      안녕하세요!
      <br />
      <strong>{text1}</strong>
      <span className="animate-blink">|</span>
      <br />
      <span className="whitespace-nowrap">
        마케터 <strong>{text2}</strong>
        <span className="animate-blink">|</span>입니다.
      </span>
    </div>
  );
};

export default TypingText;
