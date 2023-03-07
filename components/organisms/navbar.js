/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "../../styles/pages/navbarStyle.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { AiOutlineBell, AiOutlineShoppingCart } from "react-icons/ai";
import { BsEnvelope } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { deleteDataCheckout } from "@/store/reducer/checkout";
import { deleteAuthData } from "@/store/reducer/auth";
import cookieParser from "cookie-parser";
import axios from "axios";

export default function navbar() {
  const router = useRouter();
  //REDUX
  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState("");
  const [getProfilePict, setGetProfilePict] = React.useState(null);
  const [xs, setXs] = React.useState(null);
  const [s, setS] = React.useState(null);
  const [m, setM] = React.useState(null);
  const [l, setL] = React.useState(null);
  const [xl, setXl] = React.useState(null);
  const [tshirt, setTshirt] = React.useState(null);
  const [shirt, setShirt] = React.useState(null);
  const [shorts, setShorts] = React.useState(null);
  const [outwear, setOutwear] = React.useState(null);
  const [pants, setPants] = React.useState(null);
  const [footwear, setFootwear] = React.useState(null);
  const [bag, setBag] = React.useState(null);
  const [headwear, setHeadwear] = React.useState(null);

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
        setIsAuth(true);
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

  // console.log("getData", getData);

  const handleLogout = () => {
    deleteCookie("profile");
    deleteCookie("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    dispatch(deleteDataCheckout());
    dispatch(deleteAuthData());
    // window.location.reload();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleSignup = () => {
    router.push("/auth/register");
  };
  return (
    <div className={`container ${style.main}`}>
      <nav className={`${style.navbar}`}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex align-items-center">
          {/* ICON */}
          <img
            className={style.icon}
            src="/images/icon-app.webp"
            alt="icon-navbar"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ms-5"
            id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              {/* SEARCH */}
              <li className="nav-item mt-2">
                <input
                  type="text"
                  className={`form-control ${style.search}`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Search"
                />
              </li>
              {/* SORT */}
              <li className="nav-item">
                <button
                  type="button"
                  className="mt-1 ms-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{ backgroundColor: "white", border: "none" }}>
                  <img
                    className={style.sort}
                    src="/images/Search Field.png"
                    alt="icon-navbar"
                  />
                </button>
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable shadow-lg">
                    <div className={`modal-content ${style.modal}`}>
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close me-2"
                          data-bs-dismiss="modal"
                          aria-label="Close"></button>
                        <h1
                          className={`modal-title ${style.titleModal}`}
                          id="staticBackdropLabel">
                          Filter
                        </h1>
                      </div>
                      {/* BODY */}
                      <div className="modal-body">
                        {/* COLORS */}
                        <div className=" border-bottom pb-4">
                          <div className={`${style.colors}`}>
                            <h5 className={`${style.titleColor}`}>Colors</h5>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              // onChange={(e) => {
                              //   fetchBySort(e.target.value);
                              // }}
                            >
                              <option selected disabled>
                                Color
                              </option>
                              <option value="black">Black</option>
                              <option value="white">White</option>
                              <option value="red">Red</option>
                              <option value="gray">Gray</option>
                              <option value="cream">Cream</option>
                              <option value="blue">Blue</option>
                            </select>
                          </div>
                        </div>
                        {/* SIZE */}
                        <div className=" border-bottom py-4">
                          <div className={`${style.sizes}`}>
                            <h5 className={`${style.titleSizes}`}>Sizes</h5>
                            <div className={`${style.optionSizes}`}>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  xs === "xs" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setXs("xs");
                                }}>
                                <p>XS</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  s === "s" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setS("s");
                                }}>
                                S
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  m === "m" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setM("m");
                                }}>
                                M
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  l === "l" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setL("l");
                                }}>
                                L
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  xl === "xl" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setXl("xl");
                                }}>
                                <p style={{ marginLeft: "-1px" }}>XL</p>
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* CATEGORY */}
                        <div className=" border-bottom pt-4">
                          <div className={`${style.category}`}>
                            <h5 className={`${style.titleCategory}`}>
                              Category
                            </h5>
                            <div className={`${style.optionCategory}`}>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  tshirt === "T-shirt"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setTshirt("T-shirt");
                                }}>
                                <p>T-shirt</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  shirt === "Shirt"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setShirt("Shirt");
                                }}>
                                <p>Shirt</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  shorts === "Shorts"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setShorts("Shorts");
                                }}>
                                <p>Shorts</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  outwear === "outwear"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setOutwear("outwear");
                                }}>
                                <p>Outwear</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  pants === "pants"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setPants("pants");
                                }}>
                                <p>pants</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  footwear === "footwear"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setFootwear("footwear");
                                }}>
                                <p>footwear</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  bag === "bag"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setBag("bag");
                                }}>
                                <p>bag</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  headwear === "headwear"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setHeadwear("headwear");
                                }}>
                                <p>headwear</p>
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* BRAND */}
                        <div className="py-4">
                          <div className={`${style.brand}`}>
                            <h5 className={`${style.titleBrand}`}>Brand</h5>
                            <div className={`${style.optionBrand}`}>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                // onChange={(e) => {
                                //   fetchBySort(e.target.value);
                                // }}
                              >
                                <option selected disabled>
                                  Brand
                                </option>
                                <option value="name_asc">
                                  Adidas Originals
                                </option>
                                <option value="name_desc">Jack & Jones</option>
                                <option value="release_asc">s.Oliver</option>
                                <option value="release_desc">Gucci</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* FOOTER AND BUTTON */}
                      <div className={`modal-footer ${style.btnFooter}`}>
                        <button
                          type="button"
                          className={`btn btn-outline-primary ${style.btnDiscard}`}
                          data-bs-dismiss="modal">
                          Discard
                        </button>
                        <button
                          type="button"
                          className={`btn btn-secondary ${style.btnApply}`}
                          data-bs-dismiss="modal">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            {/* BUTTON SHOPPING LOGIN AND REGISTER */}
            {isAuth ? (
              <form className={`d-flex ${style.auth}`} role="search">
                <Link href={"/bag/my-bag"}>
                  <img
                    className={style.shopping}
                    src="/images/shopping.webp"
                    alt="icon-navbar"
                  />
                </Link>
                <div className="dropdown-center">
                  <img
                    className={style.shopping}
                    src="/images/bell.png"
                    alt="icon-navbar"
                    role="button"
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        <img src="/images/notification.png" alt="icon-navbar" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown-center">
                  <img
                    className={style.shopping}
                    src="/images/mail.png"
                    alt="icon-navbar"
                    role="button"
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Action two
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Action three
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="nav-item dropdown-center">
                  <img
                    src={getProfilePict}
                    width="40px"
                    height="40px"
                    style={{
                      objectFit: "cover",
                      borderRadius: " 50%",
                    }}
                    alt="profile"
                    className="mx-auto d-block nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu">
                    <li>
                      <Link href={"/user/profile"}>
                        <div className="dropdown-item">Profile</div>
                      </Link>
                    </li>
                    <li>
                      <div className="dropdown-item" onClick={handleLogout}>
                        logout
                      </div>
                    </li>
                  </ul>
                </div>
              </form>
            ) : (
              <form className={`d-flex ${style.auth}`} role="search">
                <Link href={"/bag/my-bag"}>
                  <img
                    className={style.shopping}
                    src="/images/shopping.webp"
                    alt="icon-navbar"
                  />
                </Link>
                <Link
                  href={"/auth/login"}
                  type="button"
                  className={`btn btn-primary me-3 ${style.btnLogin}`}>
                  Login
                </Link>
                <Link
                  href={"/auth/register/customer"}
                  className={`btn btn-outline-primary ${style.btnSignup}`}>
                  Signup
                </Link>
              </form>
            )}
          </div>
        </nav>
      </nav>
    </div>
  );
}
