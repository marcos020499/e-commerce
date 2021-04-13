import React, { Component } from 'react'
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import {AddCart} from '../../actions'
import {connect} from 'react-redux';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        this.fetchData();
      }
      fetchData() {
          axios.get('/api/productos/listar') 
          .then(response => {
            this.setState({
              data: response.data.products
            })
          })
          .catch(err => console.log(err))
      }
    render() {
        const {data} = this.state;
           return (
                <div className="row">
                {
                    data.map((item,index)=>(
                    <div key={index} className="containerProduct" >
                        <div className='imgProduct'>
                            <img  src={`/`+item.images} alt='hello'/>
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

function mapDispatchToProps(dispatch){
    return{
        AddCart:item=>dispatch(AddCart(item))
     
    }
}
export default 
  withRouter(connect(null,mapDispatchToProps)(index))
