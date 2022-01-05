import {RequestLogger, Selector} from 'testcafe';
import PageDemo from '../tools/pages/pageDemo'
const {expect} = require("chai");

const simpleLogger = RequestLogger('', {
    logRequestBody: true,
    stringifyRequestBody: true,
    logResponseBody: true,
    stringifyResponseBody: true
});

fixture `Testcafe demo`
    .page `http://todomvc.com/examples/react/#/`;
test.requestHooks(simpleLogger)('entry test', async t=>{
    const addInput = Selector('.new-todo');
    await t.expect(addInput.exists).eql(true, 'should add input visible');
    await t.eval(() => location.reload(true));
    await t.typeText(addInput, 'kop');

    // await t.typeText(PageDemo.addTodoButton, 'kop');
    await t.pressKey('enter');
})