import {RequestLogger, Selector} from 'testcafe';
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
    await t.typeText(addInput, 'kop');
    await t.pressKey('enter');
})