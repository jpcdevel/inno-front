import { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

import Person from './Person'
import File from '../etc/File'
import Loader from '../../utils/Loader'

import img from '../../static/images/img.png'
import www from '../../static/images/www.svg'
import tg from '../../static/images/tg.svg'

import { UserContext } from '../auth/AuthLayer'
import { GET_STARTUP_BY_ID } from '../../gql/queries/getStartupById'
import { GET_ALL_USER_STARTUPS } from '../../gql/queries/getAllUserStartups'
import { CHANGE_PROJECT_STATUS } from '../../gql/mutations/changeProjectStatus'
import { SAVE_ASSESSMENT } from '../../gql/mutations/saveAssessment'
import StartupPreview from './StartupPreview'
import { PILOT_REPLY } from '../../gql/mutations/pilotReply'

function Startup() {
    const { user } = useContext(UserContext)
    const history = useHistory()
    const [startup, setStartup] = useState()
    const [startups, setStartups] = useState()

    const [problem, setProblem] = useState()
    const [solution, setSolution] = useState()
    const [ip, setIP] = useState()
    const [inculcation, setInculcation] = useState()
    const [scaling, setScaling] = useState()

    const [heading, setHeading] = useState()
    const [text, setText] = useState()

    let { id } = useParams();

    const [loadOthers, { loading: loadingGetOthers }] = useLazyQuery(GET_ALL_USER_STARTUPS, {
        onCompleted: (data) => {
            console.log(data)
            setStartups(data.getUserInfo.startups)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const  { loading, refetch }  = useQuery(GET_STARTUP_BY_ID, {
        variables: { id },
        onCompleted: (data) => {
            setStartup(data.getStartupById)
            loadOthers({variables: { username: data.getStartupById.user.username }})
        },
        onError: (err) => {
            console.log(err)
        }
    })


    const [changeStatus, { loading: loadingStatus }] = useMutation(CHANGE_PROJECT_STATUS, {
        onCompleted: () => {
            refetch()
        }
    })

    const [pilotReply, { loading: loadingPilot }] = useMutation(PILOT_REPLY, {
        onCompleted: () => {
            refetch()
        }
    })

    const [saveAssessment, { loading: loadingAssessment }] = useMutation(SAVE_ASSESSMENT, {
        onCompleted: () => {
            refetch();
            toast.success("Комментарий сохранён")
        }
    })


    useEffect(() => {
        if (startup) {
            setProblem(startup.problem)
            setSolution(startup.solution)
            setIP(startup.ip)
            setInculcation(startup.inculcation)
            setScaling(startup.scaling)
            if (startup.comment) {
                setHeading(startup.comment.heading)
                setText(startup.comment.text)
            }
        }
    }, [startup])

    return (
        <>
            <Loader loading={loading || loadingStatus || loadingAssessment || loadingGetOthers || loadingPilot} color={"#000"} />
            {startup && (
                <>
                    <div className="startup d-flex mt-2">
                        {/* <div style={{ width: "300px" }}>
                            <img src={img} style={{ objectFit: "cover" }} />
                        </div> */}
                        <div className="w-100 p-4">
                            <div className="d-flex">
                                <div className="d-flex mt-1 me-1">
                                    <div>
                                        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "1px" }}>
                                            <path d="M10.0245 1.08156C10.1741 0.620904 10.8259 0.620903 10.9755 1.08156L12.6064 6.10081C12.8072 6.71885 13.3831 7.13729 14.033 7.13729H19.3105C19.7949 7.13729 19.9963 7.75709 19.6044 8.0418L15.3348 11.1439C14.8091 11.5258 14.5891 12.2029 14.7899 12.8209L16.4207 17.8402C16.5704 18.3008 16.0432 18.6839 15.6513 18.3992L11.3817 15.2971C10.8559 14.9152 10.1441 14.9152 9.61832 15.2971L5.34869 18.3992C4.95683 18.6839 4.42959 18.3008 4.57927 17.8402L6.21012 12.8209C6.41093 12.2029 6.19095 11.5258 5.66522 11.1439L1.39558 8.04179C1.00373 7.7571 1.20511 7.13729 1.68948 7.13729H6.96703C7.61687 7.13729 8.19281 6.71885 8.39362 6.10081L10.0245 1.08156Z" fill="white" stroke="#179691"/>
                                        </svg>
                                    </div>
                                    <div className="">
                                        <a href={startup.websiteUrl}><img src={www} alt="" width="20px" className="ms-2" /></a>
                                        <a href={startup.contactTg}><img src={tg} alt="" width="20px" className="ms-2" /></a>
                                    </div>
                                </div>
                                <h2 style={{ marginLeft: "10px" }}>{startup.productName}</h2>
                            </div>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <div className="d-flex align-items-center">
                                    <p className="green">Название команды:&nbsp;</p>
                                    <p>{startup.name}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="green">Количество участников:&nbsp;</p>
                                    <p>{startup.teamNumber}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="green">Этап:&nbsp;</p>
                                    <p>{startup.stage}</p>
                                </div>
                            </div>
                            <p style={{ fontSize: "16px" }} className="mt-2">
                                {startup.description}
                            </p>

                            {user.type == "assessment" && !startup.isApproved && (
                                <div className="d-flex mt-2">
                                    <button 
                                        className="outline_btn"
                                        onClick={() => {
                                            toast.success("Вы успешно приняли проект")
                                            changeStatus({
                                                variables: {
                                                    id: startup.id,
                                                    username: user.username,
                                                    isApprove: true
                                                }
                                            })
                                        }}
                                    >
                                        Принять проект
                                    </button>

                                    <button 
                                        className="outline_btn ms-1"
                                        onClick={() => {
                                            toast.error("Проект отклонён")
                                            changeStatus({
                                                variables: {
                                                    id: startup.id,
                                                    username: user.username,
                                                    isApprove: false
                                                }
                                            })
                                            history.push("/")
                                        }}
                                    >
                                        Отказать
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <h4 className="mt-4">
                        Польза продукта
                    </h4>
                    <p>
                        {startup.productBenefit}
                    </p>

                    <h4 className="mt-4">
                        Кейсы использования продукта
                    </h4>
                    <p>
                        {startup.inculcationCases}
                    </p>

                    <h4 className="mt-4">
                        Команда
                    </h4>
                    <p>
                        {startup.teamDescr}
                    </p>
                    <hr />
                    {startups && startups.filter(s => s.id !== startup.id).length > 0 && (
                        <>
                            <h3 className="mt-4">
                                Другие продукты команды
                            </h3>
                            {startups && startups.filter(s => s.id !== startup.id).map((st, idx) => {
                                return (
                                    <StartupPreview startup={st} key={idx} />
                                )
                            })}
                        </>
                    )}
                    
                    {startup.pilots.length > 0 && (
                        <>
                        <hr />
                            <h4>Пилотные проекты</h4>
                            {startup.pilots.map((pilot, idx) => {
                                return (
                                    <>
                                        <div className="d-flex">
                                            <h4>{ pilot.org.orgName }</h4>
                                            <p className="green ms-3">
                                                Ведётся работа
                                            </p>
                                        </div>
                                        <p className="">{ pilot.org.orgDescr }</p>
                                    </>
                                )
                            })}
                        </>
                    )}
                    <hr />

                    <div className="mt-4">
                        <Person 
                            who={"Контактное лицо"}
                            fio={startup.contactFio}
                            phone={startup.contactPhone}
                            email={startup.contactEmail}
                            tg={startup.contactTg}
                            skype={startup.contactSkype}
                        />
                    </div>
                    {startup.tracker && (
                        <div className="mt-2">
                            <Person 
                                who={"Эксперт"}
                                fio={startup.tracker.contactFio}
                                phone={startup.tracker.contactPhone}
                                email={startup.tracker.contactEmail}
                                tg={startup.tracker.contactTg}
                                skype={startup.tracker.contactSkype}
                            />
                        </div>
                    )}

                    {startup.tracker && (
                        <>
                            <h3 className="mt-4">
                                Комментарий эксперта
                            </h3>
                            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                <div className="d-flex align-items-center">
                                    <p className="green">Проблема:&nbsp;</p>
                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => problem > 0 ? setProblem(problem - 1) : {}} 
                                            className="ms-2 control_scores" 
                                            style={{ fontSize: "22px" }} 
                                        >
                                            -
                                        </span>
                                    )}
                                    <p>{problem}/3</p>
                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => problem < 3 ? setProblem(problem + 1) : {}} 
                                            className="control_scores" 
                                            disabled={startup.problem == 3}
                                        >
                                            +
                                        </span>
                                    )}
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="green">Решение:&nbsp;</p>

                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => solution > 0 ? setSolution(solution - 1) : {}} 
                                            className="ms-2 control_scores" 
                                            style={{ fontSize: "22px" }} 
                                        >
                                            -
                                        </span>
                                    )}
                                    <p>{solution}/3</p>
                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => solution < 3 ? setSolution(solution + 1) : {}} 
                                            className="control_scores" 
                                        >
                                            +
                                        </span>
                                    )}

                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="green">И/С:&nbsp;</p>

                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => ip > 0 ? setIP(ip - 1) : {}} 
                                            className="ms-2 control_scores" 
                                            style={{ fontSize: "22px" }} 
                                        >
                                            -
                                        </span>
                                    )}
                                    <p>{ip}/3</p>
                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => ip < 3 ? setIP(ip + 1) : {}} 
                                            className="control_scores" 
                                        >
                                            +
                                        </span>
                                    )}

                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="green">Внедрение:&nbsp;</p>

                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => inculcation > 0 ? setInculcation(inculcation - 1) : {}} 
                                            className="ms-2 control_scores" 
                                            style={{ fontSize: "22px" }} 
                                        >
                                            -
                                        </span>
                                    )}
                                    <p>{inculcation}/3</p>
                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => inculcation < 3 ? setInculcation(inculcation + 1) : {}} 
                                            className="control_scores" 
                                        >
                                            +
                                        </span>
                                    )}

                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="green">Масштабирование:&nbsp;</p>

                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => scaling > 0 ? setScaling(scaling - 1) : {}} 
                                            className="ms-2 control_scores" 
                                            style={{ fontSize: "22px" }} 
                                        >
                                            -
                                        </span>
                                    )}
                                    <p>{scaling}/3</p>
                                    {startup.tracker.username == user.username && (
                                        <span 
                                            onClick={() => scaling < 3 ? setScaling(scaling + 1) : {}} 
                                            className="control_scores" 
                                        >
                                            +
                                        </span>
                                    )}

                                </div>
                            </div>
                            {user.username !== startup.tracker.username ? (
                                <>
                                    {startup.comment && (
                                        <>
                                            <h5 className="mt-4">{startup.comment.heading}</h5>
                                            <p>
                                                {startup.comment.text}
                                            </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    saveAssessment({
                                        variables: {
                                            id: startup.id,
                                            heading,
                                            text,
                                            scaling,
                                            problem,
                                            inculcation,
                                            ip,
                                            solution
                                        }
                                    })
                                }}>
                                    <input 
                                        type="text" 
                                        className="defaultInput w-100" 
                                        placeholder="Краткий вывод по продукту"
                                        defaultValue={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                        required
                                    />
                                    <textarea 
                                        className="defaultInput w-100 mt-2" 
                                        cols="30" 
                                        rows="10" 
                                        placeholder="Охарактеризуйте продукт подробнее"
                                        defaultValue={text}
                                        onChange={(e) => setText(e.target.value)}
                                        required
                                    >
                                    </textarea>
                                    <button type="submit" className="defaultBtn" style={{ width: "200px" }}>Сохранить</button>
                                </form>
                            )}
                        </>
                    )}
                    {user.type == "assessment" && startup.pendingPilots.length > 0 && (
                        <>
                            <h3 className="mt-4">Заявки на пилот</h3>
                            {startup.pendingPilots.map((pilot, idx) => {
                                return (
                                    <>
                                        <div className="d-flex">
                                            <h5>{pilot.org.orgName}</h5>
                                            <button 
                                                className="defaultBtn ms-2"
                                                onClick={() => {
                                                    pilotReply({
                                                        variables: {
                                                            id: pilot.id,
                                                            ids: startup.id,
                                                            action: true
                                                        }
                                                    })
                                                    toast.success("Заявка принята")
                                                }}
                                            >
                                                Принять
                                            </button>
                                            <button 
                                                className="defaultBtn ms-2"
                                                onClick={() => {
                                                    pilotReply({
                                                        variables: {
                                                            id: pilot.id,
                                                            ids: startup.id,
                                                            action: false
                                                        }
                                                    })
                                                    toast.error("Заявка отклонена")
                                                }}
                                            >
                                                Отказать
                                            </button>
                                        </div>
                                        <p>{pilot.org.orgDescr}</p>
                                    </>
                                )
                            })}
                        </>
                    )}

                    <h3 className="mt-4">
                        Файлы
                    </h3>
                    <p className="small_p">
                        Заявка на акселератор
                    </p>
                    <File />

                    <p className="small_p mt-3">
                        Презентация проекта
                    </p>
                    <File />
                </>
            )}
        </>
    )
}

export default Startup;