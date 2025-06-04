import Link from "next/link";

export default function Header() {
  return (
    <div className="h-[60px] flex items-center justify-between text-[17px]">
      <h1 className="!text-[17px]">yuyu.com</h1>
      <div className="flex gap-3">
        <Link href="/about">about</Link>
        <Link href="/about">projects</Link>
        <Link href="/about">posts</Link>
        <Link href="/about">guestbook</Link>
      </div>
    </div>
  );
}
