/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "@/styles/pages/myBagStyle.module.scss";
import Link from "next/link";
import Navbar from "@/components/organisms/navbar";
import CardSelectProduct from "@/components/molecules/cardSelectProduct";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import * as checkoutRedux from "@/store/reducer/checkout";
//MUI
import { Card, CardContent, Modal, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const MyCard = styled(Card)({
  margin: "auto",
  marginTop: "10%",
  maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  padding: "25px",
  borderColor: "red",
});

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderColor: "red",
});

const MyButton = styled(Button)({
  borderRadius: "20px",
  marginTop: "20px",
  background: "#DB3022",
  color: "white",
  "&:hover": {
    background: "#DB2522",
    border: "none",
  },
});

export default function bag(props) {
  const [getCheckout, setGetCheckout] = React.useState([]);
  const [updatedCheckoutItems, setUpdatedCheckoutItems] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [isErr, setIsErr] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    const fetchCheckoutHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/detail/history`,
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          }
        );

        setGetCheckout(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCheckoutHistory();
  }, []);

  const [quantities, setQuantities] = React.useState(() => {
    const quantitiesObj = {};
    for (const item of getCheckout) {
      quantitiesObj[item.checkout_id] = item.qty;
    }
    return quantitiesObj;
  });

  const handleOnIncrease = (checkoutId) => {
    setQuantities((prevState) => {
      const currentQty = prevState[checkoutId] || 0;
      const updatedQty = currentQty + 1;
      const maxQty = getCheckout.find((item) => item.checkout_id === checkoutId)
        .products[0].qty;
      return {
        ...prevState,
        [checkoutId]: updatedQty <= maxQty ? updatedQty : maxQty,
      };
    });
  };

  const handleOnDecrease = (checkoutId) => {
    setQuantities((prevState) => ({
      ...prevState,
      [checkoutId]: Math.max((prevState[checkoutId] || 0) - 1, 0),
    }));
  };

  React.useEffect(() => {
    setUpdatedCheckoutItems(
      getCheckout.map((item) => {
        const productId = item.products[0]?.id;
        const updatedQty = quantities[item.checkout_id] || item.qty;
        const totalPrice = item.products[0]?.price * updatedQty;

        console.log(
          "quantities[item.checkout_id]",
          quantities[item.checkout_id]
        );
        return {
          ...item,
          newQty: updatedQty,
          newTotalPrice: totalPrice,
        };
      })
    );
  }, [getCheckout, quantities]);

  const [isChecked, setIsChecked] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState([]);
  let isDisabled = true;
  const [isDisable, setIsDisable] = React.useState(false);

  const handleMasterCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    if (checked) {
      const items = getCheckout.map((item) => item.checkout_id);
      setCheckedItems(items);
      setIsDisable(false);
    } else {
      setCheckedItems([]);
      setIsDisable(true);
    }
  };

  const handleChildCheckboxChange = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
      setIsDisable(false);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
      setIsDisable(true);
    }
  };

  const handleDelete = async () => {
    try {
      if (checkedItems.length == 0) {
        setShowModal(true);
        setIsErr(true);
        setErrMsg("To delete an item, please select it from the list below");
        return;
      }

      for (let i = 0; i < checkedItems.length; i++) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/delete`,
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
            data: { checkout_id: checkedItems[i] },
          }
        );
      }
      setIsErr(false);
      setShowModal(false);
      setCheckedItems([]);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/detail/history`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setGetCheckout(response.data.data);
      setIsErr(false);
      setShowModal(false);
      setCheckedItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("getCheckout", getCheckout);

  // console.log("updatedCheckoutItems", updatedCheckoutItems);
  console.log("checkedItems======", checkedItems);

  let totalSummaryData = [];
  // let isDisabled = true;

  for (let i = 0; i < updatedCheckoutItems.length; i++) {
    if (updatedCheckoutItems[i].checkout_id == checkedItems[i]) {
      totalSummaryData.push(updatedCheckoutItems[i]);
      isDisabled = false;
    }
  }

  let totalSummaryPrice = 0;
  let totalSummaryQty = 0;
  let totalSummaryPriceConverted = "";

  if (totalSummaryData.length > 0) {
    for (let i = 0; i < totalSummaryData.length; i++) {
      totalSummaryPrice += totalSummaryData[i].newTotalPrice;
      totalSummaryQty += totalSummaryData[i].newQty;
    }
    const convert = totalSummaryPrice.toString();
    totalSummaryPriceConverted = convert.replace(/\d(?=(\d{3})+$)/g, "$&.");
  }

  const router = useRouter();
  //REDUX
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      for (let i = 0; i < totalSummaryData.length; i++) {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/edit`,
          {
            checkout_id: totalSummaryData[i].checkout_id,
            products_id: totalSummaryData[i].products_id,
            qty: totalSummaryData[i].newQty,
          },
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          }
        );
      }
      dispatch(
        checkoutRedux.setDataCheckout({
          data: totalSummaryData,
        })
      );
      router.push(`/checkout`);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("totalSummaryData=>>>>>>>", totalSummaryData);

  return (
    <>
      <Head>
        <title>My Bag | Blanja</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
        <MyModal open={showModal} onClose={handleClose}>
          <MyCard>
            <CardContent>
              {/* <Typography variant="h4">Verification email sent!</Typography>
               */}
              <Alert
                variant="filled"
                severity="error"
                sx={{ justifyContent: "center" }}>
                <strong style={{ fontSize: "16px" }}>
                  Oops, missing requirements!
                </strong>
              </Alert>

              <Typography variant="body1" sx={{ margin: "20px" }}>
                {errMsg}
              </Typography>

              <div style={{ display: "flex", flexDirection: "column" }}></div>
            </CardContent>
          </MyCard>
        </MyModal>

        <div className="container-fluid p-0">
          {/* NAVBAR */}
          <nav
            className={`container-fluid sticky-sm-top shadow py-2 ${style.containerNavbar}`}>
            <Navbar />
          </nav>
          {/* END OF NAVBAR */}

          {/* MY BAG */}
          <section className={`container ${style.bag}`}>
            <div className={`${style.subTitle}`}>
              <h3>My bag</h3>
            </div>
            <div className={`row ${style.listProduct}`}>
              {/* SIDE LEFT */}
              <div className="col-8">
                {/* SELECT ALL PRODUCT */}
                <div
                  className={`shadow-sm pt-3 px-4 border mt-3 mb-4 ${style.cardSelectAll}`}
                  style={{ width: "100%" }}>
                  <div className={`row`}>
                    <div className="col-7">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="selectAll"
                          checked={isChecked}
                          onChange={handleMasterCheckboxChange}
                        />
                        <label
                          className="form-check-label d-inline-block"
                          for="selectAll">
                          Select all items{" "}
                          <p className="d-inline-block">
                            ({checkedItems.length} items selected)
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className="col-5 text-end">
                      <button onClick={handleDelete}>Delete</button>
                    </div>
                  </div>
                </div>
                {/* PRODUCT */}
                {getCheckout.map((item, key) => {
                  const capitalize = (str) => {
                    return str.replace(/(^\w|\s\w)/g, function (letter) {
                      return letter.toUpperCase();
                    });
                  };
                  const product = item.products[0];
                  const price =
                    product.price * (quantities[item.checkout_id] || item.qty);
                  const prices = price.toString();
                  const convertPrice = prices.replace(
                    /\d(?=(\d{3})+$)/g,
                    "$&."
                  );
                  return (
                    <React.Fragment key={key}>
                      <CardSelectProduct
                        img={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${item?.product_picture}`}
                        selectedProductName={capitalize(item?.product_name)}
                        brand={capitalize(item?.products[0]?.brand)}
                        // total={item?.qty}
                        total={quantities[item.checkout_id] || item.qty}
                        selectedColor={capitalize(item?.color)}
                        // price={item?.products[0]?.price * item?.qty}
                        price={convertPrice}
                        selectedSize={capitalize(item?.size)}
                        handleOnIncrease={() =>
                          handleOnIncrease(item.checkout_id)
                        }
                        handleOnDecrease={() =>
                          handleOnDecrease(item.checkout_id)
                        }
                        childChecked={checkedItems.includes(item.checkout_id)}
                        handleChildChange={(event) =>
                          handleChildCheckboxChange(event, item.checkout_id)
                        }
                      />
                    </React.Fragment>
                  );
                })}
              </div>
              {/* SIDE RIGHT */}
              <div className="col-4">
                <div
                  className={`shadow-sm py-4 px-4 border mt-3 mb-4 ${style.cardCost}`}
                  style={{ width: "365px", position: "fixed" }}>
                  <h5>Shopping summary</h5>
                  <div className="row mt-4 mb-2">
                    <div className="col-6">
                      {totalSummaryData.length !== 0 ? (
                        <p>
                          Total price{" "}
                          <p style={{ color: "#9B9B9B" }}>
                            ({totalSummaryQty} product)
                          </p>
                        </p>
                      ) : (
                        <p>Total price</p>
                      )}
                    </div>
                    <div className="col-6">
                      {totalSummaryData.length !== 0 ? (
                        <h5 className="text-end">
                          Rp{totalSummaryPriceConverted}
                        </h5>
                      ) : (
                        <h5 className="text-end">-</h5>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    {/* {totalSummaryData.length === 0 ? (
                      <div className="col-12">
                        <Link
                          href={"/checkout"}
                          type="button"
                          className={`btn btn-primary ${style.btnBuy}`}
                          disabled={true}>
                          Buy
                        </Link>
                      </div>
                    ) : (
                      <div className="col-12">
                        <Link
                          href={"/checkout"}
                          type="button"
                          className={`btn btn-primary ${style.btnBuy}`}>
                          Buy
                        </Link>
                      </div>
                    )} */}
                    {!isDisable ? (
                      isLoading ? (
                        <LoadingButton
                          loading={isLoading}
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            borderRadius: "20px",
                            marginTop: "20px",
                            background: "#DB3022",
                            color: "black",
                          }}
                          onClick={handleCheckout}>
                          {isLoading ? "Loading..." : "Buy"}
                        </LoadingButton>
                      ) : (
                        <MyButton
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleCheckout}>
                          Buy
                        </MyButton>
                      )
                    ) : (
                      <MyButton
                        disabled
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCheckout}>
                        Buy
                      </MyButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* END OF MY BAG */}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = getCookie("token", context) || "";

  return {
    props: {
      token,
    },
  };
}
