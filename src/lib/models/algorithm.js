import { Step } from '@/lib/models';
import { InputContainer } from '@/lib/input';

export class Algorithm {
    
    /**
     * @param {InputContainer} inputContainer
     */
    constructor(inputContainer) {
        this.inputContainer = inputContainer;
    }

    setup() {
        
    }

    /**
     * @param {Number} level
     * @returns {Step}
     */
    step(level) {
        return 0;
    }

}
