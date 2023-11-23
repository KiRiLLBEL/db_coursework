import React from 'react'
import SendWeek from "./SendWeek.jsx"
import { my_storage } from '../../storage/storage.js'
import "./selectWeek.css"

class SelectWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        const week = my_storage.week[event.target.value];
        localStorage.setItem('week', week);
        const first_day = week.split(" ")[0];
        localStorage.setItem('first_day', first_day);
        const titles = document.getElementsByClassName("title");
        var parts = first_day.split(".");
        var dt = new Date(parseInt(parts[2], 10) + 2000, parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
        for (let i = 0; i < titles.length; ++i) {
            const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
            const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
            titles[i].innerHTML = days[dt.getDay()] + ", " + dt.getDate() + " " + months[dt.getMonth()];
            dt.setDate(dt.getDate() + 1);
        }
        const modules = document.getElementsByClassName("block");
        for (let i = 0; i < modules.length; ++i) {
            var names = modules[i].getElementsByClassName("name__lesson");
            for (let j = 0; j < names.length; ++j) {
                names[j].innerHTML = my_storage.timetable[i][j];
            }
        }
    }
    render() {
        return (
            <div className="container">
                <SendWeek />
                <form>
                    <select className="select__week" onChange={this.handleChange}> </select>
                </form >
            </div>
        );
    }
}

export default SelectWeek;