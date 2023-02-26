import { ThemeContext } from "../App";
import { useContext } from 'react';

const MyHeader = ({headText, leftChild, rightChild}) => {
    const themeColor = useContext(ThemeContext);
    
    return(
        <header>
            <div className="head_left">
                {leftChild}
            </div>
            <div className="head_text" id={themeColor.theme}>
                {headText}
            </div>
            <div className="head_right">
                {rightChild}
            </div>
        </header>
    )
}

export default MyHeader;