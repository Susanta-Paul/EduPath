import {Outlet, Navigate} from "react-router-dom"


export default function ProtectedRoute(){

    const isLoggedIn= localStorage?.getItem("isLoggedIn") || false

    return(
        isLoggedIn?<Outlet/>: <Navigate to="login" />
    )
}