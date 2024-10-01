import axios from "axios";
import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function Header() {
  const { mixdrop } = useParams()
  const mixdropItems = [
    "Mixdrop1",
    "Mixdrop2",
    "Mixdrop3",
    "Mixdrop4",
    "Mixdrop5",
    "Mixdrop6",
  ]

  const streamActionFunc = async () => {
    try {
      const res = await axios.get("https://api.streamwish.com/api/file/url_actions?key=20445huibnrwap8ww1pp4&restart_errors=1");
      console.log("Success:", res.data); // Logs success response to the console
      alert("Request was successful");
    } catch (error) {
      console.error("Error occurred:", error); // Logs any error to the console
      alert("An error occurred");
    }
  };
  

  return (
    <>
      <header className="flex items-center justify-between w-11/12 m-auto">
        <div className="flex gap-4">
          <Link
            to={`/`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Remote Upload
          </Link>
          <Link
            to={`/upload/mixdrop1`}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            System Upload
          </Link>
        </div>
        <nav className="flex flex-col">
          <ul className="flex gap-3 justify-center py-4">
            {mixdropItems?.map((item, index) => (
              <li
                className={`${
                  mixdrop?.toLowerCase() === item?.toLowerCase()
                    ? "font-semibold border-b-2 border-black"
                    : "waqar"
                }`}
                key={index}
              >
                <Link
                  className="cursor-pointer"
                  to={`/upload/${item.toLowerCase()}`}
                  target="_blank"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button onClick={streamActionFunc}
              className="border border-black px-2 py-1 rounded hover:bg-gray-400 transition-colors"
            >
              <img src="https://streamwish.com/wish_dark/images/logo.svg" className="w-[200px]" alt="streamwish" />
            </button>
            <button onClick={streamActionFunc}
              className="border border-black px-2 py-1 rounded hover:bg-gray-400 transition-colors"
            >
              <img src="https://i.doodcdn.co/img/logo-s.png" className="w-[200px]" alt="streamwish" />
            </button>
            <button onClick={streamActionFunc}
              className="bg-black border border-black px-2 py-1 rounded hover:bg-gray-400 transition-colors"
            >
              <img src="https://vidhide.com/vidhide/images/logo.svg" className="w-[200px]" alt="streamwish" />
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}
