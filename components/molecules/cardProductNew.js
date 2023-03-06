/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "@/styles/pages/cardProductStyle.module.scss";
import Link from "next/link";

export default function cardProduct(props) {
  const { img, productName, price, storeName } = props;
  return (
    <div>
      <Link href={"/product/test"} className={`card shadow ${style.card}`}>
        <img
          src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${img}`}
          className={`card-img-top ${style.imgProduct}`}
          alt="image-product"
        />
        <div className="card-body pb-0">
          <h5 className={`card-title ${style.cardTitle}`}>{productName}</h5>
          <h5 className={`${style.price}`}>Rp.{price}</h5>
          <p className={`${style.shopName}`}>{storeName}</p>
          <img
            src="/images/Rating.webp"
            className={`${style.rating}`}
            alt="image-product"
          />
        </div>
      </Link>
    </div>
  );
}
