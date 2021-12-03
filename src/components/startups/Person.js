import person from '../../static/images/img.png'

function Person() {
    return (
        <div className="person">
            <img width="100px" height="100px" src={person} alt="" style={{ objectFit: "cover", borderRadius: "50%" }} />
            <div>
                <p>Контактное лицо</p>
                <h4>Коваленко Александр</h4>
                <p style={{ fontSize: "16px" }}>Капитан команды</p>
            </div>
            <div>
                <p>Телефон:</p>
                <p style={{ fontSize: "18px" }}>+7 (800)-555-35-35</p>
            </div>
            <div>
                <p>Email:</p>
                <p style={{ fontSize: "18px" }}>mail@mail.mail</p>
            </div>
            <div>
                <p>Telegram:</p>
                <p style={{ fontSize: "18px" }}>@tg</p>
            </div>
            <div>
                <p>Skype:</p>
                <p style={{ fontSize: "18px" }}>@who_uses_skype?</p>
            </div>
        </div>
    )
}

export default Person