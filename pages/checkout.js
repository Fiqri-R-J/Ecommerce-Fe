/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "@/styles/pages/checkoutStyle.module.scss";
import Link from "next/link";
import Navbar from "@/components/organisms/navbar";
import CardCheckout from "@/components/molecules/cardCheckout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import profile from "./user/profile";
import { deleteDataCheckout } from "@/store/reducer/checkout";
//MUI
import {
  Card,
  CardContent,
  Modal,
  Button,
  Typography,
  Alert,
  Checkbox,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";

const MyCard = styled(Card)({
  margin: "auto",
  // marginTop: "10%",
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

const ButtonCheckout = styled(Button)({
  borderRadius: "40px",
  width: "100%",
  fontSize: "14px",
  padding: "8px 30px",
  color: "white",
  fontWeight: 500,
  background: "#DB3022",
  "&:hover": {
    background: "#DB2522",
    border: "none",
  },
});

const MyTextField = styled(TextField)({
  // '& label': {
  //   color: '#7E98DF',
  // },
  // '& label.Mui-focused': {
  //   color: '#7E98DF',
  // },
  // '& .MuiInput-underline:before': {
  //   borderBottomColor: '#7E98DF',
  // },
  //   "& .MuiInput-underline:after": {
  //     borderBottomColor: "#7E98DF",
  //   },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#7E98DF",
    },
    "&:hover fieldset": {
      borderColor: "#7E98DF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7E98DF",
    },
  },
});

export default function bag(props) {
  const checkoutData = useSelector((state) => state);

  const [getProfileData, setGetProfileData] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [getCheckout, setGetCheckout] = React.useState(
    checkoutData.checkout.data.data
  );
  // if (!checkoutData) {
  //   const [getCheckout, setGetCheckout] = React.useState([]);
  // } else {
  //   const [getCheckout, setGetCheckout] = React.useState(
  //     checkoutData?.checkout?.data?.data
  //   );
  // }

  const [grandTotal, setgrandTotal] = React.useState("");
  const [grandMasterTotal, setGrandMasterTotal] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModalCreate, setShowModalCreate] = React.useState(false);

  React.useEffect(() => {
    setToken(props.token);
    setGetProfileData(props.profileData);

    if (getCheckout) {
      let temp = 0;
      for (let i = 0; i < getCheckout.length; i++) {
        temp += getCheckout[i].newTotalPrice;
      }
      const convertPrice = temp.toString().replace(/\d(?=(\d{3})+$)/g, "$&.");
      setgrandTotal(convertPrice);

      let grandMaster = temp + 15000;
      const convertGrandMaster = grandMaster
        .toString()
        .replace(/\d(?=(\d{3})+$)/g, "$&.");

      setGrandMasterTotal(convertGrandMaster);
    }
  }, []);
  console.log("getProfileData---", getProfileData);

  // const capitalize = (str) => {
  //   return str.replace(/(^\w|\s\w)/g, function (letter) {
  //     return letter.toUpperCase();
  //   });
  // };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleCloseCreate = () => {
    setShowModalCreate(false);
  };

  const handleOpenCreate = () => {
    setShowModalCreate(true);
  };

  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(null);
  const [getAddressId, setGetAddressId] = React.useState(null);

  const handleCardClick = (index, addressId) => {
    setSelectedAddressIndex(index);
    // console.log("Selected address ID:", addressId);
    setGetAddressId(addressId);
  };

  let isDisabled = true;
  if (getAddressId) {
    isDisabled = false;
  } else {
    isDisabled = true;
  }

  const handleChangeAddress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/address/edit/${getAddressId}`,
        {
          primary_address: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setIsLoading(false);
      const profileData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setIsLoading(false);
      // console.log("NEWPROFILEDATA", profileData);
      setGetProfileData(profileData.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const router = useRouter();
  //REDUX
  const dispatch = useDispatch();

  const [getPaymentMethod, setGetPaymentMethod] = React.useState(null);

  const handlePaymentMethod = (paymentMethod) => {
    setGetPaymentMethod(paymentMethod);
  };

  let isDisabledPayment = true;
  if (getPaymentMethod) {
    isDisabledPayment = false;
  } else {
    isDisabledPayment = true;
  }

  const handleCheckoutPayment = async () => {
    try {
      setIsLoading(true);

      for (let i = 0; i < getCheckout.length; i++) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/add`,
          {
            checkout_id: getCheckout[i].checkout_id,
            payment_method: getPaymentMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setIsLoading(false);
      dispatch(deleteDataCheckout());
      // setGetCheckout([]);
      router.push("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // console.log("getCheckoutREDUX---", getCheckout);
  //getCheckout[i].checkout_id

  console.log(
    "getProfileData.addresses[0]===",
    getProfileData?.data?.addresses[0]
  );
  console.log(getProfileData?.data?.addresses[0] == undefined);

  const [typeOfAddress, setTypeOfAddress] = React.useState(null);
  const [recipientName, setRecipientName] = React.useState(null);
  const [recipientPhoneNumber, setRecipientPhoneNumber] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [postalCode, setPostalCode] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [errMsgName, setErrMsgName] = React.useState("");
  const [errMsgCity, setErrMsgCity] = React.useState("");
  const [errMsgAddress, setErrMsgAddress] = React.useState("");
  const [errMsgPhone, setErrMsgPhone] = React.useState("");
  const [errMsgPostal, setErrMsgPostal] = React.useState("");
  const [isErrName, setIsErrName] = React.useState(false);
  const [isErrCity, setIsErrCity] = React.useState(false);
  const [isErrAddress, setIsErrAddress] = React.useState(false);
  const [isErrPhone, setIsErrPhone] = React.useState(false);
  const [isErrPostal, setIsErrPostal] = React.useState(false);

  const isDisabledCreate =
    !typeOfAddress ||
    !recipientName ||
    !recipientPhoneNumber ||
    !address ||
    !postalCode ||
    !city;
  // console.log("recipientPhoneNumber===", recipientPhoneNumber);

  const handleChangePhoneNumber = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    if (newValue.toString().length < 12) {
      setErrMsgPhone("Please input Valid Phone Number");
      setIsErrPhone(true);
      setRecipientPhoneNumber(null);
      return;
    }
    setRecipientPhoneNumber(newValue);
    setIsErrPhone(false);
  };

  const handleChangePostalCode = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    if (newValue.toString().length < 5) {
      setErrMsgPostal("Please input Valid Phone Number");
      setIsErrPostal(true);
      setPostalCode(null);
      return;
    }
    setPostalCode(newValue);
    setIsErrPostal(false);
  };

  const handleAddAddress = async () => {
    try {
      const strRegex = /^(?=.*\S)[A-Za-z ]{3,15}$/;
      const addressRegex =
        /^(?=.*[a-zA-Z])[\w\d!@#$%^&*()_+}{|":?><,./;'[\]\\=-\s.\/]{10,100}$/;

      if (!strRegex.test(recipientName)) {
        setErrMsgName(
          "Name must contain only letters and spaces, and be between 3-15 characters long."
        );
        setIsErrName(true);
        return;
      }

      if (!addressRegex.test(address)) {
        setErrMsgAddress(
          "Address must contain only letters / Alphanumeric, and be between 10-50 characters long."
        );
        setIsErrAddress(true);
        return;
      }

      if (!strRegex.test(city)) {
        setErrMsgCity(
          "City must contain only letters and spaces, and be between 3-15 characters long."
        );
        setIsErrCity(true);
        return;
      }

      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/address/add`,
        {
          type_of_address: typeOfAddress,
          recipient_name: recipientName,
          recipient_phone_number: recipientPhoneNumber,
          address,
          postal_code: postalCode,
          city,
          primary_address: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setIsLoading(false);
      setIsErrName(false);
      setIsErrAddress(false);
      setIsErrCity(false);
      setIsErrPhone(false);
      setIsErrPostal(false);
      const profileData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setIsLoading(false);
      setGetProfileData(profileData.data);
      handleCloseCreate();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/address/delete/${getAddressId}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setIsLoading(false);
      const profileData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setIsLoading(false);
      setGetProfileData(profileData.data);
      handleClose()
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Payment | Blanja</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        {/* MODAL */}
        <MyModal open={showModal} onClose={handleClose}>
          <MyCard>
            <CardContent>
              {getProfileData?.data?.addresses.length == 1 ? (
                <Typography variant="h5" sx={{ mb: 2 }}>
                  <strong>Address</strong>
                </Typography>
              ) : (
                <Typography variant="h5" sx={{ mb: 2 }}>
                  <strong>Addresses</strong>
                </Typography>
              )}

              {getProfileData?.data?.addresses?.map((item, key) => (
                <React.Fragment key={key}>
                  <Card
                    variant="outlined"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                      cursor: "pointer",
                      boxShadow:
                        selectedAddressIndex === key
                          ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                          : "none",
                      border:
                        selectedAddressIndex === key
                          ? "2px solid #DB3022"
                          : "2px solid #e0e0e0",
                      "&:hover": {
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor:
                          selectedAddressIndex === key
                            ? "rgba(63, 81, 181, 0.05)"
                            : "#fff",
                      },
                      "&:active": {
                        border: "2px solid #DB3022",
                        backgroundColor: "rgba(63, 81, 181, 0.05)",
                      },
                    }}
                    onClick={() => handleCardClick(key, item?.address_id)}>
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        sx={{ mr: 2, display: "none" }}
                        checked={selectedAddressIndex === key}
                        color="primary"
                      />
                      <div>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          {item?.recipient_name}
                        </Typography>
                        <Typography variant="body2">
                          {item?.address}, {item?.city}, {item?.postal_code}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </React.Fragment>
              ))}

              <div
                style={{
                  display: "flex",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}>
                {!isDisabled ? (
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
                      onClick={handleChangeAddress}>
                      {isLoading ? "Loading..." : "Change Address"}
                    </LoadingButton>
                  ) : (
                    <MyButton
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleChangeAddress}>
                      Change Address
                    </MyButton>
                  )
                ) : (
                  <MyButton
                    disabled
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleChangeAddress}>
                    Change Address
                  </MyButton>
                )}
                &nbsp;
                {!isDisabled ? (
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
                      onClick={handleDeleteAddress}>
                      {isLoading ? "Loading..." : "Delete Address"}
                    </LoadingButton>
                  ) : (
                    <MyButton
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleDeleteAddress}>
                      Delete Address
                    </MyButton>
                  )
                ) : (
                  <MyButton
                    disabled
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleDeleteAddress}>
                    Delete Address
                  </MyButton>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}></div>
            </CardContent>
          </MyCard>
        </MyModal>

        {/* MODAL ADD ADDRESS */}
        <MyModal open={showModalCreate} onClose={handleCloseCreate}>
          <MyCard>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                <strong>Add New Address</strong>
              </Typography>

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Type of Address
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group">
                  <FormControlLabel
                    value="office"
                    control={<Radio />}
                    label="Office"
                    onChange={() => setTypeOfAddress("office")}
                  />
                  <FormControlLabel
                    value="home"
                    control={<Radio />}
                    label="Home"
                    onChange={() => setTypeOfAddress("home")}
                  />
                </RadioGroup>
              </FormControl>

              {!isErrName ? (
                <MyTextField
                  label="Recipient Name"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  placeholder="John / Doe"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                />
              ) : (
                <MyTextField
                  error
                  fullWidth
                  margin="normal"
                  id="standard-error-helper-text"
                  label="Recipient Name"
                  helperText={errMsgName}
                  variant="standard"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                />
              )}

              {!isErrPhone ? (
                <MyTextField
                  label="Recipient Phone Number"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  value={recipientPhoneNumber}
                  onChange={handleChangePhoneNumber}
                  InputProps={{
                    inputProps: {
                      maxLength: 15,
                    },
                  }}
                />
              ) : (
                <MyTextField
                  error
                  fullWidth
                  margin="normal"
                  id="standard-error-helper-text"
                  label="Recipient Phone Number"
                  helperText={errMsgPhone}
                  variant="standard"
                  value={recipientPhoneNumber}
                  onChange={handleChangePhoneNumber}
                  InputProps={{
                    inputProps: {
                      maxLength: 15,
                    },
                  }}
                />
              )}

              {!isErrAddress ? (
                <MyTextField
                  label="Address"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  placeholder="jl. Mangga no 15c, Kelurahan Bringin, Kecamatan Daun"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              ) : (
                <MyTextField
                  error
                  fullWidth
                  margin="normal"
                  id="standard-error-helper-text"
                  placeholder="jl. Mangga no 15c, Kelurahan Bringin, Kecamatan Daun"
                  label="Address"
                  helperText={errMsgAddress}
                  variant="standard"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              )}

              {!isErrPostal ? (
                <MyTextField
                  label="Postal Code"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  value={postalCode}
                  onChange={handleChangePostalCode}
                  InputProps={{
                    inputProps: {
                      maxLength: 5,
                    },
                  }}
                />
              ) : (
                <MyTextField
                  error
                  fullWidth
                  margin="normal"
                  id="standard-error-helper-text"
                  label="Postal Code"
                  helperText={errMsgPostal}
                  variant="standard"
                  value={postalCode}
                  onChange={handleChangePostalCode}
                  InputProps={{
                    inputProps: {
                      maxLength: 5,
                    },
                  }}
                />
              )}

              {!isErrCity ? (
                <MyTextField
                  label="City"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  placeholder="Palangka Raya / Pontianak"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              ) : (
                <MyTextField
                  error
                  fullWidth
                  margin="normal"
                  id="standard-error-helper-text"
                  label="City"
                  placeholder="Palangka Raya / Pontianak"
                  helperText={errMsgCity}
                  variant="standard"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              )}

              {!isDisabledCreate ? (
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
                    onClick={handleAddAddress}>
                    {isLoading ? "Loading..." : "Add Address"}
                  </LoadingButton>
                ) : (
                  <MyButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddAddress}>
                    Add Address
                  </MyButton>
                )
              ) : (
                <MyButton
                  disabled
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddAddress}>
                  Add Address
                </MyButton>
              )}

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
              <h3>Checkout</h3>
              <p>Shipping Address</p>
            </div>
            <div className={`row ${style.listProduct}`}>
              {/* SIDE LEFT */}
              <div className="col-8">
                {/* SELECT ALL PRODUCT */}
                {getProfileData?.data?.addresses[0] == undefined ? (
                  <div
                    className={`shadow-sm py-3 px-4 border mb-4 ${style.cardSelectAll}`}
                    style={{ width: "100%" }}>
                    <p className={style.subTitle}></p>

                    <div
                      onClick={handleOpenCreate}
                      type="button"
                      className={`btn btn-outline-secondary rounded-pill me-3 ${style.btnAddress}`}>
                      Add new address
                    </div>
                  </div>
                ) : (
                  <div
                    className={`shadow-sm py-3 px-4 border mb-4 ${style.cardSelectAll}`}
                    style={{ width: "100%" }}>
                    <p className={style.subTitle}>
                      {getProfileData?.data?.addresses[0]?.recipient_name}
                    </p>
                    <p>
                      {getProfileData?.data?.addresses[0]?.address},{" "}
                      {getProfileData?.data?.addresses[0]?.city},{" "}
                      {getProfileData?.data?.addresses[0]?.postal_code}
                    </p>
                    <div
                      onClick={handleOpen}
                      type="button"
                      className={`btn btn-outline-secondary rounded-pill me-3 ${style.btnAddress}`}>
                      Choose another address
                    </div>
                    <div
                      onClick={handleOpenCreate}
                      type="button"
                      className={`btn btn-outline-secondary rounded-pill me-3 ${style.btnAddress}`}>
                      Add new address
                    </div>
                  </div>
                )}

                {/* PRODUCT */}
                {getCheckout.map((item, key) => {
                  const capitalize = (str) => {
                    return str.replace(/(^\w|\s\w)/g, function (letter) {
                      return letter.toUpperCase();
                    });
                  };
                  const prices = item.newTotalPrice.toString();
                  const convertPrice = prices.replace(
                    /\d(?=(\d{3})+$)/g,
                    "$&."
                  );

                  return (
                    <React.Fragment key={key}>
                      <CardCheckout
                        img={item?.product_picture}
                        selectedProductName={item?.product_name}
                        brand={item?.products[0]?.brand}
                        totalPrice={convertPrice}
                        selectedQty={item?.newQty}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
              {/* SIDE RIGHT */}
              <div className="col-4">
                <div
                  className={`shadow-sm py-4 px-4 border mb-4 ${style.cardCost}`}
                  style={{ width: "100%" }}>
                  <h5>Shopping summary</h5>
                  <div className="border-bottom border-4">
                    <div className={`row ${style.order}`}>
                      <div className="col-6">
                        <p>Order</p>
                      </div>
                      <div className="col-6">
                        <h5 className="text-end">Rp{grandTotal}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p>Delivery</p>
                      </div>
                      <div className="col-6">
                        <h5 className="text-end">Rp15.000</h5>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3">
                    <div className={`row ${style.totalPrice}`}>
                      <div className="col-7">
                        <h5>Shopping summary</h5>
                      </div>
                      <div className="col-5">
                        <h5 className={`text-end ${style.total}`}>
                          Rp{grandMasterTotal}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-12">
                      {getProfileData?.data?.addresses[0] == undefined ? (
                        <ButtonCheckout
                          disabled
                          variant="contained"
                          color="primary"
                          fullWidth>
                          Select payment
                        </ButtonCheckout>
                      ) : (
                        <Link
                          href={""}
                          type="button"
                          className={`btn btn-primary ${style.btnBuy}`}
                          data-bs-toggle="modal"
                          data-bs-target="#modalCheckout">
                          Select payment
                        </Link>
                      )}

                      <div
                        className="modal fade"
                        id="modalCheckout"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabindex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable shadow-lg">
                          <div className={`modal-content ${style.modal}`}>
                            <div class="modal-header">
                              <button
                                type="button"
                                className="btn-close me-2"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                              <h1
                                className={`modal-title ${style.titleModal}`}
                                id="staticBackdropLabel">
                                Payment
                              </h1>
                            </div>

                            {/* CONTENT MODAL */}
                            <div className="modal-body">
                              {/* PAYMENT OPTION */}
                              <div
                                className={`py-2 px-2 border-bottom border-3 ${style.paymentMethod}`}>
                                <h5 className={`${style.subTitle}`}>
                                  Payment method
                                </h5>
                                {/* GOPAY */}
                                <div
                                  className={`row mt-3 ${style.optionPayment}`}>
                                  <div className={`col-3`}>
                                    <img
                                      className={style.iconGopay}
                                      src="/images/gopay.webp"
                                      alt="icon-navbar"
                                    />
                                  </div>
                                  <div className="col-4 ps-4">
                                    <h5 className={`${style.namePayment}`}>
                                      Gopay
                                    </h5>
                                  </div>
                                  <div className="col-5 text-end">
                                    <input
                                      className={`form-check-input ${style.check}`}
                                      type="radio"
                                      value="gopay"
                                      id="flexRadioDefault1"
                                      name="paymentMethod"
                                      onChange={() =>
                                        handlePaymentMethod("gopay")
                                      }
                                    />
                                  </div>
                                </div>
                                {/* POS INDONESIA */}
                                <div
                                  className={`row d-flex align-items-center ${style.optionPayment}`}>
                                  <div className={`col-3`}>
                                    <img
                                      className={style.iconPos}
                                      src="/images/pos-indonesia.webp"
                                      alt="icon-navbar"
                                    />
                                  </div>
                                  <div className="col-6 ps-4">
                                    <h5 className={`${style.namePayment}`}>
                                      Pos Indonesia
                                    </h5>
                                  </div>
                                  <div className="col-3 text-end">
                                    <input
                                      className={`form-check-input ${style.check}`}
                                      type="radio"
                                      value="pos indonesia"
                                      id="flexRadioDefault1"
                                      name="paymentMethod"
                                      onChange={() =>
                                        handlePaymentMethod("pos indonesia")
                                      }
                                    />
                                  </div>
                                </div>
                                {/* MASTERCARD */}
                                <div
                                  className={`row mt-3 d-flex align-items-center ${style.optionPayment}`}>
                                  <div className={`col-3`}>
                                    <img
                                      className={style.iconMastercard}
                                      src="/images/mastercard.webp"
                                      alt="icon-navbar"
                                    />
                                  </div>
                                  <div className="col-4 ps-4">
                                    <h5 className={`${style.namePayment}`}>
                                      Mastercard
                                    </h5>
                                  </div>
                                  <div className="col-5 text-end">
                                    <input
                                      className={`form-check-input ${style.check}`}
                                      type="radio"
                                      value="mastercard"
                                      id="flexRadioDefault1"
                                      name="paymentMethod"
                                      onChange={() =>
                                        handlePaymentMethod("mastercard")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* TOTAL */}
                              <div className={`py-4 px-2 ${style.total}`}>
                                <h5>Shopping summary</h5>
                                <div className="row mt-4">
                                  <div className="col-6">
                                    <p className={style.orderDelivery}>Order</p>
                                  </div>
                                  <div className="col-6 text-end">
                                    <h5>Rp{grandTotal}</h5>
                                  </div>
                                </div>
                                <div className={`row ${style.delivery}`}>
                                  <div className="col-6">
                                    <p className={style.orderDelivery}>
                                      Delivery
                                    </p>
                                  </div>
                                  <div className="col-6 text-end">
                                    <h5>Rp15.000</h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* FOOTER MODAL */}
                            <div
                              className={`modal-footer d-block ${style.footer}`}>
                              <div className="row p-0 d-flex align-items-center">
                                <div className="col-6">
                                  <h4
                                    className="d-block"
                                    style={{ fontSize: "17px" }}>
                                    Shopping summary
                                  </h4>
                                  <h5 className={`${style.total}`}>
                                    Rp{grandMasterTotal}
                                  </h5>
                                </div>
                                <div className="col-6 text-end">
                                  {!isDisabledPayment ? (
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
                                        onClick={handleCheckoutPayment}>
                                        {isLoading ? "Loading..." : "Buy"}
                                      </LoadingButton>
                                    ) : (
                                      <MyButton
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleCheckoutPayment}>
                                        Buy
                                      </MyButton>
                                    )
                                  ) : (
                                    <MyButton
                                      disabled
                                      variant="contained"
                                      color="primary"
                                      fullWidth
                                      onClick={handleCheckoutPayment}>
                                      Buy
                                    </MyButton>
                                  )}
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

  const profileData = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // console.log(profileData.data);
  return {
    props: {
      token,
      profileData: profileData.data,
    },
  };
}
