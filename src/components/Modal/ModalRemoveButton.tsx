'use client'

import { deletePDZMidia } from "@/utils/requests"


const ModalRemoveButton = ({id = 0 as number, type = '' as string}) => {


    const handleDelete = async () => {
        await deletePDZMidia(id, type)

        window.location.reload()
    }

    return (
        <div>
            <button onClick={handleDelete} className="btn btn-outline btn-error">Deletar</button>
        </div>
    )
}

export default ModalRemoveButton