import { useState, useEffect } from 'react'
import arrow from '../../static/images/arrow.svg'

function Filter({ name, filterType, filters, setFilters, children, stages, setStages, inculcation, setInculcation, pilot, setPilot, teamNumber, setTeamNumber, scaling, setScaling, problems, setProblems, solutions, setSolutions }) {
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        console.log(stages)
    }, [stages])
    return (
        <div 
            style={{ borderBottom: "1px solid #D4D4D4", padding: "15px 0" }}
        >
            <div 
                className="superior_filter"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="superior_name">{name}</p>
                <img 
                    src={arrow} 
                    width="20px" 
                    style={{ transition: ".2s" }}
                    className={isOpen ? "rotate" : ""}
                />
            </div>
            {isOpen && !filterType && (
                <div>
                    {children.map((child, idx) => {
                        return (
                            <div 
                                key={idx} 
                                className="filter_children" 
                                onClick={() => filters.cats.includes(child.id) ? setFilters({...filters, cats: filters.cats.filter(c => c !== child.id)}) : setFilters({...filters, cats: [...filters.cats, child.id]})}
                            >
                                <p 
                                    style={filters.cats.includes(child.id) ? {color: "#179691"} : {}}
                                >
                                    {child.name}
                                </p>
                            </div>
                        )
                    })}
                </div>
                
            )}
            {isOpen && filterType && (
                <div className="filter_without_hover">
                    {filterType == "stage" && (
                        <div className="filter_children">
                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Стадия готовности продукта
                                </b>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={stages == 1}
                                        onChange={(e) => e.target.checked ? setStages(1) : {}}
                                        
                                    />
                                    <p className="checkboxLabel">Идея</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={stages == 2}
                                        onChange={(e) => e.target.checked ? setStages(2) : {}}
                                    />
                                    <p className="checkboxLabel">Продукт</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={stages == 3}
                                        onChange={(e) => e.target.checked ? setStages(3) : {}}
                                    />
                                    <p className="checkboxLabel">Прототип</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Кейсы внедрения
                                </b>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={inculcation == 1}
                                        onChange={(e) => e.target.checked ? setInculcation(1) : {}}
                                    />
                                    <p className="checkboxLabel">Есть</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={inculcation == 2}
                                        onChange={(e) => e.target.checked ? setInculcation(2) : {}}
                                    />
                                    <p className="checkboxLabel">Нет</p>
                                </div>
                            </div>

                            
                        </div>
                    )}

                    {filterType == "team" && (
                        <div className="filter_children">
                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Количество участников
                                </b>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={teamNumber == 1}
                                        onChange={(e) => e.target.checked ? setTeamNumber(1) : {}}
                                    />
                                    <p className="checkboxLabel">Менее 20</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={teamNumber == 2}
                                        onChange={(e) => e.target.checked ? setTeamNumber(2) : {}}
                                    />
                                    <p className="checkboxLabel">от 20 до 100</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={teamNumber == 3}
                                        onChange={(e) => e.target.checked ? setTeamNumber(3) : {}}
                                    />
                                    <p className="checkboxLabel">от 100 до 500</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={teamNumber == 4}
                                        onChange={(e) => e.target.checked ? setTeamNumber(4) : {}}
                                    />
                                    <p className="checkboxLabel">Более 500</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {filterType == "assessment" && (
                        <div className="filter_children">
                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Масштабирование
                                </b>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={scaling == 1}
                                        onChange={(e) => e.target.checked ? setScaling(1) : {}}
                                    />
                                    <p className="checkboxLabel">Большие перспективы</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={scaling == 2}
                                        onChange={(e) => e.target.checked ? setScaling(2) : {}}
                                    />
                                    <p className="checkboxLabel">Перспективы есть</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={scaling == 3}
                                        onChange={(e) => e.target.checked ? setScaling(3) : {}}
                                    />
                                    <p className="checkboxLabel">Масштабирование невозможно</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Проблема
                                </b>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={problems == 1}
                                        onChange={(e) => e.target.checked ? setProblems(1) : {}}
                                    />
                                    <p className="checkboxLabel">Есть актуальная подтверждённая проблема</p>
                                </div>
                                <div className="filter_checkbox">
                                <input 
                                        type="radio" 
                                        checked={problems == 2}
                                        onChange={(e) => e.target.checked ? setProblems(2) : {}}
                                    />
                                    <p className="checkboxLabel">Проблема не подтверждена</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={problems == 3}
                                        onChange={(e) => e.target.checked ? setProblems(3) : {}}
                                    />
                                    <p className="checkboxLabel">Проблема неактуальна</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Решение
                                </b>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={solutions == 1}
                                        onChange={(e) => e.target.checked ? setSolutions(1) : {}}
                                    />
                                    <p className="checkboxLabel">Есть технология решения</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={solutions == 2}
                                        onChange={(e) => e.target.checked ? setSolutions(2) : {}}
                                    />
                                    <p className="checkboxLabel">Технология в процессе разработки</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input 
                                        type="radio" 
                                        checked={solutions == 3}
                                        onChange={(e) => e.target.checked ? setSolutions(3) : {}}
                                    />
                                    <p className="checkboxLabel">Решение под вопросом</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Filter