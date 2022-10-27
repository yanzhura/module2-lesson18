import { LoremIpsum } from 'lorem-ipsum';
import { random } from 'lodash';

const lorem = new LoremIpsum({
    wordsPerSentence: {
        min: 4,
        max: 8
    }
});

export const generateTask = () => {
    return {
        title: lorem.generateSentences(1),
        completed: random(0, 1) ? true : false
    };
};
