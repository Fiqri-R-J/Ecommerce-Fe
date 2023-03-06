/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "@/styles/pages/myBagStyle.module.scss";
import Link from "next/link";

export default function cardSelectProduct(props) {
  const {
    img,
    selectedProductName,
    selectedColor,
    selectedSize,
    brand,
    total,
    price,
    handleOnIncrease,
    handleOnDecrease,
    childChecked,
    handleChildChange,
  } = props;
  return (
    <div>
      <div
        className={`shadow-sm py-4 px-4 border mt-3 ${style.product}`}
        style={{ width: "100%" }}>
        <div className="row">
          {/* PHOTO PRODUCT */}
          <div className="col-2">
            <div class="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                // checked={selectedAll}
                // onClick={handleSelectAll}
                checked={childChecked}
                onChange={handleChildChange}
              />
              <label className="form-check-label d-inline-block">
                <img
                  className={`ms-3 ${style.icon}`}
                  src={img}
                  alt="icon-navbar"
                />
              </label>
            </div>
          </div>
          {/* PRODUCT NAME */}
          <div className={`col-4 mt-1 ${style.productName}`}>
            <h5>
              {selectedProductName} -{" "}
              <span style={{ color: "#9B9B9B" }}>{selectedColor} - </span>{" "}
              <span style={{ color: "#9B9B9B" }}>{selectedSize}</span>{" "}
            </h5>
            <p>{brand}</p>
          </div>
          {/* TOTAL */}
          <div className={`col-3`}>
            <nav aria-label="Page navigation example">
              <ul
                class="pagination"
                style={{ marginLeft: "80px", marginTop: "10px" }}>
                <li class="page-item">
                  <a
                    class="page-link border rounded-circle border-2"
                    aria-label="Previous"
                    style={{ borderRadius: "50px", borderColor: "black" }}
                    onClick={() => {
                      handleOnDecrease();
                    }}>
                    <span aria-hidden="true" style={{ color: "black" }}>
                      -
                    </span>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link border-0" style={{ color: "black" }}>
                    {total}
                  </a>
                </li>
                <li class="page-item">
                  <a
                    class="page-link border rounded-circle border-2"
                    aria-label="Next"
                    onClick={() => {
                      handleOnIncrease();
                    }}>
                    <span aria-hidden="true" style={{ color: "black" }}>
                      +
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* TOTAL PRICE */}
          <div
            className={`col-2 offset-1 d-flex align-items-center ${style.totalPrice}`}>
            <h5 className="text-end">Rp{price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
