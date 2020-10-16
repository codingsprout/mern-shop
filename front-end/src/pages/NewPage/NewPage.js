import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import RepeatCategory from '../../assist/RepeatCategory'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/input/Input'
import ModalComponent from '../../components/UI/Modal/Modal'

function NewPage(props) {

    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [description, setDescription] = useState('')
    const [banners, setBanners] = useState([])
    const [services, setServices] = useState([])
    const category = useSelector(state => state.category)

    useEffect(() => {
      setCategories(RepeatCategory(category.categories))
      
    }, [category])

    const handleBannerImages = (event) => {
        console.log(event)
    }

    const handleServiceImages = (event) => {
        console.log(event)
    }

    const renderCreatePageModal = () => {
        return (
            <ModalComponent
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
            >
                <Container>
                    <Row>
                        <Col>
                            <select 
                                className='form-control form-control-sm'
                                value={categoryId}
                                onChange={(event) => setCategoryId(event.target.value)}
                            >
                                
                                <option>Select Category</option>
                                {
                                    categories.map(cat => 
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    )
                                }

                            </select>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Input 
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder={'Page Title'}
                                className='form-control-sm'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input 
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder={'Page Description'}
                                className='form-control-sm'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <input
                                className='form-control form-control-sm'
                                type='file'
                                name='banners'
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <input
                                className='form-control form-control-sm'
                                type='file'
                                name='services'
                                onChange={handleServiceImages}
                            />
                        </Col>
                    </Row>
                </Container>

            </ModalComponent>
        )
    }
    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
        </Layout>
    )
}

export default NewPage
