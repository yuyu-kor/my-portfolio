"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const menus = ["about", "posts", "guestbook"];

  return (
    <div className="h-[60px] flex items-center justify-between text-[17px] font-bold mt-1.5">
      <Link href="/" className="flex items-center">
        {/* ✅ 데스크탑: 텍스트 로고 */}
        <h1 className="hidden md:block !text-[17px] mt-2 relative group !font-bold">
          yuyu.com
          <span className="block absolute bottom-[-2px] left-0 w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full" />
        </h1>

        {/* ✅ 모바일: 이미지 로고 */}
        <img
          src="/favicon_yu.svg"
          alt="로고"
          className="block md:hidden w-8 h-8"
        />
      </Link>

      <div className="flex md:gap-3 gap-2.5 md:text-[17px] text-[13px]">
        {menus.map((menu) => {
          const isActive = pathname === `/${menu}`;

          return (
            <Link key={menu} href={`/${menu}`}>
              <span className="relative group leading-none">
                {menu}
                <span
                  className={`block absolute bottom-[-2px] left-0 h-[2px] bg-black transition-all duration-200 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
