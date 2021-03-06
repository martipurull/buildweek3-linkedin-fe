import { Image } from "react-bootstrap";
import "../App.css";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import useFetch from "../hooks/useFetch";

const LeftComponent = ({ userName }) => {

  const [data, setData] = useState(null)

  const { data: myData } = useFetch(`profiles/${userName}`)

  useEffect(() => {
    setData(myData)
  }, [myData])

  return (
    <>
      <div
        className="componentOnLeftSide p-3 mt-5"
        style={{
          width: "100%",

          // height: "100px",
          // backgroundColor: "black",
        }}
      >
        <div className="d-flex justify-content-center py-2 w-100">
          <Image
            src={data?.image}
            alt="image of the user"
            style={{ width: "30%", borderRadius: "50%" }}
          />
        </div>
        <h6 className="mt-2 text-center mb-0">
          {`${data?.name} ${data?.surname}`}
        </h6>
        <p className="text-muted text-center m-0" style={{ fontSize: "12px" }}>
          {data?.title}
        </p>
        {/* <div className="backgroundImg"> </div> */}
        <hr className="m-2" />
        <p className="text-muted m-0 hovering" style={{ fontSize: "11px" }}>
          Who viewd your profile
        </p>
        <div className="hovering">
          <p className="text-muted m-0" style={{ fontSize: "11px" }}>
            Connections
          </p>
          <p className="m-0" style={{ fontSize: "11px" }}>
            Grow your network
          </p>
        </div>
        <hr className="m-2" />
        <div className="hovering">
          <p className="m-0 text-muted" style={{ fontSize: "10px" }}>
            Access exclusive tools &amp; insights
          </p>
          <h6 className="m-0 " style={{ fontSize: "12px" }}>
            <img
              src="https://28.cdn.ekm.net/ekmps/shops/simplycoatings2/images/axalta-ral-1007-chrome-yellow-polyester-80-gloss-powder-coating-20kg-box--1326-p.jpg?v=1"
              alt="get hired "
              width="10px"
              height="10px"
              style={{ margin: "2px" }}
            />
            Get Hired Faster, Try Premium Free
          </h6>
        </div>
        <p className="mb-0 p-1 hovering" style={{ fontSize: "13px" }}>
          <i className="fas fa-bookmark pr-1"></i>
          My items
        </p>
      </div>
      <div style={{ width: "100%" }} className="componentOnLeftSide pt-2 mt-3">
        <p className="mb-0 px-3 py-1 hovering" style={{ fontSize: "11px" }}>
          Groups
        </p>
        <p className="mb-0 px-3 py-1 " style={{ fontSize: "11px" }}>
          Events
        </p>
        <p className="mb-0 px-3 py-1 " style={{ fontSize: "11px" }}>
          Followed Hashtags
        </p>
        <hr className="m-2" />
        <p
          className="m-0 text-muted hovering text-center pb-1"
          style={{ fontSize: "13px" }}
        >
          Discover more
        </p>
      </div>
    </>
  );
};

export default LeftComponent;
