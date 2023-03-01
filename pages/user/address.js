import Navbar from "@/components/organisms/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "../../components/organisms/userSidebar";
import style from "../../styles/pages/homeStyle.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

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

export default function address(props) {
  //const token = props.token;
  const profile = props.profile;
  //console.log(JSON.parse(token));
  //console.log(JSON.parse(profile));

  const [profiles, setProfiles] = React.useState(JSON.parse(profile));
  console.log(profiles[0]);
  console.log("tes");
  console.log(profiles);

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
                  <h5>My profile</h5>
                  <p className="text-body-secondary">
                    Manage your profile information
                  </p>
                  <hr />
                  <div className="border border-success p-2 mb-4 text-center p-3">
                    <h3 data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Add New Address
                    </h3>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1
                              class="modal-title fs-5 text-center"
                              id="exampleModalLabel"
                            >
                              Add new address
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form class="row g-3 needs-validation" novalidate>
                              <div class="col-md-4">
                                <label
                                  for="validationCustom01"
                                  class="form-label"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="validationCustom01"
                                  value="Mark"
                                  required
                                />
                                <div class="valid-feedback">Looks good!</div>
                              </div>
                              <div class="col-md-4">
                                <label
                                  for="validationCustom02"
                                  class="form-label"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="validationCustom02"
                                  value="Otto"
                                  required
                                />
                                <div class="valid-feedback">Looks good!</div>
                              </div>
                              <div class="col-md-4">
                                <label
                                  for="validationCustomUsername"
                                  class="form-label"
                                >
                                  Username
                                </label>
                                <div class="input-group has-validation">
                                  <span
                                    class="input-group-text"
                                    id="inputGroupPrepend"
                                  >
                                    @
                                  </span>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="validationCustomUsername"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                  />
                                  <div class="invalid-feedback">
                                    Please choose a username.
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <label
                                  for="validationCustom03"
                                  class="form-label"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="validationCustom03"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Please provide a valid city.
                                </div>
                              </div>
                              <div class="col-md-3">
                                <label
                                  for="validationCustom04"
                                  class="form-label"
                                >
                                  State
                                </label>
                                <select
                                  class="form-select"
                                  id="validationCustom04"
                                  required
                                >
                                  <option selected disabled value="">
                                    Choose...
                                  </option>
                                  <option>...</option>
                                </select>
                                <div class="invalid-feedback">
                                  Please select a valid state.
                                </div>
                              </div>
                              <div class="col-md-3">
                                <label
                                  for="validationCustom05"
                                  class="form-label"
                                >
                                  Zip
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="validationCustom05"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Please provide a valid zip.
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="invalidCheck"
                                    required
                                  />
                                  <label
                                    class="form-check-label"
                                    for="invalidCheck"
                                  >
                                    Agree to terms and conditions
                                  </label>
                                  <div class="invalid-feedback">
                                    You must agree before submitting.
                                  </div>
                                </div>
                              </div>
                              <div class="col-12">
                                <button class="btn btn-primary" type="submit">
                                  Submit form
                                </button>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-danger p-2 p-3">
                    <h5>Andreas Jane</h5>
                    <p>
                      Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja,
                      Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note:
                      blok c 16] Sokaraja, Kab. Banyumas, 53181
                    </p>
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
