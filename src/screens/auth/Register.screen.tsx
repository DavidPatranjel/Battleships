import Register from "../../components/Register"
import { useAuth } from "../../hooks/authContext"
import React from "react"


const RegisterScreen = () => {
    const auth = useAuth()
    return <Register onSubmit={auth.register} />
}

export default RegisterScreen