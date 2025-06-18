"use client";

import Banner from "@/components/Banner";
import SeoHead from "@/components/SeoHead";
import { useEffect, useRef, useState } from "react";

const experience = [
  {
    date: "2024.03 - NOW",
    company: "안과 (홍보팀)",
    role: "콘텐츠 기획 및 B2B 온·오프라인 홍보",
  },
  {
    date: "2025.08 - 2025.09",
    company: "데이터 리터러시 학습",
    role: "GA4, SQL, Excel을 기반으로 실전 데이터 분석 스킬 및 마케팅 Case Study 수행",
  },
  {
    date: "2025.07 - 2025.07",
    company: "디지털 디자인 툴 학습",
    role: "Figma 및 AI 기반 디자인 툴을 활용해 포스터·웹디자인 등 다양한 콘텐츠 제작 실습",
  },
  {
    date: "2025.02 - 2025.06",
    company: "프론트엔드 독학 및 스터디 참여",
    role: "HTML/CSS, JS, React.js, Next.js, Firebase 실습 및 팀 프로젝트 수행",
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
    role: "프리미어프로 활용 간단한 영상 콘텐츠 제작 및 스트리밍 운영",
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
      <SeoHead
        title="yuyu's portfolio"
        description="마케터이자 프론트엔드 개발자인 이유진(yuyu)의 이력과 학습 여정을 소개합니다."
      />
      <Banner />

      {/* ✅ Profile Section */}
      <div className="flex items-center justify-center border-b border-zinc-300 md:mb-5 mb-0 md:mt-5 !mt-20">
        <img
          src="/profile_sub2.png"
          alt="프로필사진"
          className="w-[180px] md:w-[380px]"
        />
        <div className="md:-translate-y-13 -translate-y-3">
          <div
            ref={profileRef}
            className={`text-xl transition-all duration-700 ease-in-out transform ${
              profileVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } -translate-y-10`}
          >
            <span className="h-fit px-2 py-1 bg-blue-100 text-blue-900 md:text-sm text-[10px] font-bold rounded-full shadow-sm inline-block mb-3">
              ENTJ
            </span>
            <p className="md:text-xl text-sm">Yujin Lee (yuyu)</p>
            <p className="md:text-lg text-sm">
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
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          Experience
        </h2>

        <div className="relative">
          {/* 수직 라인 위치는 데스크탑 기준 유지 */}
          <div className="absolute left-[174px] top-0 bottom-4 w-[1px] bg-zinc-300 hidden md:block" />

          <div className="flex flex-col space-y-2 md:!space-y-6">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="grid grid-cols-[100px_20px_1fr] md:grid-cols-[140px_20px_1fr] items-start gap-3 md:gap-4"
              >
                <p className="text-xs md:text-sm font-light text-gray-500 text-center pt-1 whitespace-nowrap">
                  {exp.date}
                </p>
                <div className="flex justify-center relative">
                  <div className="w-2 h-2 rounded-full z-10 mt-1" />
                </div>
                <div>
                  <p className="text-sm md:text-base font-medium text-zinc-800 mb-0.5 md:!mb-7 leading-tight">
                    {exp.company}
                  </p>
                  <p className="text-xs md:text-sm font-light text-zinc-600 leading-snug">
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
        className={`md:!pt-20 !pt-15 max-w-5xl mx-auto flex flex-col items-center transition-all duration-700 ease-in-out transform ${
          certificateVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          Certificate
        </h2>

        <div className="mt-6 md:!mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {/* JLPT */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-3 md:p-4 hover:shadow-md transition-all flex flex-col items-center text-center">
            <img
              src="/jlpt.png"
              alt="JLPT N2 자격증"
              className="w-full h-auto object-contain rounded-lg mb-2 md:mb-3 max-h-[160px] md:max-h-[220px]"
            />
            <p className="text-xs md:text-sm text-gray-700">
              JLPT N2 (2022.12)
            </p>
          </div>

          {/* React 스터디 수료증 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-3 md:p-4 hover:shadow-md transition-all flex flex-col items-center text-center">
            <img
              src="/coding.png"
              alt="React 스터디 수료증"
              className="w-full h-auto object-contain rounded-lg mb-2 md:mb-3 max-h-[160px] md:max-h-[220px]"
            />
            <p className="text-xs md:text-sm text-gray-700">
              React 스터디 수료증 (2025.06)
            </p>
          </div>

          {/* GA4 인증 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-3 md:p-4 hover:shadow-md transition-all flex flex-col items-center text-center">
            <img
              src="/ga4.png"
              alt="GA4 수료증"
              className="w-full h-auto object-contain rounded-lg mb-2 md:mb-3 max-h-[160px] md:max-h-[220px]"
            />
            <p className="text-xs md:text-sm text-gray-700">
              GA4 실무 인증 (2025.06)
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
