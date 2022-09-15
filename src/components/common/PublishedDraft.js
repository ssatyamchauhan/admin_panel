import React from "react";
import { ButtonGroup, Button } from "shards-react";

const PublishDraftGroup = (props) => (
    <ButtonGroup className="mb-3">
        <Button disabled={props.disabled} onClick={() => props.onClick(1)} theme={props.status === 1 ? "primary" : "white"}>{props.published ? props.published : "Published"}</Button>
        <Button disabled={props.disabled} onClick={() => props.onClick(2)} theme={props.status === 2 ? "primary" : "white"}>{props.draft ? props.draft : "Draft"}</Button>
    </ButtonGroup>
);

export default PublishDraftGroup;