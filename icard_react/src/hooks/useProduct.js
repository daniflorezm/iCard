import { addProductsApi, updateProductApi, deleteProductApi, getProductByIdApi, getProductsByCategoryApi } from "../api/product"
import { useAuth } from "../hooks"
export function useProduct() {
    const { auth } = useAuth();
    const addProduct = async (data) => {
        try {
            await addProductsApi(data, auth.token);

        } catch (error) {
            console.log(error);

        }
    }
    const updateProduct = async (id, data) => {
        try {
            await updateProductApi(id, data, auth.token);
        } catch (error) {
            console.log(error);

        }
    }

    const deleteProduct = async (id) => {
        try {
            await deleteProductApi(id, auth.token);
        } catch (error) {
            console.log(error);

        }
    }
    const getProductById = async (id) => {
        try {
            const product = await getProductByIdApi(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }
    const getProductsByCategory = async (idCategory) => {
        try {
            const response = await getProductsByCategoryApi(idCategory);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    return {
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
    }
}