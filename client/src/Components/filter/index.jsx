import React, { Component } from 'react'
import './style.scss';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';
import { Link, withRouter} from 'react-router-dom';
import {AddCart} from '../../actions'
import {connect} from 'react-redux';
toast.configure();
class index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data: [],
      _id: '',
      name: '',
      image: '',
      available_quantity: '',
      price: '',
      description: '',
    }

  }
  componentDidMount(){
    const name = this.props.match.params.name;
    axios.get(`http://localhost:8080/api/productos/filtrar1/${name}`)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        toast.warn("No se puede mostrar la información - " + err)
      })
  }
  

  render() {
    const { data} = this.state;
    return (

      <>   
        {data.map((item) =>( 
          <div key={item.id} className='containerProduct'>
            <h4> name: {item.name}</h4>
            <div className='imgProductLogin'>
              <img  src={`http://localhost:8080/uploads/${item.name}.png`}/>
            </div>
            <h4>available_quantity: {item.available_quantity}</h4>
            <h4>price: {item.price}</h4>
            <a className='fa fa-cart-plus' style={{cursor:'pointer'}} onClick={()=>this.props.AddCart(item)}></a>
            <Link to={'/products/details/'+item._id} className='moreInfo' style={{color: 'rgb(157, 8, 152)', position: 'relative', right: '-14%', fontSize: '2vw'}}>More info</Link>
          </div>
          ))}
      </>
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
