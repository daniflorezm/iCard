import React, { useState, useEffect } from 'react'
import { HeaderPage, TableTablesAdmin, AddEditTableForm } from "../../components/Admin"
import { getTablesApi } from "../../api/table"
import { useAuth, useTable } from "../../hooks"
import { Loader } from "semantic-ui-react"
import { ModalBasic } from "../../components/Common"

export function TablesAdmin() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const [tables, setTables] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const { auth } = useAuth()
    const { deleteTable } = useTable();

    useEffect(() => {
        const getTables = async () => {
            try {
                setLoading(true)
                const response = await getTablesApi(auth.token)
                setLoading(false)
                setTables(response)
            } catch (error) {
                setLoading(false)
                setError(error)
            }
        };
        getTables();
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev)
    const onRefetch = () => setRefetch((prev) => !prev);

    const addTable = () => {
        setTitleModal("Crear nueva mesa")
        setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />)
        openCloseModal();
    }

    const updateTable = (data) => {
        setTitleModal("Actualizar mesa");
        setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} table={data} />)
        openCloseModal();
    }

    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Estás seguro de que quieres eliminar la mesa número ${data.number}?`)
        if (result) {
            await deleteTable(data.id)
            onRefetch()
        }
    }

    return (
        <>
            <HeaderPage title="Mesas" btnTitle="Crear nueva mesa" btnClick={addTable} />
            {loading ? (
                <Loader active inline='centered'>
                    Cargando...
                </Loader>
            ) : (
                <TableTablesAdmin tables={tables} updateTable={updateTable} onDeleteTable={onDeleteTable} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
