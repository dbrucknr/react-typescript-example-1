import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import Navbar from "./components/ui/app-navbar.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
