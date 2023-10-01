
// Routes between various pages home, aboutus
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";
import About from "./pages/About";

// Components
import Navbar from "./components/Navbar";

const App = ()=> {
  return (
    <Router>
      <Navbar />
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/article-list" element={<ArticleList />} />
          <Route path="/article/:name" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
