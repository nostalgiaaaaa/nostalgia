import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "components/main/Profile";
import PostMalone from "page/musicVideo/PostMalone";
import Rose from "page/musicVideo/Rose";
import BTS from "page/musicVideo/BTS";
import Chris from "page/musicVideo/Chris";
import NotFound from "page/NotFound";

interface Props {
  image: string;
  handleImage: any;
  handleRipple: any;
}

class Main extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(image: string) {
    this.props.handleImage(image);
    if (image.includes("Background")) {
      this.handleRipple(true);
    } else {
      this.handleRipple(false);
    }
  }

  handleRipple(val: boolean) {
    this.props.handleRipple(val);
  }

  render() {
    return (
      <div className="main">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Profile
                    title="Hello, world-!"
                    desc="React Web Mini Project"
                    image={this.props.image}
                    handleImage={this.handleImage}
                  />
                }
              />
              <Route
                path="/postMalone"
                element={
                  <PostMalone
                    image={this.props.image}
                    handleImage={this.handleImage}
                  />
                }
              />
              <Route
                path="/rose"
                element={
                  <Rose
                    image={this.props.image}
                    handleImage={this.handleImage}
                  />
                }
              />
              <Route
                path="/bts"
                element={
                  <BTS
                    image={this.props.image}
                    handleImage={this.handleImage}
                  />
                }
              />
              <Route
                path="/chris"
                element={
                  <Chris
                    image={this.props.image}
                    handleImage={this.handleImage}
                  />
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default Main;
