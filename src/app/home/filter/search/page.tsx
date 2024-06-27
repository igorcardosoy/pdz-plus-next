'use server'

import MidiaContent from "@/components/MidiaContent"

const Search = ({ searchParams = {} as { query: string } }) => {

    return (
        <MidiaContent midiaType='search' searchText={searchParams.query} />
    )
}

export default Search