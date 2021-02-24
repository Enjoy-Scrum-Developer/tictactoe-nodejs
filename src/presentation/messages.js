import readline from 'readline';
import { END, GREEN, YELLOW } from "../helpers/ansi";


export const alertMessage = (message) => {
    console.log(`${YELLOW}${message}${END}`);
};

export const prompt = (message) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(`${GREEN}${message}${END}`, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};
