import React, { useEffect, useState } from 'react'
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage"
import { getCategoriesApi } from "../../api/category"
import { Loader } from "semantic-ui-react"
import { TableCategoryAdmin, AddEditCategoryForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useCategory } from "../../hooks"

export function CategoriesAdmin() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const { deleteCategory } = useCategory();

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const response = await getCategoriesApi();
                setLoading(false);
                setCategories(response);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        }
        getCategories();
    }, [refetch])

    const openCloseModal = () => setShowModal(prev => !prev)
    const onRefetch = () => setRefetch(prev => !prev);

    const addCategory = () => {
        setTitleModal("Nueva categoría")
        setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />)
        openCloseModal()
    }

    const updateCategory = (data) => {
        setTitleModal("Actualizar categoría");
        setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} category={data} />)
        openCloseModal()
    }
    const onDeleteCategory = async (data) => {
        const result = window.confirm(`¿Eliminar categoría ${data.title}?`);
        if (result) {
            await deleteCategory(data.id);
            onRefetch();
        }
    }

    return (
        <>
            <HeaderPage title="Categorias" btnTitle="Nueva categoría" btnClick={addCategory} />
            {loading ? (
                <Loader active inline='centered'>
                    Cargando...
                </Loader>
            ) : (
                <TableCategoryAdmin categories={categories} updateCategory={updateCategory} deleteCategory={onDeleteCategory} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}

