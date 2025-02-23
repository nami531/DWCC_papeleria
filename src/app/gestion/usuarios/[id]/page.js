// app/usuarios/gestion

"use client";

import DynamicForm from "@/components/DynamicForm";
import { addNewUser, editUser, getUser } from "@/lib/services/users";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const userFields = [
	{
		name: "name",
		label: "Nombre",
		type: "text",
		validators: [
			{ key: "required", value: true, errmssg: "El nombre es obligatorio" },
			{ key: "maxLength", value: 256, errmssg: "Máximo 256 caracteres" },
		],
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		validators: [
			{ key: "required", value: true, errmssg: "El email es obligatorio" },
			{ key: "min", value: 1, errmssg: "El precio debe ser mayor a 0" },
		],
	},
	{
		name: "psswrd",
		label: "Contraseña",
		type: "password",
		validators: [
			{ key: "required", value: true, errmssg: "El stock es obligatorio" },
			{ key: "min", value: 0, errmssg: "El stock no puede ser negativo" },
		],
	},
	{
		name: "rol",
		label: "Rol",
		type: "select",
        options:[
            {value:"admin", text:"Administrador"},
            {value:"common-user", text:"Usuario"},
            {value:"employee", text:"Empleado"}
        ],
		validators: [
			{ key: "required", value: true, errmssg: "La descripción es obligatoria" },
			{ key: "maxLength", value: 1024, errmssg: "Máximo 1024 caracteres" },
		],
		requiredRole: "admin",  // Este campo solo se mostrará si el usuario es admin

	},

];

const UserManagementForm = ({userData, setFunction}) => {
	const{data:session, status} = useSession();
	
	const submitForm = async (data) => {
		try {
			const dataWithIdCart ={...data, id: userData.id, cart: userData.cart}
			const userEdited = await editUser(dataWithIdCart); // Este data es un objeto normal con la informacion del formulario
			console.log("Usuario editado:", userEdited);
			setFunction(dataWithIdCart);
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div className="d-flex flex-col justify-content-center align-items-center pt-10">
			<h5 className="w-50">Datos del usuario</h5>
            <div className="w-50 pt-3">
			    <DynamicForm attributes={userFields} submitFunction={submitForm} formItemData={userData} session={session}/>
            </div>
		</div>
	);
};

const UserManagement = () => {
	const { id } = useParams();
	const [userRetrieved, setUserRetrieved] = useState(null);

	useEffect(() => {
			const fetchProduct = async () => {
				const userFound = await getUser(id);
				setUserRetrieved(userFound);
			};
			fetchProduct();
		}, [id]);
	return <UserManagementForm userData={userRetrieved} setFunction={setUserRetrieved}/>;
};

export default UserManagement;
