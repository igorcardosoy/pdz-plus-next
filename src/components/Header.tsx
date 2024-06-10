"use client"

import { isAdministrator, isAuthenticated, getUser, user, cleanToken, authenticate } from "@/utils/authentication"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Header = () => {
    let isAuth: boolean = isAuthenticated()

    const [searchText, setSearchText] = useState("")
    const router = useRouter()
    const user: user = getUser()

    const handleLogout = () => {
        cleanToken()
        window.location.reload()
    }

    const handleChange = (e: any) => {
        setSearchText(e.target.value)
        if (e.target.value === "") {
            router.push(`/home/`)
        } else {
            router.push(`/home/filter/search?query=${e.target.value}`)
        }
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link id="all" href="/home">Tudo</Link></li>
                        <li><Link id="movie" href="/home/filter/movie">Filmes</Link></li>
                        <li><Link id="tv" href="/home/filter/tv">Series</Link></li>
                        <li><Link id="cartoon" href="/home/filter/cartoon">Desenhos</Link></li>
                        <li><Link id="anime" href="/home/filter/anime">Animes</Link></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl ml-3" id="all" href="/home">PDZ+</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li><Link id="all" href="/home">Tudo</Link></li>
                    <li><Link id="movie" href="/home/filter/movie">Filmes</Link></li>
                    <li><Link id="tv" href="/home/filter/tv">Series</Link></li>
                    <li><Link id="cartoon" href="/home/filter/cartoon">Desenhos</Link></li>
                    <li><Link id="anime" href="/home/filter/anime">Animes</Link></li>
                    {isAdministrator(isAuth) ? <li><Link id="anime" href="/home/add">Adicionar</Link></li> : ''}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex gap-2 lg:flex">
                    <div className="form-control">
                        <input onChange={handleChange} value={searchText} className="input input-bordered w-56 mr-3" type="search" placeholder="Pesquisar" aria-label="Search" />
                    </div>

                    {!isAuth ?
                        <div className="dropdown dropdown-end">
                            <Link href={'/'} tabIndex={0} role="button" className="btn btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                                    <path d="M7 6a1 1 0 0 1 2 0v1H7z" />
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0" />
                                </svg>
                            </Link>
                        </div>
                        :
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
                    }

                </div>
            </div>
        </div>
    )
}

export default Header