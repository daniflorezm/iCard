import React, { useState, useCallback } from 'react'
import { Form, Image, Button } from "semantic-ui-react"
import "./AddEditCategoryForm.scss";
import { useDropzone } from "react-dropzone"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../../../hooks"

export function AddEditCategoryForm(props) {
    const { onClose, onRefetch, category } = props;
    const { addCategory, updateCategory } = useCategory();
    const [previewImage, setPreviewImage] = useState(category?.image || null);
    const formik = useFormik({
        initialValues: initialValues(category),
        validationSchema: Yup.object(category ? updateSchema() : newSchema()),
        validationOnChange: false,
        onSubmit: async (formvalue) => {
            try {
                if (category) await updateCategory(category.id, formvalue);
                else await addCategory(formvalue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })
    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));

    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });


    return (
        <Form className='add-edit-category-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="title" placeholder="Nombre de la categoría" value={formik.values.title} onChange={formik.handleChange} error={formik.errors.title} />
            <Button type='button' fluid {...getRootProps()} color={formik.errors.image && "red"}>
                {previewImage ? "Cambiar imagen" : "Subir imagen"}
            </Button>
            <input {...getInputProps()} />
            <Image fluid src={previewImage} />
            <Button type='submit' content={category ? "Actualizar" : "Crear"} primary fluid />
        </Form>
    )
}

function initialValues(data) {
    return {
        title: data?.title || "",
        image: "",
    }
}

function newSchema() {
    return {
        title: Yup.string().required(true),
        image: Yup.string().required(true),
    }
}
function updateSchema() {
    return {
        title: Yup.string().required(true),
        image: Yup.string(),
    }
}
