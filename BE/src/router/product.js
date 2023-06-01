import express from "express"
import { createProduct, deleteProduct, get, getAll, updateProduct } from "../controller/product"
const router = express.Router()
router.get('/', getAll)
router.get('/:id', get)
router.post('/add', createProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)
export default router