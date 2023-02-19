import Navbar from "@/components/organisms/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "../../components/organisms/userSidebar";
import style from "../../styles/pages/homeStyle.module.scss";

export default function order() {
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
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">All items</th>
                        <th scope="col">Not yet paid</th>
                        <th scope="col">Packed</th>
                        <th scope="col">Sent</th>
                        <th scope="col">Completed</th>
                        <th scope="col">Order cancel</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
