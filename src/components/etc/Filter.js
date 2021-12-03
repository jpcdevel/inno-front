import { useState } from 'react'
import arrow from '../../static/images/arrow.svg'

function Filter({ name, filterType }) {
    const [isOpen, setIsOpen] = useState(false)
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
                    <div className="filter_children">
                        <p>Решения для наземного транспорта</p>
                    </div>
                    <div className="filter_children">
                        <p>Решения для наземного транспорта</p>
                    </div>
                    <div className="filter_children">
                        <p>Решения для наземного транспорта</p>
                    </div>
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
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Идея</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Продукт</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Прототип</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Кейсы внедрения
                                </b>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Есть</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Нет</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Фаза пилотного тестирования
                                </b>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Нет пилота</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Позиционирование в ОТКМ</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Детализация параметров пилотного тестирования</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Подготовка к пилотному тестированию</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Проведение пилотного тестирование</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Формирование отчета</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Закрытие пилотного проекта</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Проект закрыт</p>
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
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Менее 20</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">от 20 до 100</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">от 100 до 500</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Более 500</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Тип участника
                                </b>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Команда</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Юридическое лицо</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Особенно сильная команда
                                </b>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Да</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Нет</p>
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
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Большие перспективы</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Перспективы есть</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Масштабирование невозможно</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Проблема
                                </b>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Есть актуальная подтверждённая проблема</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Проблема не подтверждена</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Проблема неактуальна</p>
                                </div>
                            </div>

                            <div className="filter_children_category">
                                <b style={{ fontSize: "12px" }}>
                                    Решение
                                </b>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Есть технология решения</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
                                    <p className="checkboxLabel">Технология в процессе разработки</p>
                                </div>
                                <div className="filter_checkbox">
                                    <input type="checkbox" />
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