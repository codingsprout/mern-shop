const slugify = require('slugify')
const Category = require('../database/category')
const shortid = require('shortid')

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
            type: cate.type, 
            children: createCategory(categories, cate._id)
        })

    }

    return categoryList
}

exports.addCategory = (req, res) => {

    const categoryObject = { 
        name: req.body.name, 
        slug: `${slugify(req.body.name)}-${shortid.generate()}`
    }

    if(req.file) { categoryObject.categoryImage = process.env.GABSIP + '/public/' + req.file.filename }

    if(req.body.parentId) { categoryObject.parentId = req.body.parentId}

    const cat = new Category(categoryObject)
    cat.save((error, category) => {
        if(error) return res.status(400).json({ error })
        if(category) { return res.status(201).json({ category })}
    })

}

exports.getCategory = (req, res) => {

    Category.find({}).exec((error, categories) => {
        if(error) return res.status(400).json({ error })
        if(categories) { 
            
            const categoryList = createCategory(categories)
            res.status(200).json({ categoryList }) 
        }
    })
}

exports.updateCategory = async (req, res) => {

    const { _id, name, parentId, type } = req.body
    const updatedCategoryArray = []

    if(name instanceof Array) {
        for(let i = 0; i < name.length; i++) {
            const category = { name: name[i], type: type[i] }

            if(parentId[i] !== ''){ category.parentId = parentId[i] }
            
            const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, { new: true })
            updatedCategoryArray.push(updatedCategory)
        }

        return res.status(201).json({ updateCategory: updatedCategoryArray })

    } else {
        const category = { name, type }
        if (parentId !== '') { category.parentId = parentId }

        const updatedCategory = await Category.findOneAndUpdate({_id}, category, { new: true })
        return res.status(201).json({ updatedCategory})
    }
}

exports.deleteCategory = async (req, res) => {

    const { ids } = req.body.payload
    const deletedCategory = []

    for(let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id })
        deletedCategory.push(deleteCategory)
    }

    if(deletedCategory.length == ids.length) {
        res.status(201).json({ message: 'Categories removed!' })
    } else {
        res.status(400).json({ message: 'Something went wrong! WTF?' })
    }

}