import "./App.css";
import { useState } from "react";
import Dropdown from "./Dropdown";

function App() {
  //Toggle State for dropdown
  const [dropdownStatus, setDropdownStatus] = useState(false);

  //Function to change the dropdown Status
  const showDropDown = () => {
    if (dropdownStatus === false) {
      setDropdownStatus(true);
    } else {
      setDropdownStatus(false);
    }
  };

  return (
    <div className="app">
      <section className="app__logo" onClick={showDropDown}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
          alt="Star Wars"
        />
      </section>
      {dropdownStatus ? <Dropdown /> : null}
    </div>
  );
}

export default App;
