import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import Search from "./Search";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
