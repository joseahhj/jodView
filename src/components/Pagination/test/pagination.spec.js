import { loadFixture, testVM, setData, nextTick, triggerEvent } from '../../../../tests/utils';
import { findComponentsUpward,findComponentUpward } from '../../../utils/assist.js';

describe('pagination', async() => {
    beforeEach(loadFixture(__dirname, 'pagination'));
    testVM();

    test('pagination component render success', async () => {
        const {app} = window;
        const {basic, background, small, pageCount} = app.$refs;

        expect(basic).toHaveClass('jad-pagination');
        expect(background).toHaveClass('jad-pagination-bg');
        expect(small).toHaveClass('jad-pagination-mini');
        expect(pageCount.pageCount).toBe(7);
    });

    test('jump success when you click the page', async () => {
        const {app} = window;
        const {background, pageCount, outsideChange} = app.$refs;
        await setData(app, 'pageIndex', 4);
        await nextTick();
        expect(outsideChange.currentPage).toBe(4);

        let nextPage = background.$el.querySelector('.jad-icon-angle-right');
        nextPage && nextPage.click();
        await nextTick();
        expect(background.currentPage).toBe(2);

        let nextCount = pageCount.$el.querySelector('.jad-icon-angle-double-right');
        nextCount && nextCount.click();
        await nextTick();
        expect(pageCount.currentPage).toBe(8);


        let prevCount = pageCount.$el.querySelector('.jad-icon-angle-double-left');
        expect(pageCount.pageList.findIndex(item => item.page === -1)).not.toBe(-1);
        prevCount && prevCount.click();
        await nextTick();
        expect(pageCount.currentPage).toBe(1);

    });

    test('the maxPage is correct, when the total changed', async () => {
        const {app} = window;
        const {total, pageCount} = app.$refs;

        let maxPage = Math.ceil(app.total / 20);
        expect(total.maxPage).toBe(maxPage);

        app.changeTotal(308);
        await nextTick();
        maxPage = Math.ceil(app.total / 20);
        expect(total.maxPage).toBe(maxPage);

        let nextCount = pageCount.$el.querySelector('.jad-icon-angle-double-right');
        nextCount && nextCount.click();
        app.changeCountTotal(58);
        await nextTick();
        expect(pageCount.currentPage).toBe(1);

    });

    test('the maxPage is correct, when the pageSize changed', async () => {
        const {app} = window;
        const {total} = app.$refs;

        total.currentSize = 30;
        await nextTick();
        let maxPage = Math.ceil(app.total / 30);
        expect(total.maxPage).toBe(maxPage);
    });

    test('layout render success', async () => {
        const {app} = window;
        const {layout} = app.$refs;

        expect(layout.$el.querySelector('.jad-pagination-pager')).not.toBeNull();
        expect(layout.$el.querySelector('.jad-pagination-total')).not.toBeNull();
        expect(layout.$el.querySelector('.jad-pagination-sizer')).not.toBeNull();
        expect(layout.$el.querySelector('.jad-pagination-jumper')).not.toBeNull();

    });

    test('simple style', async() => {
        const {app} = window;
        const {simple} = app.$refs;

        expect(simple.$el.querySelector('.active')).toBeNull();
        expect(simple.$el.querySelector('.jad-pagination-divider')).not.toBeNull();

    });

    test('the event name of on-change has success to emit', async () => {
        const {app} = window;
        const {small} = app.$refs;
        expect(app.hasEmit).toBe(false);

        let nextPage = small.$el.querySelector('.jad-icon-angle-right');
        nextPage && nextPage.click();
        await nextTick();
        expect(app.hasEmit).toBe(true);

    });


});