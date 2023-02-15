/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "@/styles/pages/myBagStyle.module.scss";
import Link from "next/link";

export default function cardSelectProduct() {
  return (
    <div>
      <div
        className={`shadow-sm py-4 px-4 border mt-3 ${style.product}`}
        style={{ width: "100%" }}
      >
        <div className="row">
          {/* PHOTO PRODUCT */}
          <div className="col-2">
            <div class="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
              />
              <label className="form-check-label d-inline-block">
                <img
                  className={`ms-3 ${style.icon}`}
                  src="/images/product.webp"
                  alt="icon-navbar"
                />
              </label>
            </div>
          </div>
          {/* PRODUCT NAME */}
          <div className={`col-4 mt-1 ${style.productName}`}>
            <h5>Mens formal suit - Black</h5>
            <p>Zalora Cloth</p>
          </div>
          {/* TOTAL */}
          <div className={`col-3`}></div>
          {/* TOTAL PRICE */}
          <div
            className={`col-2 offset-1 d-flex align-items-center ${style.totalPrice}`}
          >
            <h5 className="text-end">$ 20.0</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
