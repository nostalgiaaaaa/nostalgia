import * as React from "react";
import ProfileMenu from "./menu/ProfileMenu";
import SideMenu from "./menu/SideMenu";
import image from "style/Background.jpg";

interface Props {
  title: string;
  desc: string;
  image: string;
  handleImage: any;
}

class Profile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleimage = this.handleimage.bind(this);
  }

  handleimage() {
    this.props.handleImage(image);
  }

  componentDidMount() {
    this.handleimage();
  }

  render() {
    return (
      <>
        <section>
          <h1>{this.props.title}</h1>
          <h3>{this.props.desc}</h3>
        </section>
        <ProfileMenu></ProfileMenu>
        <SideMenu></SideMenu>
      </>
    );
  }
}

// Profile.defaultProps = {
//   title: "Hello, world-!",
// };

export default Profile;
