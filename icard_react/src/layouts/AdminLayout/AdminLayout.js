import React from 'react'
import "./AdminLayout.scss"
import { LoginAdmin } from "../../pages/Admin"
import { useAuth } from "../../hooks"
import { TopMenu, SidMenu } from "../../components/Admin"

export function AdminLayout(props) {
  const { children } = props;
  const { auth } = useAuth()

  if (!auth) return <LoginAdmin />;
  return (
    <div className='admin-layout'>
      <div className='admin-layout__menu'>
        <TopMenu />
      </div>
      <div className='admin-layout__main-contant'>
        <SidMenu>
          {children}
        </SidMenu>
      </div>
    </div>
  )
}
