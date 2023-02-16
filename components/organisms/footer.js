/* eslint-disable @next/next/no-img-element */
import React from 'react'
import style from "../../styles/pages/footerStyle.module.scss";

export default function footer() {
  return (
    <div className={style.main}>
      <footer className={`container-fluid ${style.footer}`}>
        <div className={`container ${style.container}`}>
          <div className={`row`}>
            <div className={`col-12  ${style.foot}`}>
              <img src="/images/icon-app3.webp" alt="icon-footer" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
          </div>
          <div className={`row ${style.copyright}`}>
            <div className={`col-4 p-0 mt-3`}>
              <p>2023 Blanja. All right reserved</p>
            </div>
            <div className="col-2 offset-6 mt-3">
              <p className="d-inline">Home</p>
              <p className="d-inline ms-5">MyBag</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
