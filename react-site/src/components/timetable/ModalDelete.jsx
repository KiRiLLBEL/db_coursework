import React from 'react'
import ClearWindow from '../module/ClearWindow'
import FillWindow from '../module/FillWindow'
import './modalDelete.css'
import { my_storage } from '../../storage/storage.js'

class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }
    handleClickYes(event) {
        var modalDelete = document.getElementsByClassName("modal__delete")[0];
        modalDelete.style.visibility = "hidden";
        ClearWindow();
        let id_block_real = document.getElementsByClassName("delete__yes")[0].getAttribute('id_block');
        //элемент индекса, который мы удаляем из storage
        alert("из storage надо удалить элемент с индексом:", document.getElementsByClassName("delete__yes")[0].getAttribute('id_lesson_delete'))
        FillWindow(id_block_real);
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";

        if (localStorage.getItem('role') === 'adm') {
            modal.getElementsByClassName("button__insert")[0].style.display = "block";
            let buttons = modal.getElementsByClassName("two__button")
            let counter = 0;
            for (let i = 0; i < buttons.length; ++i) {
                if (my_storage.timetable[id_block_real][i] !== "") {
                    buttons[i - counter].style.visibility = "visible";
                } else {
                    ++counter;
                }
            }
        }
    }
    handleClickNo() {
        var modalDelete = document.getElementsByClassName("modal__delete")[0];
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }
    render() {
        return (
            <div className="modal__delete" id_block="-1">
                <div className="modal__content__delete">
                    <div className="print">Вы действительно хотите отменить занятие?</div>
                    <button className="delete__yes" id_block="-1" onClick={this.handleClickYes}>да</button>
                    <button className="delete__no" onClick={this.handleClickNo}>нет</button>
                </div>
            </div>
        )
    }
}

export default ModalDelete;