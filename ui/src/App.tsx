import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";

export const App = () => {
    return (
        <BrowserRouter>
            <AppRouter>
            </AppRouter>
        </BrowserRouter>
    )
}