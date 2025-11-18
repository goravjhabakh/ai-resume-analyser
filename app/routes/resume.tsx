import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/Ats";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "ResumeDex | Review" },
    { name: "description", content: "Detailed Overview of your Resume" },
  ];
};

const Resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [resumeUrl, setResumeUrl] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if(!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if(!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if(!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(JSON.parse(data.feedback));
      console.log({resumeUrl, imageUrl, feedback: data.feedback });
    }

    loadResume();
  }, [id]);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume${id}`);
  }, [auth.isAuthenticated]);

  return (
    <main>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} className="w-full h-full object-contain rounded-2xl" title="resume"/>
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section relative">
          <button className="absolute right-6 top-6 size-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-200 transition ease-in-out" onClick={() => navigate('/')}>
            <img src="/icons/cross.svg" className="size-4" />
          </button>
          <h2 className="text-4xl text-black! font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback}/>
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full"/>
          )}
        </section>
      </div>
    </main>
  )
}

export default Resume;