
import { my_storage } from '../../storage/storage.js'
import FillWindow from '../module/FillWindow'
import ClearWindow from '../module/ClearWindow'

function ClickWindow(event, props) {
    var modal = document.getElementById("myModal");
    if (event.target.tagName === "SPAN" || event.target === modal) {
        ClearWindow();
        modal.style.visibility = "hidden";
        modal.getElementsByClassName("button__insert")[0].style.display = "none";
        if (localStorage.getItem('role') === 'adm') {
            let buttons = modal.getElementsByClassName("two__button")
            for (let i = 0; i < buttons.length; ++i) {
                buttons[i].style.visibility = "hidden";
            }
        }
    } else {
        if (event.target.classList.contains("modal__content") || props.id_block === undefined) {
            return;
        }
        if (props.id_block !== undefined && !event.target.classList.contains("delete__yes")) {
            var modal_delete = document.getElementsByClassName("modal__delete")[0];
            modal_delete.setAttribute('id_block', props.id_block);
            var button_delete = document.getElementsByClassName("delete__yes")[0];
            button_delete.setAttribute('id_block', modal_delete.getAttribute('id_block'));
        }
        FillWindow(props.id_block);
        if (localStorage.getItem('role') === 'adm') {
            modal.getElementsByClassName("button__insert")[0].style.display = "block";
            let buttons = modal.getElementsByClassName("two__button")
            let counter = 0;
            for (let i = 0; i < buttons.length; ++i) {
                if (my_storage.timetable[props.id_block][i] !== "") {
                    buttons[i - counter].style.visibility = "visible";
                } else {
                    ++counter;
                }
            }
        }
        modal.style.visibility = "visible";
    }
}

export default ClickWindow;
