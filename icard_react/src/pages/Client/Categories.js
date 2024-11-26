import React, { useEffect, useState } from 'react'
import { useCategory } from "../../hooks"
import { getCategoriesApi } from "../../api/category"
import { ListCategories } from "../../components/Client"

export function Categories() {
    const { loading } = useCategory();
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await getCategoriesApi();
                setCategories(response)
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [])


    return (
        <div>
            <h3>Categorias</h3>
            {loading ? <p>Cargando...</p> : <ListCategories categories={categories} />}
        </div>
    )
}
