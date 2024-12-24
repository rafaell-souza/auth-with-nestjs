import { resetPasswordSchema } from "../../schemas/reset-password";
import { IResetPassword } from "../../interfaces/IReset-Password";
import { useFormData } from "../../hooks/useFormData";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
    const url = "http://localhost:3000/auth/forgot-password";
    const { vToken } = useParams() 
    const redirectUrl = "/signin"
    const method = "PUT";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${vToken}`
    }

    const {
        register,
        handleSubmitForm,
        errors,
        viewPass,
        showPass,
    } = useFormData<IResetPassword>(
        resetPasswordSchema,
        url,
        redirectUrl,
        method,
        headers
    )

    return (
        vToken ? (
            <section className="h-screen w-screen flex justify-center items-center">
                <form
                    onSubmit={handleSubmitForm}
                    className="w-60 p-2">
                    <div className="flex flex-col mt-1 relative">
                        <input
                            placeholder="New password"
                            className={`bg-zinc-50 text-sm h-6 outline-none border-black  pl-1 pr-7 border-b rounded text-xs ${errors.newPassword ? "border-red-500 " : "border-black"}`}
                            type={viewPass.password ? "text" : "password"}
                            {...register("newPassword")}
                        />

                        {errors.newPassword && (
                            <p className="text-[10px] text-red-600 mt-[2px]">
                                {errors.newPassword.message}
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
                            placeholder="Confirm new password"
                            className={`bg-zinc-50 text-sm h-6 outline-none border-black pl-1 pr-7 border-b rounded text-xs ${errors.confirmNewPassword ? "border-red-500" : "border-black"}`}
                            type={viewPass.confirmPassword ? "text" : "password"}
                            {...register("confirmNewPassword")}
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

                    <button className="w-full bg-zinc-400 text-white hover:bg-opacity-70 h-7 mt-2 rounded">
                        CONFIRM
                    </button>
                </form>
            </section >
        ) : (
            <p>success: false</p>
        )
    )
}