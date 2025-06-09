import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSortedPostsData } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import SeoHead from "@/components/SeoHead";

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: { posts },
  };
}

function highlightKeyword(text, keyword) {
  if (!keyword) return text;

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // 특수문자 이스케이프
  const regex = new RegExp(`(${escapedKeyword})`, "gi");

  return text.replace(regex, "<span class='font-bold'>$1</span>");
}

export default function PostsPage({ posts }) {
  const router = useRouter();
  const queryCategory = router.query.category;
  const querySearch = router.query.search;

  const categories = ["All", "Dev", "Video", "Marketing", "Experience"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (
      typeof queryCategory === "string" &&
      categories.includes(queryCategory)
    ) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory("All");
    }

    if (typeof querySearch === "string") {
      setSearchTerm(querySearch);
    } else {
      setSearchTerm("");
    }
  }, [queryCategory, querySearch]);

  const handleCategoryClick = (category) => {
    const query = {
      ...(category !== "All" && { category }),
      ...(searchTerm && { search: searchTerm }),
    };
    router.push({ pathname: "/posts", query }, undefined, { shallow: true });
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
    const query = {
      ...(selectedCategory !== "All" && { category: selectedCategory }),
      ...(newSearch && { search: newSearch }),
    };
    router.push({ pathname: "/posts", query }, undefined, { shallow: true });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(keyword) ||
      (post.content?.toLowerCase() || "").includes(keyword);
    return matchesCategory && matchesSearch;
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredPosts.length) {
          setVisibleCount((prev) => prev + 6);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [filteredPosts.length, visibleCount]);

  return (
    <>
      <SeoHead
        title="About | yuyu 포트폴리오"
        description="마케터이자 프론트엔드 개발자인 이유진(yuyu)의 이력과 학습 여정을 소개합니다."
      />
      <div className="max-w-3xl mx-auto mt-14 text-center">
        {/* 제목 */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {selectedCategory}
        </h2>

        {/* 총 개수 */}
        <p className="text-lg text-gray-500 mt-3 mb-6 font-light">
          {filteredPosts.length} posts
        </p>

        {/* 검색창 */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-48 font-light px-3 py-2 border border-gray-300 rounded-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* 카테고리 */}
        <div className="flex gap-4 mb-15 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
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

        {/* 글 리스트 */}
        <ul className="space-y-1 !pl-0">
          {visiblePosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="block">
                <div className="flex gap-4 items-start text-left p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  {/* 썸네일 */}
                  {/* 썸네일을 쓰고 싶으면 이 주석을 풀고 Image 태그도 활성화하세요
          <div className="flex-shrink-0">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={96}
              height={96}
              className="rounded-md object-cover w-24 h-24"
            />
          </div> */}

                  {/* 텍스트 콘텐츠 */}
                  <div className="flex-1">
                    <p className="text-[18px] text-gray-800 mb-2">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightKeyword(post.title, searchTerm),
                        }}
                      />
                    </p>

                    <p className="text-gray-800 text-sm font-light leading-5 line-clamp-3 break-words break-all overflow-hidden max-w-full !mb-0">
                      {post.content}
                    </p>

                    <div className="mt-2 flex justify-between text-sm text-gray-400 font-light">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div ref={loaderRef} className="h-5"></div>

        {filteredPosts.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-12 font-light">
            아직 글이 없어요!
          </p>
        )}
      </div>
    </>
  );
}
