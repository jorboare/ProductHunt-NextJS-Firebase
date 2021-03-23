import React, { useState, useEffect } from 'react';

const useValidación = (stateInicial, validar, fn) => {

    const [valores, guardarValores] = useState(stateInicial)
    const [errores, guardarErrores] = useState({})
    const [submitForm, guardarSubmitForm] = useState(false)

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if (noErrores) {
                fn(); //Fn = Función que se ejecuta en el componente
            }
            guardarSubmitForm(false)
        }
    }, [errores])

    //Función que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault()

        const erroresValidación = validar(valores)
        guardarErrores(erroresValidación)
        guardarSubmitForm(true)
    }

    //Cuando se realzia el evento de blur
    const handleBlur = () => {
        const erroresValidación = validar(valores)
        guardarErrores(erroresValidación)
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

export default useValidación;