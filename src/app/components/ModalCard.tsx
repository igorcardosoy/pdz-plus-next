import { getMidiaFromTMDB } from "@/utils/requests"
import ModalToggleCard from "./ModalToggleCard"

const ModalCard = async ({ modalId = 0 as number }) => {

    // {pdzMidia = {} as PDZ_midia}
    // const tmdbMidia: TMDB_midia = await getMidiaFromTMDB(pdzMidia.tmdb_id, pdzMidia.tmdb_type)

    return (
        <div>
            <div className="d-flex flex-wrap gap-3 text-center">
                {/* <ModalToggleCard poster={tmdbMidia.poster_path} title={tmdbMidia.title} /> */}
                <ModalToggleCard key={modalId} modalId={modalId} />

                <div className="modal fade" id={"staticBackdrop-" + modalId} tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">{tmdbMidia.title}</h1> */}
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body ">
                                <select defaultValue='1' className="form-select" aria-label="Default select example">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCard