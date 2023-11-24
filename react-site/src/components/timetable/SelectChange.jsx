import React from 'react'
import "./selectChange.css"

class SelectChange extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange() {
    }

    handleSubmit() {
    }
    render() {
        return (
            <div className="container__module__change">
                <div className="print__rank">{this.props.title}</div>
                <form onSubmit={this.handleSubmit}>
                    <select id={this.props.type} className="select__change" onChange={this.handleChange}> </select>
                </form >
            </div>
        )
    }
}

export default SelectChange;