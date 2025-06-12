import { NotionAPI } from "notion-client";
import { getDatabase } from "@/lib/notion";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";

const notion = new NotionAPI();

export async function getStaticPaths() {
  const posts = await getDatabase();

  const paths = posts
    .map((post) => {
      const slug = post.properties?.Slug?.rich_text?.[0]?.plain_text;
      console.log("📌 정적 생성할 슬러그:", slug); // ✅ 이 줄
      if (!slug) return null;
      return { params: { slug } };
    })
    .filter(Boolean);

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  console.log("🟡 요청된 slug:", params.slug); // 🔥 꼭 확인!

  const posts = await getDatabase();

  const page = posts.find(
    (post) => post.properties?.Slug?.rich_text?.[0]?.plain_text === params.slug
  );

  if (!page) {
    console.warn("❌ 페이지를 못 찾음:", params.slug);
    return { notFound: true };
  }

  const rawPageId = page.id.replace(/-/g, "");

  try {
    const recordMap = await notion.getPage(rawPageId);
    return { props: { recordMap }, revalidate: 60 };
  } catch (err) {
    console.error("❌ Notion getPage 에러:", err.message);
    return { notFound: true };
  }
}

export default function PostPage({ recordMap }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </div>
  );
}
