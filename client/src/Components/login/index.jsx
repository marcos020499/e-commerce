import React, { Component } from 'react'
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux'

toast.configure();
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
  handleRemove = _id => {
    const url1 = `/api/productos/listar/`+_id;
    axios
      .delete(url1)
      .then(response => {
        toast.success('usuarios eliminado exitosamente',{
          position: toast.POSITION.TOP_CENTER}
          )
        this.setState({
          data: this.state.data.filter(n=> response.data._id !== n._id)
        })
      })
      .catch(err => console.log(err))
  };
  render() {
    const { data} = this.state;
    return (
      <div>
        <Link to={'/products/create'}><button className='buttonCreate'>Crear Producto</button></Link>
        <div style={{marginTop: '8%'}}>
          {data.map((data, index) =>( 
          <div key={data.id} className='containerProduct'>
            <h4>name: {data.name}</h4>
            <div className='imgProductLogin'>
              <img  src={`/${data.images}`} alt=''/>
            </div> 
            <h4>available_quantity: {data.available_quantity}</h4>
            <h4>price: {data.price}</h4>
            <Link to={'/products/editar/'+data._id} className="fa fa-edit" style={{position: 'relative', right: '-75%'}}></Link>
            <a onClick={() => {if(window.confirm('delete de item')){this.handleRemove(data._id)};}} className="fa fa-times-circle" style={{position: 'relative', right: '-80%'}}></a>
          </div>
          ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state =>{
  return{
      _session:state._session
  }
}

export default withRouter(
  connect( mapStateToProps, null)(index));