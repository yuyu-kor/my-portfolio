import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <div className="w-full max-w-[720px] mx-auto px-4 md:px-0">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
