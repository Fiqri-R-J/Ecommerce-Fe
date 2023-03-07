/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "@/styles/pages/cardCheckoutStyle.module.scss";
import Link from "next/link";

export default function cardSelectProduct(props) {
  const { img, selectedProductName, selectedQty, brand, totalPrice } = props;
  return (
    <div>
      <div
        className={`shadow-sm py-4 px-1 border mt-3 ${style.product}`}
        style={{ width: "100%" }}>
        <div className="row">
          {/* PHOTO PRODUCT */}
          <div className="col-2">
            <div class="form-check d-flex align-items-center">
              <label className="form-check-label d-inline-block">
                <img
                  className={`${style.icon}`}
                  src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${img}`}
                  alt="icon-navbar"
                />
              </label>
            </div>
          </div>
          {/* PRODUCT NAME */}
          <div className={`col-4 mt-1 ${style.productName}`}>
            <h5>
              {selectedProductName} -{" "}
              <span style={{ color: "#9B9B9B" }}>({selectedQty} item)</span>
            </h5>
            <p>{brand}</p>
          </div>
          {/* TOTAL */}
          <div className={`col-3`}></div>
          {/* TOTAL PRICE */}
          <div
            className={`col-2 offset-1 d-flex align-items-center ${style.totalPrice}`}>
            <h5 className="text-end">Rp{totalPrice}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
