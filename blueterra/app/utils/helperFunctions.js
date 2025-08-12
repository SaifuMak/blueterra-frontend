export function getReadingTime(htmlString) {
    const text = htmlString.replace(/<[^>]+>/g, " ");

    const wordCount = text.trim().split(/\s+/).length;

    const minutes = Math.ceil(wordCount / 100);

    return minutes;
}


export function journalPreview(htmlString, wordLimit = 10) {
    if(!htmlString) return
    const text = htmlString.replace(/<[^>]+>/g, " ");

    const words = text.trim().split(/\s+/);

    const preview = words.slice(0, wordLimit).join(" ");

     return `${preview}... Read more`;
}