import Person from "../Person"

function CommentTab({ startup }) {
    return (
        <>
            <Person 
                who={"Эксперт"}
                fio={startup.tracker.contactFio}
                phone={startup.tracker.contactPhone}
                email={startup.tracker.contactEmail}
                tg={startup.tracker.contactTg}
                skype={startup.tracker.contactSkype}
            />
            <h3 className="mt-4">
                Комментарий эксперта
            </h3>

            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                <div className="d-flex align-items-center">
                    <p className="green">Проблема:&nbsp;</p>
                    <p>{startup.problem}/3</p>
                </div>
                <div className="d-flex align-items-center">
                    <p className="green">Решение:&nbsp;</p>
                    <p>{startup.solution}/3</p>
                </div>
                <div className="d-flex align-items-center">
                    <p className="green">И/С:&nbsp;</p>
                    <p>{startup.ip}/3</p>
                </div>
                <div className="d-flex align-items-center">
                    <p className="green">Внедрение:&nbsp;</p>
                    <p>{startup.inculcation}/3</p>
                </div>
                <div className="d-flex align-items-center">
                    <p className="green">Масштабирование:&nbsp;</p>
                    <p>{startup.scaling}/3</p>
                </div>
            </div>
            {startup.comment && (
                <>
                    <h5 className="mt-4">{startup.comment.heading}</h5>
                    <p>
                        {startup.comment.text}
                    </p>
                </>
            )}
        </>
        
    )
}

export default CommentTab