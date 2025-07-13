import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { UserProvider } from './components/UserContext.jsx'
import { TopScoresProvider } from './components/TopScoresContext.jsx'
import { LanguagesProvider } from './components/LanguagesContext.jsx'
import { SignProvider } from './components/SignContext.jsx'

import NavBar from './components/NavBar.jsx'
import BackGroundImage from './components/BackGroundImage.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import TopScoresPage from './pages/TopScoresPage.jsx'
import HintsPage from './pages/HintsPage.jsx'
import SchoolsPage from './pages/SchoolsPage.jsx'
import ExercisePage from './pages/ExercisePage.jsx'

function App() {
  return (<Router>

    <UserProvider>

      <LanguagesProvider>

        <SignProvider>
          <NavBar />
        </SignProvider>

        <BackGroundImage />

        <Routes>

          <Route path='/' element={<WelcomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/top-scores' element={<TopScoresProvider><TopScoresPage /></TopScoresProvider>} />
          <Route path='/hints' element={<HintsPage />} />
          <Route path='/schools' element={<SchoolsPage />} />
          <Route path='/exercise' element={<ExercisePage />} />

        </Routes>

      </LanguagesProvider>

    </UserProvider>

  </Router>)
}

export default App
