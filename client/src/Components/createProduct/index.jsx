import React, { Component } from 'react'
import './style.scss';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';
import FileUpload from '../upload/utils'
import { withRouter} from 'react-router-dom';
import { Typography, Button, Form, Input } from 'antd';

const { TextArea } = Input;
toast.configure();
class index extends Component {
  
    state = {
      _id: '',
      name: '',
      images: '',
      available_quantity: '',
      price: 0,
      description: '',
      categories: '',
      isEditPage: false
    }
    handleChangeName = (event) => {
      this.setState({ name: event.currentTarget.value })
    }

    handleChangePrice = (event) => {
      this.setState({ price: parseInt(event.currentTarget.value, 10) })
    }

    handleChangeDecsription = (event) => {
      // console.log(event.currentTarget.value)
      this.setState({ description: event.currentTarget.value })
    }
    handleChangeAvailable = (event) => {
      // console.log(event.currentTarget.value)
      this.setState({ available_quantity: event.currentTarget.value })
    }

    handleChangeCategories = (event) => {
      this.setState({ categories: event.currentTarget.value })
    }
  componentDidMount(){
    const id = this.props.match.params.id;
    if(!id) {
      return;
    }
    this.setState({isEditPage: true})
    axios.get(`http://localhost:8080/api/productos/filtrar/${id}`)
      .then(res => {
        const {_id, name, images, available_quantity, price, description, categories } = res.data
        this.setState({
          _id,
          name,
          images,
          available_quantity,
          price,
          description,
          categories,
        });

      })
      .catch(err => {
        toast.warn("No se puede mostrar la información - " + err)
      })
  }
  fetchData=event =>{
    event.preventDefault();
    const id = this.props.match.params.id;
    const {isEditPage} = this.state
    const variables = {
      name: this.state.name,
      description: this.state.description,
      images: this.state.images,
      categories: this.state.categories,
      available_quantity: this.state.available_quantity,
      price: this.state.price
  }
      axios.post(`http://localhost:8080/api/productos${isEditPage ? `/editar/${id}` : '/crear'}`, variables) 
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
    const {isEditPage} = this.state;
    return (
      <>
        <div className='productCreate'>
          <h2 style={{textAlign: 'center'}}>{isEditPage ? " Editar" : " Crear" } producto</h2>
          <Form onSubmit={this.fetchData}>
               
               <FileUpload refreshFunction={this.updateFiles} />

                <br /><br />
                <label>Name</label>
                <Input
                    onChange={this.handleChangeName}
                    value={this.state.name}
                />
                <br /><br />
                <label>available_quantity</label>
                <TextArea
                    onChange={this.handleChangeAvailable}
                    value={this.state.available_quantity}
                />
                <br /><br />
                <label>Price($)</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.price}
                />
                <br /><br />
                <label>Description</label>
                <Input
                    onChange={this.handleChangeDecsription}
                    value={this.state.description}
                />
                <br /><br />
                <label>Categories</label>
                <Input
                    onChange={this.handleChangeCategories}
                    value={this.state.categories}
                />
                <br /><br />
                <Button type="primary" size="large" onClick={this.fetchData}>
                    Submit
                </Button>
            </Form>  
        </div>          
      </>
    )
  
  }
}
export default withRouter(index);