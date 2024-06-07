const ModalButtonMovie = ({ magnetAndRes = {} as MagnetLinkWithResolution }) => {
    return (
        <div className="d-flex justify-content-center">
            <a target="_blank" className="btn btn-outline-light page-button" href={magnetAndRes.magnetLink} role="button">Baixar em {magnetAndRes.resolution}</a>
        </div>
    )
}

export default ModalButtonMovie