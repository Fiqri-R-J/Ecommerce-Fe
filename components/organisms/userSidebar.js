import React from "react";
import Link from "next/link";
import style from "../../styles/pages/sidebarStyle.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillPencilFill, BsShop, BsCart2 } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";

export const getServerSideProps = async (context) => {
  const token = getCookie("token", context) || "";
  const profile = getCookie("profile", context) || "";

  return {
    props: {
      token,
      profile,
    },
  };
};
export default function sidebar(props) {
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState("");
  const [getProfilePict, setGetProfilePict] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setGetToken(token);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGetData(response.data.data);
        let temp = response.data.data.profile_picture.includes("https");
        if (temp) {
          setGetProfilePict(response.data.data.profile_picture);
        } else {
          let temps = `https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${response.data.data.profile_picture}`;
          setGetProfilePict(temps);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  // console.log("getData----", getData);
  // console.log("getProfilePict---", getProfilePict);
  return (
    <div>
      <div className="sidebarInfo d-flex align-items-center">
        <img
          src={getProfilePict}
          className={`${style.profile}`}
          alt="profile"
        />
        <div className="info ms-4">
          <h6>{getData?.username}</h6>
          <Link
            href="/"
            className="link-secondary"
            style={{ textDecoration: "none" }}>
            {" "}
            <small>
              <BsFillPencilFill /> <span>Ubah profile</span>
            </small>
          </Link>
        </div>
      </div>
      <div className="store mt-5 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#456BF3",
          }}>
          <AiOutlineUser className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 link-dark"
          href="/user/profile"
          role="button"
          style={{ textDecoration: "none" }}>
          My Account
        </Link>
      </div>
      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F36F45",
          }}>
          <CiLocationOn className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 link-dark"
          href="/user/address"
          role="button"
          style={{ textDecoration: "none" }}>
          Shipping Address
        </Link>
      </div>
      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F3456F",
          }}>
          <BsCart2 className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 link-dark"
          href="/user/order"
          role="button"
          style={{ textDecoration: "none" }}>
          My Order
        </Link>
      </div>
      {getData?.seller_id ? (
        <div className="product mt-3 d-flex align-items-center">
          <div
            className={`${style.bgIcon}`}
            style={{
              backgroundColor: "#DB3022",
            }}>
            <BsShop className={`${style.icon}`} size={100} />
          </div>
          <Link
            className="ms-3 link-dark"
            href="/store/profile"
            role="button"
            style={{ textDecoration: "none" }}>
            Shop
          </Link>
        </div>
      ) : null}
    </div>
  );
}
