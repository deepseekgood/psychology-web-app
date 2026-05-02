import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Test from './pages/Test'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Counselors from './pages/Counselors'
import CounselorDetail from './pages/CounselorDetail'
import Appointment from './pages/Appointment'
import ArticleDetail from './pages/ArticleDetail'
import Profile from './pages/Profile'
import Records from './pages/Records'
import Orders from './pages/Orders'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test/quiz" element={<Quiz />} />
            <Route path="/test/result" element={<Result />} />
            <Route path="/counselors" element={<Counselors />} />
            <Route path="/counselors/:id" element={<CounselorDetail />} />
            <Route path="/appointment/:id" element={<Appointment />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/records" element={<Records />} />
            <Route path="/profile/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
