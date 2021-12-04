import React, { useState, useEffect, useContext } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import Filter from '../etc/Filter'
import StartupPreview from '../startups/StartupPreview' 
import Loader from '../../utils/Loader'

import search from '../../static/images/search.svg'
import cross from '../../static/images/cross.svg'

import { UserContext } from '../auth/AuthLayer'

import { GET_ALL_STARTUP_APPLICATIONS } from '../../gql/queries/getAllStartupApplications'
import { GET_ALL_USER_STARTUPS } from '../../gql/queries/getAllUserStartups'
import { GET_ALL_SUPERIOR_CATS } from '../../gql/queries/getAllSuperiorCats'
import { GET_STARTUPS_BY_FILTERS } from '../../gql/queries/getStartupsByFilters'


function Home({ startups, setStartups, filters, setFilters, filterType, setFilterType }) {
    const { user } = useContext(UserContext)
    const history = useHistory()

    const [applicStartups, setApplicStartups] = useState()
    const [myStartups, setMyStartups] = useState()
    const [filterStartups, setFilterStartups] = useState()
    
    const [superiorCats, setSuperiorCats] = useState()
    const [stages, setStages] = useState()
    const [pilot, setPilot] = useState()
    const [inculcation, setInculcation] = useState()
    const [teamNumber, setTeamNumber] = useState()
    const [scaling, setScaling] = useState()
    const [problems, setProblems] = useState()
    const [solutions, setSolutions] = useState()

    const { loading, refetch } = useQuery(GET_ALL_STARTUP_APPLICATIONS, {
        onCompleted: (data) => {
            console.log(data)
            setApplicStartups(data.getAllStartupApplications)
        }
    })

    const { loading: loadingCats } = useQuery(GET_ALL_SUPERIOR_CATS, {
        onCompleted: (data) => {
            console.log(data)
            setSuperiorCats(data.getAllSuperiorCats)
        }
    })

    const { loading: loadMine, refetch: refetchMy } = useQuery(GET_ALL_USER_STARTUPS, {
        variables: {
            username: user.username
        },
        onCompleted: (data) => {
            console.log(data)
            setMyStartups(data.getUserInfo.startups)
        }
    })

    const [getStartupsByFilters, { loading: loadFilters, refetch: refetchFilters }] = useLazyQuery(GET_STARTUPS_BY_FILTERS, {
        onCompleted: (data) => {
            setFilterStartups(data.getStartupsByFilters)
        },
        fetchPolicy: 'cache-and-network'
    })

    useEffect(() => {
        if (user.type == "startup") {
            history.push("/my")
        }
    }, [user])

    useEffect(() => {
        refetchMy()
        refetch()
    }, [])

    return (
        <div className="gallery">
            <Loader loading={loading || loadMine || loadingCats || loadFilters} color={"#000"} />
            <div className="gallery_sidebar">
                <div className="filters">
                    <h5>Категории стартапов</h5>
                    {superiorCats && superiorCats.map((sc, idx) => {
                        return (
                            <Filter
                                name={sc.name}
                                filters={filters}
                                setFilters={setFilters}
                                children={sc.childrenCats}
                                key={idx}
                            />
                        )
                    })}
                </div>
                <div className="filters mt-2">
                    <div className="d-flex">
                        <h5>Фильтры</h5>
                        <button 
                            className="defaultBtn ms-auto mb-1" 
                            style={{ background: "#179691", color: "#fff", whiteSpace: "nowrap", padding: "2px 5px" }}
                            onClick={() => {
                                getStartupsByFilters({
                                    variables: {
                                        stage: stages ? stages : 0,
                                        pilot: pilot ? pilot : 0,
                                        inculcation: inculcation ? inculcation : 0,
                                        teamNumber: teamNumber ? teamNumber : 0,
                                        scaling: scaling ? scaling : 0,
                                        problems: problems ? problems : 0,
                                        solutions: solutions ? solutions : 0
                                    }
                                })
                            }}
                        >
                            Применить фильтр
                        </button>
                    </div>
                    <Filter 
                        name={"Этап проекта"} 
                        filterType={"stage"}
                        filters={filters}
                        setFilters={setFilters}
                        stages={stages}
                        setStages={setStages}
                        inculcation={inculcation}
                        setInculcation={setInculcation}
                        pilot={pilot}
                        setPilot={setPilot}
                    />
                    <Filter 
                        name={"Команда"} 
                        filterType={"team"}
                        filters={filters}
                        setFilters={setFilters}
                        teamNumber={teamNumber}
                        setTeamNumber={setTeamNumber}
                    />
                    <Filter 
                        name={"Оценка эксперта"} 
                        filterType={"assessment"}
                        filters={filters}
                        setFilters={setFilters}
                        scaling={scaling}
                        setScaling={setScaling}
                        problems={problems}
                        setProblems={setProblems}
                        solutions={solutions}
                        setSolutions={setSolutions}
                    />
                </div>
            </div>
            <div className="startups w-100">
                <div className="apply_area">
                    <div className="d-flex">
                        <div className="w-100 rel d-flex">
                            <input 
                                type="text" 
                                className="defaultInput w-100"
                                placeholder="Поиск"
                            />
                            <img src={search} width="25px" className="search_startup_icon" />
                        </div>
                    </div>
                    <div className="d-flex mt-2" style={{ overflowX: "scroll" }}>
                        {stages && (
                            <div className="active_filter d-flex">
                                <img style={{ cursor: "pointer" }} src={cross} width="10px" onClick={() => setStages()} />
                                <p className="ms-2">Стадия проекта</p>
                            </div>
                        )}

                        {inculcation && (
                            <div className="active_filter d-flex">
                                <img style={{ cursor: "pointer" }} src={cross} width="10px" onClick={() => setInculcation()} />
                                <p className="ms-2">Кейсы внедрения</p>
                            </div>
                        )}

                        {pilot && (
                            <div className="active_filter d-flex">
                                <img style={{ cursor: "pointer" }} src={cross} width="10px" onClick={() => setPilot()} />
                                <p className="ms-2">Фаза пилотного тестирования</p>
                            </div>
                        )}

                        {teamNumber && (
                            <div className="active_filter d-flex">
                                <img style={{ cursor: "pointer" }} src={cross} width="10px" onClick={() => setTeamNumber()} />
                                <p className="ms-2">Люди в команде</p>
                            </div>
                        )}

                        {scaling && (
                            <div className="active_filter d-flex">
                                <img style={{ cursor: "pointer" }} src={cross} width="10px" onClick={() => setScaling()} />
                                <p className="ms-2">Масштабирование</p>
                            </div>
                        )}

                        {problems && (
                            <div className="active_filter d-flex">
                                <img style={{ cursor: "pointer" }} src={cross} width="10px" onClick={() => setProblems()} />
                                <p className="ms-2">Проблема</p>
                            </div>
                        )}

                        {solutions && (
                            <div className="active_filter d-flex">
                                <img style={{ cursor: "pointer" }} src={cross} width="10px" onClick={() => setSolutions()} />
                                <p className="ms-2">Решение</p>
                            </div>
                        )}

                        

                        {/* <p className="mt-2 ms-1">Ещё 5</p> */}
                    </div>
                </div>
                {user.type == "assessment" && (
                    <div className="d-flex mt-2">
                        <button 
                            className="galleryBtn" 
                            style={filterType == "all" ? {border: "1px solid #179691"} : {}}
                            onClick={() => {
                                setFilterType("all")
                            }}
                        >
                            Все проекты
                        </button>
                        <button 
                            className="galleryBtn ms-1"
                            style={filterType == "my" ? {border: "1px solid #179691"} : {}}
                            onClick={() => {
                                setFilterType("my")
                            }}
                        >
                            Мои проекты
                        </button>
                        <button 
                            className="galleryBtn ms-1"
                            style={filterType == "applic" ? {border: "1px solid #179691"} : {}}
                            onClick={() => {
                                setFilterType("applic")
                            }}
                        >
                            Заявки
                        </button>
                    </div>
                )}
                <div className="startups_list mt-2">
                    {filterType == "applic" && (
                        applicStartups && applicStartups.map((startup, idx) => {
                            return (
                                <StartupPreview startup={startup} key={idx} />  
                            )
                        })
                    )}

                    {filterType == "my" && (
                        myStartups && myStartups.map((startup, idx) => {
                            return (
                                <StartupPreview startup={startup} key={idx} />  
                            )
                        })
                    )}

                    {filterType !== "my" && filterType !== "applic" && (
                        filterStartups && filterStartups.filter(s => filters.cats.length > 0 ? filters.cats.includes(s.category.id) : {}).map((startup, idx) => {
                            return (
                                <StartupPreview startup={startup} key={idx} />  
                            )
                        })
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default Home;
