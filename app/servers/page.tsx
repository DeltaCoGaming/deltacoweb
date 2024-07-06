// app/servers/page.tsx

import Navbar from "../components/Navbar";
import Servers from "../components/Servers";
import Members from "../components/Members";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <Servers />
        <Members />
      </main>
      <Footer />
    </div>
  );
}
