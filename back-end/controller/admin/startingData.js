const Category = require('../../database/category')
const Service = require('../../database/service')

function createCategory(categories, parentId = null) {

    let category
    const categoryList = []
    
    if(parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category) {

        categoryList.push({ 
            _id: cate._id, 
            name: cate.name, 
            slug: cate.slug,
            parentId: cate.parentId, 
            children: createCategory(categories, cate._id)
        })

    }

    return categoryList
}

exports.startingData = async (req, res) => {

    const categories = await Category.find({}).exec()
    const services = await Service
                            .find({})
                            .select('_id name price quantity slug description servicePictures category')
                            .populate({ path: 'category', select: '_id name' })
                            .exec()

    res.status(200).json({ 
        categories: createCategory(categories), 
        services 
    })

}