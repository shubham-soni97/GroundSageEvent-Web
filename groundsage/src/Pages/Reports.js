import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Card,
  CardContent,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  PieChart,
  Pie,
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
} from "recharts";
import axios from "axios";
import { AuthContext } from "../ContextApi/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const icons = [
  "Group 33700.png",
  "Group 33712.png",
  "Group 33715.png",
  "Group 33716.png",
  "Group 33713.png",
  "Group 33709.png",
];

const iconsPath = [
  "/incomereport",
  "/expensereport",
  "/outstandingreport",
  "/netpayablereport",
  "/tenantsreport",
  "/occupancyreport",
];
const Reports = () => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("year");
  const [selectedPieOption, setSelectedPieOption] = useState("2022");
  const {user , activeEventId} = useContext(AuthContext);
  const [yearlyReport , setYearlyReport] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const fetchYearlyReportData = async () => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/transaction/fetch-all-years-data` , {
        flag: chartType,
        type:"income",
        event_id: activeEventId
      },
      {
        headers : {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
        }
      });
      if(chartType === "year"){
        setYearlyReport(res?.data?.data?.map((item) => ( 
          { year: item?.year, income: item?.total }
        )));
      }else{
        setYearlyReport(res?.data?.data?.map((item) => ( 
          { month: item?.month, income: item?.total }
        )));
      }
      
    }catch(err){
      console.log(err);
      toast.error(err?.response?.data?.message , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
  }
}

  const fecthYearlyData = async() => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/transaction/fetch-yearly-data` , 
        {
          year: selectedPieOption,
          type: "income", // expense or income
          event_id: activeEventId
      } ,{
        headers : {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
        }
      })
      setPieChartData(res?.data?.data);
    }catch(err){
      toast.error(err?.response?.data?.message , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
    }
  }
  useEffect(()=> {
    fetchYearlyReportData();
    fecthYearlyData();
  },[]);

  // Data representing yearly income
  const yearlyData = [
    { year: "2022", income: 50000 },
    { year: "2023", income: 60000 },
    { year: "2024", income: 70000 },
    { year: "2025", income: 70000 },
    { year: "2021", income: 70000 },
    { year: "2020", income: 70000 },
    { year: "2019", income: 10000 },
    { year: "2018", income: 70000 },
  ];
  const handlePieOptionChange = (event) => {
    setSelectedPieOption(event.target.value);
  };
  const monthlyData = [
    { month: "Jan", income: 5000 },
    { month: "Feb", income: 6000 },
    { month: "Mar", income: 7000 },
    { month: "Apr", income: 8000 },
    { month: "May", income: 9000 },
    { month: "Jun", income: 10000 },
    { month: "Jul", income: 11000 },
    { month: "Aug", income: 12000 },
    { month: "Sep", income: 13000 },
    { month: "Oct", income: 14000 },
    { month: "Nov", income: 15000 },
    { month: "Dec", income: 16000 },
  ];
  const expenseData = [
    { name: pieChartData?.shop_rental_total ? "Shop Rental" : "Staff Salary", value: pieChartData?.shop_rental_total ? pieChartData?.shop_rental_total : pieChartData?.staff_salary_total, fill: "rgb(236, 219, 163)" },
    { name: "Others", value: pieChartData?.others_total, fill: "rgb(63, 128, 101)" },
  ];
  const years = ["2022", "2023", "2024"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };
  const CustomIcon = (
    <img
      src="../../Images/image 87.png" // Change the image path to the desired image
      alt="Icon"
      style={{
        // width: "20px",
        // height: "20px",
        margin: "0px 5px 0px -10px",
      }}
    />
  );
  // const data = chartType === "year" ? yearlyData : monthlyData;
  const data = yearlyReport;
  const xAxisDataKey = chartType === "year" ? "year" : "month";
  const pieOptions = chartType === "year" ? years : months;
  const selectedYearData = yearlyReport?.find(
    (item) => item.year === selectedPieOption
  );
  if (selectedYearData) {
    expenseData[0].value = selectedYearData.income * parseInt(expenseData[0].value)/parseInt(pieChartData?.total); // Assuming 60% of income is shop rental
    expenseData[1].value = selectedYearData.income * parseInt(expenseData[1].value)/parseInt(pieChartData?.total); // Assuming 40% of income is others
  }
  const selectedMonthData = yearlyReport?.find(
    (item) => item.month === selectedPieOption
  );
  if (selectedMonthData) {
    // Assuming 60% of income is shop rental and 40% is others
    expenseData[0].value = selectedMonthData.income * 0.6; // Shop Rental
    expenseData[1].value = selectedMonthData.income * 0.4; // Others
  }

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        // minHeight: "100vh",
        padding: "20px",
      }}
    >
        <Box
          component='img'
          src="../../Images/arrow-left.png"
          alt="Share"
          sx={{
            cursor: "pointer",
            width: {xs:"35px",md:"45px"},
            margin: {xs:"20px 0px 0px 20px",md:"10px 0px 0px 20px"},
          }}
          onClick={() => {
            navigate(-1); // Navigate back by one step in the history stack
          }}
        />
      <ToastContainer/>
  
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: { xs: "30px", sm: "40px", md: "56px" },
          fontFamily: "Inter",
          fontWeight: "700",
          marginTop: {xs:"0px",md:"-40px"},
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          marginBottom: "20px",
        }}
      >
        Reports
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          margin: "0px 5% 5px 5%",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            padding: "20px",
            width: { xs: "90%", md: "45%" },
            marginBottom: { xs: "20px", md: "0" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontFamily: "Inter",
                color: "rgb(34, 34, 34)",
                fontWeight: "600",
                fontSize: { xs: "18px", md: "22px" },
                margin: "0px 10px 20px 0px",
              }}
            >
              Total Income
            </Typography>
            <Box
              sx={{
                marginLeft: "20px",
                width: "25%",
                background: "rgba(217, 217, 217, 0.3)",
                marginBottom: "25px",
              }}
            >
              <Select
                value={chartType}
                onChange={handleChartTypeChange}
                fullWidth
                size="small"
                sx={{
                  color: "rgb(0, 0, 0)",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  fontSize: "16px",
                  // borderRadius: "0px",
                  background: "rgba(217, 217, 217, 0.3)",
                }}
                // Remove the native select dropdown arrow
                IconComponent={() => CustomIcon}
              >
                <MenuItem value="year">Year</MenuItem>
                <MenuItem value="month">Month</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box sx={{ width: "100%", height: "40vh" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey={xAxisDataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="rgb(63, 128, 101)" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Card sx={{ width: { xs: "100%", md: "49%" } }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "Inter",
                  color: "rgb(34, 34, 34)",
                  fontWeight: "600",
                  fontSize: { xs: "18px", md: "22px" },
                  marginLeft: "5%",
                }}
              >
                Income chart basis on Type
              </Typography>
              <Box sx={{ marginLeft: "20px", width: "20%" }}>
                <Select
                  value={selectedPieOption}
                  onChange={handlePieOptionChange}
                  fullWidth
                  size="small"
                  sx={{
                    color: "rgb(0, 0, 0)",
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: "16px",
                    // borderRadius: "0px",
                    background: "rgba(217, 217, 217, 0.3)",
                  }}
                  // Remove the native select dropdown arrow
                  IconComponent={() => CustomIcon}
                >
                  {yearlyReport?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {chartType === "year" ? option?.year : option?.month?.split(" ")[0]}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <PieChart width={300} height={300}>
                <RechartsTooltip position="top" />
                <RechartsLegend verticalAlign="top" height={46} />
                <Pie
                  dataKey="value"
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={`slice-${index}`}
                      data={entry}
                      fill={entry.fill}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Typography
          sx={{
            color: "rgb(155, 181, 199)",
            textAlign: "center",
            fontSize: { xs: "24px", md: "36px" },
            fontFamily: "Aoboshi One",
            fontWeight: "400",
            marginTop: "20px",
          }}
        >
          See All Reports
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            margin: "25px 9% 5px 8%",
          }}
        >
          {icons.map((icon, idx) => {
            return (
              <Box
                component="img"
                key={idx}
                src={`../../../Images/${icon}`}
                alt="Icon"
                sx={{
                  height: { xs: "23vw", md: "9vw" },
                  cursor: "pointer",
                  margin: "5px",
                }}
                onClick={() => {
                  navigate(`${iconsPath[idx]}`);
                }}
              />
            );
          })}
        </Box>
      </Box>
    </div>
  );
};
export default Reports;
