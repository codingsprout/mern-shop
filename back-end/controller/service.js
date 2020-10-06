const slugify = require('slugify')
const Service = require('../database/service')
const Category = require('../database/category')

exports.createService = (req, res) => {

    let servicePictures = []
    const { name, price, description, category, quantity, createdBy } = req.body

    if(req.files.length > 0) {
        servicePictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const service = new Service({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        servicePictures,
        category,
        createdBy: req.user._id
    })

    service.save(((error, service) => {
        if(error) return res.status(400).json({ error })
        if(service) {
            res.status(201).json({ service })
        }
    }))
}

exports.getServicesBySlug = (req, res) => {

    const { slug } = req.params
    
    Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) => {
        if(error) {
            return res.status(400).json({ error })
        }
        
        if(category) {
            Service.find({ category: category._id })
            .exec((error, services) => {

                if(error) {
                    return res.status(400).json({ error })
                }

                if(services.length > 0){
                    res.status(200).json({ 
                        services, 
                        servicesByPrice: { 
                            under5k: services.filter(service => service.price <= 5000), 
                            under10k: services.filter(service => service.price > 5000 && service.price <= 10000),
                            under15k: services.filter(service => service.price > 10000 && service.price <= 15000),
                            under20k: services.filter(service => service.price > 15000 && service.price <= 20000),
                            under30k: services.filter(service => service.price > 20000 && service.price <= 30000),
                        } 
                    })
                }
            })
        }
    })
}