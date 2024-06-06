const ModalToggleCard = ({ modalId = 0 as number }) => {
    return (
        <div role="button" data-bs-toggle="modal" data-bs-target={"#staticBackdrop-" + modalId}>
            <div className="card" style={{width: '12rem'}}>
                <img src="https://placehold.co/150x225" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title overflow-y-auto" style={{height: '80px'}}>Card stretched links</h5>
                </div>
            </div>
        </div>


    )
}

export default ModalToggleCard