import MainLayout from "../layouts/MainLayout";
import About from "../components/sections/About";
import Education from "../components/sections/Education";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";

const Home = () => {
  return (
    <MainLayout>
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
    </MainLayout>
  );
};

export default Home;
