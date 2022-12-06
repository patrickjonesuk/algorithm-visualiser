import { Algorithm } from '@/lib/models';
import { ListAlgorithmStep } from './step';

export class ListAlgorithm extends Algorithm {

    /**
     * @param {Number} level 
     * @returns {ListAlgorithmStep} step
     */
    step(level) {
        return new ListAlgorithmStep([]);
    }

}
