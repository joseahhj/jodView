/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils';

describe('table', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'table'));
    //判断是否渲染完
    testVM();

    it('checkboxTable should contain base class', async() => {
        const { app } = window;
        const { checkboxTable } = app.$refs;

        expect(checkboxTable).toHaveClass('jad-table');
    })

    it('click AllCheckbox', async() => {
        const { app } = window;
        const { checkboxTable } = app.$refs;

        let header = checkboxTable.$el.children[0];

        let allCheckbox = header.getElementsByClassName('jad-checkbox-input')[0];
        allCheckbox.click();
        await nextTick();
        expect(app.checkedRows).toHaveLength(2);
    })

    it('test sort', async() => {
        const { app } = window;
        const { checkboxTable } = app.$refs;

        let header = checkboxTable.$el.children[0];

        let sort = header.getElementsByClassName('jad-table-sort')[0];
        let icon = sort.getElementsByClassName('jad-icon')[0];
        icon.click();
        await nextTick();
        expect(app.newData[1].name).toBe('李小红');
    })

    it('test merge', async() => {
        const { app } = window;
        const { mergeTable } = app.$refs;

        let body = mergeTable.$el.children[1];
        let tr = body.getElementsByTagName('tr')[1];

        expect(tr.children.length).toBe(2);
        
    })

    it('test column render', async() => {
        const { app } = window;
        const { mergeTable } = app.$refs;

        let body = mergeTable.$el.children[1];
        let tr = body.getElementsByTagName('tr')[0];
        expect(tr.children[1].innerHTML).toContain('年龄为');
        
    })

    it('test column width', async() => {
        const { app } = window;
        const { mergeTable } = app.$refs;

        let body = mergeTable.$el.children[0];
        let col = body.getElementsByTagName('col')[1];
        expect(+col.width).toBe(200);
        
    })

    it('test no data', async() => {
        const { app } = window;
        const { noDataTable } = app.$refs;
        let body = noDataTable.$el.children[1];
        let contentTable = body.children;

        expect(contentTable[0]).toHaveClass('jad-table-content-nodata');
        
    })

    it('test expand', async() => {
        const { app } = window;
        const { expandTable } = app.$refs;

        let body = expandTable.$el.children[1];
        let expandIcon = body.getElementsByTagName('tr')[0].children[0];
        expandIcon.click();
        await nextTick();
        expect(body.getElementsByTagName('tr')).toHaveLength(5);
        
    })

    it('test custom render header template', async() => {
        const { app } = window;
        const { customRenderTable } = app.$refs;

        let body = customRenderTable.$el.children[0];
        let headerCell = body.getElementsByTagName('tr')[0].children[0];
        expect(headerCell.innerHTML).toContain('jad-icon-user');
    })

    it('test custom render body template', async() => {
        const { app } = window;
        const { customRenderTable } = app.$refs;

        let body = customRenderTable.$el.children[1];
        let headerCell = body.getElementsByTagName('tr')[0].children[0];
        expect(headerCell.innerHTML).toContain('jad-icon-user');
    })
})