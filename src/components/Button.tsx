const colorMap: Record<string, string> = {
    mygreen: 'bg-mygreen',
    myyellow: 'bg-myyellow',
    myred: 'bg-myred',
};

const hoverMap: Record<string, string> = {
    mygreen: 'hover:bg-mygreen',
    myyellow: 'hover:bg-myyellow',
    myred: 'hover:bg-myred',
};

interface ButtonProps {
    color?: string;
    hover?: string;
    text: string;
    onClick?: () => void;
}

function Button({ color = 'mygreen', hover = 'mygreen', text, onClick }: ButtonProps) {
    return (
        <div className="flex items-center justify-center">
            <button className={`btn ${colorMap[color] || 'bg-mygreen'} ${hoverMap[hover] || 'hover:bg-mygreen'}`} onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default Button