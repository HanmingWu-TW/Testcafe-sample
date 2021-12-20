import {Selector, t} from 'testcafe';

class Page {
    constructor() {
        this.addTodoButton = Selector('.new-todo');
    }
}

export default new Page();