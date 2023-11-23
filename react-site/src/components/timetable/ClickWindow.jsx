
import { my_storage } from '../../storage/storage.js'
import FillWindow from '../module/FillWindow'
import ClearWindow from '../module/ClearWindow'

function ClickWindow(event, props) {
    // console.log(event);
    // console.log(props.id_block);
    var modal = document.getElementById("myModal");
    if (event.target.tagName === "SPAN" || event.target === modal) {
        ClearWindow(props.id_block);
        modal.style.visibility = "hidden";
        modal.getElementsByClassName("button__insert")[0].style.display = "none";
        // modal.getElementsByClassName("button__insert")[0].style.visibility = "hidden";
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
        FillWindow(props.id_block);
        if (localStorage.getItem('role') === 'adm') {
            modal.getElementsByClassName("button__insert")[0].style.display = "block";
            // modal.getElementsByClassName("button__insert")[0].style.visibility = "visible";
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
