import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import Loader from '../../../utils/Loader'

import { SAVE_STARTUP_INFORMATION } from '../../../gql/mutations/saveStartupInformation'
import toast from 'react-hot-toast'

function InfoTab({ cats, startup, setStartup, refetch }) {
    const [teamName, setTeamName] = useState()
    const [cat, setCat] = useState(0)
    const [inn, setInn] = useState()
    const [urName, setUrName] = useState()
    const [teamNumber, setTeamNumber] = useState()
    const [stage, setStage] = useState(0)
    const [websiteUrl, setWebsiteUrl] = useState()
    const [briefDescription, setBriefDescription] = useState()
    const [pilotThoughts, setPilotThoughts] = useState()
    const [productBenefit, setProductBenefit] = useState()
    const [inculcationCases, setInculcationCases] = useState()
    const [teamDescr, setTeamDescr] = useState()
    const [fio, setFio] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [tg, setTg] = useState()
    const [skype, setSkype] = useState()
    const [productName, setProductName] = useState()

    useEffect(() => {
        if (startup.isMin) {
            setTeamName(startup.name)
            setCat(startup.category.name)
            setInn(startup.inn)
            setUrName(startup.urName)
            setTeamNumber(startup.teamNumber)
            setStage(startup.stage)
            setWebsiteUrl(startup.websiteUrl)
            setBriefDescription(startup.description)
            setPilotThoughts(startup.pilotThoughts)
            setProductBenefit(startup.productBenefit)
            setInculcationCases(startup.inculcationCases)
            setTeamDescr(startup.teamDescr)
            setFio(startup.contactFio)
            setPhone(startup.contactPhone)
            setEmail(startup.contactEmail)
            setTg(startup.contactTg)
            setSkype(startup.contactSkype)
            setProductName(startup.productName)
        }
    }, [startup])

    const [saveInfo, { loading }] = useMutation(SAVE_STARTUP_INFORMATION, {
        onCompleted: (data) => {
            toast.success("Информация сохранена")

            refetch()
        }
    })

    return (
        <>
            <Loader loading={loading} color={"#000"} />
            <form onSubmit={(e) => {
                e.preventDefault()
                saveInfo({
                    variables: {
                        startupId: startup.id,
                        teamName,
                        cat,
                        inn,
                        urName,
                        teamNumber,
                        stage,
                        websiteUrl,
                        briefDescription,
                        pilotThoughts,
                        productBenefit,
                        inculcationCases,
                        teamDescr,
                        fio,
                        phone,
                        email,
                        tg,
                        skype,
                        productName
                    }
                })
            }}>
                
                <div className="d-flex mt-2">
                    <div className="w-100">
                        <h4>Название вашей команды</h4>
                        <input 
                            type="text" 
                            className="defaultInput w-100" 
                            placeholder="Название команды"
                            onChange={(e) => setTeamName(e.target.value)}
                            defaultValue={teamName}
                            required
                        />
                    </div>
                    &nbsp;&nbsp;
                    <div className="w-100">
                        <h4>Категория проекта</h4>
                        <select 
                            className="defaultInput w-100"
                            onChange={(e) => setCat(e.target.value)}
                            defaultValue={cat}
                        >
                            <option value="0" disabled>Выберите категорию</option>
                            {cats && cats.map((cati, idx) => {
                                if (cati.name == cat) {
                                    return (
                                        <option key={idx} value={cati.name} selected>{cati.name}</option>
                                    )
                                } else {
                                    return (
                                        <option key={idx} value={cati.name}>{cati.name}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                </div>

                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>ИНН вашей оранизации</h4>
                        <input 
                            type="number" 
                            className="defaultInput w-100" 
                            placeholder="ИНН"
                            onChange={(e) => setInn(e.target.value)}
                            defaultValue={inn}
                            required
                        />
                    </div>
                    &nbsp;&nbsp;
                    <div className="w-100">
                        <h4>Название юр. лица</h4>
                        <input 
                            type="text" 
                            className="defaultInput w-100" 
                            placeholder="Полное название вашего юр. лица"
                            onChange={(e) => setUrName(e.target.value)}
                            defaultValue={urName}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Количество участников вашей команды</h4>
                        <input 
                            type="number" 
                            className="defaultInput w-100" 
                            placeholder="Количество участнииков"
                            onChange={(e) => setTeamNumber(e.target.value)}
                            defaultValue={teamNumber}
                            required
                        />
                    </div>
                    &nbsp;&nbsp;
                    <div className="w-100">
                        <h4>На каком этапе находится ваш проект?</h4>
                        <select 
                            className="defaultInput w-100"
                            onChange={(e) => setStage(e.target.value)}
                            defaultValue={stage}
                        >
                            <option value="0" disabled>Выберите стадию</option>
                            {stage == "Идея" ? (
                                <option value={"Идея"} selected>Идея</option>
                            ) : (
                                <option value={"Идея"}>Идея</option>
                            )}

                            {stage == "Продукт" ? (
                                <option value={"Продукт"} selected>Продукт</option>
                            ) : (
                                <option value={"Продукт"}>Продукт</option>
                            )}

                            {stage == "Прототип" ? (
                                <option value={"Прототип"} selected>Прототип</option>
                            ) : (
                                <option value={"Прототип"}>Прототип</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Адрес веб-сайта</h4>
                        <input 
                            type="text" 
                            className="defaultInput w-100" 
                            placeholder="Введите адрес веб-сайта вашего проекта"
                            defaultValue={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Название продукта</h4>
                        <input 
                            type="text" 
                            className="defaultInput w-100" 
                            placeholder="Введите название вашего продукта"
                            defaultValue={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Краткое описание</h4>
                        <textarea 
                            cols="30" 
                            rows="10" 
                            placeholder="Введите краткое описание вашего продукта"
                            className="defaultInput w-100"
                            defaultValue={briefDescription}
                            onChange={(e) => setBriefDescription(e.target.value)}
                            required
                        >
                        </textarea>

                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Как вы видите пилотный проект?</h4>
                        <textarea 
                            cols="30" 
                            rows="10" 
                            placeholder="Опишите ваше представление о пилотном проекте"
                            className="defaultInput w-100"
                            defaultValue={pilotThoughts}
                            onChange={(e) => setPilotThoughts(e.target.value)}
                            required
                        >
                        </textarea>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Польза продукта</h4>
                        <textarea 
                            cols="30" 
                            rows="10" 
                            placeholder="Опишите пользу от вашего продукта"
                            className="defaultInput w-100"
                            defaultValue={productBenefit}
                            onChange={(e) => setProductBenefit(e.target.value)}
                            required
                        >
                        </textarea>
                        
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Кейсы использования вашего продукта</h4>
                        <textarea 
                            cols="30" 
                            rows="10" 
                            placeholder="Опишите кейсы применения вашего продукта на практике"
                            className="defaultInput w-100"
                            defaultValue={inculcationCases}
                            onChange={(e) => setInculcationCases(e.target.value)}
                            required
                        >
                        </textarea>
                        
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Кратко опишите вашу команду</h4>
                        <textarea 
                            cols="30" 
                            rows="10" 
                            placeholder="Вкратце опишите вашу команду"
                            className="defaultInput w-100"
                            defaultValue={teamDescr}
                            onChange={(e) => setTeamDescr(e.target.value)}
                            required
                        >
                        </textarea>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="w-100">
                        <h4>Как с вами связаться?</h4>
                        <input 
                            type="text" 
                            className="defaultInput w-100" 
                            placeholder="Ваше фио"
                            defaultValue={fio}
                            onChange={(e) => setFio(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="d-flex">
                        <input 
                            type="text" 
                            className="defaultInput w-50" 
                            placeholder="Контактный телефон"
                            defaultValue={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        &nbsp;&nbsp;
                        <input 
                            type="email"
                            className="defaultInput w-50" 
                            placeholder="Электронная почта"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="d-flex">
                        <input 
                            type="text" 
                            className="defaultInput w-50" 
                            placeholder="Ваш telegram"
                            defaultValue={tg}
                            onChange={(e) => setTg(e.target.value)}
                            required
                        />
                        &nbsp;&nbsp;
                        <input 
                            type="text" 
                            className="defaultInput w-50" 
                            placeholder="Ваш Skype"
                            defaultValue={skype}
                            onChange={(e) => setSkype(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="defaultBtn mt-3" 
                    style={{ width: "260px", color: "#fff", background: "#179691" }}
                    disabled={cat == 0 || stage == 0}
                >
                    Сохранить
                </button>
            </form>
        </>
    )
}

export default InfoTab