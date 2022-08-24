import * as React from "react";
import "./App.css";

function App() {
  const [allDotsArray, setAllDotsArray] = React.useState([]);
  const [allClicksArray, setAllClicksArray] = React.useState([]);
  const [loadDate, setLoadDate] = React.useState(0);
  const [clickTimesArray, setClickTimesArray] = React.useState([]);
  const [isHeatmapVisible, setIsHeatmapVisible] = React.useState(false);

  const createCircle = (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const position = [cursorX, cursorY];
    const allClicksArrayCopy = [...allClicksArray];
    allClicksArrayCopy.push(position);
    setAllClicksArray(allClicksArrayCopy);
  };

  const clickTimer = () => {
    const clickTimesArrayCopy = [...clickTimesArray];
    clickTimesArrayCopy.push(Date.now() - loadDate);
    setClickTimesArray(clickTimesArrayCopy);
  };

  const createDot = (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const position = [cursorX, cursorY];
    const allDotsArrayCopy = [...allDotsArray];
    allDotsArrayCopy.push(position);
    setAllDotsArray(allDotsArrayCopy);
  };

  const handleClick = (event) => {
    createCircle(event);
    clickTimer();
  };

  const toggleHeatmap = () => {
    setIsHeatmapVisible(!isHeatmapVisible);
  };

  React.useEffect(() => {
    setLoadDate(Date.now());
  }, []);

  React.useEffect(() => {
    console.log(clickTimesArray);
  }, [clickTimesArray]);

  return (
    <div className="App" onMouseMove={createDot} onMouseDown={handleClick}>
      <div className="main-content">
        <button className="toggle-heatmap" onClick={toggleHeatmap}>
          View heatmap
        </button>
        {isHeatmapVisible && (
          <div className="heatmap-layer">
            {allDotsArray.map((dot) => (
              <div
                className="dot"
                style={{
                  left: `${(dot[0] - 1).toString()}px`,
                  top: `${(dot[1] - 1).toString()}px`,
                }}
              ></div>
            ))}
            {allClicksArray.map((click) => (
              <div
                className="click-circle"
                style={{
                  left: `${(click[0] - 2).toString()}px`,
                  top: `${(click[1] - 2).toString()}px`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
