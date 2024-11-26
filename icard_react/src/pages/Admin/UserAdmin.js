import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks';
import { Loader } from "semantic-ui-react";
import { getUsersApi, deleteUserApi } from '../../api/user';
import { TableUsers, AddEditUserForm } from '../../components/Admin';
import { HeaderPage } from '../../components/Admin/HeaderPage/HeaderPage';
import { ModalBasic } from "../../components/Common"
import { toast } from 'react-toastify';
export function UserAdmin() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
    const [tittleModal, setTittleModal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false)
    const { auth } = useAuth();

    // Declaro la funcion dentro del useEffect ya que al ser asíncrona puede dar errores de dependencias faltantes
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const response = await getUsersApi(auth.token);
                setLoading(false);
                setUsers(response);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        getUsers();
    }, [refetch])

    const onRefetch = () => setRefetch((prev) => !prev);    // Función para refrescar la página

    const openCloseModal = () => setShowModal((prev) => !prev);

    const addUser = () => {
        setTittleModal("Nuevo usuario");
        setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateUser = (data) => {
        setTittleModal("Editar usuario");
        setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} user={data} />);
        openCloseModal();
    }

    const onDeleteUser = async (data) => {
        const result = window.confirm(`¿Estás seguro de eliminar el usuario ${data.username}?`);
        if (result) {
            try {
                await deleteUserApi(data.id, auth.token);
                onRefetch();
                toast.success("Usuario eliminado correctamente");
            } catch (error) {
                toast.error("Error al eliminar el usuario");
            }
        }
    }
    return (
        <>
            <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" btnClick={addUser} />
            {loading ? (
                <Loader active inline='centered'>
                    Cargando...
                </Loader>
            ) : (
                <TableUsers users={users} updateUser={updateUser} onDeleteUser={onDeleteUser} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={tittleModal}>
                <h2>{contentModal}</h2>
            </ModalBasic>
        </>
    )
}
