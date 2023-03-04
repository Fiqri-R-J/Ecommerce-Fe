/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "@/styles/pages/cardProductStyle.module.scss";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function cardProduct(props) {
  const { img, productName, price, storeName, avgReview } = props;
  return (
    <div>
      <div className={`card shadow ${style.card}`}>
        <img
          src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${img}`}
          className={`card-img-top ${style.imgProduct}`}
          alt="image-product"
        />
        <div className="card-body pb-0">
          <h5 className={`card-title ${style.cardTitle}`}>{productName}</h5>
          <h5 className={`${style.price}`}>Rp.{price}</h5>
          <p className={`${style.shopName}`}>{storeName}</p>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="read-only"
              value={avgReview}
              precision={0.01}
              readOnly
              size="small"
            />
            <Typography
              component="legend"
              style={{ marginLeft: "8px", color: "#9B9B9B" }}>
              {avgReview}
            </Typography>
          </div>

          {/* <img
            src="/images/Rating.webp"
            className={`${style.rating}`}
            alt="image-product"
          /> */}
        </div>
      </div>
    </div>
  );
}
// avg_review
