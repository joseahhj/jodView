import { loadFixture, testVM, setData, nextTick, triggerEvent } from '../../../../tests/utils';


describe('upload', async () => {
    beforeEach(loadFixture(__dirname, 'upload'));
    testVM();

    test('upload component is render correctly', async () => {
        const {app} = window;
        const {basic, list, drag} = app.$refs;

        let button = basic.$el.querySelector('.jad-btn-default');
        let tip = basic.$el.querySelector('.jad-upload-tip');
        let listNode = list.$el.querySelector('.jad-upload-list');
        let dragNode = drag.$el.querySelector('.jad-upload-drag');
        let items = drag.$el.querySelectorAll('.jad-upload-list-item');

        expect(basic).toHaveClass('jad-upload');
        expect(button).not.toBeNull();
        expect(dragNode).not.toBeNull();
        expect(items).toHaveLength(0);
        expect(tip.textContent).toBe(app.defaultTip);
        expect(listNode.style.display).toBe('none');

        app.firstList = [].concat(app.fileList);
        await nextTick();
        items = drag.$el.querySelectorAll('.jad-upload-list-item');
        expect(items).toHaveLength(2);

    });

    test('pic mode is render correctly', async () => {
        const {app} = window;
        const {image} = app.$refs;

        let pic = image.$el.querySelector('.jad-upload-list-pic');
        let input = image.$el.querySelector('.jad-upload-input');
        let icon = image.$el.querySelector('.jad-icon-plus3');
        expect(pic).not.toBeNull();
        expect(icon).not.toBeNull();
        expect(input.getAttribute('multiple')).toBe('multiple');

    });
});