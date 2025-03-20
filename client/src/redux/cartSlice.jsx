import { createSlice } from "@reduxjs/toolkit";
import {message} from "antd";

const cartSlice= createSlice({
    name:"mycart",
    initialState:{
        cart:[]
    },

    reducers:{
        addtoCart:(state, actions)=>{
            const proData= state.cart.filter(key=>key.id==actions.payload.id);
            console.log(proData);
            if (proData.length>=1)
            {
               alert("Product aleready added!");
            }
            else
            {
            state.cart.push(actions.payload);
            alert("Product succesfully added!");
            }           
        },

        qntyIncrease:(state, actions)=>{
            for (var i=0; i<state.cart.length; i++)
            {
                if (state.cart[i].id==actions.payload.id)
                {
                    state.cart[i].qnty++;
                }
            }
        },
        qntyDecrease:(state, actions)=>{
            for (var i=0; i<state.cart.length; i++)
            {
                if (state.cart[i].id==actions.payload.id)
                {
                    if (state.cart[i].qnty<=1)
                    {
                        alert("You can not decrease more than 1 ")
                    }
                    else 
                    {
                        state.cart[i].qnty--;
                    }
                }
            }
        },

        productRemove:(state, actions)=>
        {
            state.cart=state.cart.filter(key=>key.id!=actions.payload.id);
        }
    }
})


export const {addtoCart, qntyIncrease, qntyDecrease, productRemove} = cartSlice.actions;
export default cartSlice.reducer;