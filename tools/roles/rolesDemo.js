import {Role} from 'testcafe';

const AdminAccount = Role(`https://url`, async t => {
    await t.typeText('[name=username]', 'admin', {replace: true});
    await t.typeText('[name=password]', '111111', {replace: true});
    await t.setNativeDialogHandler(() => true).click('#login');
})

export { AdminAccount };