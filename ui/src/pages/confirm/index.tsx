import { useParams } from "react-router-dom";
import { helper } from "./helper"

export const ConfirmPage = () => {
    const { vToken } = useParams();
    const statusCode = helper(vToken);

    return (
        vToken && statusCode === 200 ? (
            <div className="flex flex-col items-center justify-center h-screen text-center font-sans">
                <h1 className="text-4xl font-bold text-green-500">Account Verified!</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Your account has been successfully verified. Thank you for confirming your email!
                </p>
                <a
                    href="/signin"
                    className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg text-base hover:bg-green-600 transition-colors"
                >
                    Go to Login
                </a>
            </div>
        ) : (
            <p>success: false</p>
        )
    );
};
