import person from '../../static/images/person.png'

function Person({ who, fio, phone, email, tg, skype }) {
    return (
        <div className="person">
            <img width="100px" height="100px" src={person} alt="" style={{ objectFit: "cover", borderRadius: "50%" }} />
            <div>
                <p>{ who }</p>
                <h4>{ fio }</h4>
            </div>
            <div>
                <p>Телефон:</p>
                <p style={{ fontSize: "18px" }}>{ phone }</p>
            </div>
            <div>
                <p>Email:</p>
                <p style={{ fontSize: "18px" }}>{ email }</p>
            </div>
            <div>
                <p>Telegram:</p>
                <p style={{ fontSize: "18px" }}>{ tg }</p>
            </div>
            <div>
                <p>Skype:</p>
                <p style={{ fontSize: "18px" }}>{ skype }</p>
            </div>
        </div>
    )
}

export default Person