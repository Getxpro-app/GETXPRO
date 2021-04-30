import React from 'react'
import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
import { checked } from '../../App.css' 

const Checkbox = ({ checked, name, attributes,  ...props }) => (
    <div>
            <Checkbox
            {...checkbox}
            name={attributes}
            id={attributes}
            value={attributes}
            className='checkbox'
            checked={checked}
            />
        <span>{name}</span>
        </label>
    </div>
)

export default Checkbox;


