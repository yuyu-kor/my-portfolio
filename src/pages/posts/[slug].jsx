import { NotionAPI } from "notion-client";
import { getDatabase } from "@/lib/notion";
import { NotionRenderer } from "react-notion-x";
import Image from "next/image";
import SeoHead from "@/components/SeoHead"; // ✅ SEO 컴포넌트 추가
import "react-notion-x/src/styles.css";

const notion = new NotionAPI();

export async function getStaticPaths() {
  const posts = await getDatabase();

  const paths = posts
    .map((post) => {
      const slug = post.properties?.Slug?.rich_text?.[0]?.plain_text;
      if (!slug) return null;
      return { params: { slug } };
    })
    .filter(Boolean);

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const posts = await getDatabase();

  const page = posts.find(
    (post) => post.properties?.Slug?.rich_text?.[0]?.plain_text === params.slug
  );

  if (!page) return { notFound: true };

  try {
    const recordMap = await notion.getPage(page.id);

    const title = page.properties?.Title?.title?.[0]?.plain_text || "제목 없음";
    const date = page.properties?.Date?.date?.start || "";
    const category = page.properties?.Category?.select?.name || "";
    const description =
      page.properties?.Description?.rich_text?.[0]?.plain_text ||
      "이유진의 블로그 글입니다.";

    const fileObj = page.properties?.Thumbnail?.files?.[0];
    const thumbnail =
      fileObj?.type === "file"
        ? fileObj?.file?.url
        : fileObj?.type === "external"
        ? fileObj?.external?.url
        : null;

    return {
      props: {
        recordMap,
        pageData: { title, date, category, thumbnail, description },
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("❌ Notion getPage 에러:", err.message);
    return { notFound: true };
  }
}

export default function PostPage({ recordMap, pageData }) {
  if (!recordMap || !pageData) {
    return <div className="text-center mt-20 text-gray-500">로딩 중...</div>;
  }

  return (
    <>
      {/* ✅ SEO 메타태그 */}
      <SeoHead
        title={pageData.title}
        description={pageData.description}
        image={pageData.thumbnail}
        url={`https://yourdomain.com/posts/${encodeURIComponent(
          pageData.title
        )}`} // 원하면 slug로 변경 가능
      />

      <div className="w-full max-w-[720px] mx-auto mt-14 mb-20">
        {/* ✅ 썸네일 이미지 */}
        {pageData.thumbnail && (
          <div className="w-[60px] h-[60px] relative mb-6 rounded-lg overflow-hidden">
            <Image
              src={pageData.thumbnail}
              alt="썸네일"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* ✅ 카테고리 */}
        <p className="text-sm text-gray-400 mb-1">{pageData.category}</p>

        {/* ✅ 제목 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {pageData.title}
        </h2>

        {/* ✅ 날짜 */}
        <p className="text-sm text-gray-400 font-light !mb-10">
          {pageData.date}
        </p>

        {/* ✅ 구분선 */}
        <hr className="border-t !border-gray-400 !mb-10" />

        {/* ✅ 본문 */}
        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          darkMode={false}
          disableHeader={true}
        />
      </div>
    </>
  );
}
