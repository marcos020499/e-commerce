import React, { useState } from 'react'
import FileUpload from './utils'
import Axios from 'axios';


function UploadProductPage(props) {

    const [nameValue, setnameValue] = useState('')
    const [Images, setImages] = useState([])
    const [available_quantityValue, setavailable_quantityValue] = useState('')
    const [priceValue, setpriceValue] = useState('')
    const [descriptionValue, setdescriptionValue] = useState('')




    const onnameChange = (event) => {
        setnameValue(event.currentTarget.value)
    }

    const ondescriptionChange = (event) => {
        setdescriptionValue(event.currentTarget.value)
    }

    const onpriceChange = (event) => {
        setpriceValue(event.currentTarget.value)
    }

    const onavailable_quantityChange = (event) => {
        setavailable_quantityValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!nameValue || !descriptionValue || !priceValue ||
            !priceValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            name: nameValue,
            images: Images,
            available_quantity: available_quantityValue, 
            price: priceValue,
            description: descriptionValue,
        }

        Axios.post('http://localhost:8080/api/productos/crear', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 level={2}> Upload Travel Product</h1>
            </div>
            <form onSubmit={onSubmit} >

                <FileUpload refreshFunction={updateImages} />

                <label>name</label>
                <input
                    onChange={onnameChange}
                    value={nameValue}>
                </input>
                <label>available_quantity</label>
                <input
                    onChange={onavailable_quantityChange}
                    value={available_quantityValue}>
                </input>
                <label>Price($)</label>
                <input
                    onChange={onpriceChange}
                    value={priceValue}>
                    </input>
                <label>description</label>
                <input onChange={ondescriptionChange} value={descriptionValue}>
                    
                </input>

                <button
                    onClick={onSubmit}
                >
                    Submit
                </button>

            </form>

        </div>
    )
}

export default UploadProductPage