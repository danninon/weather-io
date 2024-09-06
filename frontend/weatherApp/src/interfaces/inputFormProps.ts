export interface InputFormProps {
    label: string;
    placeholder: string;
    buttonText: string;
    onSubmit: (inputValue: string) => void;
}