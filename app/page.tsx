import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import RecentProjects from "@/components/RecentProjects";
import Articles from "@/components/Articles";
// import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import { navItems } from "@/data";
import CodingProfiles from "@/components/CodingProfiles";
import InterviewPlaybooks from "@/components/InterviewPlaybooks";
import MemeCat from "@/components/MemeCat";
import NavbarWrapper from "@/components/NavbarWrapper";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full">
        <NavbarWrapper />
        <Hero />
        <Grid />
        <Experience />
        <RecentProjects />
        <CodingProfiles />
        <Articles />
        <InterviewPlaybooks />
        <Approach />
        <Footer />
      </div>
      <MemeCat />
    </main>
  );
}
