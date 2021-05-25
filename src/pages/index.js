import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const [data, setData] = useState([]);
  let [text, setText] = useState("");
  let [location, setLocation] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const location = fetcher(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b0da7203bde69387f4db3e117e687b2c`
        ).then((l) => setLocation(l.name));
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  useEffect(() => {
    fetch("/api/ejens/find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location }),
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [location]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (text) location = text;
    let result = await fetch("/api/ejens/find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location }),
    });

    result = await result.json();

    setData(result);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Ejens</title>
        <meta name="description" content="Search for agent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-4xl">
        <h1 className="font-bold text-4xl mb-10">Search for seller</h1>
        <div className="grid grid-cols-6 gap-2">
          <div className="border  col-span-5 focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="name" className="bg-white text-gray-600 px-1">
                  LOCATION SEARCH
                </label>
              </p>
            </div>
            <p>
              <input
                id="name"
                autocomplete="false"
                tabindex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                onChange={(e) => setText(e.target.value)}
              />
            </p>
          </div>

          <button
            onClick={HandleSubmit}
            className=" rounded w-full text-white px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300"
          >
            Search
          </button>
        </div>

        {location && data ? (
          <h2 className="font-bold text-lg my-8 underline">List of Agents</h2>
        ) : (
          <p className="text-center mt-10">loading...</p>
        )}

        <ul className="bg-white border border-gray-100 rounded-2xl shadow-lg p-4 space-y-8">
          {location &&
            data?.map((ejen) => {
              return (
                <li
                  key={ejen.id}
                  className="shadow-md border border-gray-100 p-4 rounded-2xl transform hover:-translate-y-2 ease-in-out duration-300"
                >
                  <div className="flex flex-col">
                    <p className="font-bold text-gray-800 text-2xl">
                      {ejen.name}
                    </p>
                    <p className="font-bold text-gray-600">{ejen.phone}</p>
                    <p className="text-gray-800">{ejen.email}</p>
                    <p className="text-gray-800">{ejen.address}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
}
