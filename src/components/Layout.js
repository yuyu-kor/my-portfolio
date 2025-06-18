import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <div className="w-full max-w-[720px] mx-auto">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
