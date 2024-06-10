import { MagnetLinkWithResolution } from "@/entities/PDZ_midia"

const ModalButtonMovie = ({ magnetAndRes = {} as MagnetLinkWithResolution }) => {
    return (
        <div className="d-flex justify-content-center">
            <a target="_blank" className="btn btn-outline btn-success page-button" href={magnetAndRes.magnetLink} role="button">Baixar em {magnetAndRes.resolution}</a>
        </div>
    )
}

export default ModalButtonMovie