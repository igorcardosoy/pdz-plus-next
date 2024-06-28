"use client"

import Link from "next/link"
import ProfileButton from "./ProfileButton"
import LoginButton from "./LoginButton"
import NavButtons from "./NavButtons"
import SearchBar from "./SearchBar"
import { user } from "@/entities/Users"
import { useState } from "react"

const Header = ({ user = {} as user, isDiscord = false as boolean }) => {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <NavButtons isAuth={!isDiscord} isDropdown={true} />
                </div>
                
                <Link className="btn btn-ghost text-xl ml-3" id="all" href="/home" style={{ color: 'white', backgroundImage: `url(/pdz-background2.png)`, backgroundSize: '500px', backgroundPosition: 'center'}} >PDZ+</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <NavButtons isAuth={!isDiscord} isDropdown={false} />
            </div>
            <div className="navbar-end">
                <div className="flex gap-2 lg:flex">
                    <SearchBar />
                    {<ProfileButton user={user} />}
                </div>
            </div>
        </div>
    )
}

export default Header