import { loadFixture, testVM, setData, nextTick, triggerEvent } from '../../../../tests/utils';

describe('progress', async () => {
    beforeEach(loadFixture(__dirname, 'progress'));
    testVM();

    test('progress component render success', async () => {
        const {app} = window;
        const {basic, error} = app.$refs;

        let percent = basic.$el.querySelector('.jad-progress-bar-inner');
        expect(basic).toHaveClass('jad-progress');
        expect(percent.style.width).toBe('30%');
        expect(error).toHaveClass('jad-progress-line');
    });

    test('the color of custom', async () => {
        const {app} = window;
        const {color} = app.$refs;

        let percent = color.$el.querySelector('.jad-progress-bar-inner');
        expect(percent.style.backgroundColor).toBe('rgb(45, 183, 245)');
        expect(color.circleColor).toBe('#2db7f5');

    });

    test('every status render correctly', async () => {
        const {app} = window;
        const {active, error} = app.$refs;

        let icon = error.$el.querySelector('.jad-icon-cancel');
        expect(error).toHaveClass('jad-progress-error');
        expect(icon).not.toBeNull();
        expect(active.$el.querySelector('.jad-progress-bar-active')).not.toBeNull();
    });

    test('mode of vertical is render correctly', async () => {
        const {app} = window;
        const {vertical} = app.$refs;

        let percent = vertical.$el.querySelector('.jad-progress-bar-inner');
        expect(percent.style.height).toBe('30%');
        expect(vertical).toHaveClass('jad-progress-vertical');
        expect(vertical.innerTextStyle).toEqual({});
    });

    test('strokeWidth and text of inside', async () => {
        const {app} = window;
        const {stroke} = app.$refs;

        let percent = stroke.$el.querySelector('.jad-progress-bar-inner');
        let outer = stroke.$el.querySelector('.jad-progress-bar-outer');
        let text = stroke.$el.querySelector('.jad-progress-bar-inner-text');
        expect(outer.style.height).toBe('16px');
        expect(percent.style.width).toBe('100%');
        expect(stroke).toHaveClass('jad-progress-success');
        expect(text).not.toBeNull();
        expect(text.innerHTML.trim()).toBe('成功');
    });

    test('mode of circle is render correctly', async () => {
        const {app} = window;
        const {circle} = app.$refs;

        let path = circle.$el.querySelector('path');
        let outer = circle.$el.querySelector('.jad-progress-bar-outer');
        let bg = circle.$el.querySelector('.jad-progress-circle-bg');
        expect(circle).toHaveClass('jad-progress-circle');
        expect(path.getAttribute('stroke')).toBe('#20d08c');
        expect(bg).not.toBeNull();
        expect(circle.width).toBe(180);
    });

    test('the circle has point and percent is correctly when changed', async () => {
        const {app} = window;
        const {point} = app.$refs;

        let circle = point.$el.querySelectorAll('circle');
        let bg = point.$el.querySelector('.jad-progress-circle-bg');
        expect(point).toHaveClass('jad-progress-circle');
        expect([].slice.call(circle)).toHaveLength(3);
        expect(circle[1].getAttribute('cx')).toBe('50');
        expect(bg).not.toBeNull();
        expect(point.width).toBe(150);
        expect(point.circleColor).toBe('#20d08c');

        app.handleChange(80);
        await nextTick();
        expect(point.realPercent).toBe(80);


        app.handleChange(150);
        await nextTick();
        expect(point.realPercent).toBe(100);


    });
});