import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const deleteType = async (id) => {
    const { data } = await $authHost.delete('api/type/' + id)
    return data
}

export const updateType = async (id, Param, type) => {
    const { data } = await $authHost.put('api/type/' + id + '/' + Param, type)
    return data
}

export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/product', product)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await $authHost.delete('api/product/' + id)
    return data
}

export const fetchProducts = async (typeId, page, limit = 5) => {
    const { data } = await $host.get('api/product', {
        params: {
            typeId, page, limit
        }
    })
    return data
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/product/' + id)
    return data
}

export const updateProduct = async (id, Param, product) => {
    const { data } = await $authHost.put('api/product/' + id + '/' + Param, product)
    return data
}

export const updateInfo = async (id, Param, product) => {
    const { data } = await $authHost.put('api/product/' + id + '/' + Param, product)
    return data
}

export const createInfo = async (id, Param, product) => {
    const { data } = await $authHost.post('api/product/' + id + '/' + Param, product)
    return data
}

// ------ Добавляю подключение для добавление crud с корзиной ------- //

export const addToBasket = async (productId) => {
    const { response } = await $authHost.post('api/basket', productId)
    return response
}

export const getBasket = async () => {
    const { data } = await $authHost.get('api/basket')
    return data
}

// ------ ------- //
export const deleteBasket = async (id) => {
    const { data } = await $authHost.delete('api/basket/' + id)
    return data
}
