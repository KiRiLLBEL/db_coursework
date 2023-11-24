import React from 'react'
import './buttonInsert.css'
import { my_storage } from '../../storage/storage.js'


var flag = true;
class ButtonInsert extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        var modal = document.getElementById("myModal");
        modal.getElementsByClassName("button__insert")[0].style.display = "none";
        modal.style.visibility = "hidden";
        var modal_insert = document.getElementsByClassName("modal__insert")[0];
        modal_insert.style.visibility = "visible";
        if (flag === true) {
            let select = document.getElementById("name");
            my_storage.lessons.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select.appendChild(option);
            });
            select = document.getElementById("type");
            my_storage.type.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select.appendChild(option);
            });
            select = document.getElementById("group");
            my_storage.group.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select.appendChild(option);
            });
            select = document.getElementById("teacher");
            let kostyl = my_storage.teacher;
            kostyl.shift();
            kostyl.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select.appendChild(option);
            });
            select = document.getElementById("time_insert");
            my_storage.time.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select.appendChild(option);
            });
            select = document.getElementById("class_insert");
            my_storage.class.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select.appendChild(option);
            });
            flag = false;
        }
    }

    render() {
        return (
            <div className="container">
                <button className="button__insert" onClick={this.handleClick}>добавить</button>
            </div>
        )
    }
}

export default ButtonInsert;