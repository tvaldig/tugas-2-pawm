import { FC } from "react";

const About: FC = () => {
    return (
      <section className="min-h-screen bg-bg-2 h-[1000px] lg:h-[518px]">
        <h1 className="font-superfunky font-bold [text-shadow:_5px_8px_10px_rgb(0_0_0_/_60%)] md:text-4xl lg:text-5xl text-2xl text-center py-12 text-black text-pretty">
          About Chemic.ly
        </h1>

        <div className="border border-black lg:h-[350px] lg:w-[1000px] md:w-[700px] md:text-[25px] w-[300px] h-[800px] rounded-lg shadow-lg p-5 text-center font-sans bg-white flex flex-col border-2 justify-center mx-auto">
          <h2 className="font-spbutchlite font-bold lg:text-2xl text-m text-black tracking-wider text-pretty">
            Chemic.ly is the ultimate platform for chemistry enthusiasts who want to dive deep into the fundamentals of the subject. Whether you&apos;re a student, a hobbyist, or just someone passionate about chemistry, Chemic.ly offers interactive lessons, quizzes, and challenges to help you learn. The highlight of the platform is its innovative virtual lab, designed as a fun and engaging game where you can experiment, solve puzzles, and explore the world of chemistry in a hands-on way. Plus, with a personalized account, you can track your progress, set goals, and revisit topics to strengthen your understanding. Perfect for anyone who wants to learn chemistry in an exciting and effective way!
          </h2>
        </div>
      </section>
    );
};

export default About;
