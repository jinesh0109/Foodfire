import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../component/CartSlice";

const store = configureStore({
    reducer:{
        cart:CartSlice,
    }
}) 
export default store;