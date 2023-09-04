import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
    },
    reducers:{
        addItems:(state,actions)=>{
            state.items.push(actions.payload);
        },
        removeCartItems:(state)=>{
            state.items=[];
        }
    }
})

export const {addItems,removeCartItems} = CartSlice.actions;

export default CartSlice.reducer;

