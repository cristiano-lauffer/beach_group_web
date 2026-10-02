//typescript:
type ButtonProps = {
    title: string;
    bgColor?: string; 
    hoverColor?: string;
    textColor?: string;
    tamanho?: string;
    tipo?: "button" | "submit" | "reset";
    onClick?: () => void;
};

const Button = ({ title, onClick, bgColor = "bg-lime-400", hoverColor = "hover:bg-lime-500", textColor = "text-primary", tamanho = "w-37.5", tipo = "button" }: ButtonProps) => {
    return (
        <div className='p-2'>
            <button type={tipo} onClick={onClick} className={`${bgColor} ${hoverColor} ${textColor} text-lg py-1.5 px-3 rounded-full font-bold ${tamanho} text-[12px] cursor-pointer transition-colors duration-300 uppercase`}>
                {title}
            </button>
        </div>
    )
}


export default Button