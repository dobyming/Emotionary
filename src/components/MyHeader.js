const MyHeader = ({headText, leftChild, rightChild}) => {
    return(
        <header>
            <div className="head_left">
                {leftChild}
            </div>
            <div className="head_text">
                {headText}
            </div>
            <div className="head_right">
                {rightChild}
            </div>
        </header>
    )
}

export default MyHeader;