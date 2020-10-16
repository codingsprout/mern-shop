import React from 'react'
import ModalComponent from '../../../components/UI/Modal/Modal'
import Input from '../../../components/UI/input/Input'
import { Col, Row } from 'react-bootstrap'

const UpdateCategoryModal = (props) => {

    const { 
        show, 
        handleClose, 
        modalTitle,
        size, 
        expandedArray, 
        checkedArray, 
        handleCategoryInput,
        categoryList
    } =  props

    console.log({expandedArray, checkedArray})

    return(
        <ModalComponent 
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>

            {
                expandedArray.length > 0 && expandedArray.map((item, index) => 
                    <Row key={index}>
                        <Col>
                            <Input 
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(event) => handleCategoryInput('name', event.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select 
                                className='form-control'
                                value={item.parentId} 
                                onChange={(event) => handleCategoryInput('parentId', event.target.value, index, 'expanded')}>
                                
                                <option>Select Category</option>
                                {
                                    categoryList.map(option => 
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.type}
                                onChange={(event) => handleCategoryInput('type', event.target.value, index, 'expanded')}
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="service">Service</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h6>Checked Category</h6>
            {
                checkedArray.length > 0 && checkedArray.map((item, index) => 
                    <Row key={index}>
                        <Col>
                            <Input 
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(event) => handleCategoryInput('name', event.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select 
                                className='form-control'
                                value={item.parentId} 
                                onChange={(event) => handleCategoryInput('parentId', event.target.value, index, 'checked')}>
                                
                                <option>Select Category</option>
                                {
                                    categoryList.map(option => 
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.type}
                                onChange={(event) => handleCategoryInput('type', event.target.value, index, 'checked')}
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="service">Service</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
        </ModalComponent>
    )
}

export default UpdateCategoryModal