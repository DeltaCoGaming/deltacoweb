// app/mods/page.tsx

import Navbar from "../components/Navbar";
import Events from "../components/Events";
import Members from "../components/Members";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <Events />
        <Members />
      </main>
      <Footer />
    </div>
  );
}
