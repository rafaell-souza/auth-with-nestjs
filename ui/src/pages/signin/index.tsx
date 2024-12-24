import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useFormData } from "../../hooks/useFormData";
import { ILoginUser } from "../../interfaces/ILogin-user";
import { loginUser } from "../../schemas/login-user";

export const SigninPage = () => {
    const url = "http://localhost:3000/auth/signin";
    const redirectTo = "/congrats";
    const method = "POST";
    const headers = { "Content-Type": "application/json" }

    const {
        register,
        handleSubmitForm,
        statusCode,
        errors,
        viewPass,
        showPass
    } = useFormData<ILoginUser>(
        loginUser, 
        url, 
        redirectTo,
        method,
        headers
    )

    return (
        <section className="h-screen w-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmitForm}
                className="w-60 p-2">

                <h1 className="text-2xl text-zinc-500">Sign in</h1>

                <div className="flex flex-col mt-4">
                    <input
                        placeholder="Ex: example@host.com"
                        className={`bg-zinc-50 text-sm h-6 outline-none px-1 border-b rounded text-xs border-black`}
                        type="text"
                        {...register("email")}
                    />
                </div>

                <div className="flex flex-col mt-1 relative">
                    <input
                        placeholder="Password"
                        className={`bg-zinc-50 text-sm h-6 outline-none border-black  pl-1 pr-7 border-b rounded text-xs border-black`}
                        type={viewPass.password ? "text" : "password"}
                        {...register("password")}
                    />

                    <div className="flex justify-between mt-[2px]">
                        <div>
                            {
                                (errors.email || errors.password) ? (
                                    <p className="text-[10px] text-red-500">
                                        Incorrect email or password.
                                    </p>
                                ) : statusCode !== 200 ? (
                                    <p className="text-[10px] text-red-500">
                                        Email is not signed up.
                                    </p>
                                ) : null
                            }
                        </div>
                        <p className="text-xs flex justify-end">
                            <Link 
                            className="text-blue-700 text-[10px] hover:text-blue-400" 
                            to="/forgot-password">Forgot password</Link>
                        </p>

                    </div>

                    <div
                        onClick={() => showPass("passoword")}
                        className="absolute right-2 mt-1">
                        {
                            viewPass.password ?
                                <FaEyeSlash
                                    className=" text-zinc-500" />
                                : <IoEyeSharp
                                    className="text-zinc-500" />
                        }
                    </div>
                </div>

                <button className="w-full bg-zinc-400 text-white hover:bg-opacity-70 h-7 mt-2 rounded">
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
        </section >
    )
}