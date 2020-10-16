import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Input from '../../../components/UI/input/Input'
import ModalComponent from '../../../components/UI/Modal/Modal'


const AddCategoryModal = (props) => {

    const {
        show, 
        handleClose, 
        modalTitle, 
        categoryName, 
        setCategoryName, 
        parentCategoryId, 
        setParentCategoryId, 
        categoryList, 
        handleCategoryImage 
    } = props

    return (
        <ModalComponent 
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input 
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(event) => setCategoryName(event.target.value)}
                        className='form-control-sm'
                    />
                </Col>
                <Col>
                    <select 
                        className='form-control form-control-sm'
                        value={parentCategoryId} 
                        onChange={(event) => setParentCategoryId(event.target.value)}>
                        
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
            </Row>

            <Row>
                <Col>
                    <input 
                        type='file' 
                        name='categoryImage'
                        onChange={handleCategoryImage} 
                    /> 
                </Col>
            </Row>

        </ModalComponent>
    )
}

export default AddCategoryModal