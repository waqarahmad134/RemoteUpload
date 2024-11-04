import axios from "axios";
import React, { useEffect, useState } from "react"
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

  const doodliKey = "434272nxlae3r22329ia88"
  const streamwishKey = "19211xt467prybty85xsy"

  const streamActionFunc = async () => {
    try {
      const res = await axios.get(`https://api.streamwish.com/api/file/url_actions?key=${streamwishKey}&restart_errors=1`);
      console.log("Success:", res.data); // Logs success response to the console
      alert("File Resume Successfully");
    } catch (error) {
      console.error("Error occurred:", error); // Logs any error to the console
      alert("An error occurred");
    }
  };

  const doodliActionFunc = async () => {
    try {
      const res = await axios.get(`https://doodapi.com/api/urlupload/actions?key=${doodliKey}&restart_errors=1`);
      console.log("Success:", res.data); // Logs success response to the console
      alert("Doodli File Resume Successfully");
    } catch (error) {
      alert("Doodli File Resume Successfully");
      console.error("Error occurred:", error); // Logs any error to the console
    }
  };

  const vidhideActionFunc = async () => {
    try {
      const res = await axios.get("https://vidhideapi.com/api/file/url_actions?key=31076w3lc27ihj621zyb7&restart_errors=1");
      console.log("Success:", res.data); // Logs success response to the console
      alert("File Resume Successfully");
    } catch (error) {
      console.error("Error occurred:", error); // Logs any error to the console
      alert("An error occurred");
    }
  };

  const [page , setPage] = useState(null)
  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    setPage(lastPart);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between w-11/12 m-auto gap-2 my-4">
        <div className="flex gap-4">
          
          <Link
            to={`/`}
            className={`flex gap-2 items-center border border-black text-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors ${page == undefined ? "bg-blue-400" : "w1"} `}
          >
            Direct <img src="https://cdn4.iconfinder.com/data/icons/cloud-computing-28/24/remote-cdn-cloud-upload-up--512.png"   className="w-12 blend-image"alt="" />
          </Link>
          <Link
            to={`/remoteMixdrop`}
            className={`flex gap-2 items-center border border-black text-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors ${page === "remoteMixdrop" ? "bg-blue-400" : "w1"} `}
          >
            Remote Mixdrop <img src="https://e7.pngegg.com/pngimages/999/1016/png-clipart-film-cinema-logo-cinema-x-chin-miscellaneous-black-thumbnail.png"  className="w-12 blend-image" />
          </Link>
        </div>
        <nav className="flex flex-col">
          <div className="flex gap-3">
            <button onClick={streamActionFunc}
              className="border border-black px-2 py-1 rounded hover:bg-gray-400 transition-colors"
            >
              <img src="https://streamwish.com/wish_dark/images/logo.svg" className="w-[200px]" alt="streamwish" />
            </button>
            <button onClick={doodliActionFunc}
              className="border border-black px-2 py-1 rounded hover:bg-gray-400 transition-colors"
            >
              <a href={`https://doodapi.com/api/urlupload/actions?key=${doodliKey}&restart_errors=1`} target="_blank">
              <img src="https://i.doodcdn.co/img/logo-s.png" className="w-[200px]" alt="streamwish" />
              </a>
            </button>
            <button onClick={vidhideActionFunc}
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
