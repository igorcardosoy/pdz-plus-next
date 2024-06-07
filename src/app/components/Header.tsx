"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Header = () => {

    const [searchText, setSearchText] = useState("")
    const [selected, setSelected] = useState("all")
    const router = useRouter()





    const handleSubmit = (e: any) => {
        e.preventDefault()
            if (searchText) {
            router.push(`/filter/search?query=${searchText}`)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ height: "100px" }}>
            <div className="container-fluid ms-5">
                <a className="navbar-brand" href="/">
                    PDZ+
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link id="all" className="nav-link active" aria-current="page" href="/">Tudo</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="movie" className="nav-link" href="/filter/movie">Filmes</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="tv" className="nav-link" href="/filter/tv">Series</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="cartoon" className="nav-link" href="/filter/cartoon">Desenhos</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="anime" className="nav-link" href="/filter/anime">Animes</Link>
                        </li>
                    </ul>
                    <form className="d-flex me-5" onSubmit={ e => handleSubmit(e)} role="search">
                        <input onChange={e => setSearchText(e.target.value)} className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">OK!</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header