import * as React from "react";
import image from "style/Background.jpg";
import WaterWave from "react-water-wave";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";

interface Props {
  image: string;
  height: number;
}

class NotFound extends React.Component<Props> {
  render() {
    return (
      <WaterWave
        imageUrl={image}
        // imageUrl={image}
        dropRadius={20}
        resolution={512}
      >
        {({ hide, show }: any) => (
          <div style={{ height: this.props.height }}>
            <Header></Header>
            <div className="main">
              <div className="container">
                <section>
                  <h1>404 Not Found X___X</h1>
                  <h3>페이지를 찾을 수 없습니다.</h3>
                </section>
              </div>
            </div>
            <Footer></Footer>
          </div>
        )}
      </WaterWave>
    );
  }
}

// Profile.defaultProps = {
//   title: "Hello, world-!",
// };

export default NotFound;
