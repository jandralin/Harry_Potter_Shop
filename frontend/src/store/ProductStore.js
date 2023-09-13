import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._types = []
        this._products = []
        this._basket = []
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        this._selectedProduct = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setProducts(products) {
        this._products = products
    }

    setSelectedProduct(product) {
        this._selectedProduct = product
    }

    setBaskets(basket) {
        this._basket = basket
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }

    get products() {
        return this._products
    }

    get basket() {
        return this._basket
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedProduct() {
        return this._selectedProduct
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}