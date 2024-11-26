import React from 'react'
import { Button, Form } from "semantic-ui-react"
import "./LoginForm.scss"
import { useFormik } from 'formik'
import { loginApi } from "../../../api/user"
import { toast } from "react-toastify"
import { useAuth } from '../../../hooks'
import * as YUP from 'yup';

export function LoginForm() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: YUP.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { access } = await loginApi(formValue);
        login(access);
      } catch (error) {
        toast.error(error.message)
      }
    },
  })
  return (
    <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
      <Form.Input name="email" placeholder="Correo electrónico" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email} />
      <Form.Input name="password" type='password' placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password} />
      <Button type="submit" content="Iniciar sesión" primary fluid />
    </Form>
  )
}

function initialValues() {
  return {
    email: "",
    password: "",
  }
}
function validationSchema() {
  return {
    email: YUP.string().email("Please, introduce a valid email").required(true),
    password: YUP.string().required(true),
  }
}
