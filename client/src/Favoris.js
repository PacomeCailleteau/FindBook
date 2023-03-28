
import React from "react";
import {useCookies} from "react-cookie";

function Favoris (props){

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    return(
        <div className={"mes-favoris"}>
            SALUT-->
            {cookies.token}
        </div>
    )
}

export default Favoris;












