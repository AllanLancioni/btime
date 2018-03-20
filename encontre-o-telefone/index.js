'use strict';

// URL problem => http://dojopuzzles.com/problemas/exibe/encontre-o-telefone/

// Regex que da match em todas as letras, separando elas por grupos

// Função que transforma a string na sequência de números, se o parametro não for uma string, dispara um erro
// Replace irá trocar cada cada caractere da string pelo resultado da função
// Quando usado com regex, o replace manda cada grupo definido pelos parênteses como um parâmetro

class PhoneNumber {

    static get regex() {
        return /([a-c])|([d-f])|([g-i])|([j-l])|([m-o])|([p-s])|([t-v])|([x-z])/gi;
    }

    static getPhoneNumbersInstances() {
        [...arguments].map(x => typeof x === 'string' ? new PhoneNumber(x) : null)
    }

    static convertStringToPhone(str) {
        if (typeof str === 'string') {
            return str.replace(PhoneNumber.regex, function () {
                return [...arguments].filter((x, i) => i > 0 && i < 9).map((x, i) => x ? i + 2 : null).find(x => !!x)
            });
        } else {
            throw new Error('This function need an argument of type String!');
        }
    }

    constructor(str) {
        this.number = PhoneNumber.convertStringToPhone(str);
        this.originalString = str;
    }

    toString() {
        return `${this.originalString || 'String'} -> ${this.number || 'Number'}`
    }
}

console.log(`${new PhoneNumber('MY LOVE')}`);


