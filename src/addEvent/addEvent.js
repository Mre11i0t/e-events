import React from "react";
import styles from "./AddProduct.module.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import SearchContext from "../../Context/searchContext";
import debounce from "lodash.debounce";
import Categories from "../Categories/Categories";
import Rating from "@material-ui/lab/Rating";
import ResponsiveFontSizes from "./ResponsiveTypography";

const AddProduct = () => {
  // const {
  //   AddProduct,
  //   setAddProduct,
  //   categories,
  //   subCategories,
  // } = React.useContext(SearchContext);
  const [price, setPrice] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [rating, setRating] = React.useState(2);
  const [subCategory, setSubCategory] = React.useState("");
  const [NewSubCategory, setNewSubCategory] = React.useState();
  const [NewCategory, setNewCategory] = React.useState();
  const [description, setDescription] = React.useState("");
  const [product, setproduct] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [State, setState] = React.useState("");
  const [image, setImage] = React.useState(false);
  const [Quantity, setQuantity] = React.useState("");
  // const ListofCategories = categories;
  // const ListofSubCategories = subCategories;

  // let Timeout;

  const ImageURL = (event) => {
    // clearTimeout(Timeout)
    setImageURL(event.target.value);
    // Timeout = setTimeout(()=>{
      setImage(true)
    //   console.log("Timer...")
    // },1000);
    // setImage(false);
    // debounceValue(event.target.value);
  };

  // const debounceValue = React.useRef(
  //   debounce((url) => {
  //     setImage(true);
  //   }, 1000)
  // ).current;

  const handleAdd = (event) => {
    event.preventDefault();
    var Arr = {
      Product_Name: product,
      Image_URL: imageURL,
      price,
      category,
      description,
      Quantity,
      NewCategory,
      NewSubCategory,
      subCategory,
      rating,
    };
    // setAddProduct([...AddProduct, Arr]);
    console.log("Add Product", AddProduct);
    setState(Arr);
  };

  return (
    <form className={styles.container} onSubmit={handleAdd}>
      <ResponsiveFontSizes
        className={styles.heading}
        variant="h4"
        content="Add New Product"
      />
      <div className={styles.details}>
        <div className={styles.uploadImage}>
          {!image ? (
            <div className={styles.mainImageSkeleton}>Upload Image</div>
          ) : (
            <div className={styles.mainImageContainer}>
              <img src={imageURL} className={styles.mainImage} />
            </div>
          )}
          <div className={styles.otherImagesContainer}>
            <div className={styles.otherImage}></div>
            <div className={styles.otherImage}></div>
            <div className={styles.otherImage}></div>
            <div className={styles.otherImage}></div>
          </div>
        </div>
        <div className={styles.info}>
          <TextField
            variant="outlined"
            label="Product Name"
            size="small"
            className={styles.ProductName}
            required
            onChange={(event) => {
              setproduct(event.target.value);
            }}
            id="ProductName"
            value={product}
          />
          <TextField
            variant="outlined"
            label="Image URL"
            size="small"
            className={styles.ImageURL}
            required
            onChange={ImageURL}
            id="ImageURL"
            value={imageURL}
          />
          <div className={styles.PriceandQuantity}>
            <TextField
              variant="outlined"
              label="Price"
              size="small"
              className={styles.Price}
              onChange={(event) => {
                setPrice(parseInt(event.target.value));
              }}
              required
              id="Price"
              value={price}
              type="number"
            />
            <TextField
              variant="outlined"
              label="Quantity"
              size="small"
              className={styles.Quantity}
              required
              id="Quantity"
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
              value={Quantity}
            />
          </div>
          <div className={styles.CategoryAndSubCategory}>
            <FormControl
              required
              variant="outlined"
              className={styles.Category}
            >
              <InputLabel id="demo-simple-select-outlined-required-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-required-label"
                id="demo-simple-select-required-outlined"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                label="Category"
                size="small"
              >
                {ListofCategories.map((category) => {
                  return (
                    <MenuItem value={category.value}>{category.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              required
              variant="outlined"
              className={styles.SubCategory}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Sub Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={category === "Other.." ? "Other.." : subCategory}
                onChange={(event) => {
                  category === "Other.."
                    ? setSubCategory(category)
                    : setSubCategory(event.target.value);
                }}
                inputProps={{ readOnly: category === "Other.." }}
                label="Sub Category"
                size="small"
              >
                {ListofSubCategories.map((Subcategory) => {
                  return (
                    <MenuItem value={Subcategory.value}>
                      {Subcategory.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          {category === "Other.." ? (
            <div className={styles.NewCategoryAndNewSubCategory}>
              <TextField
                variant="outlined"
                label="Category"
                size="small"
                className={styles.NewCategory}
                onChange={(event) => {
                  setNewCategory(event.target.value);
                }}
                required
                id="first"
                value={NewCategory}
              />
              <TextField
                variant="outlined"
                label="Sub Category"
                size="small"
                className={styles.NewSubCategory}
                required
                id="SubCategory"
                onChange={(event) => {
                  setNewSubCategory(event.target.value);
                }}
                value={NewSubCategory}
              />
            </div>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
          <div className={styles.ratings}>
            <p>KR RATING</p>
            <Rating
              id="rating"
              name="simple-controlled"
              value={rating}
              onChange={(event) => setRating(parseInt(event.target.value))}
              size="medium"
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
  );
};

export default AddProduct;
