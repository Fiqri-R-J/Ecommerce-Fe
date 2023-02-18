import Navbar from "@/components/organisms/navbar";
import React from "react";
import Sidebar from "../../components/organisms/sidebar";
import style from "../../styles/pages/homeStyle.module.scss";

export default function profile() {
  return (
    <div>
      <nav
        className={`container-fluid sticky-sm-top shadow py-2 ${style.containerNavbar}`}
      >
        <Navbar />
      </nav>
      <div className="profile mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col">
              <div class="card">
                <div class="card-body">
                  <h5>My profile store</h5>
                  <p className="text-body-secondary">text-body-secondary</p>
                  <hr />
                  <div className="row">
                    <div className="col-8">
                      <form class="row 3">
                        <div class="col-4">
                          <p>Store name</p>
                        </div>
                        <div class="col">
                          <label for="inputStoreName" class="visually-hidden">
                            Password
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputStoreName"
                            placeholder="Store Name"
                          />
                        </div>
                      </form>
                      <form class="row mt-3">
                        <div class="col-4">
                          <p>Store description</p>
                        </div>
                        <div class="col">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            row="4"
                          ></textarea>
                        </div>
                      </form>
                      <div className="col-6 offset-4 mt-3">
                        <button
                          type="button"
                          class=" btn badge rounded-pill text-bg-danger"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="col-1">
                      <div
                        className="verline ms-4"
                        style={{
                          borderLeft: "5px solid #D4D4D4",
                          height: "200px",
                          left: "50%",
                          marginLeft: "-3px",
                          top: "0",
                        }}
                      ></div>
                    </div>
                    <div className="col-3">
                      <div className="imgStore">
                        <img
                          src="../../images/profile.png"
                          alt="store"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                          }}
                        />
                        <button
                          type="button"
                          class="btn badge rounded-pill text-bg-secondary mt-3"
                        >
                          Select Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
