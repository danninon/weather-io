import {ChangeEvent, FormEvent, useState} from 'react';
import {InputFormProps} from "../../interfaces/inputFormProps";
import './InputForm.css';


function InputForm(props: InputFormProps) {
    const {label, placeholder, buttonText, onSubmit} = props;
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            onSubmit(inputValue);
        }
    }

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
