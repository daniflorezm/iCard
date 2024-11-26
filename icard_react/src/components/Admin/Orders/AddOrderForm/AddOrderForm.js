import React, { useState, useEffect } from 'react'
import "./AddOrderForm.scss"
import { Form, Image, Button, Dropdown } from "semantic-ui-react"
import { getProductsApi } from "../../../../api/product"
import { map } from "lodash"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProduct, useOrder } from "../../../../hooks"

export function AddOrderForm(props) {
    const { idTable, openCloseModal, onReloadOrders } = props;
    const [products, setProducts] = useState(null)
    const [productFormat, setProductFormat] = useState([])
    const [productsData, setProductsData] = useState([])
    const { getProductById } = useProduct();
    const { addOrderToTable } = useOrder();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            for await (const idProduct of formValue.products) {
                await addOrderToTable(idTable, idProduct)
            }
            onReloadOrders();
            openCloseModal();
        }
    })

    useEffect(() => {
        addProductList();
    }, [formik.values])

    const addProductList = async () => {
        try {
            const productsId = formik.values.products;
            const arrayTemp = [];
            for await (const productId of productsId) {
                const response = await getProductById(productId);
                arrayTemp.push(response);
            }
            setProductsData(arrayTemp);
        } catch (error) {
            console.log(error);
        }
    }

    const removeProductList = (index) => {
        const idProducts = [...formik.values.products];
        idProducts.splice(index, 1);
        formik.setFieldValue("products", idProducts);
    }

    useEffect(() => {
        const SidMenu = async () => {
            try {
                const response = await getProductsApi();
                setProducts(response);
            } catch (error) {
                console.log(error);
            }
        };
        SidMenu();
    }, [])
    useEffect(() => {
        setProductFormat(formatDropDownData(products))
    }, [products])




    return (
        <Form className='add-order-form' onSubmit={formik.handleSubmit}>
            <Dropdown placeholder='Productos' fluid selection search options={productFormat} value={null} onChange={(_, data) => formik.setFieldValue("products", [...formik.values.products, data.value])} />
            <div className='add-order-form__list'>
                {map(productsData, (product, index) => (
                    <div className='add-order-form__list-product' key={index}>
                        <div>
                            <Image src={product.image} avatar size='tiny' />
                            <span>
                                {product.title}
                            </span>
                        </div>
                        <Button type='button' content="Eliminar producto" basic color='red' onClick={() => removeProductList(index)} />
                    </div>
                ))}
            </div>
            <Button type='submit' content="Añadir productos a la mesa" primary fluid />
        </Form>
    )
}

function formatDropDownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id,
    }))
}
const initialValues = () => {
    return {
        products: []
    }
}
const validationSchema = () => {
    return {
        products: Yup.array().required(true)
    }
}
