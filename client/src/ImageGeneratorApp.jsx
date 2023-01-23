import React from 'react'
import { Home, CreatePost } from "./pages/index"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { SiOpenai } from "react-icons/si";
import "./style.css"
const ImageGeneratorApp = () => {
    return (
      <>
        <BrowserRouter>
          <header className="header">
            <Link to="/" className="logo">
              <SiOpenai className="logo-src" /> <h1>OpenAI</h1>
            </Link>

                    <Link to="/create-post" className="create-btn">
                        Create
                </Link>
                </header>
                <main className="main-container">
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/create-post" element={<CreatePost/>}></Route>
                    </Routes>
                </main>
        </BrowserRouter>
      </>
    );
}

export default ImageGeneratorApp
