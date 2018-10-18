import { loadFixture, testVM, setData, nextTick, triggerEvent } from '../../../../tests/utils';
import { findComponentsUpward,findComponentUpward } from '../../../utils/assist.js';


describe('transfer', async () => {
    beforeEach(loadFixture(__dirname, 'transfer'));
    testVM();

    test('transfer component render correctly', async () => {
        const {app} = window;
        const {basic} = app.$refs;

        let panel = basic.$el.querySelectorAll('.jad-transfer-panel');
        let button = basic.$el.querySelector('.jad-transfer-buttons');
        let disabled = basic.$el.querySelectorAll('.jad-checkbox-disabled');
        let items = basic.$el.querySelectorAll('.jad-transfer-panel-item');

        expect(basic).toHaveClass('jad-transfer');
        expect(panel).toHaveLength(2);
        expect(button).not.toBeNull();
        expect(disabled).toHaveLength(2);
        expect(items).toHaveLength(app.data1.length);
    });

    test('the footer, buttons and title of custom', async () => {
        const {app} = window;
        const {footer} = app.$refs;

        let leftFooter = footer.$el.querySelector('.my-left-footer');
        let rightFooter = footer.$el.querySelector('.my-right-footer');
        let buttons = footer.$el.querySelectorAll('.jad-transfer-button-text');
        let buttonsNode = [].slice.call(buttons);
        let buttonsArr = buttonsNode.map(node => node.innerHTML.trim());
        let hasButton = app.buttons.every(item => buttonsArr.includes(item));
        let labels = footer.$el.querySelectorAll('.jad-checkbox-label');
        let labelNode = [].slice.call(labels);
        let labelsArr = labelNode.map(node => node.innerHTML.trim());
        let hasTitle = app.titles.every(title => labelsArr.includes(title));

        expect(leftFooter).not.toBeNull();
        expect(rightFooter).not.toBeNull();
        expect(hasButton).toBe(true);
        expect(hasTitle).toBe(true);
    });

    test('be related to handle of search', async () => {
        const {app} = window;
        const {search} = app.$refs;

        let searchNode = search.$el.querySelector('.jad-transfer-panel-body-search');
        let leftPanel = search.$refs.leftPanel;
        let rightPanel = search.$refs.rightPanel;

        leftPanel.keyword = 'h';
        await nextTick();
        let items = search.$el.querySelectorAll('.jad-transfer-panel-item');
        expect(searchNode).not.toBeNull();
        expect(items).toHaveLength(3);
        expect(rightPanel.data).toHaveLength(0);

        search.clearKeyword('left');
        await nextTick();
        items = search.$el.querySelectorAll('.jad-transfer-panel-item');
        expect(items).toHaveLength(app.data2.length);

        items[1].click();
        await nextTick();

        let indeterminate = search.$el.querySelector('.jad-checkbox-indeterminate');
        expect(indeterminate).not.toBeNull();

        let selected = search.$el.querySelector('.jad-transfer-panel-header-selected');
        let format = app.format(1, app.data2.length);
        expect(selected.innerHTML.trim()).toBe(format);

        leftPanel.keyword = 'hwd';
        await nextTick();
        items = search.$el.querySelectorAll('.jad-transfer-panel-item');
        expect(items).toHaveLength(0);

        rightPanel.keyword = 'hwd';
        await nextTick();
        search.clearKeyword();
        await nextTick();
        expect(rightPanel.keyword).toHaveLength(0);

        rightPanel.keyword = 'hwd';
        search.clearKeyword('right');
        await nextTick();
        expect(rightPanel.keyword).toHaveLength(0);
    });

    test('In line with expectations when set value an defaultSelected', async () => {
        const {app} = window;
        const {selected} = app.$refs;

        let checked = selected.$el.querySelectorAll('.jad-checkbox-checked');
        let indeterminate = selected.$el.querySelectorAll('.jad-checkbox-indeterminate');
        let wrapper = selected.$el.querySelectorAll('.jad-checkbox-wrapper');
        let disabled = selected.$el.querySelectorAll('.jad-checkbox-disabled');
        let items = selected.$el.querySelectorAll('.jad-transfer-panel-item');
        let labels = selected.$el.querySelectorAll('.jad-checkbox-label');
        let itemsNode = [].slice.call(items);
        let labelsNode = [].slice.call(labels);
        let textArr = labelsNode.map(node => node.innerHTML.trim());
        let myText = app.data2.map(item => item.label + '-' + item.en);
        let hasEveryText = myText.every(text => textArr.includes(text));
        let leftPanel = selected.$refs.leftPanel;
        let rightPanel = selected.$refs.rightPanel;

        expect(hasEveryText).toBe(true);
        expect(disabled).toHaveLength(0);
        expect(checked).toHaveLength(3);
        expect(indeterminate).toHaveLength(2);
        expect(rightPanel.showData).toHaveLength(2);
        expect(leftPanel.showData).toHaveLength(4);


        wrapper[0].click();
        await nextTick();
        checked = selected.$el.querySelectorAll('.jad-checkbox-checked');
        expect(checked).toHaveLength(6);
        expect(leftPanel.selected).toHaveLength(4);

        wrapper[0].click();
        await nextTick();
        checked = selected.$el.querySelectorAll('.jad-checkbox-checked');
        expect(checked).toHaveLength(1);
        expect(leftPanel.selected).toHaveLength(0);

    });


    test('fields of custom is render correctly', async () => {
        const {app} = window;
        const {fields} = app.$refs;

        let items = fields.$el.querySelectorAll('.jad-transfer-panel-item');

        let labels = fields.$el.querySelectorAll('.jad-checkbox-label');
        let itemsNode = [].slice.call(items);
        let labelsNode = [].slice.call(labels);
        let textArr = labelsNode.map(node => node.innerHTML.trim());
        let myText = app.data3.map(item => item.name);
        let hasEveryText = myText.every(text => textArr.includes(text));

        expect(hasEveryText).toBe(true);
    });

    test('In line with expectations when change and has targetOrder', async () => {
        const {app} = window;
        const {order} = app.$refs;

        let buttons = order.$el.querySelectorAll('.jad-transfer-button');
        let indeterminate = order.$el.querySelectorAll('.jad-checkbox-indeterminate');

        expect(indeterminate).toHaveLength(1);

        buttons[0].click();
        await nextTick();
        let checked = order.$el.querySelectorAll('.jad-checkbox-checked');
        indeterminate = order.$el.querySelectorAll('.jad-checkbox-indeterminate');
        expect(indeterminate).toHaveLength(0);
        expect(checked).toHaveLength(0);
        expect(app.emitChange).toBe(true);
        expect(app.changeObj.event).toBe('add');
        expect(app.changeObj.value).toHaveLength(app.value1.length + 2);

        let oldValIndex = app.changeObj.value.findIndex(val => val === app.value1[0]);
        let isUnshift = oldValIndex > 0;
        expect(isUnshift).toBe(true);

        let items = order.$el.querySelectorAll('.jad-transfer-panel-item');
        items[4].click();
        items[5].click();
        await nextTick();
        indeterminate = order.$el.querySelectorAll('.jad-checkbox-indeterminate');
        expect(indeterminate).toHaveLength(1);
        buttons[1].click();
        await nextTick();
        expect(app.changeObj.event).toBe('remove');

        app.data4.splice(0,2);
        await nextTick();
        items = order.$el.querySelectorAll('.jad-transfer-panel-item');
        expect(items).toHaveLength(4);

        app.data4.splice(0,4);
        await nextTick();
        items = order.$el.querySelectorAll('.jad-transfer-panel-item');
        expect(items).toHaveLength(0);
    });

    test('data is unset, the component is render correctly', async () => {
        const {app} = window;
        const {empty} = app.$refs;

        let items = empty.$el.querySelectorAll('.jad-transfer-panel-item');


        expect(empty.data.length).toBe(0);
        expect(items).toHaveLength(0);
    });
});