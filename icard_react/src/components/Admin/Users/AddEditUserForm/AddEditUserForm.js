import React from 'react'
import { Form, Button, Checkbox } from "semantic-ui-react";
import { addUserApi, updateUserApi } from "../../../../api/user";
import { useFormik } from 'formik'
import * as YUP from 'yup';
import "./AddEditUserForm.scss";
import { useAuth } from "../../../../hooks/useAuth"
import { toast } from 'react-toastify';

export function AddEditUserForm(props) {
    const { onClose, onRefetch, user } = props;
    const { auth } = useAuth();
    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: YUP.object(user ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (user) await updateUserApi(user.id, formValue, auth.token);
                else await addUserApi(formValue, auth.token);
                onRefetch();
                onClose();
                toast.success("Success");
            } catch (error) {
                toast.error("Error al crear el usuario: ", error);
            }
        },
    })
    return (
        <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="username" placeholder="Nombre de usuario" value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username} />
            <Form.Input name="email" placeholder="Correo electrónico" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email} />
            <Form.Input name="first_name" placeholder="Nombre" value={formik.values.first_name} onChange={formik.handleChange} error={formik.errors.first_name} />
            <Form.Input name="last_name" placeholder="Apellidos" value={formik.values.last_name} onChange={formik.handleChange} error={formik.errors.last_name} />
            <Form.Input name="password" type='password' placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password} />
            <div className='add-edit-user-form__active'>
                <Checkbox toggle checked={formik.values.is_active} onChange={(_, data) => formik.setFieldValue("is_active", data.checked)} /> Usuario activo
            </div>
            <div className='add-edit-user-form__staff'>
                <Checkbox toggle checked={formik.values.is_staff} onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)} /> Usuario administrador
            </div>

            <Button type='submit' content={user ? "Actualizar" : "Crear"} primary fluid />
        </Form>
    )
}

function initialValues(data) {
    return {
        username: data?.username || "",
        email: data?.email || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        password: "",
        is_active: data?.is_active ? true : false,
        is_staff: data?.is_staff ? true : false,
    }
}
function newSchema() {
    return {
        username: YUP.string().required(true),
        email: YUP.string().email(true).required(true),
        first_name: YUP.string(),
        last_name: YUP.string(),
        password: YUP.string().required(true),
        is_active: YUP.bool().required(true),
        is_staff: YUP.bool().required(true)
    }
}

function updateSchema() {
    return {
        username: YUP.string().required(true),
        email: YUP.string().email(true).required(true),
        first_name: YUP.string(),
        last_name: YUP.string(),
        is_active: YUP.bool().required(true),
        is_staff: YUP.bool().required(true)
    }
}
