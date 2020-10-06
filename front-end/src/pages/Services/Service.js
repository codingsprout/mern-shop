import React, { useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as BiIcons from 'react-icons/bi'
import ModalComponent from '../../components/UI/Modal/Modal'
import Input from '../../components/UI/input/Input'
import Layout from '../../components/Layout/Layout'
import { addService } from '../../action/Action'
import { supdood } from '../../UrlConfig'
import './Service.css'

export default function Service(props) {
    
    const dispatch = useDispatch()
    const service = useSelector(state => state.service)
    const category = useSelector(state => state.category)
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [servicePicture, setServicePicture] = useState('')
    const [serviceDetailModal, setServiceDetailModal] = useState(false)
    const [show, setShow] = useState(false);
    const [serviceDetails, setServiceDetails] = useState(null)

    const createCategoryList = (categories, options = []) => {
        for(let category of categories) {
            options.push({ value: category._id, name: category.name })
            if(category.children.length > 0) {
                createCategoryList(category.children, options) //recursive, recall it
            }
        }

        return options
    }

    const handleServicePicture = (event) => {
        
        setServicePicture([
            ...servicePicture,
            event.target.files[0]
        ])
    }

    const renderTable = () => {
        return(    
                <Table style={{ fontSize: 13 }} responsive="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            service.services.length > 0 ? service.services.map(service => 
                                
                                <tr onClick={() => showServiceDetailModal(service)} key={service._id}>
                                <td>1</td>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                                <td>{service.quantity}</td>
                                <td>{service.category.name}</td>    
                                </tr>

                            ) : null
                        }
                    </tbody>
                </Table>                
        )
    }

    const handleClose = () => {
        
        const form = new FormData()
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', categoryId)

        for(let pic of servicePicture) {
            form.append('servicePicture', pic)
        }

        dispatch(addService(form))
        
        setShow(false);
    }
    
    const renderAddServiceModal = () => {
        return (
            <ModalComponent
            show={show}
            handleClose={handleClose}
            modalTitle={'Add New Service'}
            >
                <Input 
                    label="Name"
                    value={name}
                    placeholder={'Service Name'}
                    onChange={(event) => setName(event.target.value)}
                />

                <Input 
                    label="Quantity"
                    value={quantity}
                    placeholder={'Quantity'}
                    onChange={(event) => setQuantity(event.target.value)}
                />

                <Input 
                    label="Price"
                    value={price}
                    placeholder={'Price'}
                    onChange={(event) => setPrice(event.target.value)}
                />

                <Input 
                    label="Description"
                    value={description}
                    placeholder={'Description'}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <select 
                    className='form-control'
                    value={categoryId} 
                    onChange={(event) => setCategoryId(event.target.value)}>
                    
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option => 
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        )
                    }
                </select>
                
                {
                    servicePicture.length > 0 ? servicePicture.map((pic, index) => 
                    <div key={index}>{pic.name}</div>) : null
                }

                <input 
                    type="file" 
                    name="servicePicture" 
                    onChange={handleServicePicture}
                />
            </ModalComponent>
        )
    }

    const handleCloseServiceDetailsModal = () => {
        setServiceDetailModal(false)
    }

    const showServiceDetailModal = (service) => {
        setServiceDetails(service)
        setServiceDetailModal(true)
    }

    const renderServiceDetailModal = () => {

        if(!serviceDetails) { return null }

        return (
            <ModalComponent
                show={serviceDetailModal}
                handleClose={handleCloseServiceDetailsModal}
                modalTitle={'Service Details'}
                size="lg"
            >

            <Row>
                <Col md="6">
                    <label className='key'>Name</label>
                    <p className='value'>{serviceDetails.name}</p>
                </Col>

                <Col md="6">
                    <label className='key'>Price</label>
                    <p className='value'>{serviceDetails.price}</p>
                </Col>
            </Row>


            <Row>
                <Col md="6">
                    <label className='key'>Quantity</label>
                    <p className='value'>{serviceDetails.quantity}</p>
                </Col>

                <Col md="6">
                    <label className='key'>Category</label>
                    <p className='value'>{serviceDetails.category.name}</p>
                </Col>
            </Row>

            <Row>
                <Col md="12">
                    <label className='key'>Description</label>
                    <p className='value'>{serviceDetails.description}</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <label className='key'>Service</label>
                        <div style={{ display: 'flex'}}> 
                            {serviceDetails.servicePictures.map(picture => 
                                <div className='serviceImgContainer'>
                                    <img src={supdood(picture.img)} />
                                </div>
                            )}
                        </div>
                </Col>
            </Row>

            </ModalComponent>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='category-div'>
                            <h3>Services</h3>
                            <button onClick={handleShow}><BiIcons.BiPlusMedical /></button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {renderTable()}
                    </Col>
                </Row>
            </Container>

            {renderAddServiceModal()}
            {renderServiceDetailModal()}

        </Layout>
    )
}
