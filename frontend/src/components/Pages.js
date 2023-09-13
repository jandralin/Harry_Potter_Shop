import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Form, Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const { product } = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="pages">
            {pages.map(page =>
                <Form className="pag"

                    key={page}
                    onClick={() => product.setPage(page)}

                    style={{
                        backgroundColor: product.page === page ?
                            "#be7515" : "#ffeacaeb",
                    }}
                >
                    {page}
                </Form>
            )}
        </Pagination>

    );
});

export default Pages;