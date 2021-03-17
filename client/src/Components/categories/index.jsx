import React, { Component } from 'react'
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';
import { withRouter} from 'react-router-dom';
import {AddCart} from '../../actions'
import {connect} from 'react-redux';
import computer from '../../Images/computer.jpg'
import phone from '../../Images/phones.jpg'
import tv from '../../Images/tv samsung.png'
toast.configure();
class index extends Component {


  render() {
    return (

      <div className='categories'>   
        <h1>CATEGORIES</h1>
        <div className='productContainer1'>
          <a  href='/categories/phone'>
            <img  src={phone}/>
            <h4>Phones</h4>
          </a>
        </div>
        <div className='productContainer1'>
          <a  href='/categories/computer' className='productContainer'>
            <img  src={computer}/>
            <h4>Computer</h4>
          </a>
        </div>
        <div className='productContainer1'>
          <a  href='/categories/tv' className='productContainer'>
            <img  src={tv}/>
            <h4>Tv</h4>
          </a>
        </div>
      </div>
    )
  
  }
}
function mapDispatchToProps(dispatch){
  return{
      AddCart:item=>dispatch(AddCart(item))
   
  }
}
export default 
withRouter(connect(null,mapDispatchToProps)(index))
