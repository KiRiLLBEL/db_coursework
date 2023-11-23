import React from 'react'
import './modalDelete.css'

class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }

    handleClickYes() {
        var modalDelete = document.getElementById("modal__delete");
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }

    handleClickNo() {
        var modalDelete = document.getElementById("modal__delete");
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }
    render() {
        return (
            <div id="modal__delete" className="modal__delete">
                <div className="modal__content__delete">
                    <div className="print">Вы действительно хотите отменить занятие?</div>
                    <button className="delete__yes" onClick={this.handleClickYes}>да</button>
                    <button className="delete__no" onClick={this.handleClickNo}>нет</button>
                </div>
            </div>
        )
    }
}

export default ModalDelete;