import React, { useEffect, useState } from 'react'
import { HeaderPage, TablesListAdmin } from "../../components/Admin"
import { useAuth } from "../../hooks"
import { getTablesApi } from "../../api/table"
import { Loader } from "semantic-ui-react"

export function OrdersAdmin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tables, setTables] = useState(null)
  const { auth } = useAuth()

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
  }, [])
  return (
    <>
      <HeaderPage title="Restaurante" />
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  )
}
