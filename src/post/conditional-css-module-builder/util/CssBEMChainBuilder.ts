type CssModule = { [key: string]: string };

interface CssBEMRootChain{
    addRoot(rootClassName: string): CssBEMChain;
    build(): string;
}
interface CssBEMChain extends CssBEMRootChain{
    thenAddChild(childClassName: string): CssBEMChain;
    thenAddModifier(modifierClassName: string): CssBEMRootChain;
    inCase(chain: boolean): CssBEMChain;
    always(): CssBEMChain;
    build(): string;
}

class CssBEMChainBuilder implements CssBEMChain {
    readonly cssModule: CssModule;
    readonly classNames: string[];
    readonly chain: boolean;

    private constructor(cssModule: CssModule, classNames?: string[], chain?: boolean) {
        this.cssModule = cssModule;
        this.classNames = classNames ? classNames : [];
        this.chain = !!chain;
    }

    static create(cssModule: CssModule): CssBEMChain {
        return new CssBEMChainBuilder(cssModule);
    }

    inCase(chain: boolean): CssBEMChain {
        return new CssBEMChainBuilder(this.cssModule, this.classNames, chain);
    }

    always(): CssBEMChain {
        return new CssBEMChainBuilder(this.cssModule, this.classNames, true);
    }

    /**
     * Add a root class name to the chain, this is the first class name in the chain,
     * after this method you can add a child or a modifier.
     * @param rootClassName
     */
    addRoot(rootClassName: string): CssBEMChain {
        this.classNames.push(rootClassName);
        return new CssBEMChainBuilder(this.cssModule, this.classNames, this.chain);
    }

    /**
     * Add a modifier class name to the chain, this represented a modifier and leaf class of the root or child class in the
     * chain, after this method you must only add a root class name to create a new chain of class names.
     * @param modifierClassName
     */
    thenAddModifier(modifierClassName: string): CssBEMRootChain {
        if (this.chain && this.classNames.length > 0) {
            const className= (this.classNames.pop()||'').concat("--").concat(modifierClassName);
            this.classNames.push(className)
            return new CssBEMChainBuilder(this.cssModule,this.classNames, this.chain);
        }
        return this;
    }

    /**
     * Add a child class name to the chain, this represented a nested class name in the chain,
     * after this method you can add a modifier.
     * The string format of the class name is rootClassName__childClassName
     * @param childClassName
     */
    thenAddChild(childClassName: string): CssBEMChain {
        if (this.chain) {
            const className= (this.classNames.pop()||'').concat("__").concat(childClassName);
            this.classNames.push(className)
            return new CssBEMChainBuilder(this.cssModule,this.classNames, this.chain);
        }
        return this;
    }

    build(): string {
        return this.classNames.map((className, index) => {
            return this.classNames[index] = this.cssModule[className];
        }).join(" ");
    }


}

export default CssBEMChainBuilder;
export type {CssModule};