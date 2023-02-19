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

export default function profile(props) {
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
                  <div className="row">
                    <div className="col-8">
                      <form class="row 3 mb-3">
                        <div class="col-4">
                          <p>Name</p>
                        </div>
                        <div class="col">
                          <label for="inputName" className="visually-hidden">
                            Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputStoreName"
                            placeholder={profiles.username ?? "Name"}
                          />
                        </div>
                      </form>
                      <form class="row 3 mb-3">
                        <div class="col-4">
                          <p>Email</p>
                        </div>
                        <div class="col">
                          <label for="inputName" className="visually-hidden">
                            Email
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="inputStoreName"
                            placeholder={profiles.email ?? "Email"}
                          />
                        </div>
                      </form>
                      <form class="row 3 mb-3">
                        <div class="col-4">
                          <p>Phone Number</p>
                        </div>
                        <div class="col">
                          <label
                            for="inputPhoneNumber"
                            className="visually-hidden"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputPhoneNumber"
                            placeholder={profiles.phoneNumber ?? "Phone Number"}
                          />
                        </div>
                      </form>
                      <form class="row 3 mb-3">
                        <div class="col-4">
                          <p>Gender</p>
                        </div>
                        <div className="col-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Laki-Laki
                            </label>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault2"
                            >
                              perempuan
                            </label>
                          </div>
                        </div>
                      </form>
                      <div className="col-6 offset-4">
                        <Link
                          href={""}
                          type="button"
                          className={`btn btn-primary me-3 ${style.save}`}
                        >
                          Save
                        </Link>
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
                          src={
                            profiles?.profilePicture.includes("https")
                              ? "https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/ecommerce/blank-profile_yiwpyy.png"
                              : `https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${profiles.profilePicture}`
                          }
                          alt="store"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
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
