import { About } from "@/components/About";
import { Apresentation } from "@/components/Apresentation";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  return (
    <div className="mx-4 lg:mx-40">
      <NavBar />
      <Apresentation />
      <About />
    </div>
  );
}
