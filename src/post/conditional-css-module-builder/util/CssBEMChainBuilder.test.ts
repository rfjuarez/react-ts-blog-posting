import CssBEMChainBuilder from "./CssBEMChainBuilder.ts";


describe('CssModuleBuilder', () => {
        const cssModule = {
            root: 'root',
            'root--modifier': 'root--modifier',
            'root__child': 'root__child',
            'root__child--modifier': 'root__child--modifier'
        };
        test('should return a root with child and child modifier', () => {
            const result = CssBEMChainBuilder.create(cssModule)
                .addRoot('root')
                .always()
                .thenAddChild('child')
                .thenAddModifier('modifier')
                .build();

            expect(result).toBe('root__child--modifier');
        });
        test('should return only root with a child, conditional chain for the child modifier is false', () => {

            const result = CssBEMChainBuilder.create(cssModule)
                .addRoot('root')
                .always()
                .thenAddChild('child')
                .inCase(false)
                .thenAddModifier('modifier')
                .build();

            expect(result).toBe('root__child');
        });
        test('should return only a root style node, by default the conditional chain is false', () => {

            const result = CssBEMChainBuilder.create(cssModule)
                .addRoot('root')
                .thenAddChild('child')
                .thenAddModifier('modifier')
                .build();

            expect(result).toBe('root');
        });
        test('should return more than one root', () => {

            const result = CssBEMChainBuilder.create(cssModule)
                .addRoot('root')
                .always()
                .thenAddChild('child')
                .addRoot('root')
                .inCase(true) //is it the same that use allways
                .thenAddModifier('modifier')
                .build();

            expect(result).toBe('root__child root--modifier');
        });
    }
);