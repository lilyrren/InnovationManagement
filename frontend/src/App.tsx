import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Search";
import "./App.css";
import { Provider } from "./components/ui/provider";

function App() {
  return (
    <Provider defaultTheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
