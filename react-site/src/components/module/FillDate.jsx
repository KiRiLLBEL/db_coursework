import { useEffect } from 'react'

function FillDate() {
    useEffect(() => {
        const first_day = "06.11.23";
        const titles = document.getElementsByClassName("title");
        var parts = first_day.split(".");
        var dt = new Date(parseInt(parts[2], 10) + 2000, parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
        for (let i = 0; i < titles.length; ++i) {
            // if (dt.getDate() < 10) {
            //     titles[i].innerHTML = "0" + dt.getDate() + "." + (dt.getMonth() + 1) + "." + dt.getFullYear();
            // } else {
            //     titles[i].innerHTML = dt.getDate() + "." + (dt.getMonth() + 1) + "." + dt.getFullYear();
            // }
            const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
            const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
            titles[i].innerHTML = days[dt.getDay()] + ", " + dt.getDate() + " " + months[dt.getMonth()];
            dt.setDate(dt.getDate() + 1);
        }
    }, [])
}

export default FillDate;