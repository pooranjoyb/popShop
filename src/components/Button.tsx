interface ButtonProps {
    color: string;
    hover: string;
    text: string;
    onClick?: () => void;
}

function Button({ color, hover, text, onClick }: ButtonProps) {
    return (
        <div className="flex items-center justify-center">
            <button className={`btn bg-${color} hover:bg-${hover}`} onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default Button