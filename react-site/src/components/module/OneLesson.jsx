import React from 'react'
import './oneLesson.css'
import Change from "../../img/change.png"
import Delete from "../../img/delete.png"

class OneLesson extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    handleClickDelete() {
        var modal = document.getElementById("myModal");
        modal.getElementsByClassName("button__insert")[0].style.display = "none";
        // modal.getElementsByClassName("button__insert")[0].style.visibility = "hidden";
        modal.style.visibility = "hidden";
        var modalDelete = document.getElementById("modal__delete");
        modalDelete.style.visibility = "visible";
    }
    render() {
        return (
            <div className="one__lesson">
                <div className="hight__line">
                    <div className="table"></div>
                    <div className="type__lesson"></div>
                    <div className="two__button">
                        <button className="change__lesson" ><img className="picture__change" src={Change} alt="change" width="20px"></img></button>
                        <button className="delete__lesson" onClick={this.handleClickDelete}><img className="picture__delete" src={Delete} alt="delete" width="20px"></img></button>
                    </div>
                </div>
                <div className="lower__line"></div>
            </div>
        )
    }
}

export default OneLesson;