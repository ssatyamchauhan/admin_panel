import React from "react";
import { FormSelect } from "shards-react";


const CustomFormSelect = ({category, selectedCategoryId, setSelectedCategoryId }) => {

    const SelectCategory = (name, setSelectedCategoryId) => {
        const catInfo = category.find((cat) => cat.name === name);
        if (catInfo && catInfo._id) {
            setSelectedCategoryId(catInfo._id);
        } else {
            setSelectedCategoryId(null)
        }
    }

    return (
        <FormSelect onChange={(event) => SelectCategory(event.target.value, setSelectedCategoryId)} id="feInputState">
            <option>All</option>
            {
                category && category.length && category.map((cat, i) => (
                    <option selected={selectedCategoryId === cat._id} key={i} id={cat._id}>{cat.name}</option>
                ))
            }
        </FormSelect>
    )
}

export default CustomFormSelect;