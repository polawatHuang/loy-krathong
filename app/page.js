/* eslint-disable @next/next/no-page-custom-font */
// app/page.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import ReactAudioPlayer from "react-audio-player";
import asianCountries from "@/libs/countries"; // Assuming a static list in case countries data is not fetched
import soundOn from "@/public/images/valume_up.png";
import soundOff from "@/public/images/valume_down.png";
import btnOn from "@/public/images/btn-on-click.png";
import btn from "@/public/images/btn.png";
import logo from "@/public/images/logo.png";

// Replace this with your actual API endpoint if fetching dynamically
const apiEndpoint = "https://6736a30caafa2ef222310d75.mockapi.io/countries";

export default function Home() {
  const [count, setCount] = useState(0);
  const [changeImage, setChangeImage] = useState(btn);
  const [countries, setCountries] = useState([]);
  const [soundText, setSoundText] = useState("คลิกเพื่อปิดเสียง");
  const [mutedSound, setMutedSound] = useState(false);

  useEffect(() => {
    // Fetch countries data from API
    const fetchCountries = async () => {
      try {
        const res = await fetch(apiEndpoint);
        const data = await res.json();

        const mergedData = data.map((item,index) => ({
          country: asianCountries[index].country,
          countryCode: asianCountries[index].countryCode || "N/A",  // Country code lookup
          score: item.score
        }));

        setCountries(mergedData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountries(asianCountries); // Fallback to static list if needed
      }
    };
    fetchCountries();
  }, []);

  const onClickLoyKrathong = () => {
    setChangeImage(btnOn);
    setCount(count + 1);
    document.getElementById("fallingSound").play();
    setTimeout(() => {
      setChangeImage(btn);
    }, 1000);
  };

  function formatNumber(number) {
    return number.toLocaleString();
  }

  const onClickSound = () => {
    changeImage === soundOn
      ? setChangeImage(soundOff)
      : setChangeImage(soundOn);
    soundText === "คลิกเพื่อปิดเสียง"
      ? setSoundText("คลิกเพื่อเปิดเสียง")
      : setSoundText("คลิกเพื่อปิดเสียง");
    mutedSound === false ? setMutedSound(true) : setMutedSound(false);
  };

  return (
    <> <main className="App-header relative kanit-medium px-[6px]">
        <h1 className="mt-[60px] text-[34px]">ลอยกระทงออนไลน์</h1>
        <h2 id="show_count" className="text-[134px]">{formatNumber(count)}</h2>
        <Image
          src={logo}
          width={400}
          height={250}
          onClick={onClickLoyKrathong}
          alt="Krathong"
          className="animate-pulse"
        />
        <p className="mt-[60px]">
          มาร่วมลอยกระทงออนไลน์ ร่วมกันลดขยะ รักษาสิ่งแวดล้อมให้อยู่กับเราตลอดไป
        </p>

        <button
          onClick={onClickLoyKrathong}
          style={{ border: "none", background: "transparent", marginTop: "60px" }}
        >
          <Image
            src={btn}
            width={300}
            height={150}
            alt="Loy Krathong Button"
            className="App-btn"
          />
        </button>

        <ReactAudioPlayer id="fallingSound" src="/sounds/falling.wav" />

        <div className="my-[60px]">
        <div className="px-[24px] pt-[6px] pb-[60px] bg-blue-400 border-2 border-blue-600 rounded-[15px]">
          <h3 className="text-center my-2 text-[34px]">Country&apos;s Score:</h3>
          <ul>
            {countries.length === 0 ? <li className="text-center">Loading data ...</li> : null}
            {countries.sort((a, b) => b.score - a.score).map((country) => (
              <li key={country.countryCode || index} className="ml-[10%]">
                <ReactCountryFlag
                  //countryCode={country.countryCode} // Ensure each country object has a `countryCode`
                  countryCode={country.countryCode} 
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                  }}
                />
                {country.country} - Score: {formatNumber(country.score)}
              </li>
            ))}
          </ul>
        </div>
        </div>

        <footer className="w-full bg-gray-700 mt-[60px] absolute bottom-0 flex flex-col py-4 kanit-regular text-[16px] justify-center items-center">
          <p>
            เว็บไซต์นี้จัดทำโดยเพจบักทึงของโจ้{" "}
            มาร่วมกันรักษาธรรมชาติเพื่อช่วยเหลือสื่งแวดล้อมทางน้ำให้สวยงาม (App version 1.0.0)
          </p>
          <div>
          <button onClick={onClickSound} className="text-yellow-300">
            <b>{soundText + " "}{" "}</b>
          </button>
          <ReactAudioPlayer
            src={"/sounds/loy-krathong-song-2.mp3"}
            autoPlay={true}
            muted={mutedSound}
            loop={true}
            volume={0.1}
          />
          </div>
        </footer>
      </main>
    </>
  );
}
