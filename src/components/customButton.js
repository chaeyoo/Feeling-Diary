const CustomButton = (props) => {

    const { btnNm, type, onClick } = props;
    const btnType = ['positive', 'negative'].includes(type) ? type  : 'default';

    return (
        <button className={["CustomButton", `CustomButton_${btnType}`].join(" ")}
                onClick={onClick}
        >
            {btnNm}
        </button>
    )
}

CustomButton.defaultProps = {
    type: "default"
}
export default CustomButton;