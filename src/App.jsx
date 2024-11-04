import React from "react"
import Home from "./pages/Home"
import ErrorPage from "./errors/error-page"
import { ToastContainer } from "react-toastify"
import { ChakraProvider } from "@chakra-ui/react"
import { HelmetProvider } from "react-helmet-async"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import UploadMovie from "./pages/UploadMovie"
import RemoteMixdrop from "./pages/RemoteMixdrop"
import Direct from "./pages/Direct"

function App() {
  return (
    <div>
      <ToastContainer />
      <HelmetProvider>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Direct />} />
              <Route path="/remoteMixdrop" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </HelmetProvider>
    </div>
  )
}

export default App
