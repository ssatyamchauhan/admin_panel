import React from "react";
import { Button } from "shards-react";

const ActionButton = (props) => {

    return (
        <>
            <Button onClick={() => props.edit(props.id)} outline size="sm" theme="warning" className="mr-1">
                Edit
            </Button>
            <Button onClick={() => props.delete(props.id)} outline size="sm" theme="danger" className="mr-1">
                Delete
            </Button>
        </>
    )
}

export default ActionButton;
