export interface ButtonProps {
    id: string;
    value: string;
    variant?: "primary" | "secondary";
    className?: string;
    fullWidth?: boolean;
    disabled?: boolean;
}
