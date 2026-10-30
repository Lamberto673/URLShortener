import Image from "next/image";
import { Navbar } from "./components/Navbar";
import TechText from "../components/TechText";
export default async function app() {

  
  return (
    <div className=" min-h-screen  bg-blue-50 w-full  flex flex-col">
      <nav className="w-full bg-blue-900 h-20 flex justify-center items-center gap-5 shadow-lg">
        <ul className="text-amber-200 font-sans font-bold text-2xl">
          Url Shortener
        </ul>
        <ul className="text-gray-50 font-sans font-bold text-2xl">
          Try it for free!!!
        </ul>
      </nav>
      <span className="flex flex-col items-center bg-transparent sticky z-50 top-0">
        <Navbar />
      </span>

      {/* Hero */}
      <section className="bg-blue-50 flex flex-col justify-start  items-end  h-100 mt-40">
        <div className="w-full h-40">
          <TechText
            fontFamily="anime"
            text="Welcome to"
            fontWeight={600}
            fontSize={100}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1.5}
            speed={1}
            bounce={0.4}
            selection
            labels
            color="currentColor"
            align="center"
            draggable
            sweep
          />
        </div>
        <div className="w-full h-32 flex justify-end items-end">
          <TechText
            text="URL Shortener"
            fontWeight={600}
            fontSize={80}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily="anime"
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={50}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1.5}
            speed={1}
            bounce={0.4}
            selection
            labels
            color="currentColor"
            align="center"
            draggable
            sweep
          />
        </div>
      </section>
      <section className="bg-blue-50 flex flex-col justify-center  items-center mb-50">
        <div className="flex flex-col justify-center items-center w-150 h-30 bg-blue-300 rounded-2xl">
          <a
            href="#inserts"
            className="font-bold w-148 h-28 bg-amber-50 rounded-2xl font-smooth text-5xl text-center flex justify-center items-center scroll-smooth"
          >
            Go Try the Shortener
          </a>
        </div>
      </section>
      <div className="w-full h-20 bg-blue-950 shadow-2xl" />
      <section
        id="inserts"
        className="bg-blue-50 flex flex-col justify-center  items-center  min-h-screen"
      >
        <div className="midd-view flex-1  rounded-lg  ">
          <form className="h-50 w-200 bg-blue-700 opacity-50 rounded-lg shadow-2xl flex flex-col justify-center items-center">
            <input
            name="name"
              id="url"
              placeholder="https://google.com"
              className="w-120 h-12 p-2 text-lg text-black  bg-white "
            />
          </form>
        </div>
      </section>
      <div className="w-full h-20 bg-blue-950 shadow-2xl" />

      <section className="flex flex-col justify-center  items-center min-h-screen ">
        <div className="flex flex-col justify-center items-center ">
          <div className="bg-amber-400 rounded-lg w-200 h-50 justify-center items-center flex flex-col">
            <h1>URL Can be shorten into couple of bits using huffman coding</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
