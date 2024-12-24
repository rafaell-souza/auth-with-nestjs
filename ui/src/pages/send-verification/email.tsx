import { UseSendMail } from "../../hooks/useSendMail";

export const SendEmailVerification = () => {
    const email = sessionStorage.getItem("email") ?? ""
    const templateName = "email-verification"

    const {
        time,
        isActive,
        handlerEmailSending
    } = UseSendMail(email, templateName);

    return (
        <section className="flex items-center justify-center w-full h-screen bg-gray-50">
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-green-600 flex items-center space-x-2">
                    <span>Done!</span>
                </h1>

                <p className="text-gray-700 text-center">
                    Check your email box for the verification email
                </p>

                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 mb-2">
                        {!isActive ? `Try again in: ${time}s` : "You can resend now."}
                    </p>
                    <button
                        onClick={handlerEmailSending}
                        className={`w-32 h-10 bg-green-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none transition-opacity duration-200 ${!isActive ? "opacity-50 pointer-events-none" : "opacity-100"}`}
                        disabled={!isActive}
                    >
                        Resend Email
                    </button>
                </div>
            </div>
        </section>
    );
};
