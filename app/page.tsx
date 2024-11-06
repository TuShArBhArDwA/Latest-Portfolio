import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import RecentProjects from "@/components/RecentProjects";
// import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNav";
import {FaHome} from "react-icons/fa"
import { navItems } from "@/data";
import CodingProfiles from "@/components/CodingProfiles";
export default function Home() {
  return (
   <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
    <div className="max-w-7xl w-full">
      <FloatingNav navItems={navItems} />
      <Hero />
      <Grid />
      <RecentProjects />
      {/* <Clients /> */}
      <Experience />
      <CodingProfiles/>
      <Approach />
      <Footer />
    </div>
   </main>
  );
}
