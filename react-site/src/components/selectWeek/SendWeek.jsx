import { my_storage } from '../../storage/storage.js'
import { useEffect } from 'react'

function SendWeek() {
    useEffect(() => {
        var array = my_storage.week
        var select = document.getElementsByTagName("select")[0];
        array.forEach(function (v, k) {
            var option = document.createElement("option");
            option.value = k;
            option.innerHTML = v;
            select.appendChild(option);
        });
    }, [])
}

export default SendWeek;