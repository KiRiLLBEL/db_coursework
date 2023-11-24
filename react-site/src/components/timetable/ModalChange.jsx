import React from 'react'
import ClearWindow from '../module/ClearWindow'
// import FillWindow from '../module/FillWindow'
import './modalChange.css'
import SelectChange from './SelectChange'
import StaticSelect from './StaticSelect'
// import { my_storage } from '../../storage/storage.js'

class ModalChange extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }
    handleClickYes() {
        var modalDelete = document.getElementsByClassName("modal__change")[0];
        modalDelete.style.visibility = "hidden";
        ClearWindow();
    }
    handleClickNo() {
        var modalDelete = document.getElementsByClassName("modal__change")[0];
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }
    render() {
        return (
            <div className="modal__change">
                <div className="modal__content__change">
                    <StaticSelect type="name" title="Название" />
                    <StaticSelect type="type" title="Тип" />
                    <StaticSelect type="group" title="Группа" />
                    <StaticSelect type="teacher" title="Преподаватель" />
                    <SelectChange type="time" title="Время" />
                    <SelectChange type="class" title="Аудитория" />
                    <button type="submit" className="change__yes" id_block="-1" onClick={this.handleClickYes}>сохранить</button>
                    <button className="change__no" onClick={this.handleClickNo}>не применять</button>
                </div>
            </div >
        )
    }
}

export default ModalChange;