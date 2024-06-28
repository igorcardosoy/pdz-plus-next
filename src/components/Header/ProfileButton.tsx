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
        <div tabIndex={0} role="button" className="flex row gap-3 mr-3 btn dropdown dropdown-end">
            <div className="">
                <div className="btn btn-ghost btn-circle avatar online">
                    <div className="w-10 rounded-full">
                        <img alt={user.name + ' Discord Profile Picture'} src={user.profilePicture} />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32">
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
            <div className="flex items-center" >
                {user.name}
            </div>
        </div>
    )
}

export default ProfileButton