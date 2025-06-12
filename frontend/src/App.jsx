import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NavBar from './components/NavBar.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import TopScoresPage from './pages/TopScoresPage.jsx'
import HintsPage from './pages/HintsPage.jsx'
import SchoolsPage from './pages/SchoolsPage.jsx'
import ExercisePage from './pages/ExercisePage.jsx'

function App() {
  return (<Router>

    <NavBar />

    <Routes>

      <Route path='/' element={<WelcomePage/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/top-scores' element={<TopScoresPage/>} />
      <Route path='/hints' element={<HintsPage/>} />
      <Route path='/schools' element={<SchoolsPage/>} />
      <Route path='/exercise' element={<ExercisePage/>} />

    </Routes>

  </Router>)
}

export default App
