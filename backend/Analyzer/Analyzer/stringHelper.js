function getStringBetween(str, startChar, endChar) {
    const regex = new RegExp(`\\${startChar}(.*?)\\${endChar}`);
    const match = regex.exec(str);
    return match ? match[1] : null;
}
