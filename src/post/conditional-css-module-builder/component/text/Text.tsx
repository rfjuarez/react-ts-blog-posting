import React from "react";
import {TextType, TextAlign} from "./Text.type.ts";
import styles from "./Text.module.css";
import CssBEMChainBuilder from "../../util/CssBEMChainBuilder.ts";

interface TextProps {
    type: TextType;
    align: TextAlign;
    text: string;
    disabled?: boolean;
}


const Text: React.FC<TextProps> = ({type, align, text, disabled}: TextProps) => {
    const rootElement = 'text';
    const classNames = CssBEMChainBuilder.create(styles)
        .addRoot(rootElement)
        .always()
        .thenAddModifier(type)
        .addRoot(rootElement)
        .always()
        .thenAddModifier(align)
        .addRoot(rootElement)
        .inCase(!!disabled)
        .thenAddModifier('disabled')
        .build()
    return (<p className={classNames}>{text}</p>);
}
export default Text;