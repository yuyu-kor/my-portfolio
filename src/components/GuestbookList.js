"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function GuestbookList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-6 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="border p-3 rounded bg-white">
          <p>{msg.message}</p>
          <small className="text-gray-500">
            {msg.createdAt?.toDate
              ? msg.createdAt.toDate().toLocaleString()
              : "작성 중..."}
          </small>
        </div>
      ))}
    </div>
  );
}
