import Link from "next/link";
import TypingText from "./TypingText";

export default function () {
  return (
    <div className="relative px-10 py-10 mt-3 mb-5">
      <div className="flex items-center justify-between gap-10 font-light">
        {/* 타이핑 텍스트 */}
        <div className="flex-1 min-w-[300px] z-10">
          <TypingText />
        </div>

        {/* 프로필 이미지 */}
        <div className="shrink-0 translate-x-12">
          <img
            src="/profile1.png"
            alt="프로필사진"
            width={350}
            className="z-0"
          />
        </div>

        {/* 세로 링크 정렬 */}
        <div className="flex flex-col items-end gap-3 font-light text-gray-600 z-10 -translate-x-20">
          {[
            { label: "blog", href: "https://yuyu0629.tistory.com/" },
            { label: "github", href: "https://github.com/yuyu-kor" },
            { label: "resume", href: "" },
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
      <div className="-translate-y-20">
        <p className="font-light text-sm">
          <span className="font-medium">Email.</span> yjlee462611@gmail.com
          <br />
          <span className="font-medium">Residence.</span> Seoul, South Korea
        </p>
      </div>
    </div>
  );
}
