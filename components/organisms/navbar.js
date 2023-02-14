/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "../../styles/pages/navbarStyle.module.scss";
import Link from "next/link";

export default function navbar() {
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
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          Modal title
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">...</div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Understood
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            {/* BUTTON SHOPPING LOGIN AND REGISTER */}
            <form className={`d-flex ${style.auth}`} role="search">
              <img
                className={style.shopping}
                src="/images/shopping.webp"
                alt="icon-navbar"
              />
              <Link
                href={"/auth/login/customer"}
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
          </div>
        </nav>
      </nav>
    </div>
  );
}
