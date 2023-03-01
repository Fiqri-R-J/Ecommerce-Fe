import React from "react";
import Sidebar from "../../components/organisms/sidebar";
import Navbar from "@/components/organisms/navbar";
import style from "../../styles/pages/homeStyle.module.scss";
import Link from "next/link";

export default function selling() {
  return (
    <div>
      <nav
        className={`container-fluid sticky-sm-top shadow py-2 ${style.containerNavbar}`}
      >
        <Navbar />
      </nav>
      <div className="selling mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col-8">
              <div className="card text-start  mb-4">
                <div className="card-body">
                  <h5 className="card-title">Inventory</h5>
                  <hr />
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label for="" className="form-label">
                          <small id="helpId" className="form-text text-muted">
                            Name of goods
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="nameOfGoods"
                          id="nameOfGoods"
                          aria-describedby="helpId"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card text-start  mb-4">
                <div className="card-body">
                  <h5 className="card-title">Items detail</h5>
                  <hr />
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-2">
                        <label for="" className="form-label">
                          <small id="helpId" className="form-text text-muted">
                            Unit Price
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="unitPrice"
                          id="unitPrice"
                          aria-describedby="helpId"
                          placeholder=""
                        />
                      </div>
                      <div className="mb-2">
                        <label for="" className="form-label">
                          <small id="helpId" className="form-text text-muted">
                            Stock
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="stock"
                          id="stock"
                          aria-describedby="helpId"
                          placeholder=""
                        />
                      </div>
                      <div className="mb-2">
                        <label for="" className="form-label">
                          <small id="helpId" className="form-text text-muted">
                            Stock
                          </small>
                        </label>
                        <div className="row">
                          <div className="col-auto">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                className="form-check-label"
                                for="flexRadioDefault1"
                              >
                                Baru
                              </label>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                checked
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault2"
                              >
                                Bekas
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card text-start  mb-4">
                <div className="card-body">
                  <h5 className="card-title">Photo of goods</h5>
                  <hr />
                  <label for="formFileMultiple" class="form-label"></label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFileMultiple"
                    multiple
                  />
                </div>
              </div>
              <div className="card text-start  mb-4">
                <div className="card-body">
                  <h5 className="card-title">Description</h5>
                  <hr />
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-6 mt-3 mb-5">
                <Link
                  href={""}
                  type="button"
                  className={`btn btn-primary me-3 ${style.save}`}
                >
                  Jual
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
