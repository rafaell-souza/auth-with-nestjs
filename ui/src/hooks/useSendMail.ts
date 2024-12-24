import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const UseSendMail = () => {
    const [time, setTime] = useState<number>(60);
    const [isActive, setIsActive] = useState(false)

    const email = localStorage.getItem("email");
    const { templateName } = useParams()

    const url = `http://localhost:3000/auth/verification/send/${templateName}`
    const handlerEmail = async () => {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email })
        })
    }

    const handlerEmailSending = async () => {
        await handlerEmail();
        setIsActive(false);
    }

    useEffect(() => {
        let timer: NodeJS.Timeout

        if (isActive) return;
        else {
            timer = setInterval(() => {
                if (time === 0) {
                    setIsActive(true)
                    setTime(60)
                    return;
                }
                setTime(time - 1)
            }, 1000)
        }

        return (() => clearInterval(timer))
    }, [time, isActive])
    return { time, isActive, handlerEmailSending }
}