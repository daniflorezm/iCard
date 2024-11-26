import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { useProduct } from "../../hooks"
import { ListProducts } from "../../components/Client"
export function Products() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false)
    const { tableNumber, idCategory } = useParams();
    const { getProductsByCategory } = useProduct();
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const response = await getProductsByCategory(idCategory)
            setLoading(false)
            setProduct(response)
        }
        getProduct();
    }, [idCategory])


    return (
        <div>
            <Link to={`/client/${tableNumber}`}>Volver a categorías</Link>
            {loading ? <p>Cargando...</p> : <ListProducts products={product} />}
        </div>
    )
}

export default Products
