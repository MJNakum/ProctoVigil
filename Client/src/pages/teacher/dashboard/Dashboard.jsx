import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { BarChart, LoadingSpinner } from "../../../components/index";
import { QuizPointsService } from "../../../services/ServerRequest";
import auth from "../../../auth/auth";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "Octomber",
  "November",
  "December",
];
const values = [34, 71, 17, 18, 62, 44, 55, 43, 23, 18, 32, 66];

const cardItems = [
  {
    title: "Users",
    icon: <PermIdentityIcon />,
    gradiant: "linear-gradient(45deg,#0288d1,#26c6da)",
    subTitle: "New",
    subTitleValue: 10,
    total: 132,
  },
  {
    title: "Quiz",
    icon: <LibraryBooksIcon />,
    gradiant: "linear-gradient(45deg,#ff5252,#f48fb1)",
    subTitle: "New",
    subTitleValue: 13,
    total: 78,
  },
  {
    title: "Completed",
    icon: <EmojiEventsIcon />,
    gradiant: "linear-gradient(45deg,#ff6f00,#ffca28)",
    subTitle: "Today",
    subTitleValue: 2,
    total: 23,
  },
  {
    title: "Cheaters",
    icon: <NoAccountsIcon />,
    gradiant: "linear-gradient(45deg,#43a047,#1de9b6)",
    subTitle: "This week",
    subTitleValue: 3,
    total: 13,
  },
];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await QuizPointsService.getById(auth.id);
      setUserData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <Box sx={{ display: loading ? "none" : "block" }}>
        <Grid container spacing={2}>
          <LoadingSpinner loading={loading} />
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography>
              Hello,{" "}
              {userData.user_id?.firstName + " " + userData.user_id?.lastName}{" "}
              Your Remaining Quiz Points are: {userData.quizPoint}
            </Typography>
          </Box>
          {cardItems.map((item) => {
            return (
              <Grid item key={item.title} xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    background: item.gradiant,
                    borderRadius: 2,
                    display: "flex",
                    padding: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box textAlign="center" spacing={2}>
                    <Avatar
                      sx={{
                        background: "rgba(0,0,0,.18)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      {/* <PermIdentityIcon sx={{ width: 30, height: 30 }} /> */}
                      {item.icon}
                    </Avatar>
                    <br />
                    <Typography sx={{ color: "white" }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Box textAlign="end" spacing={2}>
                    <Typography sx={{ color: "white" }}>
                      {item.subTitleValue}
                    </Typography>
                    <Typography sx={{ color: "white" }}>
                      {item.subTitle}
                    </Typography>
                    <br />
                    <Typography sx={{ color: "white" }}>
                      {item.total}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <BarChart
          title="Number of Student Register in Past Months"
          labels={labels}
          values={values}
        />
        <BarChart
          title="Number of Quiz Created in Past Months"
          labels={labels}
          values={values}
        />
      </Box>
    </>
  );
}

export default Dashboard;
