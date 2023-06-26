import { About } from "@/components/About";
import { Apresentation } from "@/components/Apresentation";
import { Clinics } from "@/components/Clinics";
import { NavBar } from "@/components/NavBar";
import { Newsletter } from "@/components/Newsletter";
import { Patients } from "@/components/Patients";

export default function Home() {
  return (
    <div className="mx-4 lg:mx-40">
      <NavBar />
      <Apresentation />
      <About />
      <Clinics />
      <Patients />
      <Newsletter />
    </div>
  );
}
