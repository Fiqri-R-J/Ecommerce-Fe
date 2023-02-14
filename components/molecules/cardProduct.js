/* eslint-disable @next/next/no-img-element */
import React from 'react'
import style from "@/styles/pages/homeStyle.module.scss";
import Link from "next/link";

export default function cardProduct() {
  return (
    <div>
      <Link href={"/"} className={`card shadow ${style.card}`}>
        <img
          src="/images/product.webp"
          className={`card-img-top ${style.imgProduct}`}
          alt="image-product"
        />
        <div className="card-body pb-0">
          <h5 className={`card-title ${style.cardTitle}`}>
            Mens formal suit - Black & White
          </h5>
          <h5 className={`${style.price}`}>$ 40.0</h5>
          <p className={`${style.shopName}`}>Zalora Cloth</p>
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
