import React, { useEffect, useState } from 'react'
import "./TableAdmin.scss"
import { Label, Button, Icon, Checkbox } from "semantic-ui-react"
import { ReactComponent as IcTable } from "../../../../assets/table.svg"
import { getOrdersByTableApi } from "../../../../api/orders"
import { ORDER_STATUS } from "../../../../utils/constants"
import { size } from "lodash"
import classNames from "classnames";
import { Link } from "react-router-dom"
import { usePayment } from "../../../../hooks"



export function TableAdmin(props) {
    const { table, reload } = props;
    const [orders, setorders] = useState([])
    const [tableBusy, setTableBusy] = useState(false)
    const [pendingPayment, setPendingPayment] = useState(false)
    const { getPaymentByTable } = usePayment();
    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
            setorders(response);
        })()
    }, [reload])

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(table.id, ORDER_STATUS.DELIVERED)
            if (size(response) > 0) setTableBusy(response)
            else setTableBusy(false)
        })()
    }, [reload])

    useEffect(() => {
        (async () => {
            const response = await getPaymentByTable(table.id)
            if (size(response) > 0) setPendingPayment(true);
            else setPendingPayment(false);
        })()
    }, [reload])

    return (
        <Link className='table-admin' to={`/admin/table/${table.id}`}>
            {size(orders) > 0 ? (
                <Label circular color='orange'>
                    {size(orders)}
                </Label>
            ) : null}
            {pendingPayment && (
                <Label circular color='orange'>
                    Cuenta
                </Label>
            )}
            <IcTable className={classNames({
                pending: size(orders) > 0,
                busy: tableBusy,
                "pending-payment": pendingPayment,
            })} />
            <p>Mesa {table.number}</p>
        </Link>
    )
}
