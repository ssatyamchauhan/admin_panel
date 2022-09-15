import React from "react";
import { Button, CardBody, CardFooter, Modal } from "shards-react";


const PopUpImage = (props) => {

    return (
        <Modal open={props.showModal} toggle={() => props.setShowModal(false)}>
            <CardBody>
                <img src={props.image} style={{ width: '100%' }} />
            </CardBody>
            <CardFooter>
                <Button theme="danger" className="float-right" onClick={() => props.setShowModal(false)}>Close</Button>
            </CardFooter>
        </Modal>
    )
}

export default PopUpImage;