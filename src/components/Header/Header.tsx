"use client"

import { isAdministrator, isAuthenticated, getUser, user, cleanToken, authenticate } from "@/utils/authentication"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ProfileButton from "./ProfileButton"
import LoginButton from "./LoginButton"
import NavButtons from "./NavButtons"
import SearchBar from "./SearchBar"

const Header = () => {
    let isAuth: boolean = isAuthenticated()
    const user: user = getUser()

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                        <NavButtons isAuth={isAuth} isDropdown={true} />
                </div>
                <Link className="btn btn-ghost text-xl ml-3" id="all" href="/home">PDZ+</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                    <NavButtons isAuth={isAuth} isDropdown={false} />
            </div>
            <div className="navbar-end">
                <div className="flex gap-2 lg:flex">
                        <SearchBar />
                    {!isAuth ? <LoginButton/> : <ProfileButton user={user} />}
                </div>
            </div>
        </div>
    )
}

export default Header