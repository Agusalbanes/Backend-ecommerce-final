import Category from '../models/categoryModel.js'

export const createCategoryService = async (name) => {
    const newCategory = new Category({ name })
    const savedCategory = await newCategory.save()
    return savedCategory
}

export const getCategoriesService = async () => {
    const categories = await Category.find()

    if (categories.length === 0) {
        const error = new Error("There are no categories")
        error.statusCode = 204;
        throw error;
    }
    return categories;
}

export const getCategoryByIdService = async (id) => {
    const category = await Category.findById(id)
    
    if (!category) {
        const error = new Error(`Category with id ${id} not found`)
        error.statusCode = 404
        throw error
    }
    
    return category
}

export const updateCategoryService = async (id, name) => {
    const categoryExist = await Category.findById(id)
    
    if (!categoryExist) {
        const error = new Error(`Category with id ${id} not found`)
        error.statusCode = 404
        throw error
    }

    const existingCategory = await Category.findOne({ 
        name: name.toLowerCase(),
        _id: { $ne: id } 
    })
    
    if (existingCategory) {
        const error = new Error(`Category with name '${name}' already exists`)
        error.statusCode = 400
        throw error
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        id, 
        { name: name.toLowerCase() }, 
        { new: true, runValidators: true }
    )
    
    return updatedCategory
}

export const deleteCategoryService = async (id) => {
    const categoryExist = await Category.findOne({ _id: id })

    if (!categoryExist) {
        const error = new Error(`Category with ${id} doesn't exist`)
        error.statusCode = 400
        throw error
    }

    const deletedCategory = await Category.deleteOne({ _id: id })
    return { categoryDeleted: categoryExist }
}