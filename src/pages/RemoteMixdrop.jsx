import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaCheckCircle } from "react-icons/fa"
import { ImCancelCircle } from "react-icons/im"
import Header from "../components/Header"
import { useParams } from "react-router-dom"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"

export default function RemoteMixdrop() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [movieUrls, setMovieUrls] = useState("")
  const [uploadComplete, setUploadComplete] = useState([])
  const [loader, setLoader] = useState(false)
  const [errorData, setErrorData] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [name, setName] = useState("")
  const [mixEmail, setMixEmail] = useState("")
  const [mixKey, setMixKey] = useState("")
  const [doodliEmail, setDoodliEmail] = useState("")
  const [doodliKey, setDoodliKey] = useState("")
  const [vidhideEmail, setVidhideEmail] = useState("")
  const [vidhideKey, setVidhideKey] = useState("")
  const [streamwishEmail, setStreamwishEmail] = useState("")
  const [streamwishKey, setStreamwishKey] = useState("")
  const [loginError, setLoginError] = useState(null)

  const fetchData = () => {
    const savedData = localStorage.getItem("accountData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setMixEmail(data.mixEmail || "")
      setMixKey(data.mixKey || "")
      setDoodliEmail(data.doodliEmail || "")
      setDoodliKey(data.doodliKey || "")
      setVidhideEmail(data.vidhideEmail || "")
      setVidhideKey(data.vidhideKey || "")
      setStreamwishEmail(data.streamwishEmail || "")
      setStreamwishKey(data.streamwishKey || "")
    } else {
      // Fallback initial data if localStorage is empty
      const initialData = {
        mixEmail: "videosroomofficial@gmail.com",
        mixKey: "I0nHwRrugSJwRUl6ScSe",
        doodliEmail: "videosroomofficial@gmail.com",
        doodliKey: "434272nxlae3r22329ia88",
        vidhideEmail: "videosroomofficial@gmail.com",
        vidhideKey: "31076w3lc27ihj621zyb7",
        streamwishEmail: "videosroomofficial@gmail.com",
        streamwishKey: "19211xt467prybty85xsy",
      }
      setMixEmail(initialData.mixEmail)
      setMixKey(initialData.mixKey)
      setDoodliEmail(initialData.doodliEmail)
      setDoodliKey(initialData.doodliKey)
      setVidhideEmail(initialData.vidhideEmail)
      setVidhideKey(initialData.vidhideKey)
      setStreamwishEmail(initialData.streamwishEmail)
      setStreamwishKey(initialData.streamwishKey)
    }
  }

  // Save the data to localStorage
  const saveData = () => {
    const newData = {
      mixEmail,
      mixKey,
      doodliEmail,
      doodliKey,
      vidhideEmail,
      vidhideKey,
      streamwishEmail,
      streamwishKey,
    }

    localStorage.setItem("accountData", JSON.stringify(newData))
    onClose()
    window.location.reload()
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  const parseMovieUrls = (text) => {
    const regex = /<!--(.*?)-->\s*(https?:\/\/[^\s]+)|\b(https?:\/\/[^\s]+)/g
    let matches
    const result = {
      titled: [],
      plain: [],
    }

    while ((matches = regex.exec(text)) !== null) {
      let title = ""
      let url = ""
      if (matches[1]) {
        title = matches[1].trim()
        title = title
          .replace(/\.(mp4|mp3|avi|mkv|mov|flv|wmv|webm)$/i, "")
          .trim()
        url = matches[2].trim()
        result.titled.push({ title, url })
      } else {
        // It's a plain URL
        url = matches[3].trim()
        result.plain.push({ url })
      }
    }
    return result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    setErrorData(null)
    setUploadComplete([])

    try {
      const parsedMovies = parseMovieUrls(movieUrls)
      const savedData = localStorage.getItem("accountData")
      const response = await axios.post(
        "http://localhost:5000/api/remoteMixdrop",
        {
          movies: parsedMovies,
          selectedCategories: selectedCategories,
          accountData: savedData,
        }
      )
      setLoginError(response?.data?.message)
      setUploadComplete(response.data)
      setLoader(false)
      setSelectedCategories([])
    } catch (error) {
      setErrorData(error.response?.data || "Something went wrong")
      setLoader(false)
      setSelectedCategories([])
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <div className="p-3 grid grid-cols-2 gap-2">
            <div>
              <h4 className="bg-blue-500 mb-4">
                <img
                  src="https://mixdrop.ag/imgs/v2/logo.png"
                  className="w-32 m-auto py-2"
                  alt=""
                />
              </h4>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Mix Email
                </label>
                <input
                  type="text"
                  value={mixEmail}
                  onChange={(e) => setMixEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Mix Key
                </label>
                <input
                  type="text"
                  value={mixKey}
                  onChange={(e) => setMixKey(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
              </div>
            </div>
            <div>
              <h4 className="bg-blue-500 mb-4">
                <img
                  src="https://i.doodcdn.co/img/logo-s.png"
                  className="w-20 m-auto py-2"
                  alt=""
                />
              </h4>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Doodli Email
                </label>
                <input
                  type="text"
                  value={doodliEmail}
                  onChange={(e) => setDoodliEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Doodli Key
                </label>
                <input
                  type="text"
                  value={doodliKey}
                  onChange={(e) => setDoodliKey(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
              </div>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2">
            <div>
              <h4 className="bg-blue-500 mb-4">
                <img
                  src="https://vidhide.com/vidhide/images/logo.svg"
                  className="w-32 m-auto py-2"
                  alt=""
                />
              </h4>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Vidhide Email
                </label>
                <input
                  type="text"
                  value={vidhideEmail}
                  onChange={(e) => setVidhideEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Videhide Key
                </label>
                <input
                  type="text"
                  value={vidhideKey}
                  onChange={(e) => setVidhideKey(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
              </div>
            </div>
            <div>
              <h4 className="bg-yellow-500 mb-4">
                <img
                  src="https://streamwish.com/daly/images/streamwish123.png"
                  className="w-28 m-auto py-2"
                  alt=""
                />
              </h4>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Streamwish Email
                </label>
                <input
                  type="text"
                  value={streamwishEmail}
                  onChange={(e) => setStreamwishEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Streamwish Key
                </label>
                <input
                  type="text"
                  value={streamwishKey}
                  onChange={(e) => setStreamwishKey(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
              </div>
            </div>
          </div>
          <button
            onClick={saveData}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Save Data
          </button>
        </ModalContent>
      </Modal>
      {loader ? (
        <div className="h-screen bg-black w-full flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <Header />
          <div className="w-11/12 m-auto">
            <button onClick={onOpen}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1047/1047690.png"
                className="w-20"
              />
            </button>
          </div>
          <div className="grid grid-cols-3 justify-center w-11/12 m-auto gap-2 my-5">
            <form
              onSubmit={handleSubmit}
              className="col-span-2 p-6 bg-white shadow-md rounded-md w-full"
            >
              <h1 className="text-2xl font-semibold mb-4">
                Submit Movie URLs using 3rd party like MIXDROP , Doodli
              </h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="movieUrls"
                >
                  Movie URLs (in the format of a comment and URL):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <textarea
                      id="movieUrls"
                      rows="13"
                      className="w-full p-2 border rounded"
                      value={movieUrls}
                      onChange={(e) => setMovieUrls(e.target.value)}
                      placeholder="Paste movie titles as comments and URLs here..."
                    />
                  </div>
                  <div className="col-span-1">
                    <form>
                      {categories?.map((category, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            id={`category-${index}`}
                            value={category?.id}
                            onChange={(e) =>
                              handleCheckboxChange(e, category?.id)
                            }
                          />
                          <label htmlFor={`category-${index}`}>
                            &nbsp;{category?.name}
                          </label>
                        </div>
                      ))}
                    </form>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  disabled={loader}
                >
                  {loader ? "Submitting..." : "Submit"}
                </button>
                {loader && <p>Loading...</p>}
              </div>
            </form>
            <div className="col-span-1">
              {uploadComplete?.matchedMovies?.length > 0 && (
                <div className="mt-4 p-4 bg-green-100 rounded-md">
                  <h3 className="text-green-700 font-semibold mb-2">
                    Submission Complete!
                  </h3>
                  {uploadComplete?.matchedMovies?.map((item, index) => (
                    <p
                      key={index}
                      className={
                        item?.status === 1 ? "text-red-500" : "text-green-600"
                      }
                    >
                      {item?.status === 1 ? (
                        <ImCancelCircle className="inline-block mr-1" />
                      ) : (
                        <FaCheckCircle className="inline-block mr-1" />
                      )}
                      {item?.error}
                    </p>
                  ))}
                </div>
              )}
              {uploadComplete?.responses?.length > 0 && (
                <div className="mt-4 p-4 bg-green-100 rounded-md">
                  <h3 className="text-green-700 font-semibold mb-2">
                    Submission Complete!
                  </h3>
                  {uploadComplete?.responses?.map((item, index) => (
                    <p
                      key={index}
                      className={
                        item?.status === 1 ? "text-red-500" : "text-green-600"
                      }
                    >
                      {item?.service}
                    </p>
                  ))}
                </div>
              )}

              {loginError && (
                <div className="mt-4 p-4 bg-red-100 rounded-md">
                  <p className="text-red-600">{loginError}</p>
                </div>
              )}

              {errorData && (
                <div className="mt-4 p-4 bg-red-100 rounded-md">
                  <h3 className="text-red-700 font-semibold mb-2">Error</h3>
                  <p className="text-red-600">
                    {typeof errorData === "object"
                      ? JSON.stringify(errorData)
                      : errorData}
                  </p>
                </div>
              )}
              {uploadComplete && (
                <div className="mt-4 p-4 bg-red-100 rounded-md">
                  <h5 className="text-red-700 font-semibold">
                    {uploadComplete?.error}
                  </h5>
                  <p className="text-red-600">
                    {uploadComplete?.status === 1
                      ? uploadComplete?.data
                      : uploadComplete?.error}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
