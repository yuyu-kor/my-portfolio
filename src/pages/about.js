"use client";

import { useEffect, useRef, useState } from "react";
import Banner from "./components/Banner";

const experience = [
  {
    date: "2024.03 - NOW",
    company: "BGN 밝은눈안과 (홍보팀)",
    role: "콘텐츠 기획 및 B2B 온·오프라인 홍보",
  },
  {
    date: "2025.07 - 2025.07",
    company: "GA4 / SQL 단기 집중 학습",
    role: "데이터 기반 마케팅 인사이트 분석 역량 강화",
  },
  {
    date: "2025.04 - 2025.06",
    company: "웹디자인 독학",
    role: "Figma, AI툴을 활용한 UI/UX 디자인 기초 학습 및 시안안 제작",
  },
  {
    date: "2025.02 - 2025.06",
    company: "프론트엔드 독학 및 스터디 참여",
    role: "HTML, CSS, JavaScript, React, Next.js 실습 및 팀 프로젝트 수행",
  },
  {
    date: "2023.12 - 2024.02",
    company: "마케팅 대행사 (마케팅팀)",
    role: "네이버 검색광고 운영 및 성과 리포트 작성",
  },
  {
    date: "2022.06 - 2022.12",
    company: "JLPT N2 자격 취득",
    role: "6개월 집중 학습을 통해 일본어 회화 역량 확보",
  },
  {
    date: "2020.11 - 2022.11",
    company: "엔터테인먼트 영상편집 & 게임 방송 프리랜서",
    role: "프리미어프로로 활용 영상 콘텐츠 제작 및 스트리밍 운영",
  },
];

export default function About() {
  const profileRef = useRef(null);
  const [profileVisible, setProfileVisible] = useState(false);
  const experienceRef = useRef(null);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const certificateRef = useRef(null);
  const [certificateVisible, setCertificateVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setProfileVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (profileRef.current) observer.observe(profileRef.current);
    return () => {
      if (profileRef.current) observer.unobserve(profileRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setExperienceVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (experienceRef.current) observer.observe(experienceRef.current);
    return () => {
      if (experienceRef.current) observer.unobserve(experienceRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCertificateVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (certificateRef.current) observer.observe(certificateRef.current);
    return () => {
      if (certificateRef.current) observer.unobserve(certificateRef.current);
    };
  }, []);

  return (
    <>
      <Banner />

      {/* ✅ Profile Section */}
      <div className="flex items-center justify-center border-b border-zinc-500 mb-5">
        <img src="/profile_sub2.png" alt="프로필사진" width={380} />
        <div className="-translate-y-13">
          <div
            ref={profileRef}
            className={`text-xl transition-all duration-700 ease-in-out transform ${
              profileVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } -translate-y-10`}
          >
            <span className="h-fit px-2 py-1 bg-blue-100 text-blue-900 text-sm font-bold rounded-full shadow-sm inline-block mb-3">
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
      </div>

      {/* ✅ Experience Section */}
      <section
        ref={experienceRef}
        className={`!pt-17 max-w-5xl flex flex-col gap-5 items-center transition-all duration-700 ease-in-out transform ${
          experienceVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>

        <div className="relative">
          <div className="absolute left-[174px] top-0 bottom-4 w-[1px] bg-zinc-300" />

          <div className="flex flex-col space-y-10">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="grid grid-cols-[140px_20px_1fr] items-start gap-4"
              >
                <p className="text-sm font-light text-gray-500 text-center pt-1 whitespace-nowrap">
                  {exp.date}
                </p>
                <div className="flex justify-center relative">
                  <div className="w-2 h-2 rounded-full z-10 mt-1" />
                </div>
                <div>
                  <p className="font-medium text-zinc-800 mb-1 leading-tight">
                    {exp.company}
                  </p>
                  <p className="text-sm font-light text-zinc-600 leading-snug">
                    {exp.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Certificate Section with Animation */}
      <section
        ref={certificateRef}
        className={`!pt-15 max-w-5xl mx-auto flex flex-col items-center transition-all duration-700 ease-in-out transform ${
          certificateVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Certificate</h2>

        <div className="!mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* JLPT */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all flex flex-col items-center text-center">
            <img
              src="/jlpt.png"
              alt="JLPT N2 자격증"
              className="w-full h-auto object-contain rounded-lg mb-3 max-h-[220px]"
            />
            <p className="text-sm text-gray-700">JLPT N2 (2022.12)</p>
          </div>

          {/* React 스터디 수료증 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all flex flex-col items-center text-center">
            <img
              src="/coding.png"
              alt="React 스터디 수료증"
              className="w-full h-auto object-contain rounded-lg mb-3 max-h-[220px]"
            />
            <p className="text-sm text-gray-700">
              React 스터디 수료증 (2025.06)
            </p>
          </div>

          {/* GA4 인증 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all flex flex-col items-center text-center">
            <img
              src="/ga4.png"
              alt="GA4 수료증"
              className="w-full h-auto object-contain rounded-lg mb-3 max-h-[220px]"
            />
            <p className="text-sm text-gray-700">GA4 실무 인증 (2025.07)</p>
          </div>
        </div>
      </section>
    </>
  );
}
