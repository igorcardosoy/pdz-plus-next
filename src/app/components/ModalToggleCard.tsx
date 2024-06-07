const ModalToggleCard = async ({ modalId = 0 as number, tmdbMidia = {} as TMDB_midia }) => {

    const TMDB_IMG_URL = process.env.TMDB_PUBLIC_IMAGE_BASE_URL

    return (
        <div role="button" data-bs-toggle="modal" data-bs-target={"#staticBackdrop-" + modalId}>
            <div className="card" style={{width: '12rem'}}>
                <img src={TMDB_IMG_URL + tmdbMidia.poster_path} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h6 className="card-title overflow-y-auto" style={{height: '60px'}}>{tmdbMidia.title}</h6>
                </div>
            </div>
        </div>


    )
}

export default ModalToggleCard