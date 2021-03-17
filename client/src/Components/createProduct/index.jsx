import React, { Component } from 'react'
import './style.scss';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';
import FileUpload from '../upload/utils'
import { Link, withRouter} from 'react-router-dom';
toast.configure();
class index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      _id: '',
      name: '',
      image: '',
      available_quantity: '',
      price: '',
      description: '',
      isEditPage: false
    }

  }
  componentDidMount(){
    const id = this.props.match.params.id;
    if(!id) {
      return;
    }
    this.setState({isEditPage: true})
    axios.get(`http://localhost:8080/api/productos/filtrar/${id}`)
      .then(res => {
        const {_id, name, available_quantity, price, description } = res.data
        this.setState({
          _id,
          name,
          available_quantity,
          price,
          description,
        });

      })
      .catch(err => {
        toast.warn("No se puede mostrar la información - " + err)
      })
  }
  fetchData=event =>{
    event.preventDefault();
    const id = this.props.match.params.id;
    const { name, available_quantity, price, description, isEditPage,} = this.state
      axios.post(`http://localhost:8080/api/productos${isEditPage ? `/editar/${id}` : '/crear'}`, { name, available_quantity, price, description, isEditPage,}) 
      .then(() => {
          toast.success(`producto ${isEditPage ? "editado" : "creado"}`,{
            position: toast.POSITION.TOP_CENTER}
            )
            this.props.history.push("/login");
      })
      .catch(err => toast.warn(`No se pudo ${isEditPage ? "editar" : "crear"} el producto`))
  }

  updateFiles = (newImages) => {
    this.setState({ images: newImages })
  }
  onChange = (e) => {
    const { name, value} = e.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    const { name, available_quantity, price, description, isEditPage, } = this.state;
    return (

      <>
        <div className='productCreate'>
          <h2 style={{textAlign: 'center'}}>{isEditPage ? " Editar" : " Crear" } producto</h2>
          <form onSubmit={this.fetchData} >
            <input type="text"placeholder='Ingresa el nombre' value={name} name='name' onChange={this.onChange} required/>
            <FileUpload refreshFunction={this.updateFiles} />
            <input type="text"placeholder='Ingresa la cantidad' value={available_quantity} name='available_quantity' onChange={this.onChange} required/>
            <input type="text"placeholder='Ingresa el precio ' value={price} name='price' onChange={this.onChange} required/>
            <input type="text"placeholder='Ingresa una descripcion' value={description} name='description' onChange={this.onChange}/>
            <div className='admin'>
              <h3>Is admin?</h3>
              <input className='checkbox1' type="checkbox"/>
            </div>
            <button type='submit' style={{alignItems: 'center'}}>Enviar</button>
            </form>   
        </div>          
      </>
    )
  
  }
}
export default withRouter(index);