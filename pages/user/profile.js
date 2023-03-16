import Navbar from "@/components/organisms/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "../../components/organisms/userSidebar";
import style from "../../styles/pages/homeStyle.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";

//MUI
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  Grid,
  Input,
  Stack,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AiOutlineConsoleSql } from "react-icons/ai";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

const MyTextField = styled(TextField)({
  "& label": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  // '& .MuiInput-underline:before': {
  //   borderBottomColor: 'black',
  // },
  //   "& .MuiInput-underline:after": {
  //     borderBottomColor: "black",
  //   },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#7E98DF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7E98DF",
    },
  },
});

export default function profile(props) {
  const profile = props.profile;

  const [profiles, setProfiles] = React.useState(props.profile);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);
  const [gender, setGender] = React.useState(null);

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [isErrPhone, setIsErrPhone] = React.useState(false);
  const [errMsgPhone, setErrMsgPhone] = React.useState("");

  const [fullname, setFullname] = React.useState(null);
  const [isErrName, setIsErrName] = React.useState(false);
  const [errMsgName, setErrMsgName] = React.useState("");

  const [getDate, setGetDate] = React.useState(null);
  let tanggal = null;
  const handleChangeDate = (newSelectedDate) => {
    console.log("newSelectedDate---", newSelectedDate);
    // let dataString = newSelectedDate.toString();
    // const dateArray = dataString.split(" ");
    // const year = dateArray[3];
    // const month = dateArray[2];
    // const day = dateArray[1];
    // const newFormattedDate = `${year}-${month}-${day}`;
    // console.log("newFormattedDate", newFormattedDate); // output: 2023-Mar-07

    setSelectedDate(moment(newSelectedDate).format("YYYY-MM-DD")); // output object

    // setSelectedDate(newFormattedDate); // kalau STATE dimasukan hasil dari konversi maka dapet error seperti yg kukasih
  };
  if (selectedDate) {
    console.log("selectedDate--->", moment(selectedDate).format("YYYY-MM-DD"));
  }
  React.useEffect(() => {
    // setGetDate
    let x = profiles?.date_of_birth;
    let temp = "";
    let res = [];
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== "-") {
        temp += x[i];
      }

      if (x[i] == "-" || x[i + 1] == "T") {
        res.push(temp);
        temp = "";
        continue;
      }
    }
    let fix = "";
    for (let i = 0; i < res.length; i++) {
      if (i < res.length - 1) {
        fix += res[i] + "-";
      } else {
        fix += res[i];
      }
    }

    setGetDate(fix);
  }, []);

  // let dataString = selectedDate.toString();
  // const dateArray = dataString.split(" ");
  // const year = dateArray[3];
  // const month = dateArray[2];
  // const day = dateArray[1];
  // const newFormattedDate = `${year}-${month}-${day}`;
  // console.log(newFormattedDate); // output: 2023-Mar-07
  // tanggal = newFormattedDate;

  // console.log("TANGGAL====", tanggal);
  const handleChangePhoneNumber = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    if (newValue.toString().length < 12) {
      setErrMsgPhone("Please input Valid Phone Number");
      setIsErrPhone(true);
      setPhoneNumber(null);
      return;
    }
    setPhoneNumber(newValue);
    setIsErrPhone(false);
  };

  const handleChangeName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{3,20}$/;
    if (!strRegex.test(name)) {
      setErrMsgName(
        "Name must contain only letters and spaces, and be between 3-20 characters long."
      );
      setIsErrName(true);
      setFullname(null);
      return;
    }
    setIsErrName(false);
    setFullname(name);
  };

  const handleChangeEmail = (event) => {
    const newValue = event.target.value;
    const strRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!strRegex.test(newValue)) {
      setErrMsgEmail("Please input Valid Email Address.");
      setIsErrEmail(true);
      setEmail(null);
      return;
    }
    setIsErrEmail(false);
    setEmail(newValue);
  };

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSubmitted(true);
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setSelectedFile(reader.result);
  //   };
  //   setIsSubmitted(true);
  // };

  console.log("selectedFile===", selectedFile);
  console.log("gender===", gender);
  console.log("name===", fullname);
  console.log("email===", email);
  console.log("phoneNumber===", phoneNumber);
  console.log("selectedDate===", selectedDate);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      console.log("MASUKKKKK=====", getDate);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/edit`,
        {
          email,
          phone_number: phoneNumber,
          username: fullname,
          profile_picture: selectedFile,
          gender,
          // date_of_birth: tanggal == null ? getDate : tanggal,
          date_of_birth: selectedDate,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      setProfiles(profileData.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     console.log('MASUK')
  //     setIsLoading(true);
  //     const formData = new FormData();
  //     formData.append("email", email);
  //     formData.append("phone_number", phoneNumber);
  //     formData.append("username", fullname);
  //     formData.append("profile_picture", selectedFile);
  //     formData.append("gender", gender);
  //     formData.append("date_of_birth", selectedDate);
  //     const response = await axios.patch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/edit`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${props.token}`,
  //         },
  //       }
  //     );
  //     setIsLoading(false);
  //     const profileData = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${props.token}`,
  //         },
  //       }
  //     );
  //     setIsLoading(false);
  //     setProfiles(profileData.data.data);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div>
      <nav
        className={`container-fluid sticky-sm-top shadow py-2 ${style.containerNavbar}`}>
        <Navbar />
      </nav>
      <div className="profile mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col">
              <div class="card" style={{ overflow: "auto" }}>
                <div class="card-body">
                  <h5>My profile</h5>
                  <p className="text-body-secondary">
                    Manage your profile information
                  </p>
                  <hr />
                  <div className="row">
                    <div
                      className="col-8"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          sx={{ justifyContent: "center" }}>
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                            onChange={() => setGender("male")}
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                            onChange={() => setGender("female")}
                          />
                        </RadioGroup>
                      </FormControl>

                      {isErrName ? (
                        <MyTextField
                          error
                          id="standard-error-helper-text"
                          helperText={errMsgName}
                          label="Name"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.username}
                          value={fullname}
                          onChange={handleChangeName}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      ) : (
                        <MyTextField
                          label="Name"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.username}
                          value={fullname}
                          onChange={handleChangeName}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      )}

                      {isErrEmail ? (
                        <MyTextField
                          error
                          id="standard-error-helper-text"
                          helperText={errMsgEmail}
                          label="Email"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.email}
                          value={email}
                          onChange={handleChangeEmail}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      ) : (
                        <MyTextField
                          label="Email"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.email}
                          value={email}
                          onChange={handleChangeEmail}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      )}

                      {!isErrPhone ? (
                        <MyTextField
                          label="Phone Number"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          value={phoneNumber}
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
                          id="outlined-error-helper-text"
                          label="Phone Number"
                          helperText={errMsgPhone}
                          variant="outlined"
                          value={phoneNumber}
                          onChange={handleChangePhoneNumber}
                          InputProps={{
                            inputProps: {
                              maxLength: 15,
                            },
                          }}
                        />
                      )}

                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          label="Date of Birth"
                          // value={selectedDate}
                          sx={{
                            "& label": {
                              color: "black",
                            },
                            "& label.Mui-focused": {
                              color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#e0e0e0",
                              },
                              "&:hover fieldset": {
                                borderColor: "#7E98DF",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#7E98DF",
                              },
                            },
                            marginTop: "20px",
                          }}
                          // onChange={(newSelectedDate) =>
                          //   setSelectedDate(newSelectedDate)
                          // }
                          onChange={handleChangeDate}
                        />
                      </LocalizationProvider>

                      {isLoading ? (
                        <LoadingButton
                          onClick={handleSubmit}
                          loading={isLoading}
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: "20px",
                            marginTop: "20px",
                            background: "#DB3022",
                            color: "black",
                          }}>
                          {isLoading ? "Loading..." : "Update Data"}
                        </LoadingButton>
                      ) : (
                        <MyButton
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}>
                          Update Data
                        </MyButton>
                      )}
                    </div>
                    <div className="col-1">
                      <div
                        className="verline ms-4"
                        style={{
                          borderLeft: "5px solid #D4D4D4",
                          height: "200px",
                          left: "50%",
                          marginLeft: "-3px",
                          top: "0",
                        }}></div>
                    </div>
                    <div className="col-3">
                      <div
                        className="imgStore"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}>
                        <img
                          className="rounded-circle"
                          src={
                            profiles?.profile_picture.includes("https")
                              ? "https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/ecommerce/blank-profile_yiwpyy.png"
                              : `https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${profiles.profile_picture}`
                          }
                          alt="store"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />

                        <Stack direction="row" alignItems="center" spacing={2}>
                          {isSubmitted ? (
                            <Button variant="contained" color="success">
                              Success
                            </Button>
                          ) : (
                            <Button variant="contained" component="label">
                              Upload Photo
                              <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                onChange={handleFileChange}
                              />
                            </Button>
                          )}
                        </Stack>
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
  );
}

export const getServerSideProps = async (context) => {
  const token = getCookie("token", context) || "";

  const profileData = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    props: {
      token,
      profile: profileData.data.data,
    },
  };
};
