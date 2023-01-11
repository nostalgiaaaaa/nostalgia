import * as React from "react";
import ProfileMenu from "../components/main/menu/ProfileMenu";
import SideMenu from "../components/main/menu/SideMenu";
import image from "style/Background.jpg";
import WaterWave from "react-water-wave";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";

interface Props {
  title: string;
  desc: string;
  image: string;
  handleImage: any;
  height: number;
}

class Profile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleimage = this.handleimage.bind(this);
  }

  handleimage(image: string) {
    this.props.handleImage(image);
    window.sessionStorage.setItem("image", image);
  }

  componentDidMount() {
    this.handleimage(image);
    window.sessionStorage.setItem("image", image);
  }

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
                  <h1>{this.props.title}</h1>
                  <h3>{this.props.desc}</h3>
                </section>
                <ProfileMenu></ProfileMenu>
                <SideMenu image={image} setImage={this.handleimage}></SideMenu>
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

export default Profile;
