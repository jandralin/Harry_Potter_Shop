import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from 'react-bootstrap';
import divider from "./img/divider.svg"

const TypeBar = observer(() => {
    const { product } = useContext(Context)
    return (
        <ListGroup>
            <ListGroup.Item className="types"
                onClick={() => product.setSelectedType("")}
                style={{
                    fontSize: "" === product.selectedType ?
                        "42px" : "35px",
                }}
            >
                Все
            </ListGroup.Item>


            {product.types.map(type =>
                <ListGroup.Item className="types"
                    style={{
                        fontSize: type.id === product.selectedType.id ?
                            "42px" : "35px",
                    }}
                    onClick={() => product.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
            <div className="ram"><img src={divider} alt="emblem" />
                <div className="raminv"><img src={divider} alt="emblem" /></div>
            </div>
        </ListGroup>
    );
});

export default TypeBar;