import React from 'react'
import "./selectTeacher.css"
import SendTeacher from "./SendTeacher.jsx"
import { my_storage } from '../../storage/storage.js'

class SelectTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        const user_input = my_storage.teacher[this.state.value];
        if (user_input !== undefined) {
            localStorage.setItem('user_input', user_input);
            localStorage.setItem('type_input', 'преподаватель');
            window.location.href = "/timetable";
        } else {
            alert("Выберите преподавателя");
        }
        event.preventDefault();
    }
    render() {
        return (
            <>
                <SendTeacher />
                <form onSubmit={this.handleSubmit}>
                    <select className="select" onChange={this.handleChange}> </select>
                    <input type="submit" className="button__input" value="отобразить" />
                </form >
            </>
        )
    }
}

export default SelectTeacher;