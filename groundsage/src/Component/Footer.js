import React, { useContext, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../ContextApi/AuthContext";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const apiUrl = process.env.REACT_APP_API_URI;
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/home/send-feedback`,
        {
          email: user?.email,
          feedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user?.token,
            role_id: user?.role_id,
          },
        }
      );
      toast.success("Feedback sent successfully");
      setFeedback("");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response from server:", error.response.data);
        toast.error("Something went wrong");
        setFeedback("");
      } else if (error.request) {
        // No response was received from the server
        console.error("No response received from server:", error.request);
        toast.error("Something went wrong");
        setFeedback("");
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div style={{ background: "rgb(78, 101, 100)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center", // Center vertically
          textAlign: "center", //
          margin: { xs: "0px 10px", md: "0px 50px 0px 50px" },
          paddingTop: "20px",
        }}
      >
        
        <Box
          sx={{
            display: { xs: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          
          <Box>
            <img
              src="../../../Images/logo_1 1.png"
              alt="Right Arrow"
              style={{ marginRight: "5px", width: "45%" }} // Adjust margin between image and text
            />
            <Typography
              sx={{
                color: "rgb(255, 255, 255)",
                fontFamily: "Inter",
                lineHeight: "1",
                marginTop: "10px",
                fontWeight: "600",
              }}
            >
              Your One-Stop Solution for
              <br /> Seamless Event Management!
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: { xs: "0", md: "20%" },
              display: { xs: "none", sm: "block" },
            }}
          >
            <Typography
              sx={{
                color: "rgb(255, 255, 255)",
                fontFamily: "Inter",
                lineHeight: "1",
                marginTop: "10px",
                fontWeight: "500",
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              Your Review is important to us{" "}
            </Typography>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              value={user?.email}
              onChange={handleEmailChange}
              disabled="true"
              size="small"
              InputProps={{
                disableUnderline: true,
                style: { color: "white", margin: "1px" },
              }}
              InputLabelProps={{ style: { color: "white" } }} // Change label color
              sx={{
                margin: "5px",
                // width: "130%",
                borderRadius: "4px",
                background: "rgb(115, 135, 135)",
                border: "1px solid rgb(188, 189, 163)", // Add border color
                '& .MuiFilledInput-input.Mui-disabled': {
                  WebkitTextFillColor: '#FFFFFF !important',
                },
              }}
            />
            <br />
            <TextField
              id="filled-basic"
              label="Review"
              variant="filled"
              size="small"
              value={feedback}
              onChange={handleFeedbackChange}
              InputProps={{
                disableUnderline: true,
                style: { color: "white", margin: "1px" },
              }}
              InputLabelProps={{ style: { color: "white" } }} // Change label color
              sx={{
                margin: "5px",
                // width: "130%",
                borderRadius: "4px",
                background: "rgb(115, 135, 135)",
                border: "1px solid rgb(188, 189, 163)", // Add border color
              }}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "5px 40px 5px 30px",
                display: "flex",
                // margin: "10px 0px 0px 2%",
                margin: "10px auto", // Center button
                alignItems: "center",
                borderRadius: "4px", // Add border radius
                boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                  color: "rgb(50, 50, 50)", // Change text color on hover
                  boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
        <Box>
          <img
            src="../../../Images/footer_img.svg"
            alt="Right Arrow"
            style={{ marginRight: "5px", width: "90%" }} // Adjust margin between image and text
          />
        </Box>
      </Box>
      <Typography
        sx={{
          color: "rgb(196, 196, 196)",
          textAlign: { xs: "right", sm: "center" },
          padding: "5px 0px 5px 15px",
          fontWeight: "500",
          fontSize: "16px",
          fontFamily: "Outfit",
          letterSpacing: "0pxf",
          marginRight: { xs: "20px", lg: "10%" },
        }}
      >
        ©2024 All Rights Reserved <br/>
        Designed by <span style={{color : "rgb(247, 230, 173)"}}>Amarya Business Consultancy</span>
      </Typography>
    </div>
  );
};

export default Footer;
