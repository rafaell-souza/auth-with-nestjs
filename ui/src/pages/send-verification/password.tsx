import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useFormData } from "../../hooks/useFormData";
import { emailSchema } from "../../schemas/email";

export const SendPasswordVerification = () => {
    const url = "http://localhost:3000/auth/verification/send/forgot-password";
    const redicrecTo = "/verification/forgot-password"

    const {
        register,
        errors,
        handleSubmitForm,
        statusCode
    } = useFormData(emailSchema, url, redicrecTo);

    return (
        <section className="flex items-center justify-center w-full h-screen">
            <form
                onSubmit={handleSubmitForm}
                className="flex flex-col w-60">
                <h1 className="text-md">PROVIDE EMAIL</h1>

                <input
                    placeholder="Ex: example@host.com"
                    className="h-6 outline-none px-1 text-xs rounded border-b border-black bg-zinc-100 mt-2 bg-opacity-50"
                    type="text"
                    {...register('email')}
                />

                {
                    (errors.email || statusCode === 404) && (
                        <p className="text-red-600 text-[10px] mt-[2px]">
                            Email not signed up
                        </p>
                    )
                }

                <button className={`mt-2 bg-zinc-500 hover:bg-zinc-400 rounded h-7 text-white`}>
                    CONFIRM
                </button>

                <p className="text-[10px] flex justify-center mt-[2px]">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-700 text-[10px] hover:text-blue-400 ml-1">Sign up.</Link>
                </p>

                <div className="flex flex-col mt-1 items-center">
                    <p className="text-xs">OR</p>
                    <Link
                        to="http://localhost:3000/auth/google/auth"
                        className="flex items-center justify-center border-b border-black h-8 w-full hover:bg-zinc-100 bg-zinc-50 rounded px-1 mt-1">
                        <FcGoogle className="text-xl" />
                        <p className="ml-2 text-xs">Sign in with google</p>
                    </Link>
                </div>
            </form>
        </section>
    );
};
