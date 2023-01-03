import React from "react";
import WaterWave from "react-water-wave";
import image from "style/Background.jpg";
import Header from "components/header/Header";
import Main from "components/main/Main";
import Footer from "components/footer/Footer";

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
      <WaterWave
        imageUrl={this.state.image}
        // imageUrl={image}
        dropRadius={20}
        resolution={512}
      >
        {({ hide, show }: any) => (
          <div style={{ height: this.props.height }}>
            <Header></Header>
            {/* <button
              onClick={() => {
                hide();
              }}
            ></button> */}
            <Main
              image={this.state.image}
              handleImage={this.handleImage}
              handleRipple={(val: boolean) => {
                if (val) {
                  show();
                } else {
                  hide();
                }
              }}
            ></Main>
            <Footer></Footer>
          </div>
        )}
      </WaterWave>
    );
  }
}

export default IndexPage;
