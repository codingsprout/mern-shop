import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ModalComponent(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons ? props.buttons.map((btn,index) => 
                        <Button 
                            key={index} 
                            variant={btn.color} 
                            onClick={btn.onClick}
                        >
                            {btn.label}
                        </Button>
                    ) :

                        <Button 
                            variant="primary" 
                            {...props}
                            style={{backgroundColor: '#301934', color: '#e30b5d'}}
                            className='btn-sm'
                            onClick={props.handleClose}
                        >
                            Save
                        </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
