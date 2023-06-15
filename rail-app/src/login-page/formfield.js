import React from 'react'

const FormField = ({name, label, type, value, onChange}) => {
    return (
        <>
        <label>{label}</label>
        <input name={name} placeholder={label} type={type} value={value} onChange={onChange} required/>
        <br/>
        </>
    )
}
export default FormField;
