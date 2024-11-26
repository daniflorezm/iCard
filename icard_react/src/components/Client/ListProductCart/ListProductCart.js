import React, { useEffect, useState } from 'react'
import { Image, Button, Icon } from "semantic-ui-react"
import { map, forEach } from "lodash"
import { useParams, useNavigate } from "react-router-dom"
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart"
import { useOrder, useTable } from "../../../hooks"
import "./ListProductCart.scss"



export function ListProductCart(props) {
    const { products, onReloadCart } = props;
    const [total, setTotal] = useState(0)
    const { addOrderToTable } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();
    const navigate = useNavigate();
    const removeProduct = (index) => {
        removeProductCartApi(index)
        onReloadCart();
    };
    const createOrder = async () => {
        const tableData = await getTableByNumber(tableNumber);
        const idTable = tableData[0].id;

        for await (const product of products) {
            await addOrderToTable(idTable, product.id)
        }
        cleanProductCartApi();
        navigate(`/client/${tableNumber}/orders`)
    };
    useEffect(() => {
        let totalTemp = 0;
        forEach(products, (product) => {
            totalTemp += Number(product.price)
        })
        setTotal(totalTemp.toFixed(2))
    }, [products])
    return (
        <div className='list-product-cart'>
            {map(products, (product, index) => (
                <div key={index} className='list-product-cart__product'>
                    <div>
                        <Image src={product.image} avatar />
                        <span>{product.title}</span>
                    </div>
                    <span>{product.price} €</span>
                    <Icon name='close' onClick={() => removeProduct(index)} />
                </div>
            ))}

            <Button primary fluid onClick={createOrder}>Realizar pedido ({total} €)</Button>
        </div>
    )
}
