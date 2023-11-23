import { useEffect } from 'react'
import { my_storage } from '../../storage/storage.js'

// var flag = false;

function FillDay() {
    useEffect(() => {
        const modules = document.getElementsByClassName("block");
        for (let i = 0; i < modules.length; ++i) {
            var names = modules[i].getElementsByClassName("name__lesson");
            for (let j = 0; j < names.length; ++j) {
                names[j].innerHTML = my_storage.timetable[i][j];
            }
        }
        // if (flag === false) {
        //     var modals = document.getElementsByClassName("modal");
        //     var blocks = document.getElementsByClassName("block");
        //     for (let k = 0; k < modals.length; ++k) {
        //         var lessons = blocks[k].getElementsByClassName("name__lesson");
        //         var tables = modals[k].getElementsByClassName("modal__content")[0];
        //         for (let n = 0; n < lessons.length; ++n) {
        //             if (lessons[n].innerHTML !== "") {
        //                 tables.insertAdjacentHTML('beforeend', '<div class="table" ></div>');
        //             }
        //         }
        //     }
        //     flag = true;
        // }
    }, [])
}

export default FillDay;