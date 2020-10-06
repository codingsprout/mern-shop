import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckboxTree from 'react-checkbox-tree'
import { addCategory, getAllCategory, UpdateCategory } from '../../action/Action'
import * as BiIcons from 'react-icons/bi'
import * as IoIcons from 'react-icons/io'
import ModalComponent from '../../components/UI/Modal/Modal'
import Input from '../../components/UI/input/Input'
import Layout from '../../components/Layout/Layout'
import './Category.css'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

export default function Category() {

    const dispatch = useDispatch()
    const handleShow = () => setShow(true);
    const category = useSelector(state => state.category)

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)

    const renderCategories = (categories) => {

        let myCategories = []
        for(let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }

        return myCategories
    }

    const createCategoryList = (categories, options = []) => {
        for(let category of categories) {
            options.push({ 
                value: category._id, 
                name: category.name,
                parentId: category.parentId 
            })

            if(category.children.length > 0) {
                createCategoryList(category.children, options) //recursive, recall it
            }
        }

        return options
    }

    const handleCategoryImage = (event) => { setCategoryImage(event.target.files[0]) }

    const handleClose = () => {
        
        const form = new FormData()
        dispatch(addCategory(form))

        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)

        setCategoryName('')
        setParentCategoryId('')

        setShow(false);
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true)
        const categories = createCategoryList(category.categories)
        const checkedArray = []
        const expandedArray = []

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, INDEX) => 
            categoryId == category.value)
            category && checkedArray.push(category)
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, INDEX) => 
            categoryId == category.value)
            category && expandedArray.push(category)
        })

        setCheckedArray(checkedArray) // bind state
        setExpandedArray(expandedArray) // bind state


        console.log({checked, expanded, categories, checkedArray, expandedArray})
    }

    const handleCategoryInput = (key, value, index, type) => {
        if(type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, INDEX) => 
            index == INDEX ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray)

        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, INDEX) => 
            index == INDEX ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray)
        }
    }

    const updateCategoryForm = () => { 
        
        const form = new FormData()

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type',item.type)
        }) 

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type',item.type)
        })
        
        dispatch(UpdateCategory(form))
            .then(result => {
                if(result) { dispatch(getAllCategory()) }
        })

        setUpdateCategoryModal(false) 
    }

    const renderUpdateCategoryModal = () => {
        return(
            <ModalComponent 
                show={updateCategoryModal}
                handleClose={updateCategoryForm}
                modalTitle={'Update Category'}
                size='lg'
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
                                        createCategoryList(category.categories).map(option => 
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
                                        createCategoryList(category.categories).map(option => 
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

    const renderAddCategoryModal = () => {
        return (
            <ModalComponent 
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
                <Input 
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(event) => setCategoryName(event.target.value)}
                />

                <select 
                    className='form-control'
                    value={parentCategoryId} 
                    onChange={(event) => setParentCategoryId(event.target.value)}>
                    
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option => 
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        )
                    }
                </select>

                <input 
                    type='file' 
                    name='categoryImage'
                    onChange={handleCategoryImage} 
                />
            </ModalComponent>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='category-div'>
                            <h3>Category</h3>
                            <button onClick={handleShow}><BiIcons.BiPlusMedical /></button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIcons.IoIosCheckbox />,
                                uncheck: <BiIcons.BiCheckbox />,
                                halfCheck: <IoIcons.IoIosCheckboxOutline />,
                                expandClose: <IoIcons.IoIosArrowForward />,
                                expandOpen: <IoIcons.IoIosArrowDropdownCircle />,
                            }}
                        />
                    </Col>
                </Row>

                <Row>
                    <button>Delete</button>
                    <button onClick={updateCategory}>Edit</button>
                </Row>
            </Container>

            {renderAddCategoryModal()}
            {renderUpdateCategoryModal()}
          
        </Layout>
    )
}
