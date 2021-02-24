
export const randomPick = (array) => {
    const size = (array || []).length;
    if (size) {
        const index = Math.floor(Math.random() * (size + 1));
        return array[index];
    }
    return null;
};
