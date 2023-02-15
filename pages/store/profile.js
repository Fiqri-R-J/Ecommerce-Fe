import React from "react";

export default function profile() {
  return (
    <div>
      <div className="profile">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div class="row justify-content-center align-items-center g-2">
                <div class="col">
                  {" "}
                  <img
                    src="../../images/profile.png"
                    alt="profile"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div class="col">
                  <p className="text">Johanes Mikael</p>
                  <span>ubah profile</span>
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{ backgroundColor: "#F5F5F5", width: "100%" }}
            >
              <div className="container">
                <div class="card">
                  <div class="card-body">
                    <h5>My Profile Store</h5>
                    <p>Manage your profile information</p>
                    <hr />
                    <div class="row g-3 align-items-center">
                      <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label">
                          Password
                        </label>
                      </div>
                      <div class="col-auto">
                        <input
                          type="password"
                          id="inputPassword6"
                          class="form-control"
                          aria-describedby="passwordHelpInline"
                        />
                      </div>
                      <div class="col-auto">
                        <span id="passwordHelpInline" class="form-text">
                          Must be 8-20 characters long.
                        </span>
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
