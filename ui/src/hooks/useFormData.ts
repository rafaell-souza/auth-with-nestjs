import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useFormData = <T extends FieldValues>(
    schema: Zod.ZodType<T>,
    url: string,
    redirectTo: string
) => {
    const [statusCode, setStatusCode] = useState<number>()
    const [viewPass, SetviewPass] = useState({
        password: false,
        confirmPassword: false
    })

    const navigate = useNavigate()

    const showPass = (field: string) => {
        if (field === "passoword") {
            SetviewPass({ ...viewPass, password: !viewPass.password })
        }
        else if (field === "confirmPassword") {
            SetviewPass({ ...viewPass, confirmPassword: !viewPass.confirmPassword })
        }
        else null
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<T>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const handleSubmitForm = handleSubmit(async data => {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        setStatusCode(response.status)

        if (response.ok) {
            const data = await response.json();
            if (data?.email) localStorage.setItem("email", data.email)
            navigate(redirectTo)
        }
    })

    return { statusCode, errors, register, handleSubmitForm, showPass, viewPass }
}