'use client'

import { isAuthenticated } from "@/utils/authentication"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import Header from "./Header/Header"
import { user } from "@/entities/Users"

const AuthenticatedLayout = ({ isDiscordAuthenticated = false as boolean, children = {} as any, user = {} as user}) => {
    const router = useRouter()
    let [isAllowedToView, setIsAllowedToView] = useState(false)

    useEffect(() => {
        const PDZVerify = async () => {
            if (!isDiscordAuthenticated) {
                isAuthenticated().then(res => {
                    if (!res) {
                        router.push('/')
                        return
                    }

                    setIsAllowedToView(true)
                })
            }

            return
        }

        PDZVerify()
        return
    }, [])

    return (
        <>
            {(isAllowedToView || isDiscordAuthenticated) &&
                <>
                    <Header user={user} isDiscord={isDiscordAuthenticated} />

                    <main>
                        {children}
                    </main>
                </>
            }
        </>
    )
}

export default AuthenticatedLayout