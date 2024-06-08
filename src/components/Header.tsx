"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Header = () => {

    const [searchText, setSearchText] = useState("")
    const router = useRouter()


    const handleChange = (e: any) => {
        setSearchText(e.target.value)
        if (e.target.value === "") {
            router.push(`/`)
        } else {
            router.push(`/filter/search?query=${e.target.value}`)
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
                        <li><Link id="all" href="/">Tudo</Link></li>
                        <li><Link id="movie" href="/filter/movie">Filmes</Link></li>
                        <li><Link id="tv" href="/filter/tv">Series</Link></li>
                        <li><Link id="cartoon" href="/filter/cartoon">Desenhos</Link></li>
                        <li><Link id="anime" href="/filter/anime">Animes</Link></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl" id="all" href="/">PDZ+</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li><Link id="all" href="/">Tudo</Link></li>
                    <li><Link id="movie" href="/filter/movie">Filmes</Link></li>
                    <li><Link id="tv" href="/filter/tv">Series</Link></li>
                    <li><Link id="cartoon" href="/filter/cartoon">Desenhos</Link></li>
                    <li><Link id="anime" href="/filter/anime">Animes</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex-none gap-2 lg:flex">
                    <div className="form-control">
                        <input onChange={handleChange}  value={searchText} className="input input-bordered w-24 md:w-auto" type="search" placeholder="Pesquisar" aria-label="Search" />
                    </div>
                    
                    {/* <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><a>Logout</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Header