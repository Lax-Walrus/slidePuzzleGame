import React, { useState, useEffect, componentDidMount } from "react";
// import Image from "..src/images/tileImageGame";
import Board from "./componants/board";
import { updateURLParameter } from "./helper/helper";

function App() {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img"));
    }
  }, [setImgUrl]);

  const handleImageChange = (e) => {
    setImgUrl(e.target.value);
    window.history.replaceState(
      "",
      "",
      updateURLParameter(window.location.href, "img", e.target.value)
    );
  };
  return (
    <div className="App">
      <h1> Solve the Puzzle </h1>
      <Board imgUrl={imgUrl} />

      <input value={imgUrl} onChange={handleImageChange} />
    </div>
  );
}

export default App;
