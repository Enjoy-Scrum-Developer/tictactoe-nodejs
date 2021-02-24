import run from './logic/game';

(async () => {
    try {
        run();
    } catch (e) {
        console.error(e);
    }
})();