import React, { useState, useContext } from 'react';
import { css } from '@emotion/react'
import Router, { useRouter } from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'


import { FirebaseContext } from '../firebase/index'

// validaciones
import useValidacion from '../hooks/useValidación'
import validarCrearProducto from '../validacion/validarCrearProducto'
import firebaseConfig from '../firebase/config';


function NuevoProducto() {

    //state de las imagenes
    const [urlimagen, setUrlImage] = useState('')

    const [error, guardarError] = useState(false)

    const STATE_INICIAL = {
        nombre: '',
        empresa: '',
        imagen: '',
        url: '',
        descripcion: '',
    }

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto)


    const { nombre, empresa, imagen, url, descripcion } = valores

    //Hook de routing para redireccionar
    const router = useRouter()

    //Context con las operaciones crud de firebase
    const { usuario, firebase } = useContext(FirebaseContext)

    async function crearProducto() {

        // Si el usuario no esta autenticado llevar al login
        if (!usuario) {
            return router.push('/login')
        }

        //Crear el mobjeto de nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlimagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now()
        }

        //Insertarlo en la base de datos
        firebase.db.collection('productos').add(producto)

        return router.push('/')
    }

    const onChange = async (e) => {

        const file = e.target.files[0]; // acceder al file subido con el input

        // asignar donde se guardara el file  
        const storageRef = await firebase.storage.ref("productos");

        // asignar el nombre del archivo en el storage de firebase
        const fileRef = storageRef.child(file.name);

        await fileRef.put(file); // termina de agregar el archivo

        setUrlImage(await fileRef.getDownloadURL()); // add urlFile al state

        /* getDownloadURL() - permite extraer url del file subido,
           sirve tanto con await y .then */
    };





    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                        text-align: center;
                        margin-bottom: 5rem
                        `}>Agregar Nuevo Producto</h1>
                    <Formulario

                        onSubmit={handleSubmit}
                        noValidate>
                        <fieldset>
                            <legent>Información General</legent>

                            <Campo>
                                <label htmlFor='nombre'>Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Tu Nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.nombre && <Error>{errores.nombre}</Error>}

                            <Campo>
                                <label htmlFor='empresa'>Empresa</label>
                                <input
                                    type="text"
                                    id="empresa"
                                    placeholder="Tu Empresa"
                                    name="empresa"
                                    value={empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.empresa && <Error>{errores.empresa}</Error>}

                            <Campo>
                                <label htmlFor='imagen'>Imagen</label>
                                <input
                                    accept="image/*"
                                    onChange={onChange}
                                    type="file"
                                    id="image"
                                    name="image"
                                />
                            </Campo>

                            <Campo>
                                <label htmlFor='url'>URL</label>
                                <input
                                    type="url"
                                    id="url"
                                    name="url"
                                    placeholder="URL de tu producto"
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.url && <Error>{errores.url}</Error>}
                        </fieldset>
                        <fieldset>
                            <legend>Sobre tu Producto</legend>

                            <Campo>
                                <label htmlFor='descripcion'>Descripción</label>
                                <textarea

                                    id="descripcion"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.descripcion && <Error>{errores.descripcion}</Error>}
                        </fieldset>
                        {error && <Error>{error}</Error>}

                        <InputSubmit
                            type="submit"
                            value="Crear Producto" />
                    </Formulario>
                </>
            </Layout>
        </div>
    )
}

export default NuevoProducto
