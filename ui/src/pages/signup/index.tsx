import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useFormData } from "../../hooks/useFormData";
import { createUser } from "../../schemas/create-user";
import { ICreateUser } from "../../interfaces/ICreate-user";

export const SignupPage = () => {
    const url = "http://localhost:3000/auth/signup";
    const {
        register,
        handleSubmitForm,
        statusCode,
        errors,
        showPass,
        viewPass
    } = useFormData<ICreateUser>(createUser, url, "/send-verification")

    return (
        <section className="h-screen w-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmitForm}
                className="w-60 p-2">

                <h1 className="text-2xl text-zinc-500">Sign up</h1>

                <div className="flex flex-col mt-4">
                    <input
                        placeholder="First name"
                        className={`bg-zinc-50 text-sm h-6 outline-none ${errors.firstName ? "border-red-500" : "border-black"}  px-1 border-b rounded text-xs`}
                        type="text"
                        {...register("firstName")}
                    />
                </div>

                <div className="flex flex-col mt-1">
                    <input
                        placeholder="Last name"
                        className={`bg-zinc-50 text-sm h-6 outline-none px-1 border-b rounded text-xs ${errors.lastName ? "border-red-500" : "border-black"}`}
                        type="text"
                        {...register("lastName")}
                    />
                </div>

                <div className="flex flex-col mt-1">
                    <input
                        placeholder="Ex: example@host.com"
                        className={`bg-zinc-50 text-sm h-6 outline-none px-1 border-b rounded text-xs ${errors.email ? "border-red-500" : "border-black"}`}
                        type="text"
                        {...register("email")}
                    />

                    {statusCode === 409 && (
                        <p className="text-[10px] text-red-600 mt-[2px]">
                            Email already in use.
                        </p>
                    )}
                </div>

                <div className="flex flex-col mt-1 relative">
                    <input
                        placeholder="Password"
                        className={`bg-zinc-50 text-sm h-6 outline-none border-black  pl-1 pr-7 border-b rounded text-xs ${errors.password ? "border-red-500 " : "border-black"}`}
                        type={viewPass.password ? "text" : "password"}
                        {...register("password")}
                    />

                    {errors.password && (
                        <p className="text-[10px] text-red-600 mt-[2px]">
                            {errors.password.message}
                        </p>
                    )}

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

                <div
                    className="flex flex-col mt-1 relative">
                    <input
                        placeholder="Confirm password"
                        className={`bg-zinc-50 text-sm h-6 outline-none border-black pl-1 pr-7 border-b rounded text-xs ${errors.confirmPassword ? "border-red-500" : "border-black"}`}
                        type={viewPass.confirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                    />

                    <div
                        onClick={() => showPass("confirmPassword")}
                        className="absolute right-2 mt-1">
                        {
                            viewPass.confirmPassword ?
                                <FaEyeSlash
                                    className=" text-zinc-500" />
                                : <IoEyeSharp
                                    className="text-zinc-500" />
                        }
                    </div>
                </div>

                <p className="text-xs flex justify-end">
                    <Link
                        to="/signin"
                        className="text-blue-700 mt-[2px] text-[10px] hover:text-blue-400">
                        Already have an account?
                    </Link>
                </p>

                <button className="w-full bg-zinc-400 text-white hover:bg-opacity-70 h-7 mt-2 rounded">
                    CONFIRM
                </button>

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