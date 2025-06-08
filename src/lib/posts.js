import fs from "fs";
import path from "path";
import matter from "gray-matter";

// posts 폴더 경로 지정
const postsDirectory = path.join(process.cwd(), "posts");

// 모든 글 목록을 가져오는 함수
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, ""); // 확장자 제거
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug,
      ...data, // title, date
    };
  });
}

// 특정 글(slug)의 내용까지 가져오는 함수
export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}
