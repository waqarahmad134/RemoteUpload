import axios from "axios"
import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"
import { ImCancelCircle } from "react-icons/im"

export default function UploadMovie() {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [uploadComplete, setUploadComplete] = useState([])
  console.log("🚀 ~ UploadMovie ~ uploadComplete:", uploadComplete)
  const [loader, setLoader] = useState(false)
  const [errorData, setErrorData] = useState(null)
  const [result, setResult] = useState(null)
  const { mixdrop } = useParams()

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files)
    setUploadComplete([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedFiles === null) {
      alert("First Add Movie")
    } else {
      setLoader(true)
      const formData = new FormData()
      // Append each selected file to the FormData object
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file)
      })

      try {
        const response = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        setUploadComplete(response?.data?.matchedMovies)
        setLoader(false)
        console.log("response", response?.data)
        setResult(
          response.data?.status === 1
            ? response?.data?.matchedMovies
            : "Waqar Se Poch bhai mujhe ni pata"
        )

        const backendApiResults = response?.data
          ?.filter((item) => item?.service === "Backend API")
          ?.map((item) => item.result) // Extract the 'result' key

        setErrorData(backendApiResults)
      } catch (error) {
        console.error("Error uploading files:", error)
        setErrorData(error)
        setLoader(false)
      }
    }
  }

  const categories = [
    "Movie",
    "Punjabi",
    "English",
    "Netflix",
    "Series",
    "Drama",
    "Cartoon",
    "Songs",
  ]

  const mixdropItems = [
    "Mixdrop1",
    "Mixdrop2",
    "Mixdrop3",
    "Mixdrop4",
    "Mixdrop5",
    "Mixdrop6",
  ]

  return (
    <div className="bg-slate-200 h-screen">
      <div>
        <ul className="flex gap-3 justify-center py-4">
          {mixdropItems.map((item, index) => (
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
      </div>
      {/* <div className="uploader-container">
        <div className="border border-gray-300 p-3">
          {result?.map((data) => (
            <div className="flex flex-col gap-2">{data?.file}</div>
          ))}
          {errorData?.[0]?.error}
          {errorData?.[0]?.message}
        </div>
      </div> */}
      <div className="uploader-container">
        <div className="uploader-left">
          {loader ? (
            <div className="h-full flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="border border-gray-300 p-3">
              <h3>File Uploader</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="file"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                />
                <button
                  className="inline-flex py-2.5 px-4 rounded bg-black text-white"
                  type="submit"
                >
                  Upload
                </button>
                {/* {categories?.map((data, index) => (
                  <div className="flex items-center">
                    <input
                      key={index}
                      id={data}
                      type="radio"
                      name="category"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={data}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {data}
                    </label>
                  </div>
                ))} */}
              </form>
            </div>
          )}
        </div>

        <div className="uploader-right">
          {/* Grid layout of selected files */}
          <div className="grid grid-cols-2 gap-1">
            {selectedFiles &&
              Array.from(selectedFiles).map((file, index) => (
                <div key={index} className="file-item border border-gray-400">
                  <div className="flex items-center justify-between bg-blue-300 p-1">
                    <img
                      src="https://mixdrop.ag/imgs/v2/logo.png"
                      alt="Mixdrop"
                      className="mixdrop-image w-[80px]"
                    />
                    {uploadComplete?.length > 0 &&
                      (uploadComplete.some(
                        (uploadedFile) => uploadedFile.file === file.name
                      ) ? (
                        <ImCancelCircle />
                      ) : (
                        <FaCheckCircle className="success-icon" />
                      ))}
                  </div>
                  <div className="p-1">
                    <p>
                      {file.name.length > 30
                        ? `${file.name.substring(0, 30)}...`
                        : file.name}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
