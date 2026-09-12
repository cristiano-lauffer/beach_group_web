//typescript:
type InputItemProps = {
    title: string;
    bgColor?: string;
    focus?: string;
    textColor?: string;
    tamanho?: string;
};

const InputItem = ({ title, bgColor = "bg-white/20", focus = "focus:ring-2 focus:ring-sky-600 ", textColor = "text-primary", tamanho = "w-[265px] md:w-[245px] " }: InputItemProps) => {
    return (
        <div className={`p-2 ${tamanho}`}>
            <p>{title}:</p>
            <input
                type="text"
                placeholder={title}
                className={`${bgColor} ${focus} ${textColor} text-lg py-1.5 px-3 outline-none  rounded-full ${tamanho} text-[12px] cursor-pointer transition-colors duration-300`}
            />
        </div>
    )
}




export default InputItem
