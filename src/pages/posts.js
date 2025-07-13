import { useState, useMemo, useEffect, useRef } from "react";
import SeoHead from "@/components/SeoHead";
import { getDatabase } from "@/lib/notion";
import { NotionAPI } from "notion-client";
import Link from "next/link";

const notion = new NotionAPI();

async function getPreviewFromPage(pageId) {
  const recordMap = await notion.getPage(pageId);
  const texts = [];

  for (const block of Object.values(recordMap.block)) {
    const value = block.value;
    if (value?.type === "paragraph") {
      const richText = value.properties?.title;
      if (richText) {
        texts.push(richText.map(([text]) => text).join(""));
      }
    }
    if (texts.join(" ").length > 300) break;
  }

  return texts.join(" ").slice(0, 300);
}

export async function getStaticProps() {
  const notionPosts = await getDatabase();

  const posts = notionPosts
    .filter((post) => post.properties?.Slug?.rich_text?.[0]?.plain_text)
    .map((post) => {
      const title =
        post.properties?.Title?.title?.[0]?.plain_text || "제목 없음";
      const slug = post.properties?.Slug?.rich_text?.[0]?.plain_text || post.id;
      const date = post.properties?.Date?.date?.start || "";
      const category =
        post.properties?.Category?.select?.name || "Uncategorized";
      const description =
        post.properties?.Description?.rich_text?.[0]?.plain_text || "";

      return {
        id: post.id,
        title,
        slug,
        date,
        category,
        description,
      };
    });

  return { props: { posts }, revalidate: 60 };
}

export default function PostsPage({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef(null);

  const categories = ["All", "Dev", "Marketing", "Experience"];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const category = post.category?.toLowerCase() || "";
      const matchesSearch = title.includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        selectedCategory.toLowerCase() === category;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 3);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <>
      <SeoHead
        title="Posts | yuyu 포트폴리오"
        description="마케터이자 프론트엔드 개발자인 이유진(yuyu)의 블로그 글 목록입니다."
      />

      <div className="w-full max-w-[720px] mx-auto mt-14 text-center">
        <p className="md:text-3xl text-2xl text-gray-900 mb-2">
          {selectedCategory}
        </p>
        <p className="md:text-lg text-md text-gray-500 mt-3 mb-6 font-light">
          {filteredPosts.length} posts
        </p>

        {/* 🔍 검색창 */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-48 w-45 font-light px-3 md:py-2 py-1 border border-gray-300 rounded-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* 🏷 카테고리 필터 */}
        <div className="flex gap-4 mb-10 justify-center flex-wrap md:text-base text-xs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs py-3 transition-colors duration-200 ${
                selectedCategory === category
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 📋 글 리스트 */}
        <ul className="md:space-y-1 space-y-0 !pl-0 text-left">
          {visiblePosts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/posts/${post.slug}`} className="block">
                  <div className="flex gap-4 items-start text-left p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className="flex-1">
                      <p className="md:text-[18px] text-md text-gray-800 mb-2">
                        {post.title}
                      </p>

                      {/* ✅ 본문 미리보기 3줄 */}
                      <p className="text-gray-800 md:text-sm text-xs font-light leading-5 line-clamp-3 break-words break-all overflow-hidden max-w-full">
                        {post.description}
                      </p>

                      <div className="mt-2 flex justify-between md:text-sm text-xs text-gray-400 font-light">
                        <span>{post.date}</span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 👀 무한스크롤 감지 */}
        <div ref={loaderRef} className="h-5" />

        {filteredPosts.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-12 font-light">
            아직 글이 없어요!
          </p>
        )}
      </div>
    </>
  );
}
