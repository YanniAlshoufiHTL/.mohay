function getStringBetween(str, startChar, endChar) {
    const regex = new RegExp(`\\${startChar}(.*?)\\${endChar}`);
    const match = regex.exec(str);
    return match ? match[1] : null;
}
function getRestOfString(str, substr) {
    const substrIndex = str.indexOf(substr);
    if (substrIndex === -1) {
        return "";
    }
    return str.substring(substrIndex + substr.length);
}
function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}
function getStringTillChar(str, char) {
    const index = str.indexOf(char);
    if (index === -1) {
        return str;
    } else {
        return str.slice(0, index);
    }
}
function isUppercaseOrUnderscore(str) {
    return /^[A-Z_]+$/.test(str);
}
function deleteCharBetween(str, startChar, endChar, charToDelete) {
    let startIndex = str.indexOf(startChar);
    let endIndex = str.indexOf(endChar);

    while (startIndex !== -1 && endIndex !== -1) {
        let charToDeleteIndex = str.indexOf(charToDelete, startIndex + 1);
        while (charToDeleteIndex !== -1 && charToDeleteIndex < endIndex) {
            const charsBefore = str.slice(0, charToDeleteIndex);
            const charsAfter = str.slice(charToDeleteIndex + 1);
            str = charsBefore + charsAfter;

            endIndex -= 1;
            charToDeleteIndex = str.indexOf(charToDelete, startIndex + 1);
        }

        startIndex = str.indexOf(startChar, startIndex + 1);
        endIndex = str.indexOf(endChar, endIndex + 1);
    }

    return str;
}
function isValidColor(colorString) {
    // HEX format: #RRGGBB or #RGB
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorString)) {
        return "HEX";
    }

    // HSL format: hsl(hue, saturation, lightness)
    if (/^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/.test(colorString)) {
        return "HSL";
    }

    // HSLA format: hsla(hue, saturation, lightness, alpha)
    if (
        /^hsla\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*(0|1|0\.\d+)\s*\)$/.test(
            colorString
        )
    ) {
        return "HSLA";
    }

    // HSV format: hsv(hue, saturation, value)
    if (/^hsv\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/.test(colorString)) {
        return "HSV";
    }

    // RGB format: rgb(red, green, blue)
    if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(colorString)) {
        return "RGB";
    }

    // RGBA format: rgba(red, green, blue, alpha)
    if (
        /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0\.\d+)\s*\)$/.test(
            colorString
        )
    ) {
        return "RGBA";
    }

    // Invalid color format
    return "Invalid";
}
