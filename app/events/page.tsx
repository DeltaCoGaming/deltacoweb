// app/chillzone/page.tsx

import Navbar from "../components/Navbar";
import Music from "../components/Music";
import Members from "../components/Members";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <Music />
        <Members />
      </main>
      <Footer />
    </div>
  );
}
