import React, {} from 'react'

import Filter from '../etc/Filter'
import StartupPreview from '../startups/StartupPreview' 

import search from '../../static/images/search.svg'
import cross from '../../static/images/cross.svg'

function Home() {
    return (
        <div className="gallery">
            <div className="gallery_sidebar">
                <div className="filters">
                    <h5>Категории стартапов</h5>
                    <Filter 
                        name={"Доступный и комфортный городской транспорт"} 
                    />
                    <Filter 
                        name={"Доступный и комфортный городской транспорт"} 
                    />
                    <Filter 
                        name={"Доступный и комфортный городской транспорт"} 
                    />
                </div>
                <div className="filters mt-2">
                    <h5>Фильтры</h5>
                    <Filter 
                        name={"Этап проекта"} 
                        filterType={"stage"}
                    />
                    <Filter 
                        name={"Команда"} 
                        filterType={"team"}
                    />
                    <Filter 
                        name={"Оценка эксперта"} 
                        filterType={"assessment"}
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

                        <button 
                            className="defaultBtn ms-1" 
                            style={{ background: "#179691", color: "#fff", whiteSpace: "nowrap" }}
                        >
                            Применить фильтр
                        </button>
                    </div>
                    <div className="d-flex mt-2" style={{ overflowX: "scroll" }}>
                        <div className="active_filter d-flex">
                            <img src={cross} width="10px" />
                            <p className="ms-2">Юридическое лицо</p>
                        </div>

                        <div className="active_filter d-flex">
                            <img src={cross} width="10px" />
                            <p className="ms-2">Юридическое лицо</p>
                        </div>

                        <div className="active_filter d-flex">
                            <img src={cross} width="10px" />
                            <p className="ms-2">Юридическое лицо</p>
                        </div>

                        <p className="mt-2 ms-1">Ещё 5</p>
                    </div>
                </div>
                <div className="startups_list mt-2">
                    <StartupPreview />
                    <StartupPreview />
                    <StartupPreview />
                    <StartupPreview />
                    <StartupPreview />
                </div>
            </div>
        </div>
    )
}

export default Home;
