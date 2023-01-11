import React from "react";
import IndexPage from "page/Index";
class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="App">
        <IndexPage height={window.innerHeight} />
      </div>
    );
  }
}

export default App;
