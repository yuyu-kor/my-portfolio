import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="mt-5 flex items-center justify-between font-light">
        <div className="text-left">
          <p className="text-4xl font-medium leading-relaxed">
            안녕하세요!
            <br />
            배우는 걸 좋아하는
            <br />
            ENTP 이유진입니다.
          </p>
        </div>
        <img
          src="/profile1.png"
          alt="프로필사진"
          width={380}
          className="ml-10"
        />
        <div className="flex flex-col justify-between items-end absolute right-60 gap-3 font-medium">
          <Link href="/about">github</Link>
          <Link href="/about">youtube</Link>
          <Link href="/about">instagram</Link>
          <Link href="/about">resume</Link>
        </div>
      </div>
      <div>
        <div
          className="p-2 text-xl w-fit"
          style={{
            border: "1px solid rgb(60, 61, 64)",
            color: "rgb(60, 61, 64)",
          }}
        >
          Recent Posts
        </div>
        <div>
          <img />
          <p>번들러가 RSC를 지원한다고? Parcel과 함께하는 SSR</p>
        </div>
      </div>
    </div>
  );
}
