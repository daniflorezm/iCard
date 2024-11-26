import { addCategoryApi, updateCategoryApi, deleteCategoryApi } from "../api/category"
import { useAuth } from "../hooks/useAuth"

export function useCategory() {
    const { auth } = useAuth();
    const addCategory = async (data) => {
        try {
            await addCategoryApi(data, auth.token);
        } catch (error) {
            console.log(error);
        }
    }
    const updateCategory = async (id, data) => {
        try {
            await updateCategoryApi(id, data, auth.token);
        } catch (error) {
            console.log(error);
        }
    }
    const deleteCategory = async (id) => {
        try {
            await deleteCategoryApi(id, auth.token);
        } catch (error) {
            console.log(error);

        }
    }

    return {
        addCategory,
        updateCategory,
        deleteCategory,
    }
}