
import React from "react";
import {useParams} from "react-router-dom";

class Favoris extends React.Component {
    constructor(props) {
        super(props);
        const id = useParams()
        this.state = {
            query: "",
            books: [],
        }
    }

    render() {
        return(
            <div>
                SALUT
            </div>
        )
    }
}

export default Favoris;












