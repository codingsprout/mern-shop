import React from 'react'
import ModalComponent from '../../../components/UI/Modal/Modal'

const DeleteCategoryModal = (props) => {

    const {
        modalTitle,
        show,
        handleClose,
        deleteThisCategory,
        expandedArray,
        checkedArray
    } = props

    return (
        <ModalComponent
            modalTitle={modalTitle}
            show={show}
            handleClose={handleClose}
            buttons={[
                {
                    label: 'Yes',
                    color: 'primary',
                    onClick: deleteThisCategory
                },
                {
                    label: 'No',
                    color: 'danger',
                    onClick: () => { alert('no') }
                },
            ]}
        >
            <h5>Expanded Category</h5>
            { expandedArray.map((item, index) => <span key={index}>{item.name}</span>) }

            <h5>Checked Category</h5>
            { checkedArray.map((item, index) => <span key={index}>{item.name}</span>) }
        </ModalComponent>
    )
}

export default DeleteCategoryModal