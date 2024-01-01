import { invisibleCharacters, arabicUnicodes } from "./utils/unicodes"
import { REGEX_TYPE } from './utils/enum';

function getRegexType(value: string) {
    const digitRegex = /^[0-9]+$/
    const letterRegex = /^[a-z]+$/i
    const alphaRegex = /^[a-z0-9]+$/i
    if (digitRegex.test(value)) {
        return REGEX_TYPE.DIGITS;
    }
    if (letterRegex.test(value)) {
        return REGEX_TYPE.LETTERS;
    }
    if (alphaRegex.test(value)) {
        return REGEX_TYPE.ALPHA_NUMERIC
    }
    return REGEX_TYPE.SPECIAL;
}

function validateSnsInscriptions(value: string) {
    let unicodeChars = [];
    for (let i = 0; i < value.length; i++) {
        let unicode = (value.codePointAt(i)!).toString(16);
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


export default function validateInscription(value: string, isArabic = true) {
    const getUnicodeArray = validateSnsInscriptions(value) || [];
    let isInvalidUnicode = false;
    let hasArabic = false;
    for (const arr of getUnicodeArray) {
        if (invisibleCharacters.indexOf(arr) !== -1) {
            isInvalidUnicode = true;
        }
        if (isArabic && !hasArabic && arabicUnicodes.indexOf(arr) !== -1) {
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
    const type = getRegexType(value.substring(value.indexOf(value, 0), value.lastIndexOf('.')))
    return {
        isInscriptionValid: !isInvalidUnicode,
        type,
        ...isArabic ? { hasArabic } : {}
    }
}
