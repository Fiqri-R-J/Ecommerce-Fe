/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "../../styles/pages/navbarStyle.module.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { AiOutlineBell, AiOutlineShoppingCart } from "react-icons/ai";
import { BsEnvelope } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { deleteDataCheckout } from "@/store/reducer/checkout";
import { deleteAuthData } from "@/store/reducer/auth";
import cookieParser from "cookie-parser";
import axios from "axios";

export default function navbar({
  setSearchAndFilter,
  setNavbar,
  setEvent,
  setEventSearch,
  setColors,
  setSizes,
  setCategories,
  setBrands,
  setDataNull,
}) {
  const router = useRouter();
  //REDUX
  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState("");
  const [getProfilePict, setGetProfilePict] = React.useState(null);
  const [size, setSize] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [keyword, setKeyword] = React.useState("");
  const [product, setProduct] = React.useState([]);
  const [filterColor, setFilterColor] = React.useState("");
  const [filterSize, setFilterSize] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("");
  const [filterBrand, setFilterBrand] = React.useState("");
  const [allBrand, setAllBrand] = React.useState([]);

  // GET ALL BRAND
  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/?allBrand=true`)
      .then(({ data }) => {
        const brand = JSON.parse(data?.data);
        setAllBrand(brand);
        // console.log(data?.data)
      })
      .catch(() => {
        // setProduct([]);
      });
  }, []);

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

  // FEATURE SEARCH PRODUCT
  const fetchByKeyword = () => {
    if (keyword && keyword !== "") {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${keyword}`)
        .then(({ data }) => {
          setSearchAndFilter(data?.data);
          setNavbar(true);
          setDataNull(false);
          setKeyword("");
          // setColors("");
          // setSizes("");
          // setCategories("");
          // setBrands("");
          // setTotalPage(0);
        })
        .catch((err) => {
          setSearchAndFilter([]);
          setDataNull(true);
          setNavbar(true);
          setKeyword("");
          // setColors("");
          // setSizes("");
          // setCategories("");
          // setBrands("");
          // console.log(err)
        });
      // .finally(() => setIsLoading(false));
    } else {
      setNavbar(false);
    }
  };

  // FEATURE FILTER PRODUCT
  const productByCategory = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/?page=1&limit=12&sizeFilter=${filterSize}&colorFilter=${filterColor}&categoryFilter=${filterCategory}&brandFilter=${filterBrand}`
      )
      .then(({ data }) => {
        if (data?.data.length >= 1) {
          setSearchAndFilter(data?.data);
          setNavbar(true);
          setDataNull(false);
          setEventSearch("");
          // setFilterColor("");
          // setSize("")
          // setCategory("")
          // setFilterBrand("")
        } else {
          setDataNull(true);
        }
        console.log(data?.data.length);
        // setTotalPage(0);
      })
      .catch((err) => {
        setSearchAndFilter([]);
        setDataNull(true);
        setNavbar(true);
        setEventSearch("");
        // console.log(err);
      });
    // .finally(() => setIsLoading(false));
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
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ms-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto">
              {/* SEARCH */}
              <li className="nav-item mt-2">
                <input
                  type="text"
                  className={`form-control ${style.search}`}
                  placeholder="Search"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setEventSearch(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchByKeyword();
                      setEvent("Search");
                    }
                  }}
                />
              </li>
              {/* SORT */}
              <li className="nav-item">
                <button
                  type="button"
                  className="mt-1 ms-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{ backgroundColor: "white", border: "none" }}
                >
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
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable shadow-lg">
                    <div className={`modal-content ${style.modal}`}>
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close me-2"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                        <h1
                          className={`modal-title ${style.titleModal}`}
                          id="staticBackdropLabel"
                        >
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
                              onChange={(e) => {
                                setFilterColor(e.target.value);
                                setColors(e.target.value);
                              }}
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
                                  size === "xs"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setSize("xs");
                                  setFilterSize("XS");
                                  setSizes("XS");
                                }}
                              >
                                <p>XS</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  size === "s" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setSize("s");
                                  setFilterSize("S");
                                  setSizes("S");
                                }}
                              >
                                S
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  size === "m" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setSize("m");
                                  setFilterSize("M");
                                  setSizes("M");
                                }}
                              >
                                M
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  size === "l" ? `${style.paymentSelected}` : ""
                                }`}
                                onClick={() => {
                                  setSize("l");
                                  setFilterSize("L");
                                  setSizes("L");
                                }}
                              >
                                L
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  size === "xl"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setSize("xl");
                                  setFilterSize("XL");
                                  setSizes("XL");
                                }}
                              >
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
                                  category === "T-shirt"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("T-shirt");
                                  setFilterCategory("tshirt");
                                  setCategories("T-Shirt");
                                }}
                              >
                                <p>T-shirt</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  category === "Shirt"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("Shirt");
                                  setFilterCategory("shirt");
                                  setCategories("Shirt");
                                }}
                              >
                                <p>Shirt</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  category === "Shorts"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("Shorts");
                                  setFilterCategory("shorts");
                                  setCategories("Shorts");
                                }}
                              >
                                <p>Shorts</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  category === "outwear"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("outwear");
                                  setFilterCategory("outwear");
                                  setCategories("Outwear");
                                }}
                              >
                                <p>Outwear</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  category === "pants"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("pants");
                                  setFilterCategory("pants");
                                  setCategories("Pants");
                                }}
                              >
                                <p>pants</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  category === "footwear"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("footwear");
                                  setFilterCategory("footwear");
                                  setCategories("Footwear");
                                }}
                              >
                                <p>footwear</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  category === "bag"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("bag");
                                  setFilterCategory("bag");
                                  setCategories("Bag");
                                }}
                              >
                                <p>bag</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3 ${
                                  category === "headwear"
                                    ? `${style.paymentSelected}`
                                    : ""
                                }`}
                                onClick={() => {
                                  setCategory("headwear");
                                  setFilterCategory("headwear");
                                  setCategories("Headwear");
                                }}
                              >
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
                                className="form-select btn-group dropup"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setFilterBrand(e.target.value);
                                  setBrands(e.target.value);
                                }}
                              >
                                <option selected disabled>
                                  Brand
                                </option>
                                {allBrand.map((item, key) => (
                                  <option value={item} key={key}>
                                    {item}
                                  </option>
                                ))}
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
                          onClick={() => {
                            setSize("");
                            setCategory("");
                          }}
                        >
                          Discard
                        </button>
                        <button
                          type="button"
                          className={`btn btn-secondary ${style.btnApply}`}
                          data-bs-dismiss="modal"
                          onClick={() => {
                            productByCategory();
                            setEvent("Filter");
                          }}
                        >
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
                  className={`btn btn-primary me-3 ${style.btnLogin}`}
                >
                  Login
                </Link>
                <Link
                  href={"/auth/register/customer"}
                  className={`btn btn-outline-primary ${style.btnSignup}`}
                >
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
