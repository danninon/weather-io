import React, {useState} from 'react';

interface InputFormProps {
    label: string;                             // Label text for the input field
    placeholder: string;                       // Placeholder text for the input field
    buttonText: string;                        // Text on the submit button
    onSubmit: (inputValue: string) => void;    // Function to call on submit
}

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="input-field">{label}</label>
            <input
                type="text"
                id="input-field"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            <button type="submit">{buttonText}</button>
        </form>
    );
}

export default InputForm;
