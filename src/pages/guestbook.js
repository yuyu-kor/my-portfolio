import { useState } from "react";
import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";
import SeoHead from "@/components/SeoHead";

export default function Guestbook() {
  const [messageCount, setMessageCount] = useState(0);

  return (
    <>
      <SeoHead
        title="yuyu | Guestbook"
        description="개발이 가능한 마케터 이유진의 방명록 페이지입니다."
      />

      <main className="mt-20">
        <div>
          <span className="text-3xl text-center block">👋👋👋</span>
          <p className="text-lg font-medium text-center text-gray-800 mt-2">
            자유롭게 방명록을 작성해주세요-!
          </p>
          <p className="text-center font-light text-gray-600 pt-5">
            {messageCount} comments
          </p>
          <GuestbookForm />
          <GuestbookList setMessageCount={setMessageCount} />
        </div>
      </main>
    </>
  );
}
