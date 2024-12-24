import { useEffect, useState } from "react"

export const helper = (vToken: string | undefined) => {
    const [status, setStatus] = useState<number>();

    const handleConfirmation = async () => {
        const url = "http://localhost:3000/auth/verification/confirm";
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${vToken}` }
        })
        setStatus(response.status)
    }

    useEffect(() => {
        const handler = async () => await handleConfirmation();
        handler();
    }, [])

    return status;
}