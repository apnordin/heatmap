import * as React from "react";
import "./App.css";

function App() {
  const [allDotsArray, setAllDotsArray] = React.useState([]);
  const [allClicksArray, setAllClicksArray] = React.useState([]);
  const [loadDate, setLoadDate] = React.useState(0);
  const [clickTimesArray, setClickTimesArray] = React.useState([]);
  const [isHeatmapVisible, setIsHeatmapVisible] = React.useState(false);
  const [viewportWidth, setViewportWidth] = React.useState();
  const [viewportHeight, setViewportHeight] = React.useState();

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
    const currentDate = new Date();
    console.log(
      `On ${currentDate.toLocaleString()}, you clicked on pixel ${
        event.clientX
      }x${event.clientY}. This was exactly ${
        Date.now() - loadDate
      }ms after loading the page.`
    );
  };

  const toggleHeatmap = () => {
    setIsHeatmapVisible(!isHeatmapVisible);
  };

  const handleContextMenu = (event) => {
    console.log(
      `You opened the console, didn't you? You clicked on pixel ${event.clientX}x${event.clientY} and opened that dirty console.`
    );
  };

  React.useEffect(() => {
    setLoadDate(Date.now());
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  }, []);

  // React.useEffect(() => {
  //   console.log(clickTimesArray);
  // }, [clickTimesArray]);

  return (
    <div
      className="App"
      onMouseMove={createDot}
      onMouseDown={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="main-content">
        {isHeatmapVisible && (
          <div className="heatmap-layer">
            {allDotsArray.map((dot, i) => (
              <div
                key={i}
                className="dot"
                style={{
                  left: `${(dot[0] - 1).toString()}px`,
                  top: `${(dot[1] - 1).toString()}px`,
                }}
              ></div>
            ))}
            {allClicksArray.map((click, i) => (
              <div
                key={i}
                className="click-circle"
                style={{
                  left: `${(click[0] - 2).toString()}px`,
                  top: `${(click[1] - 2).toString()}px`,
                }}
              ></div>
            ))}
          </div>
        )}
        <div className="viewport-report">
          <button className="toggle-heatmap" onClick={toggleHeatmap}>
            View heatmap
          </button>
          <p style={{margin: "0px"}}>
            Your viewport &#40;on load&#41; is {viewportWidth}px x{" "}
            {viewportHeight}px
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
