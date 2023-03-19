const PageHeader = (props) => {

    const { headerText, leftChild, rightChild } = props;

    return (
        <header>
            <div className="head_btn_left">
                {leftChild}
            </div>
            <div className="head_text">
                {headerText}
            </div>
            <div className="head_btn_right">
                {rightChild}
            </div>
        </header>
    )
}

PageHeader.defaultProps = {
    type: "default"
}
export default PageHeader;