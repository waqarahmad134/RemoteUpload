import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"
import { ImCancelCircle } from "react-icons/im"
import Header from "../components/Header"

export default function UploadMovie() {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [uploadComplete, setUploadComplete] = useState([])
  const [loader, setLoader] = useState(false)
  const [errorData, setErrorData] = useState(null)
  const [result, setResult] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://backend.videosroom.com/public/api/categories"
        )
        setCategories(response?.data?.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCategories()
  }, [])

  const handleCheckboxChange = (event, category) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      )
    }
  }

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
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file)
      })
      // formData.append("selectedCategories", selectedCategories)
      formData.append("selectedCategories", JSON.stringify(selectedCategories));

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
        setSelectedCategories([])
        setResult(
          response.data?.status === 1
            ? response?.data?.matchedMovies
            : "Waqar Se Poch bhai mujhe ni pata"
        )
        setErrorData(response?.data?.responses)
      } catch (error) {
        console.error("Error uploading files:", error)
        setErrorData(error)
        setLoader(false)
        setSelectedCategories([])
      }
    }
  }

  return (
    <div className="bg-slate-200 h-screen">
      <Header />
      <div className="uploader-container">
        <div className="uploader-left">
          {loader ? (
            <div className="h-full flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              <div className="border border-gray-300 p-3 grid grid-cols-3 gap-3">
                <div className="col-span-2">
                <h3>File Uploader</h3>
                <form className="flex items-center" onSubmit={handleSubmit} encType="multipart/form-data">
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
                <div className="col-span-1">
                <form >
                  {categories?.map((category, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        value={category?.id}
                        onChange={(e) => handleCheckboxChange(e, category?.id)}
                      />
                      <label htmlFor={`category-${index}`}>
                        &nbsp;{category?.name}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
              </div>
            
            </>
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
                    {errorData?.map((data) => (
                      <div>{data?.service} Uploaded</div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
