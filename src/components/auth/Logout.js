import { useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

import { UserContext } from '../auth/AuthLayer'
import { REVOKE_TOKEN } from '../../gql/mutations/revokeToken'

import Loader from 'react-spinners/MoonLoader'

function Logout() {
    const { user, setUser } = useContext(UserContext)
    const history = useHistory()

    const [revokeToken, { loading }] = useMutation(REVOKE_TOKEN, {
        onCompleted: (data) => {
            setUser({})
            setTimeout(() => {
                history.push("/login")
            }, 100)
        },
        onError: (err) => {
        }
    })

    useEffect(() => {
        revokeToken({
            variables: {
                refreshToken: localStorage.getItem("refreshToken")
            }
        })
    })
    return (
        <Loader loading={loading} color={"#000"} />
    )
}

export default Logout