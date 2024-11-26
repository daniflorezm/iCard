import { useState } from "react";
import { size } from "lodash"
import { addTableApi, updateTableApi, deleteTableApi, getTableApi, getTableByNumberApi } from "../api/table"
import { useAuth } from "./useAuth"
export function useTable() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [table, setTable] = useState(null)
    const addTable = async (data) => {
        try {
            const response = await addTableApi(data, auth.token);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const updateTable = async (id, data) => {
        try {
            const response = await updateTableApi(id, data, auth.token);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const deleteTable = async (id) => {
        try {
            const response = await deleteTableApi(id, auth.token);
            return response;
        } catch (error) {
            console.log(error);

        }
    }
    const getTable = async (idTable) => {
        try {
            setLoading(true);
            const response = await getTableApi(idTable);
            setLoading(false);
            setTable(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }
    const isExistTable = async (tableNumber) => {
        try {
            const response = await getTableByNumberApi(tableNumber)
            if (size(response) > 0) return true
            throw Error()
        } catch (error) {
            setError(error);
        }
    }
    const getTableByNumber = async (tableNumber) => {
        try {
            const response = await getTableByNumberApi(tableNumber)
            return response
        } catch (error) {
            setError(error);
        }
    }
    return {
        loading,
        error,
        addTable,
        updateTable,
        deleteTable,
        getTable,
        table,
        isExistTable,
        getTableByNumber,
    }
}