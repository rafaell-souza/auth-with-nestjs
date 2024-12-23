import { useState, useEffect } from "react";

export const Helper = (email: string) => {
    const [time, setTime] = useState<number>(60);
    const [isActive, setIsActive] = useState(false)

    const url = "http://localhost:3000/auth/verification/send/email-verification"
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
        let timer: ReturnType<typeof setInterval>

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