import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/productSlice";
import categoryReducer from "./categorySlice";
import subCategoryReducer from "./subCategorySlice";
import smithReducer from "./smithSlice";

const store = configureStore({

  reducer: {
    products: productReducer,
     category: categoryReducer,
    subcategory: subCategoryReducer,
    smiths: smithReducer,
  },

});

export default store;
