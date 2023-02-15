/* eslint-disable jsx-a11y/alt-text */
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
                            <div className={`${style.optionColor}`}>
                              <button
                                type="button"
                                className={`btn rounded-circle`}
                                style={{ backgroundColor: "black" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              ></button>
                              <button
                                type="button"
                                className={`btn rounded-circle shadow-sm border border-2`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              ></button>
                              <button
                                type="button"
                                className={`btn rounded-circle`}
                                style={{ backgroundColor: "#B82222" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              ></button>
                              <button
                                type="button"
                                className={`btn rounded-circle`}
                                style={{ backgroundColor: "#BEA9A9" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              ></button>
                              <button
                                type="button"
                                className={`btn rounded-circle`}
                                style={{ backgroundColor: "#E2BB8D" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              ></button>
                              <button
                                type="button"
                                className={`btn rounded-circle`}
                                style={{ backgroundColor: "#151867" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              ></button>
                            </div>
                          </div>
                        </div>
                        {/* SIZE */}
                        <div className=" border-bottom py-4">
                          <div className={`${style.sizes}`}>
                            <h5 className={`${style.titleSizes}`}>Sizes</h5>
                            <div className={`${style.optionSizes}`}>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                <p>XS</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                S
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                M
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                L
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
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
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                <p>All</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                <p>Women</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                <p>Men</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                <p>Boys</p>
                              </button>
                              <button
                                type="button"
                                className={`btn rounded-3`}
                                style={{ backgroundColor: "white" }}
                                // onClick={() => {
                                //   setPaymentSelected("visa");
                                // }}
                              >
                                <p>Girls</p>
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
                          data-bs-dismiss="modal"
                        >
                          Discard
                        </button>
                        <button
                          type="button"
                          className={`btn btn-secondary ${style.btnApply}`}
                          data-bs-dismiss="modal"
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
