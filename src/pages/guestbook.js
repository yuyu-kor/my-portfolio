import { useState } from "react";
import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";

export default function Guestbook() {
  const [messageCount, setMessageCount] = useState(0);

  return (
    <main className="mt-20">
      <div>
        <span className="text-3xl text-center block">👋👋👋</span>
        <p className="text-lg font-medium text-center text-gray-800 mt-2">
          자유롭게 방명록을 작성해주세요-!
        </p>
        <p className="text-center font-light text-gray-600 pt-5">
          total: {messageCount}
        </p>
        <GuestbookForm />
        <GuestbookList setMessageCount={setMessageCount} />
      </div>
    </main>
  );
}
