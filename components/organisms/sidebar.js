import React from "react";
import Link from "next/link";
import style from "../../styles/pages/sidebarStyle.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillPencilFill, BsBoxSeam, BsCart2 } from "react-icons/bs";

export default function sidebar() {
  return (
    <div>
      <div className="sidebarInfo d-flex align-items-center">
        <img
          src="../../images/profile.png"
          className={`${style.profile}`}
          alt="profile"
        />
        <div className="info ms-4">
          <h6>Johanes Mikael</h6>
          <Link
            href="/"
            className="link-secondary"
            style={{ textDecoration: "none" }}
          >
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
          }}
        >
          <AiOutlineHome className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 dropdown-toggle link-dark"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ textDecoration: "none" }}
        >
          Store
        </Link>

        <ul className="dropdown-menu">
          <li>
            <Link class="dropdown-item" href="/store/profile">
              Store Profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F36F45",
          }}
        >
          <BsBoxSeam className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 dropdown-toggle link-dark"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ textDecoration: "none" }}
        >
          Product
        </Link>

        <ul className="dropdown-menu">
          <li>
            <Link class="dropdown-item" href="/store/product">
              My Product
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" href="/store/selling">
              Selling Product
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F3456F",
          }}
        >
          <BsCart2 className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 dropdown-toggle link-dark"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ textDecoration: "none" }}
        >
          Order
        </Link>

        <ul className="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#">
              Store Profile
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
