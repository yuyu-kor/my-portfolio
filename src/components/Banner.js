import Link from "next/link";
import TypingText from "@/hooks/animation/TypingText";

export default function () {
  return (
    <div className="relative md:mt-3 mt-10 md:mb-5 mb-17">
      <div className="flex md:items-center items-start justify-between md:gap-10 gap-3 font-light md:flex-row flex-col">
        {/* 타이핑 텍스트 */}
        <div className="flex-1 min-w-[300px] z-10">
          <TypingText />
        </div>

        {/* 프로필 이미지 */}
        <div className="shrink-0 translate-x-12 md:block hidden">
          <img
            src="/profile1.png"
            alt="프로필사진"
            width={350}
            className="z-0"
          />
        </div>

        {/* 세로 링크 정렬 */}
        <div className="flex md:!flex-col flex-row items-end gap-3 font-light md:text-base text-lg text-gray-600 z-10 md:-translate-x-20">
          {[
            { label: "blog", href: "https://yuyu0629.tistory.com/" },

            {
              label: "tiktok",
              href: "https://www.tiktok.com/@yuzzang_?_t=ZS-8xxeoGZdLkH&_r=1",
            },
            { label: "github", href: "https://github.com/yuyu-kor" },
            { label: "youtube", href: "https://www.youtube.com/@yuzzang9" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <span className="transition-colors">{link.label}</span>
              <span className="block absolute bottom-[-2px] left-0 w-0 h-[1px] bg-gray-600 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>

      {/* 연락처 정보 */}
      <div className="md:-translate-y-20 translate-y-7">
        <p className="font-light md:text-sm text-xs !mb-1">
          <span className="font-medium">Email.</span> yjlee462611@gmail.com
        </p>
        <p className="font-light md:text-sm text-xs">
          <span className="font-medium">Residence.</span> Seoul, South Korea
        </p>
      </div>

      {/* 모바일 프로필 */}
      <div className="md:hidden block">
        <img
          src="/banner_img_pixel.png"
          alt="프로필사진"
          className="w-[160px] absolute top-0 left-65 -translate-y-5"
        />
      </div>
    </div>
  );
}
