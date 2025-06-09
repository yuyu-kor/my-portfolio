import { useState } from "react";
import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";
import SeoHead from "@/components/SeoHead";

export default function Guestbook() {
  const [messageCount, setMessageCount] = useState(0);

  return (
    <>
      <SeoHead
        title="About | 이유진 포트폴리오"
        description="마케터이자 프론트엔드 개발자인 이유진(yuyu)의 이력과 학습 여정을 소개합니다."
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
