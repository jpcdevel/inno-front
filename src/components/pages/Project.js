import { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { UserContext } from '../auth/AuthLayer'
import { GlobalContext } from '../../App'
import { GET_STARTUP_BY_ID } from '../../gql/queries/getStartupById'
import { GET_ALL_CATS } from '../../gql/queries/getAllCats'

import InfoTab from '../startups/tabs/InfoTab'
import CommentTab from '../startups/tabs/CommentTab'
import PilotTab from '../startups/tabs/PilotTab'

import Loader from '../../utils/Loader'
import StartupPreview from '../startups/StartupPreview'

function Project() {
    const [activeTab, setActiveTab] = useState("project")
    const { startup, setStartup, cats, setCats } = useContext(GlobalContext)
    const { user, setUser } = useContext(UserContext)

    let { id } = useParams();

    const  { loading, refetch }  = useQuery(GET_STARTUP_BY_ID, {
        variables: { id },
        onCompleted: (data) => {
            setStartup(data.getStartupById)
            if (!data.getStartupById.isMin) {
                return setActiveTab("constant") // Пользователь может пользоваться только вкладкой "информация"
            }
            setActiveTab("info")
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const { loadingCats }  = useQuery(GET_ALL_CATS, {
        onCompleted: (data) => {
            setCats(data.getAllCats)
        },
        onError: (err) => {
            console.log(err)
        }
    })


    return (
        <div className="project">
            <Loader loading={loading || loadingCats} color={"000"} />
            <div className="tabs mt-2">
                <button 
                    className={(activeTab == "constant" || activeTab == "info") ? "tab_active tab" : "tab"}
                    onClick={() => setActiveTab("info")}
                >
                    Информация
                </button>
                {activeTab !== "constant" && (
                    <>
                        {startup && startup.tracker && (
                            <button 
                                className={activeTab == "comment" ? "tab_active tab" : "tab"}
                                onClick={() => setActiveTab("comment")}
                            >
                                Комментарий
                            </button>
                        )}
                        {startup && startup.pilots.length !== 0 && (
                            <button 
                                className={activeTab == "pilot" ? "tab_active tab" : "tab"}
                                onClick={() => setActiveTab("pilot")}
                            >
                                Пилот
                            </button>
                        )}
                    </>
                )}
            </div>
            <div className="project_content">
                {activeTab == "constant" ? (
                    <>
                        <h2>Создание стартапа</h2>
                        <p style={{ fontSize: "16px" }}>Заполните заявку стартапа и пройдите отбор в акселерационную программу</p>
                    </>
                ) : (
                    <></>
                )}
                {(activeTab == "info" || activeTab == "constant") && (
                    <InfoTab cats={cats} startup={startup} setStartup={setStartup} refetch={refetch} />
                )}

                {activeTab == "comment" && (
                    <CommentTab startup={startup} setStartup={setStartup} />
                )}

                {activeTab == "pilot" && (
                    <PilotTab startup={startup} setStartup={setStartup} />
                )}
                
            </div>
        </div>
    )
}

export default Project