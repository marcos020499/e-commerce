import React, { Component } from 'react'
import './style.scss';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';
import { Link, withRouter} from 'react-router-dom';
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
    const id = this.props.match.params.id;
    axios.get(`/api/productos/filtrar/${id}`)
      .then(res => {
        const {_id, name, images, available_quantity, price, description } = res.data
        this.setState({
          _id,
          name,
          images, 
          available_quantity,
          price,
          description,
        });

      })
      .catch(err => {
        toast.warn("No se puede mostrar la información - " + err)
      })
  }
  render() {
    const { name, images, available_quantity, price, description} = this.state;
    return (

      <>
        <h2 className='title'>Detalles del producto</h2>
        <div className='productDetails'>
          <Link to={'/'} className="fa fa-reply" style={{position: 'relative', right: '-85%', top: '-30%', color: 'purple'}}></Link>
          <div className='productDetailsText'>
            <h3>Nombre: {name}</h3>
            <img  src={`/${images}`} style={{position: 'relative', right: '-38%', top: '10%', width: '20%'}} alt=''/>
            <h3>Available_quantity: {available_quantity}</h3>
            <h3>Price: {price}</h3>
            <p>Description: {description}</p>
          </div>
        </div>          
      </>
    )
  }
}
export default withRouter(index);