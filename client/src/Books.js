
import React from "react";

/*TODO("ajouter l'image par défaut")*/
const defautImage = "img"

class Books extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <article className={"book"}>
                <img src={this.props.img} alt={this.props.defautImage}/>
                <div>{this.props.titre}</div>
            </article>
        )
    }
}


export default Books;












