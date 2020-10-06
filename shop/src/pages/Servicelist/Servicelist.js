import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServicesBySlug } from '../../action/Action'
import Layout from '../../components/Layout/Layout'
import { supdood } from '../../UrlConfig'
import './Servicelist.css'

const Servicelist = (props) => {

    const dispatch = useDispatch()
    const service = useSelector(state => state.service)

    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000
    })

    useEffect(() => {
        const { match } = props
        dispatch(getServicesBySlug(match.params.slug))
    }, [])

    return (
        <Layout>
            {
                Object.keys(service.servicesByPrice).map((key, index) => {
                    return (
                        <div className='card'>
                            <div className='card-header'>
                                <div>{props.match.params.slug} under {priceRange[key]} </div>
                                <button>View All</button>
                            </div>
                            <div style={{ display: "flex" }}>
                                {
                                    service.servicesByPrice[key].map(service => 
                                        <div className='service-container'>
                                            <div className='service-containerIMG'>
                                                <img src={supdood(service.servicePictures[0].img)} alt='' />
                                            </div>
                                            <div className='serviceinfo'>
                                                <div className='servicename'>{service.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>9000</span>
                                                </div>
                                                <div className='serviceprice'>{service.price}</div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )   
                })
            }
        </Layout>
    )
}

export default Servicelist