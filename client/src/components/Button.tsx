interface ButtonProps {
    color: string;
    hover: string;
    text: string
}

function Button({color, hover, text}: ButtonProps) {
    return (
        <div className="flex items-center justify-center">
            <button className={`btn bg-${color} hover:bg-${hover}`}>
                {text}
            </button>
        </div>
    )
}

export default Button