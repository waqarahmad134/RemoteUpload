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
        <nav>
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
        </nav>
      </header>
    </>
  )
}
