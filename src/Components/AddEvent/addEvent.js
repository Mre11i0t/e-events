import React from "react";
import styles from "./addEvent.module.css";
import { TextField, Button, FormControl, InputLabel } from "@material-ui/core";
import ResponsiveFontSizes from "./ResponsiveTypography";
import Navbar from "../Layout/Navbar";
import Axios from "axios";
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline"
const AddEvent = () => {
  const [event, setEvent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [start, setStart] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [error, setError] = React.useState("");
  const AddComplete = async(e)=>{
    try{
      var Arr = {
        eventname:event,
        description:description,
        start:start,
        end:end,
        url:url,
        imagelink:imageURL,
      };
      e.preventDefault();
      let token = localStorage.getItem('auth-token');
      await Axios.post("http://localhost:5000/events/addEvent",Arr,{headers:{'x-auth-token':token}})
      console.log("success");
      alert("Event Added")
    }
    catch(err){
      if(err.response.data.msg) setError(err.response.data.msg);
    }
  }
  return (
    <div>
      <Navbar/>
      <form className={styles.container} onSubmit={AddComplete}>
        <ResponsiveFontSizes
          className={styles.heading}
          variant="h4"
          content="Add New Event"
        />
        <br></br>
        <div className={styles.details}>
          <div className={styles.uploadImage}>
            <div className={styles.mainImageContainer}>
              <img src={imageURL} className={styles.mainImage} />
            </div>
          </div>
          <div className={styles.info}>
            <TextField
              variant="outlined"
              label="Event Name"
              size="small"
              className={styles.EventName}
              required
              onChange={(event) => {
                setEvent(event.target.value);
              }}
              id="EventName"
              value={event}
              fullWidth
            />
            <TextField
              variant="outlined"
              label="Image URL"
              size="small"
              className={styles.ImageURL}
              required
              onChange={(event) => {
                setImageURL(event.target.value);
              }}
              id="ImageURL"
              value={imageURL}
            />
            <div className={styles.PriceandQuantity}>
              <TextField
                variant="outlined"
                label="Start"
                size="small"
                className={styles.Price}
                onChange={(event) => {
                  setStart(event.target.value);
                }}
                required
                id="Start"
                value={start}
              />
              <TextField
                variant="outlined"
                label="End"
                size="small"
                className={styles.Quantity}
                required
                id="end"
                onChange={(event) => {
                  setEnd(event.target.value);
                }}
                value={end}
              />
            </div>
            <div className={styles.PriceandQuantity}>
              <TextField
                variant="outlined"
                label="URL"
                size="small"
                className={styles.Quantity}
                required
                id="URL"
                onChange={(event) => {
                  setUrl(event.target.value);
                }}
                value={url}
              />
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <TextField
            variant="outlined"
            label="Description"
            size="small"
            className={styles.Description}
            rowsMax={5}
            multiline
            id="Description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
            fullWidth
            rows={4}
          />
        </div>
        <Button className={styles.addBtn} type="submit">
          ADD
        </Button>
      </form>
      <Grid item>
              {
                (error)?<>
                <Box style={{ backgroundColor:'#E6B0AA'}} fullwidth="true">
                <Grid container>
                <Grid item  md={4}>
                <ErrorOutlineIcon style={{color:'B00020'}}/>
                </Grid>
                <Grid item  md={4}>
                <Typography style = {{color:'#B00020', textAlign:"center"}}>
                  {error}
                </Typography>
                </Grid>
                </Grid>
                </Box>
                </>:<>
                </>
              }
      </Grid>
    </div>
  );
};

export default AddEvent;
