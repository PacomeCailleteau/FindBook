import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oups!</h1>
            <p>Une erreur inconnu s'est produite. Désolé...</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}