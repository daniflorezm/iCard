import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useOrder, useTable, usePayment } from "../../hooks"
import { Loader } from "semantic-ui-react"
import { HeaderPage, AddOrderForm } from "../../components/Admin"
import { ListOrderAdmin, PaymentDetails } from "../../components/Admin/TableDetails"
import { ModalBasic } from "../../components/Common"
import { forEach } from "lodash"

export function TableDetailsAdmin() {
    const { id } = useParams();
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const [reloadOrders, setReloadOrders] = useState(false)
    const { getTable, table } = useTable();
    const [showModal, setShowModal] = useState(false);
    const { createPayment, getPaymentByTable } = usePayment();
    const [paymentData, setPaymentData] = useState(null)

    useEffect(() => { getTable(id) }, [id])

    useEffect(() => {
        getOrdersByTable(id, "", "ordering=-status,created_at");
    }, [id, reloadOrders])

    useEffect(() => {
        (async () => {
            const response = await getPaymentByTable(id);
            if (response.length > 0) {
                setPaymentData(response[0])
            }
        })()
    }, [reloadOrders])

    const onReloadOrders = () => setReloadOrders((prev) => !prev)

    const openCloseModal = () => setShowModal((prev) => !prev)

    const onCreatePayment = async () => {
        const result = window.confirm(`¿Estás seguro de generar la cuenta de la mesa?`);
        if (result) {
            let totalPayment = 0;
            forEach(orders, (order) => {
                totalPayment += Number(order.product_data.price)
            })
            const resultPaymentType = window.confirm(`Si deseas pagar con tarjeta pulsa ACEPTAR, si deseas pagar con efectivo pulsa CANCELAR`);
            const paymentData = {
                table: id,
                totalPayment: totalPayment.toFixed(2),
                paymentType: resultPaymentType ? "CARD" : "CASH",
                statusPayment: "PENDING",
            }
            const payment = await createPayment(paymentData)
            for await (const order of orders) {
                await addPaymentToOrder(order.id, payment.id)
            }
            onReloadOrders();

        }
    }
    return (
        <>
            <HeaderPage title={`Mesa ${table?.number || ""}`} btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"} btnClick={openCloseModal} btnTitleTwo={!paymentData ? "Generar cuenta" : null} btnClickTwo={onCreatePayment} />
            {loading ? (
                <Loader active inline="centered" />
            ) : (
                <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={paymentData ? "Cuenta de la mesa" : "Generar un pedido"}>
                {paymentData ? (
                    <PaymentDetails payment={paymentData} orders={orders} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders} />
                ) : (
                    <AddOrderForm idTable={id} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders} />
                )}
            </ModalBasic>
        </>
    )
}
