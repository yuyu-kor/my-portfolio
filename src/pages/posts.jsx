import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSortedPostsData } from "@/lib/posts";
import { formatDate } from "@/lib/date";

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: { posts },
  };
}

// 🔍 키워드 강조 함수
function highlightKeyword(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<mark class='bg-yellow-200'>$1</mark>");
}

export default function PostsPage({ posts }) {
  const router = useRouter();
  const queryCategory = router.query.category;
  const querySearch = router.query.search;

  const categories = ["All", "Dev", "Video", "Marketing", "Design"];
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
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">블로그 글 목록</h1>

      {/* 카테고리 버튼 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              selectedCategory === category
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="제목 또는 내용 검색..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full mb-6 px-4 py-2 border rounded-md text-sm"
      />

      {/* 글 리스트 */}
      <ul className="space-y-6">
        {visiblePosts.map((post) => (
          <li key={post.slug} className="flex gap-4">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={96}
              height={96}
              className="rounded-md object-cover"
            />
            <div>
              <Link
                href={`/posts/${post.slug}`}
                className="text-xl font-semibold hover:underline"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightKeyword(post.title, searchTerm),
                  }}
                />
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(post.date)} ・ {post.category}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* 무한스크롤 감지용 */}
      <div ref={loaderRef} className="h-10"></div>

      {filteredPosts.length === 0 && (
        <p className="text-gray-500 text-center mt-10">글이 없어요 😢</p>
      )}
    </div>
  );
}
