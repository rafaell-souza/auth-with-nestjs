import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./pages/signup";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="signup" Component={SignupPage}></Route>
        </Routes>
    )
}