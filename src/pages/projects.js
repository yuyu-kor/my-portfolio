import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Weather App",
    subtitle: "간단하고 감성적인 날씨 정보 앱웹",
    techStack: ["React", "bootstrap", "API"],
    github: "https://github.com/yuyu-kor/weather-app",
    demo: "https://weather-app-zeta-seven-93.vercel.app/",
    thumbnail: "/thumbnail/weatherapp.png",
  },
  {
    title: "Kingnimal",
    subtitle: "멸종위기동물을 포함한 동물도감 앱웹",
    techStack: ["React", "Vite", "styled-components", "API"],
    github: "https://github.com/yuyu-kor/kingnimal",
    demo: "https://kingnimal.vercel.app/",
    thumbnail: "/thumbnail/kingnimal.png",
  },
  {
    title: "Netflix Demo",
    subtitle: "넷플릭스와 비슷한 UI로 구현한 영화 정보 제공 웹앱",
    techStack: ["React", "Vite", "API"],
    github: "https://github.com/yuyu-kor/netflix-demo",
    demo: "https://netflix-demo-mu.vercel.app/",
    thumbnail: "/thumbnail/netflixdemo.png",
  },
  {
    title: "병원 랜딩페이지",
    subtitle: "병원 이벤트 SNS DB랜딩페이지",
    techStack: ["React", "Vite", "tailwindcss"],
    github: "https://github.com/yuyu-kor/bgn-landingpage",
    demo: "https://smilelasik.co.kr/",
    thumbnail: "/thumbnail/landingpage.png",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-white px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-16">Frontend</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="rounded-3xl shadow-xl overflow-hidden bg-gray-50 flex flex-col"
          >
            {/* 썸네일 */}
            <div className="relative h-52 w-full">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* 내용부 (조정됨!) */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              {/* 기술 스택 */}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-black text-white text-xs px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* 타이틀 */}
              <h3 className="text-base font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.subtitle}</p>

              {/* 링크 (조금 더 위로 붙임) */}
              <div className="mt-2 flex justify-end gap-3 text-sm">
                <Link
                  href={project.github}
                  target="_blank"
                  className="hover:underline"
                >
                  github
                </Link>
                <Link
                  href={project.demo}
                  target="_blank"
                  className="hover:underline"
                >
                  demo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
