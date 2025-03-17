import Bottombar from "./Components/UI/Main/Bottombar";
import Contact from "./Components/UI/Pages/Contact";
import DataCard from "./Components/UI/DataCards/DataCard";
import Footer from "./Components/UI/Main/Footer";
import InfoCard from "./Components/UI/Main/InfoCard";
import Loading from "./Components/UI/Pages/Loading";
import Menu from "./Components/UI/Main/Menu";
import Navbar from "./Components/UI/Main/Navbar";
import Canvas from "./Components/3D/Canvas";


function App() {

  return (
    <div className="relative coustard">
      <Navbar />
      <Canvas />
      <Menu />
      <InfoCard />
      <DataCard />
      <Bottombar />
      <Footer />
      <Contact />
      <Loading />
    </div>
  );
}

export default App;
