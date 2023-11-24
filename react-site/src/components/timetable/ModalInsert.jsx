import React from 'react'
import ClearWindow from '../module/ClearWindow'
import FillWindow from '../module/FillWindow'
import './modalinsert.css'
import SelectChange from './SelectChange'
import { my_storage } from '../../storage/storage.js'

class ModalInsert extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }
    handleClickYes() {
        var modalChange = document.getElementsByClassName("modal__insert")[0];
        var selects = modalChange.getElementsByTagName("select");
        localStorage.setItem('change_day', modalChange.getAttribute("id_block"));
        localStorage.setItem('change_lesson', modalChange.getAttribute("id_lesson_change"));
        localStorage.setItem('new_name', selects[0].value);
        localStorage.setItem('new_type', selects[1].value);
        localStorage.setItem('new_group', selects[2].value);
        localStorage.setItem('new_teacher', selects[3].value);
        localStorage.setItem('new_time', selects[4].value);
        localStorage.setItem('new_class', selects[5].value);


        //здесь запрос в БД на изменение (можно или нет)
        let response_status = 1; // ответ от  базы данных 1 при успехе (0 при ошибке)
        if (response_status === 1) {
            ClearWindow();
            var modal = document.getElementsByClassName("modal__change")[0];
            var id_block_real = modal.getAttribute("id_block");
            const modules = document.getElementsByClassName("block");
            for (let i = 0; i < modules.length; ++i) {
                var names = modules[i].getElementsByClassName("name__lesson");
                for (let j = 0; j < names.length; ++j) {
                    names[j].innerHTML = my_storage.timetable[i][j];
                }
            }

            FillWindow(id_block_real);
            modal = document.getElementById("myModal");
            modal.style.visibility = "visible";
            if (localStorage.getItem('role') === 'adm') {
                modal.getElementsByClassName("button__insert")[0].style.display = "block";
                let buttons = modal.getElementsByClassName("two__button")
                let counter = 0;
                for (let i = 0; i < buttons.length; ++i) {
                    if (my_storage.timetable[id_block_real][i] !== "") {
                        buttons[i - counter].style.display = "block";
                    } else {
                        ++counter;
                    }
                }
            }
            modalChange.style.visibility = "hidden";
        } else {
            alert("Данное время или аудитория уже заняты :(");

        }
    }
    handleClickNo() {
        var modalDelete = document.getElementsByClassName("modal__insert")[0];
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }
    render() {
        return (
            <div className="modal__insert">
                <div className="modal__content__insert">
                    <SelectChange type="name" title="Название" />
                    <SelectChange type="type" title="Тип" />
                    <SelectChange type="group" title="Группа" />
                    <SelectChange type="teacher" title="Преподаватель" />
                    <SelectChange type="time_insert" title="Время" />
                    <SelectChange type="class_insert" title="Аудитория" />
                    <button type="submit" className="change__yes" id_block="-1" onClick={this.handleClickYes}>сохранить</button>
                    <button className="change__no" onClick={this.handleClickNo}>не применять</button>
                </div>
            </div >
        )
    }
}

export default ModalInsert;