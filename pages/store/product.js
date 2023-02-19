import React from "react";
import Sidebar from "../../components/organisms/sidebar";
import Navbar from "@/components/organisms/navbar";
import style from "../../styles/pages/homeStyle.module.scss";

export default function product() {
  return (
    <div>
      <nav
        className={`container-fluid sticky-sm-top shadow py-2 ${style.containerNavbar}`}
      >
        <Navbar />
      </nav>
      <div className="product mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col-7">
              <div className="card text-start">
                <div className="card-body">
                  <h5 className="card-title">My product</h5>
                  <ul className="nav">
                    <li className="nav-item">
                      <a
                        className="nav-link active border-bottom border-3"
                        aria-current="page"
                        href="#"
                      >
                        Active
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Link
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Link
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled">Disabled</a>
                    </li>
                  </ul>
                  <hr />
                  <div className="input-group mb-3 rounded-pill">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                    >
                      Button
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      col="2"
                    />
                  </div>
                  <div className="card text-start">
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                          </tr>
                        </thead>
                      </table>
                      <img
                        src="../../images/product.png"
                        className="mx-auto d-block"
                        alt="product"
                      />
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
