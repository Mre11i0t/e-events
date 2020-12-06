import React from "react";
import styles from "./addEvent.module.css";
import { TextField, Button, FormControl, InputLabel } from "@material-ui/core";
import ResponsiveFontSizes from "./ResponsiveTypography";
import Navbar from "../Layout/Navbar";

const AddEvent = () => {
  const [event, setEvent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [host, setHost] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [State, setState] = React.useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    var Arr = {
      Event_Name: event,
      Image_URL: imageURL,
      description,
      host,
      description,
      platform,
      date,
      time,
    };
    setState(Arr);
  };

  return (
    <div>
      <Navbar/>
      <form className={styles.container} onSubmit={handleAdd}>
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
                label="Host"
                size="small"
                className={styles.Price}
                onChange={(event) => {
                  setHost(event.target.value);
                }}
                required
                id="Host"
                value={host}
              />
              <TextField
                variant="outlined"
                label="Quantity"
                size="small"
                className={styles.Quantity}
                required
                id="Quantity"
                onChange={(event) => {
                  setPlatform(event.target.value);
                }}
                value={platform}
              />
            </div>
            <div className={styles.PriceandQuantity}>
              <TextField
                variant="outlined"
                label="Date"
                size="small"
                className={styles.Price}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
                required
                id="Date"
                value={date}
              />
              <TextField
                variant="outlined"
                label="Time"
                size="small"
                className={styles.Quantity}
                required
                id="Time"
                onChange={(event) => {
                  setTime(event.target.value);
                }}
                value={time}
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
    </div>
  );
};

export default AddEvent;
