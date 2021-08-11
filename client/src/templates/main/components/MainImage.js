import React from "react";
import '../../../assets/css/mainPage.css'

function MainImage(props) {
  return (
    //! mainImage style은 url을 props로 받아서 className으로 안바꿈
    <div
      style={{
        background: `linear-gradient(to bottom,
        rgba(0,0,0,0)39%,
        rgba(0,0,0,0)41%,
        rgba(0,0,0,0.65)100%),
        url('${props.image}'), #1c1c1c`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "90%",
        position: "relative",
        marginLeft: '5%',
      }}
    >
      <div>
        <div
          className="main-image-text-area"
        >
          <h2 className="main-image-text-title"> {props.title} </h2>
          <p className="main-image-text-content"> {props.text} </p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
