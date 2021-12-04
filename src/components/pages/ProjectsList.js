import { useState, useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

import StartupPreview from "../startups/StartupPreview"
import Loader from "../../utils/Loader"

import { UserContext } from '../auth/AuthLayer'

import { GET_ALL_USER_STARTUPS } from '../../gql/queries/getAllUserStartups'
import { CREATE_STARTUP } from '../../gql/mutations/createStartup'


function ProjectsList() {
    const [startups, setStartups] = useState()
    const { user } = useContext(UserContext)
    const history = useHistory()

    const { loading, refetch } = useQuery(GET_ALL_USER_STARTUPS, {
        variables: {
            username: user.username
        },
        onCompleted: (data) => {
            setStartups(data.getUserInfo.startups)
        }
    })

    useEffect(() => {
        if (user.type !== "startup") {
            return history.push("/")
        }
        refetch()
    })

    const [createStartup, { loading: loadingCreate }] = useMutation(CREATE_STARTUP, {
        onCompleted: (data) => {
            toast.success("Продукт успешно создан")
            history.push(`/my/${data.createStartup.startup.id}`)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <>
            <Loader loading={loading || loadingCreate} color={"#000"} />
            <div className="w-100 d-flex justify-content-end">
                <button 
                    className="defaultBtn rounded"
                    onClick={() => createStartup({
                        variables: {
                            username: user.username
                        }
                    })}
                >
                    Создать продукт
                </button>
            </div>
            {startups && startups.length !== 0 && startups.filter(s => s.isMin).map((startup, idx) => {
                return (
                    <StartupPreview startup={startup} type={"my"} key={idx} /> // my значит, что при переходе по карточке пользователь перемещается в трекер
                )
            })}
        </>
    )
}

export default ProjectsList