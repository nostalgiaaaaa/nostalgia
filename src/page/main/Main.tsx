import * as React from "react";
import { Route, Routes } from "react-router-dom";
import PostMalone from "page/musicVideo/PostMalone";
import Rose from "page/musicVideo/Rose";
import BTS from "page/musicVideo/BTS";
import Chris from "page/musicVideo/Chris";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";

interface Props {
  // image: string;
  // handleImage: any;
}

const Main = (props: Props) => {
  return (
    <>
      <Header></Header>
      <div className="main">
        <div className="container">
          <Routes>
            <Route path="/postMalone" element={<PostMalone />} />
            <Route path="/rose" element={<Rose />} />
            <Route path="/bts" element={<BTS />} />
            <Route path="/chris" element={<Chris />} />
          </Routes>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Main;
