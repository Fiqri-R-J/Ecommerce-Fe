import Navbar from "@/components/organisms/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "../../components/organisms/userSidebar";
import style from "../../styles/pages/homeStyle.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
//MUI
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyCard = styled(Card)({
  margin: "auto",
  maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  // padding: "25px",
});

export default function order(props) {
  const [getPaid, setGetPaid] = React.useState(null);
  const [getNotPaid, setGetNotPaid] = React.useState(null);

  React.useEffect(() => {
    setGetPaid(props.paid);
    setGetNotPaid(props.notPaid);
  }, []);

  console.log("getPaid===", getPaid);
  console.log("getNotPaid===", getNotPaid);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
              <div class="card">
                <div class="card-body">
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "30px",
                    }}>
                    Transactions History
                  </Typography>
                  <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Tabs value={value} onChange={handleChange} centered>
                      <Tab label="Not paid yet" />
                      <Tab label="Success" />
                    </Tabs>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = getCookie("token", context) || "";

  const paid = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const notPaid = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/detail/history`,
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
      paid: paid.data.data,
      notPaid: notPaid.data.data,
    },
  };
}
