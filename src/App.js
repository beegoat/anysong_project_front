import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from "./routes/Home";
import Nav from "./Nav";
import Footer from "./Footer";

function App() {
    return (
        <div>
            <Nav />
            <Home />
            <Footer />
        </div>
    )
  }

export default App;