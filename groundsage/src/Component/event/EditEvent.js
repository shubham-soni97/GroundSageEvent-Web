import {
    Box,
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    colors,
  } from "@mui/material";
  import dayjs from "dayjs";
  import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import IconButton from "@mui/material/IconButton";
  import AttachFileIcon from "@mui/icons-material/AttachFile";
  import { useContext, useRef, useState } from "react";
  import { toast } from "react-toastify";
  import axios from "axios";
import { AuthContext } from "../../ContextApi/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
  

export default function EditEvent({ selectedItem , handleSaveEvent , setFile}){
    const navigate = useNavigate();
    const [openCalendar1, setOpenCalendar1] = useState(false);
    const [openCalendar2, setOpenCalendar2] = useState(false);
    const [fromDate , setFromDate] = useState(dayjs(selectedItem?.start_date));
    const [toDate , setToDate] = useState(dayjs(selectedItem?.end_date));
    const [file, setFIle] = useState(selectedItem?.images);
    const {user} = useContext(AuthContext);
    const eventNameElement = useRef(null);
    const fromDateElement = useRef(null);
    const toDateElement = useRef(null);
    const descriptionElement = useRef(null);
    const [publicIds, setPublicIds] = useState([]);

    const handleOpenCalender1 = () => {
      setOpenCalendar1(true);
    }

    const handleOpenCalender2 = () => {
      setOpenCalendar2(true);
    }

    const handleDeleteClick = (item) => {
      const newFile = file?.filter((i) => i.public_id != item?.public_id);
      setFIle(newFile);
      setPublicIds((prevPublicIds) => [...prevPublicIds , item?.public_id]);
    }

    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
      // Handle the uploaded file
      files?.forEach(file => {
        if (file) {
          // Check if file size is greater than 100KB (100 * 1024 bytes)
          if (file.size > 1 * 1024 * 1024) {
            toast.error('File size should not exceed 1MB' , {
              style: {
                // Change font color
                fontSize: "16px", // Change font size
                fontFamily: "Inter", // Change font family
                fontWeight: "600", // Change font weight
                color: "rgb(66, 92, 90)",
              },
            });
            return;
          }
        }
      });
      // files coming from the create event page...
      setFile(files);
    };

    const handleClearFile = (index) => {
      setFIle((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    const handleSave = () => {
      let formattedFromDate = fromDateElement.current.value.split('/');
      let temp = formattedFromDate[0];
      formattedFromDate[0] = formattedFromDate[1]
      formattedFromDate[1] = temp;
      formattedFromDate = formattedFromDate.reverse().join('-');
      let formattedToDate = toDateElement.current.value.split('/');
      let tempTodate = formattedToDate[0];
      formattedToDate[0] = formattedToDate[1]
      formattedToDate[1] = tempTodate;
      formattedToDate = formattedToDate.reverse().join('-');
        const formattedPublicIds = "[" + publicIds?.map((id) => `"${id.trim()}"`).join(",")+"]";
        const  body = { 
          event_name : eventNameElement.current.value,
          start_date : formattedFromDate,
          end_date : formattedToDate,
          event_description : descriptionElement.current.value,
          public_ids : formattedPublicIds
          // user_id : user?.user_id,
        }

     handleSaveEvent(body);
     
    }
    return (
      <Box sx={{ backgroundColor: "rgb(66, 92, 90)" , paddingBottom :"20px" }}>
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
        <Typography
          variant="h3"
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            padding: "20px 0px",
            fontWeight: "600",
            textShadow: "0 6px rgba(81,67,21,0.8)",
            fontSize: { xs: "30px",sm:"40px", md: "56px" },
          }}
        >
          Edit Events
        </Typography>
        <Box sx={{display : "flex" , justifyContent : "center" , alignItems : "center" , } }>
            <Box sx={{ alignContent : "center" , width : "60%" ,  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2) , -5px -5px 10px rgba(0, 0, 0, 0.2)" , borderRadius : "10px"  ,padding : "40px"}}>
              <TextField
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                    fontSize: { xs: "18px"},
                  },
                  "& .MuiInput-underline::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "18px" }, // Set input font size here
                  },
                  width: "100%",
                  margin: "10px 0px ",
          
                }}
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                id="standard-basic"
                label="Event Name"
                variant="standard"
                inputRef={eventNameElement}
                defaultValue={selectedItem?.event_name}
              />
              <div><Typography sx ={{
                        fontSize: "14px",
                        position: "absolute",
                        paddingTop: "6px",
                        color : "white"
                  }
                  }>From Date</Typography></div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
                >
                  <DatePicker
                    labelId="from-date-label"
                    value={dayjs(fromDate)}
                    onChange={(newValue) => console.log(newValue.$d)} // Handle onChange event if needed
                    open={openCalendar1}
                    minDate={dayjs(fromDate)}
                    onOpen={handleOpenCalender1}
                    onClose={() => setOpenCalendar1(false)}
                    inputRef={fromDateElement}
                    slotProps={{
                      textField: {
                        InputProps: {
                          endAdornment: (
                            <img
                              src="image-4.png"
                              style={{ cursor: "pointer" }}
                              onClick={handleOpenCalender1}
                            />
                          ),
                        },
                        InputLabelProps: {
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        borderRadius: "none",
  
                      },
                      "& .MuiInputBase-input-MuiOutlinedInput-input": {
                        color: "white",
                      },
                    //   "& :hover": {
                    //     borderBottom: " 1px solid rgb(188, 189, 163)",
                    //   },
                      "& .MuiInputBase-input-MuiOutlinedInput-input" : {
                        color : "white"
                      },

                      "& .MuiOutlinedInput-root" : {
                        borderRadius : "0px",
                        borderBottom: " 1px solid rgb(188, 189, 163)",
                        fontSize: "18px",
                      },
                      "& .MuiOutlinedInput-input" : {
                        paddingLeft : "1px",
                        color : "white", 
                        paddingBottom : "4px"
                      }
                    }}
                    defaultValue={selectedItem?.start_date}
                  />
                </FormControl>
              </LocalizationProvider>
              <div><Typography sx ={{
                        fontSize: "14px",
                        position: "absolute",
                        paddingTop: "6px",
                        color : "white"
                  }
                  }>To Date</Typography></div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
                >
                  <DatePicker
                    labelId="to-date-label"
                    value={dayjs(toDate)}
                    onChange={(newValue) => setToDate(newValue.$d)} // Handle onChange event if needed
                    open={openCalendar2}
                    onOpen={handleOpenCalender2}
                    onClose={() => setOpenCalendar2(false)}
                    minDate={dayjs(fromDate)}
                    inputRef={toDateElement}
                    slotProps={{
                      textField: {
                        InputProps: {
                          endAdornment: (
                            <img
                              src="image-4.png"
                              style={{ cursor: "pointer" }}
                              onClick={handleOpenCalender2}
                            />
                          ),
                        },
                        InputLabelProps: {
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                            borderRadius: "none",
      
                          },
                          "& .MuiInputBase-input-MuiOutlinedInput-input": {
                            color: "white",
                          },
                        //   "& :hover": {
                        //     borderBottom: " 1px solid rgb(188, 189, 163)",
                        //   },
                          "& .MuiInputBase-input-MuiOutlinedInput-input" : {
                            color: "white",
                          },
                          "& .MuiOutlinedInput-root" : {
                            borderRadius : "0px",
                            borderBottom: " 1px solid rgb(188, 189, 163)",
                            fontSize: "18px",
                          },
                          "& .MuiOutlinedInput-input" : {
                            paddingLeft : "1px",
                            color : "white" ,
                            paddingBottom : "4px"
                          }

                    }}
                    defaultValue={selectedItem?.end_date}
                  />
                </FormControl>
              </LocalizationProvider>
              <TextField
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                    fontSize: { xs: "18px"},
                  },
                  "& .MuiInput-underline::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "18px" }, // Set input font size here
                  },
                  width: "100%",
                  margin: "10px 0px ",
                }}
                id="standard-basic"
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={
                  {
                  style: {
                    color: "white",
                  },
                }}
                inputRef={descriptionElement}
                label="Description"
                variant="standard"
                defaultValue={selectedItem?.event_description}
              />
            <div>
              <TextField
                id="upload-text"
                label="Add Event Image (Format: png, jpg)"
                variant="standard"
                value={file.map((item) => item?.original_filename)}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                    fontSize: { xs: "18px"},
                  },
                  "& .MuiInput-underline::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  width: "100%",
                  margin: "10px 0px ",
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "18px" }, // Set input font size here
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                  endAdornment: (
                    <IconButton
                      edge="end"
                      component="label"
                      htmlFor="upload-file"
                      sx={{ color: "rgb(188, 189, 163)" }}
                    >
                      <AttachFileIcon />
                      <input
                        type="file"
                        id="upload-file"
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </IconButton>
                  ),
                }}
              />
              <div>
                {file?.map((item) => {
                  return(
                  <div>
                    <span style={{color : "white"}}>{item?.original_filename}</span>
                    <img
                    src="deleteIcon.png"
                    alt="delete Icon"
                    style={{ padding: "4px", height: "15px", cursor: "pointer" }}
                    onClick={() => handleDeleteClick(item)}
                  />
                  </div>);
                })}
              </div>
              {/* <List>
            {file?.map((file, index) => (
              <ListItem key={index} sx={{ padding: 0, marginTop: 1 }}>
                <ListItemText
                  primary={file.name}
                  sx={{ color: "rgb(255, 255, 255)" }}
                />
                <IconButton
                  edge="end"
                  onClick={() => handleClearFile(index)}
                  sx={{ color: "rgb(188, 189, 163)" }}
                >
                  <ClearIcon />
                </IconButton>
              </ListItem>
            ))}
          </List> */}
              </div>
            </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop:"20px"
              }}
            >
              <Button
                variant="contained"
                sx={{
                  ":hover" : {
                    backgroundColor : "rgb(247, 230, 173)"
                  },
                  backgroundColor: "rgb(247, 230, 173) ",
                  color: "rgb(91, 94, 97)",
                  minWidth: "200px",
                  fontWeight: "600",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          
        
      </Box>
    );
}