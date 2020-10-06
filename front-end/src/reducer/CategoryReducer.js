import { categoryConstant } from "../action/Constant"

const initState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategory = (parentId, categories, category) => {
    
    let myCategories = []

    if(parentId === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }
    
    for(let cat of categories) {

        if(cat._id === parentId) {

            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: []
            }

            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategory(parentId, cat.children, category) : []
            })
        }
    }

    return myCategories
} 

export default (state = initState, action) => {
    switch(action.type) {
        case categoryConstant.GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
        break

        case categoryConstant.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: false
            }
        break

        case categoryConstant.ADD_CATEGORY_SUCCESS:

            const category = action.payload.category
            const updatedCategories = buildNewCategory(category.parentId, state.categories, category)
            console.log(updatedCategories)
            
            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
        break

        case categoryConstant.ADD_CATEGORY_FAILURE:
            state = {
                ...initState
            }
        break

        default:
            // do nothing
    }

    return state;
}