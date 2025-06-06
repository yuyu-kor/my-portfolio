"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const menus = ["about", "posts", "projects", "guestbook"];

  return (
    <div className="h-[60px] flex items-center justify-between text-[17px] font-bold mt-1.5">
      <Link href="/">
        <h1 className="!text-[17px] !font-bold mt-2 relative group">
          yuyu.com
          <span className="block absolute bottom-[-2px] left-0 w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full" />
        </h1>
      </Link>
      <div className="flex gap-3">
        {menus.map((menu) => {
          const isActive = pathname === `/${menu}`;

          return (
            <Link key={menu} href={`/${menu}`} className="relative group">
              <span className="transition-colors">{menu}</span>
              <span
                className={`block absolute bottom-[-2px] left-0 h-[2px] bg-black transition-all duration-200 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
