import React, { useState, useEffect } from 'react'
import { AddEditProductForm, HeaderPage, TableProductAdmin } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { getProductsApi } from "../../api/product"
import { Loader } from "semantic-ui-react";
import { useProduct } from "../../hooks"


export function ProductAdmin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false)
    const { deleteProduct } = useProduct();
    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await getProductsApi();
                setLoading(false);
                setProducts(response);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        getProducts();
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev)
    const onRefetch = () => setRefetch((prev) => !prev)

    const addProduct = () => {
        setTitleModal("Nuevo producto");
        setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateProduct = (data) => {
        setTitleModal("Actualizar producto");
        setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} product={data} />)
        openCloseModal();
    }

    const onDeleteProduct = async (data) => {
        const result = window.confirm(`¿Estás seguro de eliminar el producto ${data.title}?`);
        if (result) {
            await deleteProduct(data.id);
            onRefetch();
        }
    }
    return (
        <>
            <HeaderPage title="Productos" btnTitle="Nuevo producto" btnClick={addProduct} />
            {loading ? (
                <Loader active inline='centered'>
                    Cargando...
                </Loader>
            ) : (
                <TableProductAdmin products={products} updateProduct={updateProduct} deleteProduct={onDeleteProduct} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
