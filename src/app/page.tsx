import Navbar from "@/components/homepage/Navbar/Navbar";
import Hero from "@/components/homepage/Hero/Hero";
import About from "@/components/homepage/About/About";
import Features from "@/components/homepage/Features/Features";
import Docs from "@/components/homepage/Docs/Docs";
import Footer from "@/components/homepage/Footer/Footer";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <About />
        <Features />
        <Docs />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
