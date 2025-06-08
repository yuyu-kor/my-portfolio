import Banner from "@/components/Banner";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Banner />
      <div>
        {/* recent posts */}
        <div className="p-2 text-xl w-fit border !border-gray-900 text-gray-700">
          Recent Posts
        </div>
        <div className="mt-4 text-lg flex items-center gap-3">
          <Image
            src="/3d-box.png"
            alt="프로필"
            width={60}
            height={60}
            className="bg-gray-100 rounded-full p-1"
          />
          <p>GA4 전환 추적 제대로 설정하기 — 실무에서 바로 써먹는 팁</p>
          <p className="text-sm text-gray-500 font-light">2025.07.07</p>
        </div>

        {/* Case Study */}
        <div className="p-2 text-xl w-fit border !border-zinc-700 text-white bg-zinc-700 mt-5">
          Case Study
        </div>
        <div className="mt-4 text-lg flex items-center gap-3">
          <Image
            src="/3d-box.png"
            alt="프로필"
            width={60}
            height={60}
            className="bg-gray-100 rounded-full p-1"
          />
          <p>검색광고 CTR 4% 달성 비결 — 브랜드 리마케팅 전략 분석</p>
          <p className="text-sm text-gray-500 font-light">2025.06.20</p>
        </div>

        {/* LIFE */}
        <div className="p-2 text-xl w-fit border !border-zinc-700 text-white bg-zinc-700 mt-5">
          LIFE
        </div>
        <div className="mt-4 text-lg flex items-center gap-3">
          <Image
            src="/3d-box.png"
            alt="프로필"
            width={60}
            height={60}
            className="bg-gray-100 rounded-full p-1"
          />
          <p>나의 첫 GA 인증 준비기 — 마케터 입문자의 공부 루틴</p>
          <p className="text-sm text-gray-500 font-light">2025.06.06</p>
        </div>
      </div>
    </>
  );
}
