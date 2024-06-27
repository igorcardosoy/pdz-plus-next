'use client'

import { user } from "@/entities/Users"
import { cleanToken } from "@/utils/authentication"
import { signOut } from "next-auth/react"

const ProfileButton = ({ user = {} as user }) => {

    const handleLogout = () => {
        cleanToken()
        signOut()
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img alt={user.name + ' Discord Profile Picture'} src={user.profilePicture} />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
            <div className="flex items-center" >
                {user.name}
            </div>
        </>
    )
}

export default ProfileButton