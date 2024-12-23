import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./pages/signup";
import { SigninPage } from "./pages/signin";
import { SendVerificationPage } from "./pages/send-verification";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="signup" Component={SignupPage}></Route>
            <Route path="signin" Component={SigninPage}></Route>
            <Route path="send-verification" Component={SendVerificationPage}></Route>
        </Routes>
    )
}