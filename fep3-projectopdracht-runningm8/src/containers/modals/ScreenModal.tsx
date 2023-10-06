import React, {useState} from "react";

import Modal from 'react-modal'

Modal.setAppElement('#root')


export function ScreenModal({children}:{children: Array<JSX.Element>}) {
    const [showModal, setShowModal] = useState(false)
    const afterOpenModal = () => {

    }
    const closeModal = () => {
        setShowModal(false)
    }
    return (
        <>
            { React.cloneElement( children[0], { onClick: () => setShowModal(!showModal) } )}
            <Modal
                   isOpen={showModal}
                   onAfterOpen={afterOpenModal}
                   onRequestClose={closeModal}
                   contentLabel="Screen Modal"
                   className={'modal'}
                   overlayClassName={'overlay'}
            >
                {React.cloneElement(children[1], {closeModal: closeModal})}
            </Modal>
        </>
    );
}
