import React from 'react'
import {Col, DatePicker, Input, Row, Button} from 'antd';
import 'antd/dist/antd.css';

function onChange(date, dateString) {
    console.log(date, dateString);
}

function Invitation() {
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };


    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onFinish = (values: any) => {
        console.log(values);
    };


    return (
        <>
            <Row style={{paddingTop: "25px"}}>
                <div>
                    <h2>Не нашли подходящий проект?</h2>
                    <span style={{fontSize: "16px", weight: "400", whiteSpace: "pre-wrap"}}>Создайте заявку на решение проблемы и одна из команд нашего акселератора создаст проект для её
                        решения</span>
                    <br/>
                    <span>
                    Заявка должна заинтересовать продуктовую команду, поэтому опишите преимущества своей идеи,
                        перспективы и достоинства её</span>
                </div>
            </Row>
            <Row style={{paddingTop: "10px"}}>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <h4>Описание проблемы</h4>
                </div>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <Input.TextArea
                        placeholder={"Опишите своими словами существующую в организации проблему. Можно сформулировать проблему в форму задачи"}/>
                </div>
            </Row>
            <Row style={{paddingTop: "10px"}}>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <h4>Как проявляется ваша проблема?</h4>
                </div>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <Input.TextArea
                        placeholder={"Опишите своими словами существующую в организации проблему. Можно сформулировать проблему в форму задачи"}/>
                </div>
            </Row>
            <Row style={{paddingTop: "10px"}}>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <h4>Как проявляется ваша проблема?</h4>
                </div>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <Input.TextArea
                        placeholder={"Опишите своими словами существующую в организации проблему. Можно сформулировать проблему в форму задачи"}/>
                </div>
            </Row>
            <Row style={{paddingTop: "16px"}}>
                <Col style={{paddingRight: "8px"}} span={12}>
                    <div align="left" style={{display: "block; block;", width: "100%"}}>
                        <h4>Пробовали ли вы решать?</h4>
                    </div>
                    <div align="left" style={{display: "block; block;", width: "100%"}}>
                        <Input placeholder={"Были ли попытки решения вашей проблемы"}></Input>
                    </div>
                </Col>
                <Col span={12}>
                    <div align="left" style={{display: "block; block;", width: "100%"}}>
                        <h4>Желательный срок решения вашей проблемы?</h4>
                    </div>
                    <div align="left" style={{display: "block; block;", width: "100%"}}>
                        <DatePicker style={{width: "100%"}} onChange={onChange}/>
                    </div>
                </Col>
            </Row>

            <Row style={{paddingTop: "16px"}}>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <h2>Как с вами связаться?</h2>
                </div>
                <div align="left" style={{display: "block; block;", width: "100%"}}>
                    <Input placeholder={"Ваше ФИО"}></Input>
                </div>
            </Row>
            <Row style={{paddingTop: "16px"}}>
                <Col style={{paddingRight: "8px"}} span={12}>
                    <Input placeholder={"Контактный телефон"}></Input>
                </Col>
                <Col span={12}>
                    <Input placeholder={"Электронная почта"}></Input>
                </Col>
            </Row>

            <Row style={{paddingTop: "16px"}}>
                <Button>Разместить заявку</Button>
            </Row>

        </>
    )
}

export default Invitation;
