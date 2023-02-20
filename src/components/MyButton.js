const MyButton = ({text,type,onClick}) => {
    const btnType = ['POSITIVE','NEGATIVE'].includes(type)? type : 'default'; //button 생성 validation

    return(
        <button className={["MyButton",`MyButton_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    )
}

MyButton.defaultProps = {
    type: "default",
};

export default MyButton;