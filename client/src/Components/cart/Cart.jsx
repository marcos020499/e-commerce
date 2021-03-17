import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './style.scss';
import {IncreaseQuantity,DecreaseQuantity,DeleteCart} from '../../actions';

function Cart({items,IncreaseQuantity,DecreaseQuantity,DeleteCart}){
    let ListCart = [];
    let TotalCart=0;
    Object.keys(items.Carts).forEach(function(item){
        TotalCart+=items.Carts[item].quantity * items.Carts[item].price;
        ListCart.push(items.Carts[item]);
    });
    function TotalPrice(price,tonggia){
        return Number(price * tonggia).toLocaleString('en-US');
    }   
    return(
        <div className="row">
            <div className="col-md-12">
            <table className="table">
                <thead>
                    <tr>
                        <th>Names</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                {
                    ListCart.map((item,key)=>{
                        return(
                            <tr key={key}>    
                            <td><span className="badge badge-danger" onClick={()=>DeleteCart(key)}>X</span></td>
                            <td style={{color:'blue'}}>{item.name}</td>
                            <td><img src={'http://lorempixel.com/640/480/sports'} style={{width:'200px',height:'100px'}}/></td>
                            <td>{item.price} $</td>
                            <td>
                                    <span className="btn-primary" style={{margin:'2px'}} onClick={()=>DecreaseQuantity(key)}>-</span>
                                    <span className="btn-info">{item.quantity}</span>
                                    <span className="btn-primary" style={{margin:'2px'}} onClick={()=>IncreaseQuantity(key)}>+</span>
                            </td>
                            <td>{ TotalPrice(item.price,item.quantity)} $</td>
                        </tr>
                        )
                    })     
                }
                <tr>
                    <td colSpan="5">Total Carts</td>
                    <td>{Number(TotalCart).toLocaleString('en-US')} $</td>
                </tr>
                </tbody>
              
            </table>
            </div>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        items:state._todoProduct
    }
}

export default withRouter(connect(mapStateToProps,{IncreaseQuantity,DecreaseQuantity,DeleteCart})(Cart))
