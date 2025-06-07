import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";

export default function Guestbook() {
  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">방명록 📝</h1>
      <GuestbookForm />
      <GuestbookList />
    </main>
  );
}
