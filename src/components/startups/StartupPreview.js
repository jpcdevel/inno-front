import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

import { REQUEST_PILOT } from '../../gql/mutations/requestPilot'
import { UserContext } from '../auth/AuthLayer'

function StartupPreview({ type, startup }) {
    const { user } = useContext(UserContext)
    const [requestPilot, { loading }] = useMutation(REQUEST_PILOT, {
        onCompleted: () => {
            toast.success("Запрос отправлен")
        }
    })

    return (
        <div className="startup d-flex mt-2">

            <div className="w-100 p-4">
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <Link to={type == "my" ? `/my/${startup.id}` : `/startup/${startup.id}`} className="non_link">
                        <h5>{ startup.productName }</h5>
                    </Link>
                    <div className="d-flex">
                        <Link to={type == "my" ? `/my/${startup.id}` : `/startup/${startup.id}`}>
                            <button className="outline_btn">
                                Подробнее
                            </button>
                        </Link>
                        {user.type == "director" && (
                            <button 
                                className="outline_btn d-flex align-items-center ms-1" 
                                style={{ padding: "4px" }}
                                onClick={() => requestPilot({
                                    variables: {
                                        id: startup.id,
                                        username: user.username
                                    }
                                })}
                            >
                                <svg style={{ marginBottom: "2px" }} width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0245 1.08156C10.1741 0.620904 10.8259 0.620903 10.9755 1.08156L12.6064 6.10081C12.8072 6.71885 13.3831 7.13729 14.033 7.13729H19.3105C19.7949 7.13729 19.9963 7.75709 19.6044 8.0418L15.3348 11.1439C14.8091 11.5258 14.5891 12.2029 14.7899 12.8209L16.4207 17.8402C16.5704 18.3008 16.0432 18.6839 15.6513 18.3992L11.3817 15.2971C10.8559 14.9152 10.1441 14.9152 9.61832 15.2971L5.34869 18.3992C4.95683 18.6839 4.42959 18.3008 4.57927 17.8402L6.21012 12.8209C6.41093 12.2029 6.19095 11.5258 5.66522 11.1439L1.39558 8.04179C1.00373 7.7571 1.20511 7.13729 1.68948 7.13729H6.96703C7.61687 7.13729 8.19281 6.71885 8.39362 6.10081L10.0245 1.08156Z" fill="white" stroke="#179691"/>
                                </svg>
                            </button>
                            )}
                    </div>
                </div>
                <p style={{ fontSize: "16px" }}>
                    { startup.description }
                </p>
                <div className="d-flex mt-2" style={{ justifyContent: "space-between" }}>
                    <div className="d-flex align-items-center">
                        <p className="green">Категория:&nbsp;</p>
                        <p>{ startup.category.name }</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="green">Команда:&nbsp;</p>
                        <p>{ startup.name }</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="green">Этап:&nbsp;</p>
                        <p>{ startup.stage }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartupPreview