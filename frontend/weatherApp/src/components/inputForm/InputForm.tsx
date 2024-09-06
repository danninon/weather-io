import React, {useState} from 'react';
import {InputFormProps} from "../../interfaces/inputFormProps.ts";
import './InputForm.css';


function InputForm(props: InputFormProps) {
    const {label, placeholder, buttonText, onSubmit} = props;
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('Input changed:', e.target.value); // Log the current input value
        setInputValue(e.target.value);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Form submitted:', inputValue); // Log the input value on form submission
        if (inputValue.trim() !== '') {
            console.log('Calling onSubmit with:', inputValue); // Log before calling onSubmit
            onSubmit(inputValue); // Call the parent function passed as a prop
            setInputValue(''); // Clear input after submission
        } else {
            console.log('Input is empty, form not submitted');
        }
    }

    console.log('Rendering InputForm component with inputValue:', inputValue); // Log on every render

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <label className="input-label" htmlFor="input-field">{label}</label>
            <div className="input-wrapper">
                <input
                    className="input-field"
                    type="text"
                    id="input-field"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                />
                <button className="input-button" type="submit">{buttonText}</button>
            </div>
        </form>
    );
}

export default InputForm;
