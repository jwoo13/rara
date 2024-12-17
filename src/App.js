import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import ToIncheon from "./components/ToIncheon";
import International from "./components/International";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/to-incheon" element={<ToIncheon />} />
                <Route path="/international" element={<International />} />
            </Routes>
        </Router>
    );
}

export default App;
