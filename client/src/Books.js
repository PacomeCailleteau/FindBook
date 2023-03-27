
import React from "react";
import "./Book.css"

class Books extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <article className={"book"}>
                <img src={this.props.img} alt="image du livre"/>
                <div>{this.props.titre}</div>
                <div>{"isbn13: " + this.props.isbn}</div>
            </article>
        )
    }
}


export default Books;












