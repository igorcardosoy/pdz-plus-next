import { MagnetLinkWithResolution } from "@/entities/PDZ_midia"
import { getSVG } from "./ModalCard"



const ModalButtonMovie = ({ magnetAndRes = {} as MagnetLinkWithResolution }) => {
    let svg = getSVG(magnetAndRes.magnetLink)

    return (
        <div className="d-flex justify-content-center">
            <a target="_blank" className="btn btn-outline btn-success page-button flex flex-wrap" href={magnetAndRes.magnetLink} role="button">
                {svg}
                Baixar {magnetAndRes.resolution ? 'em ' + magnetAndRes.resolution : ''}
            </a>
        </div>
    )
}

export default ModalButtonMovie