
import React from "react";

class Books extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <article className={"book"}>
                <img src={this.props.img} alt="image du livre"/>
                <div>{this.props.titre}</div>
            </article>
        )
    }
}


export default Books;












