import React from 'react'
import './buttonInsert.css'

class ButtonInsert extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {

    }

    render() {
        return (
            <div className="container">
                <button className="button__insert">добавить</button>
            </div>
        )
    }
}

export default ButtonInsert;