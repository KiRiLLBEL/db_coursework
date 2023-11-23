import React from 'react'
import "./input.css"
import { my_storage } from '../../storage/storage.js'

class InputGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var my_string = event.target.value.toUpperCase();
        this.setState({ value: my_string });
    }

    handleSubmit(event) {
        var type = this.props.type_input
        if (type === "group") {
            if (my_storage.group.includes(this.state.value) === true) {
                const user_input = this.state.value;
                localStorage.setItem('user_input', user_input);
                localStorage.setItem('type_input', 'группа');
                window.location.href = "/timetable";
            } else {
                document.getElementById('for_group').value = '';
                alert("Номер группы введен неверно");
            }
        }
        if (type === "class") {
            if (my_storage.class.includes(this.state.value) === true) {
                const user_input = this.state.value;
                localStorage.setItem('user_input', user_input);
                localStorage.setItem('type_input', 'кабинет');
                window.location.href = "/timetable";
            } else {
                document.getElementById('for_class').value = '';
                alert("Номер аудитории введен неверно");
            }
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id="form">
                <input autocomplete="off" id={this.props.my_id} className="input__form" placeholder={this.props.name} maxLength="30" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" className="button__input" value="отобразить" />
            </form >
        )
    }
}

export default InputGroup;