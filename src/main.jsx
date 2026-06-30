import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './pages/Root'
import About from './pages/About'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Services from './pages/Services'
import Contact from './pages/Contact'
import GenerateResume from './pages/GenerateResume'
import { Toaster } from "react-hot-toast"; 
import PersonalInfoForm from './forms/PersonalInfoForm'
import ResumePage from './pages/ResumePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Toaster position="top-center" reverseOrder={false} />
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} >
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="generate-resume" element={<GenerateResume />} />
          <Route path="resume-page" element={<ResumePage />} />
        </Route>

      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
