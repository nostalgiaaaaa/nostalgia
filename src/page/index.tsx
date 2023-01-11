import React from "react";
import image from "style/Background.jpg";
import Main from "./main/Main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import NotFound from "./NotFound";

// export interface IndexPageInterface {
//   children: React.ReactNode;
// }

interface Props {
  height: number;
}

interface state {
  image: string;
}

class IndexPage extends React.Component<Props, state> {
  constructor(props: Props) {
    super(props);
    this.state = { image: image };
    this.handleImage = this.handleImage.bind(this);
  }
  handleImage(image: string) {
    this.setState({ image: image });
  }

  render() {
    return (
      <div
        className="main-background"
        style={{
          backgroundImage: `url(${window.sessionStorage.getItem("image")})`,
          backgroundSize: "cover",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Profile
                  height={this.props.height}
                  title="Hello, world-!"
                  desc="React Web Mini Project"
                  image={image}
                  handleImage={this.handleImage}
                />
              }
            />

            <Route path="/main/*" element={<Main></Main>} />

            <Route path="*" element={<Navigate replace to="/errorPage" />} />
            <Route
              path="/errorPage"
              element={<NotFound height={this.props.height} image={image} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default IndexPage;
