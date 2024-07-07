// app/support/page.tsx

import Navbar from "../../components/Navbar";
import Support from "../../components/community/Support";
import Members from "../../components/Members";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow">
        <Support />
        <Members />
      </main>
      <Footer />
    </div>
  );
}