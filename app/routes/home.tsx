import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

import ResumeCard from "~/components/ResumeCard";
import { resumes } from "constants/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeDex" },
    { name: "description", content: "Smart Resume Analyser" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/>

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your applications and resume ratings</h1>
          <h2>Review your submissions and check AI-powered feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
              <div>
                <ResumeCard key={resume.id} resume={resume}/>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
