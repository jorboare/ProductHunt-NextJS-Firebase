import React, { useState } from 'react';
import { css } from '@emotion/react'
import Router from 'next/router'

import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'


import firebase from '../firebase/index'

// validaciones
import useValidacion from '../hooks/useValidación'
import validarIniciarSesion from '../validacion/validarIniciarSesion'

const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

function Login() {

    const [error, guardarError] = useState(false)

    const STATE_INICIAL = {
        email: '',
        password: ''
    }

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion)


    const { email, password } = valores

    async function iniciarSesion() {
        try {
            await firebase.login(email, password)
            Router.push('/')
        } catch (error) {
            console.error('Hubo un error al iniciar sesión', error.message)
            guardarError(error.message)
        }
    }


    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                        text-align: center;
                        margin-bottom: 5rem
                        `}>Iniciar Sesión</h1>
                    <Formulario
                        onSubmit={handleSubmit}>

                        <Campo>
                            <label htmlFor='email'>Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Tu Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}

                            />
                        </Campo>

                        {errores.email && <Error>{errores.email}</Error>}

                        <Campo>
                            <label htmlFor='password'>Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Tu Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.password && <Error>{errores.password}</Error>}
                        {error && <Error>{error}</Error>}

                        <InputSubmit
                            type="submit"
                            value="Iniciar Sesión" />
                    </Formulario>
                </>
            </Layout>
        </div>
    )
}

export default Login
