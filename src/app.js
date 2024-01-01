"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unicodes_1 = require("./utils/unicodes");
const enum_1 = require("./utils/enum");
function getRegexType(value) {
    const digitRegex = /^[0-9]+$/;
    const letterRegex = /^[a-z]+$/i;
    const alphaRegex = /^[a-z0-9]+$/i;
    if (digitRegex.test(value)) {
        return enum_1.REGEX_TYPE.DIGITS;
    }
    if (letterRegex.test(value)) {
        return enum_1.REGEX_TYPE.LETTERS;
    }
    if (alphaRegex.test(value)) {
        return enum_1.REGEX_TYPE.ALPHA_NUMERIC;
    }
    return enum_1.REGEX_TYPE.SPECIAL;
}
function validateSnsInscriptions(value) {
    let unicodeChars = [];
    for (let i = 0; i < value.length; i++) {
        let unicode = (value.codePointAt(i)).toString(16);
        for (let j = 0; j < 4; j++) {
            if (unicode.length === 4) {
                unicodeChars.push('U' + unicode.toUpperCase());
                break;
            }
            unicode = '0' + unicode;
        }
    }
    return unicodeChars;
}
function validateInscription(value, isArabic = true) {
    const getUnicodeArray = validateSnsInscriptions(value) || [];
    let isInvalidUnicode = false;
    let hasArabic = false;
    for (const arr of getUnicodeArray) {
        if (unicodes_1.invisibleCharacters.indexOf(arr) !== -1) {
            isInvalidUnicode = true;
        }
        if (isArabic && !hasArabic && unicodes_1.arabicUnicodes.indexOf(arr) !== -1) {
            hasArabic = true;
        }
        if (isInvalidUnicode && isArabic) {
            break;
        }
    }
    const validateDots = getUnicodeArray.filter(x => x === 'U002E');
    if (validateDots.length > 1 && !isInvalidUnicode) {
        isInvalidUnicode = true;
    }
    const type = getRegexType(value.substring(value.indexOf(value, 0), value.lastIndexOf('.')));
    return Object.assign({ isInscriptionValid: !isInvalidUnicode, type }, isArabic ? { hasArabic } : {});
}
exports.default = validateInscription;
console.log(validateInscription('sars.1.sats'));
