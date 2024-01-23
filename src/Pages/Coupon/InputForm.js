import React from 'react';

const InputForm = ({ name, label, value, error, onChange, placeholder }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input value={value}

                onChange={onChange}
                name={name}
                type="string" className="form-control" id={name} aria-describedby="emailHelp"
                placeholder={placeholder}>
            </input>
            {error && <div className='alert alert-danger'>{error}</div>}
            <br />
        </div>
    );
}

export default InputForm;