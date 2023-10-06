import React, {useState} from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function ButtonModal({text, children, wider}: { text: any, children: JSX.Element, wider?: boolean}) {
    const [showModal, setShowModal] = useState(false)

    const afterOpenModal = () => {
        // console.log('after effect')
    }
    const closeModal = () => {
        setShowModal(false)
    }
    return (
        <>
            <button className={'addButton ' +( wider ? ' buttonWiden' : '')} onClick={() => setShowModal(!showModal)}>
                {text}
            </button>
            <Modal
            isOpen={showModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className={'modal'}
            overlayClassName={'overlay'}
                >
                {React.cloneElement( children, { onClick: () => setShowModal(!showModal), closeModal: () => closeModal() } )}
            </Modal>
        </>
);
}
