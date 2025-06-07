"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GuestbookForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "guestbook"), {
        message,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Firestore 저장 실패:", error);
    }

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="익명으로 메시지를 남겨보세요"
        className="w-full border p-2 rounded"
        rows={3}
        required
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        남기기
      </button>
    </form>
  );
}
