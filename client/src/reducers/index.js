import { combineReducers } from 'redux';
import {GET_ALL_PRODUCT, GET_NUMBER_CART,ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART, SET_CURRENT_USER} from  '../actions';

const initProduct = {
    numberCart:0,
    Carts:[],
    _products:[]
}

function todoProduct(state = initProduct,action){
    switch(action.type){
        case GET_ALL_PRODUCT: 
            return{
                ...state,
                _products:action.payload
            }
        case GET_NUMBER_CART:
                return{
                    ...state
                }
        case ADD_CART:
            if(state.numberCart===0){
                let cart = {
                    id:action.payload._id,
                    quantity:1,
                    name:action.payload.name,
                    images:action.payload.images,
                    price:action.payload.price
                } 
                state.Carts.push(cart); 
            }
            else{
                let check = false;
                state.Carts.map((item,key)=>{
                    if(item._id===action.payload._id){
                        state.Carts[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        id:action.payload._id,
                        quantity:1,
                        name:action.payload.name,
                        images:action.payload.images,
                        price:action.payload.price
                    }
                    state.Carts.push(_cart);
                }
            }
            return{
                ...state,
                numberCart:state.numberCart+1
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
              
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
              
                return{
                    ...state
                }
            case DELETE_CART:
                let quantity_ = state.Carts[action.payload].quantity;
                return{
                    ...state,
                    numberCart:state.numberCart - quantity_,
                    Carts:state.Carts.filter(item=>{
                        return item.id!==state.Carts[action.payload].id
                    })
                   
                }
        default:
            return state;
    }
}
const initialState = {
    isAuth: false,
    user: null
}

function session (state = initialState, { type, payload }) {
    switch (type) {
    case SET_CURRENT_USER:
    return {
       isAuth :true,
       user: payload
    };
    default:
        return state
    }
}
const ShopApp = combineReducers({
    _todoProduct:todoProduct,
    _session: session
});
export default ShopApp;