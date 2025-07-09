export const removeHtml = (text: string) => {
    if (!text) {
        return '';
    }

    return text.replace(/(<[^>]+)>)/gi, '');
};

export const removeHead = (text: string) => {
    if (!text) {
        return '';
    }

    return text.replace(/<head[^>]*>.*<\/head>/gi, '');
};

export const removeNewline = (text: string) => {
    if (!text) {
        return '';
    }

    return text.replace(/\r\n|\r|\n|\n\r/gi, '');
};
