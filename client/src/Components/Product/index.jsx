import React, { Component } from 'react'
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';
import { withRouter, Link } from 'react-router-dom';

import {actFetchProductsRequest,AddCart} from '../../actions'
import {connect} from 'react-redux';
class index extends Component {
    componentDidMount(){
        this.props.actFetchProductsRequest();
    }
    
    render() {
        const {_products} = this.props._products;
           return (
                <div className="row">
                {
                    _products.map((item,index)=>(
                    <div key={index} className="containerProduct" >
                        <div className='imgProduct'>
                            <img  src={`http://localhost:8080/uploads/${item.name}.png`}/>
                        </div>
                        <h4>name: {item.name}</h4>
                        <h5>available quantity: {item.available_quantity}</h5>
                        <h5>price: {item.price}</h5>
                        <a className='fa fa-cart-plus' style={{cursor:'pointer'}} onClick={()=>this.props.AddCart(item)}></a>
                        <Link to={'/products/details/'+item._id} className='moreInfo' style={{color: 'rgb(157, 8, 152)', position: 'relative', right: '-14%', fontSize: '2vw'}}>More info</Link>
                        </div>
                    ))
                }
                </div>
            ) 
        }
        
    }


const mapStateToProps = state =>{
    return {
         _products: state._todoProduct,
       };
}
function mapDispatchToProps(dispatch){
    return{
        actFetchProductsRequest:()=>dispatch(actFetchProductsRequest()),
        AddCart:item=>dispatch(AddCart(item))
     
    }
}
export default 
  withRouter(connect(mapStateToProps,mapDispatchToProps)(index))
