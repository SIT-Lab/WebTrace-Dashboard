import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProjectHomePage } from './pages/ProjectHomePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { Testpage } from './pages/Testpage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectHomePage />} />
        <Route path="/:projectid/" element={<ProjectDetailPage />} />
        <Route path="/:projectid/:tasksuiteid/" element={<ProjectDetailPage />} />
        {/* <Route path="/Testpage" element={<Testpage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
