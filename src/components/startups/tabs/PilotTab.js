import Person from "../Person"

function PilotTab({ startup }) {
    return (
        <>
            {startup.pilots.map((pilot, idx) => {
                return (
                    <>
                        <div className="d-flex">
                            <h4>{ pilot.org.orgName }</h4>
                            <p className="green ms-3">
                                Ведётся работа
                            </p>
                        </div>
                        <Person 
                            who={pilot.org.contactPosition}
                            fio={pilot.org.contactFio}
                            phone={pilot.org.contactPhone}
                            email={pilot.org.contactEmail}
                            tg={pilot.org.contactTg}
                            skype={pilot.org.contactSkype}
                        />
                        <p className="mt-4">{ pilot.org.orgDescr }</p>
                    </>
                )
            })}
        </>
    )
}

export default PilotTab