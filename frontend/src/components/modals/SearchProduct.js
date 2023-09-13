import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Context } from "../..";
import { fetchProducts } from "../../http/productAPI";
import icon from "../img/free-icon-loupe-751463.png"
const SearchProduct = observer(() => {

    const { product } = useContext(Context)
    const [filterText, setFilterText] = useState('')

    useEffect(() => {

        product.selectedType ?
            fetchProducts(product.selectedType.id, null, 60).then(data => {
                product.setProducts(data.rows)
                product.setTotalCount(data.count)
            })
            :
            fetchProducts(null, null, 60).then(data => {
                product.setProducts(data.rows)
                product.setTotalCount(data.count)
            })

    }, [filterText === ""])

    const handleChange = e => {
        setFilterText(e.target.value)
        filterFunc(product.products)
    }

    function filterFunc() {
        var filteredItems
        filteredItems = product.products.filter(prod =>
            prod.name.toLowerCase().includes(filterText.toLowerCase())
        );
        product.setProducts(filteredItems)
    }
    return (
        <Container>
            <Form className="searchh">
                <div className="icon"><img src={icon} width={30} height={30} /></div>
                <Form.Control className="searc" type="search" value={filterText} onChange={handleChange} placeholder="Поиск" /> </Form>
        </Container>
    );

})

export default SearchProduct;
