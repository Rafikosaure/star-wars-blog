import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Error404 from './pages/Error404';
import Article from "./pages/Article"
import Forum from './pages/Forum';
import Topics from './pages/Topics';
import Header from './components/Header';
import Footer from './components/Footer';
import TestPage from './pages/TestPage';


export default function App() {
  return (
    <>
      <Router>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path='/article/:paramsIds' element={<Article />} />
              <Route path='/forum' element={<Forum />} />
              <Route path='/topics/:topicsId' element={<Topics />} />
              <Route path='/test' element={<TestPage />} />
              <Route path='*' element={<Error404 />} />
          </Routes>
          <Footer />
      </Router>
    </>
  )
}
