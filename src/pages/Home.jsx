import DisplayLectures from "../components/DisplayLectures";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wave from "../components/Wave";
import WaveInv from "../components/WaveInv";
import { Analytics } from "@vercel/analytics/react";
import ToggleTheme from '../components/ToggleTheme'
import Backdoor from '../components/Backdoor'
import ReferBook from "../components/ReferBook";

function Home() {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center bg-[#dddddd] dark:bg-[#1c1c1c] font-[Google_Sans_Flex]">
        <Header />
        <DisplayLectures />
        <Wave />
        <ReferBook />
        <WaveInv />
        <Footer />
        <ToggleTheme hidden={false}/>
        <Backdoor />
      </div>
    </>
  );
}

export default Home;
