import Image from "next/image";
import Banner from "./components/Banner";

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
          <p>번들러가 RSC를 지원한다고? Parcel과 함께하는 SSR</p>
          <p className="text-sm text-gray-500 font-light">2025.06.06</p>
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
          <p>번들러가 RSC를 지원한다고? Parcel과 함께하는 SSR</p>
          <p className="text-sm text-gray-500 font-light">2025.06.06</p>
        </div>

        {/* EXPERIENCE */}
        <div className="p-2 text-xl w-fit border !border-zinc-700 text-white bg-zinc-700 mt-5">
          EXPERIENCE
        </div>
        <div className="mt-4 text-lg flex items-center gap-3">
          <Image
            src="/3d-box.png"
            alt="프로필"
            width={60}
            height={60}
            className="bg-gray-100 rounded-full p-1"
          />
          <p>번들러가 RSC를 지원한다고? Parcel과 함께하는 SSR</p>
          <p className="text-sm text-gray-500 font-light">2025.06.06</p>
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
          <p>번들러가 RSC를 지원한다고? Parcel과 함께하는 SSR</p>
          <p className="text-sm text-gray-500 font-light">2025.06.06</p>
        </div>
      </div>
    </>
  );
}
