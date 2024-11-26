import React, { useEffect } from 'react'
import { HeaderPage, TablePayments } from "../../components/Admin"
import { usePayment } from "../../hooks"
import { Loader } from "semantic-ui-react"
export function PaymentsHistory() {
    const { loading, payments, getPayment } = usePayment();
    useEffect(() => { getPayment() }, [])
    console.log(payments);


    return (
        <>
            <HeaderPage title="Historial de pagos" />
            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <TablePayments payments={payments} />
            )}
        </>
    )
}
