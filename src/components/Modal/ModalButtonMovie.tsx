import { MagnetLinkWithResolution } from "@/entities/PDZ_midia"

const ModalButtonMovie = ({ magnetAndRes = {} as MagnetLinkWithResolution }) => {

    let downloadType: string = magnetAndRes.magnetLink
    if (downloadType.includes('magnet')) {
        downloadType = 'magnet'
    } else if (downloadType.includes('drive')) {
        downloadType = 'drive'
    }

    let svg = <></>
    if (downloadType === 'magnet') {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-magnet" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 0 0-7 7v3h4V8a3 3 0 0 1 6 0v3h4V8a7 7 0 0 0-7-7m7 11h-4v3h4zM5 12H1v3h4zM0 8a8 8 0 1 1 16 0v8h-6V8a2 2 0 1 0-4 0v8H0z" />
        </svg>
    } else if (downloadType === 'drive') {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 50 50">
            <path d="M30.418,6H18.582c-0.724,0-1.392,0.391-1.745,1.023L3.423,30.988c-0.359,0.642-0.337,1.429,0.057,2.05l6.38,10.035 C10.228,43.65,10.864,44,11.548,44h25.903c0.684,0,1.321-0.35,1.688-0.927l6.38-10.035c0.395-0.621,0.417-1.408,0.057-2.05 L32.163,7.023C31.809,6.391,31.142,6,30.418,6z M30.41,8L43.3,31H32.61L20.65,8H30.41z M30.35,31H18.47l5.98-11.34L30.35,31z M5.16,31.97L18.49,8.19l4.84,9.31L10.92,41.01L5.16,31.97z M37.45,42H12.66l4.75-9h25.77L37.45,42z"></path>
        </svg>
    }

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