// app/servers/page.tsx

import Navbar from "../../components/Navbar";
import Mods from "../../components/Mods";
import Members from "../../components/Members";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <Mods />
        <Members />
      </main>
      <Footer />
    </div>
  );
}
