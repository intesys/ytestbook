export const getIntialLettersFromName = (name: string): string => {
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
    }
    return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
}