import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./pages/signup";
import { SigninPage } from "./pages/signin";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="signup" Component={SignupPage}></Route>
            <Route path="signin" Component={SigninPage}></Route>
        </Routes>
    )
}