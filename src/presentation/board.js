
const joinAndEnclose = (array, separator) => {
    return separator + array.join(separator) + separator;
};

export const showBoard = (state) => {
    const border = joinAndEnclose(new Array(state.size).fill('---'), '-');
    console.log(`\n${border}`);
    for (let i = 0; i < state.size; i++) {
        const row = joinAndEnclose(state.squares.slice(i * state.size, (i + 1) * state.size), ' | ');
        console.log(row.trim());
        console.log(border);
    }
    console.log('\n');
};
