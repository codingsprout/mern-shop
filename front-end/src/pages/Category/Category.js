import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckboxTree from 'react-checkbox-tree'
import { addCategory, getAllCategory, UpdateCategory, DeleteCategory } from '../../action/Action'
import * as BiIcons from 'react-icons/bi'
import * as IoIcons from 'react-icons/io'
import ModalComponent from '../../components/UI/Modal/Modal'
import Layout from '../../components/Layout/Layout'
import './Category.css'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoryModal from './components/UpdateCategoryModal'
import AddCategoryModal from './components/AddCategoryModal'

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
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

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
                parentId: category.parentId,
                type: category.type
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

     //   if(categoryName === '') {alert('Name is required!')}

        dispatch(addCategory(form))

        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)

        setCategoryName('')
        setParentCategoryId('')

        setShow(false);
    }

    const updateCategory = () => { 
        updateCheckedAndExpandedCategory()
        setUpdateCategoryModal(true) 
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
        setUpdateCategoryModal(false) 
    }

    const deleteCategory = () => { 
        updateCheckedAndExpandedCategory()
        setDeleteCategoryModal(true) 
    }

    const deleteThisCategory = () => {

        const checkArrayId = checkedArray.map((item, index) => ({_id: item.value}))
        const expandArrayId = expandedArray.map((item, index) => ({_id: item.value}))
        const ArrayId = expandArrayId.concat(checkArrayId)

        if(checkArrayId.length > 0) {
            dispatch(DeleteCategory(checkArrayId))
            .then(result => {
                if(result) { 
                    dispatch(getAllCategory())
                    setDeleteCategoryModal(false) 
                }
            })
        }
        setDeleteCategoryModal(false)
    }

    const renderDeleteCategoryModal = () => {
        return (
            <ModalComponent
                modalTitle='Confirm'
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'Yes',
                        color: 'primary',
                        onClick: deleteThisCategory
                    },
                    {
                        label: 'No',
                        color: 'danger',
                        onClick: () => { alert('no') }
                    },
                ]}
            >
                <h5>Expanded Category</h5>
                { expandedArray.map((item, index) => <span key={index}>{item.name}</span>) }

                <h5>Checked Category</h5>
                { checkedArray.map((item, index) => <span key={index}>{item.name}</span>) }
            </ModalComponent>
        )
    }

    const updateCheckedAndExpandedCategory = () => {
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
    }

    const categoryList = createCategoryList(category.categories)

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='category-div'>
                            <h3>Category</h3>
                            <div className='actionBtnContainer'>
                                <span>Actions: </span>
                                <button onClick={handleShow}><BiIcons.BiPlusMedical /><span>Add</span></button>
                                <button onClick={deleteCategory}><IoIcons.IoIosTrash /><span>Delete</span></button>
                                <button onClick={updateCategory}><BiIcons.BiEdit /><span>Edit</span></button>
                            </div>
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
            </Container>
            
            <AddCategoryModal 
                show={show}
                handleClose={handleClose}
                modalTitle={'Add Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />

            <UpdateCategoryModal
                show={updateCategoryModal}
                handleClose={updateCategoryForm}
                modalTitle={'Update Category'}
                size='lg'
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />

            {renderDeleteCategoryModal()}
          
        </Layout>
    )
}
