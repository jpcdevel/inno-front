import React, { useState, useEffect, useContext } from 'react'
import {useMutation, useLazyQuery} from "@apollo/client";

import { UPDATE_REFRESH_TOKEN } from "../../gql/mutations/refreshToken";
import { GET_USER_INFO } from '../../gql/queries/getUserInfo';
import MoonLoader from "react-spinners/MoonLoader";

export const UserContext = React.createContext()

function Auth ({ children }) {
    const [user, setUser] = useState({})

    const [getUserInfo, {loading: infoLoading}] = useLazyQuery(GET_USER_INFO, {
        onCompleted: (data) => {
            setUser(Object.assign({}, data.getUserInfo, user))
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [refreshToken, {loading}] = useMutation(UPDATE_REFRESH_TOKEN, {
        onCompleted: ((data) => {
            setUser(data.refreshToken.payload)
            getUserInfo({variables: {username: data.refreshToken.payload.username}})

            localStorage.setItem("accessToken", data.refreshToken.token)
            localStorage.setItem("refreshToken", data.refreshToken.refreshToken)
            localStorage.setItem("reloaded", false)

            setTimeout(() => {
                refreshToken({
                    variables: {refreshToken: data.refreshToken.payload.refreshToken}
                })
            }, 290000)
        }),
        onError: (error => {
            localStorage.setItem("reloaded", true)
        })
    })

    useEffect(() => {
        let refresh = localStorage.getItem("refreshToken");
        refreshToken({
            variables: {refreshToken: refresh}
        })
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            <>
                <div className="loader">
                    <MoonLoader
                        loading={loading || infoLoading}
                        color={"#000"}
                        size={30}
                    />
                </div>
                {(!loading && !infoLoading) && children}
            </>
        </UserContext.Provider>
    )
}

export default Auth