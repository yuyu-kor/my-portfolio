import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <div className="mx-auto w-[720px]">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
