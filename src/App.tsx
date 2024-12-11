import './App.css'
import './post/conditional-css-module-builder/config/tokens.css'
import Text from "./post/conditional-css-module-builder/component/text/Text.tsx";
import {TextAlign, TextType} from "./post/conditional-css-module-builder/component/text/Text.type.ts";

function App() {


    return (
        <div className={'app'}>
            <div className={'app__text-box'}>
                <Text text={"Demo title, left"} type={TextType.TITLE} align={TextAlign.LEFT}/>
                <Text text={"Demo subtitle, center"} type={TextType.SUBTITLE} align={TextAlign.CENTER}/>
                <Text text={"Demo normal, normal"} type={TextType.NORMAL} align={TextAlign.RIGHT}/>
                <Text text={"Demo small, 22spaces[                    ] justify"} type={TextType.SMALL} align={TextAlign.JUSTIFY}/>
                <Text text={"Demo small, disable"} type={TextType.SMALL} align={TextAlign.CENTER} disabled/>
            </div>
        </div>
    )
}

export default App
