import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    FormInput,
} from "shards-react";

const CreateCategory = ({ header, name, setName, image, onImageChange }) => (
    <Card small className="h-100">
        {/* Card Header */}
        <CardHeader className="border-bottom">
            <h6 className="m-0">{header}</h6>
        </CardHeader>

        <CardBody className="d-flex flex-column">
            <Form>
                {/* Title */}
                <FormGroup>
                    <label htmlFor="feInputState">Category Name</label>
                    <FormInput value={name} onChange={(e) => setName(e.target.value)} id="feInputState" placeholder="Enter Category Name" />
                </FormGroup>

                {/* Image */}
                <FormGroup>

                    <label htmlFor="feInputState">Image</label>
                    {
                        image ?
                            <div className="mb-3 mx-auto">
                                <img
                                    className="rounded-circle"
                                    src={image}
                                    alt={`${name}_image`}
                                    width="110"
                                />
                            </div>
                            : <></>
                }
                    <FormInput type="file" name="image" onChange={onImageChange} id="feInputState" />
                </FormGroup>
            </Form>
        </CardBody>
    </Card>
);

CreateCategory.propTypes = {
    /**
     * The component's title.
     */
    header: PropTypes.string
};

CreateCategory.defaultProps = {
    header: "ADD CATEGORY"
};

export default CreateCategory;