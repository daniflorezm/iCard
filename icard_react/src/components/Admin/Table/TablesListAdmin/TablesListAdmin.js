import React, { useState, useEffect } from 'react'
import { Button, Icon, Checkbox } from "semantic-ui-react"
import "./TablesListAdmin.scss"
import { map } from "lodash"
import { TableAdmin } from "../"
export function TablesListAdmin(props) {
    const { tables } = props
    const [reload, setReload] = useState(false)
    const [autoReload, setAutoReload] = useState(false)

    const onReload = () => setReload((prev) => !prev)

    useEffect(() => {
        if (autoReload) {
            const autoReloadAction = () => {
                onReload()
                setTimeout(() => {
                    autoReloadAction();
                }, 10000);
            }
            autoReloadAction();
        }
    }, [autoReload])

    const onCheckAutoReload = (check) => {
        if (check) {
            setAutoReload(check)
        } else {
            window.location.reload()
        }

    }

    return (
        <div className='tables-list-admin'>
            <Button primary icon className='tables-list-admin__reload' onClick={onReload}>
                <Icon name="refresh" />
            </Button>
            <div className='tables-list-admin__reload-toggle'>
                <span>Reload automático</span>
                <Checkbox toggle onChange={(_, data) => onCheckAutoReload(data.checked)} checked={autoReload} />
            </div>
            {map(tables, (table) => (
                <TableAdmin key={table.number} table={table} reload={reload} />
            ))}
        </div>
    )
}
