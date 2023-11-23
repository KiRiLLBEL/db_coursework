import { my_storage } from '../../storage/storage.js'
import { useEffect } from 'react'

function SendTeacher() {
    useEffect(() => {
        var array = my_storage.teacher
        var select = document.getElementsByTagName("select")[0];
        array.forEach(function (v, k) {
            var option = document.createElement("option");
            option.value = k;
            option.innerHTML = v;
            select.appendChild(option);
        });
    }, [])
}

export default SendTeacher;