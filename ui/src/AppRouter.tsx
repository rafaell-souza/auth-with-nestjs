import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./pages/signup";
import { SigninPage } from "./pages/signin";
import { SendEmailVerification } from "./pages/send-verification/email";
import { SendPasswordVerification } from "./pages/send-verification/password";
import { ConfirmPage } from "./pages/confirm";
import { ResetPasswordPage } from "./pages/reset-password";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="verification/:templateName" element={<SendEmailVerification />} />
            <Route path="forgot-password" element={<SendPasswordVerification />} />
            <Route path="confirm/:vToken" element={<ConfirmPage />} />
            <Route path="reset-password/:vToken" element={<ResetPasswordPage />} />
        </Routes>
    );
};