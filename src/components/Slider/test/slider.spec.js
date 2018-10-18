import { loadFixture, testVM, setData, nextTick, triggerEvent } from '../../../../tests/utils';
import { findComponentsUpward,findComponentUpward } from '../../../utils/assist.js';


describe('slider', async () => {
    beforeEach(loadFixture(__dirname, 'slider'));
    testVM();

    test('slider component render correctly', async () => {
        const {app} = window;
        const {basic, disabled} = app.$refs;

        let loaded = basic.$el.querySelector('.jad-slider-bar-loaded');
        let button = basic.$el.querySelector('.jad-slider-button-wrap');
        let tooltip = basic.$el.querySelector('.jad-tooltip');
        expect(basic).toHaveClass('jad-slider');
        expect(disabled).toHaveClass('jad-slider-disabled');
        expect(loaded).not.toBeNull();
        expect(tooltip).not.toBeNull();
        expect(loaded.style.width).toBe('20%');
        expect(button.style.left).toBe('20%');
        expect(basic.fullValue).toBe(100);
    });

    test('the color of custom', async () => {
        const {app} = window;
        const {color} = app.$refs;

        let loaded = color.$el.querySelector('.jad-slider-bar-loaded');
        let button = color.$el.querySelector('.jad-slider-button-wrap');
        expect(color.color).toBe('#20d08c');
        expect(loaded.style.backgroundColor).toBe('rgb(32, 208, 140)');
        expect(button.style.borderColor).toBe('#20d08c');
    });

    test('the options of tooltip is correctly', async () => {
        const {app} = window;
        const {tooltip, format} = app.$refs;

        let tip = tooltip.$el.querySelector('.jad-tooltip');

        expect(tip).toHaveClass('jad-tooltip-disabled');
        expect(format.endText).toBe(app.formatTip(app.value7));
    });

    test('the step and stops is correctly', async () => {
        const {app} = window;
        const {step} = app.$refs;

        let stopDom = step.$el.querySelectorAll('.jad-slider-stop');
        let nodes = [].slice.call(stopDom);
        let stops = Math.floor((99 - app.value2) / app.step);
        let offsetArr = nodes.map(node => node.style.left.slice(0, -1));
        let everyStep = offsetArr.every((item, index, arr) => {
            if (index < arr.length - 1) {
                return arr[index + 1] - item === app.step
            }
            return true
        });
        expect(nodes).toHaveLength(stops);
        expect(everyStep).toBe(true);
        expect(step.end).toBe(app.value2);


        setData(app, 'value2', 60);
        await nextTick();
        expect(step.$el.querySelectorAll('.jad-slider-stop')).toHaveLength(step.stopList.length);

    });

    test('the change is correctly follow input changed ', async () => {
        const {app} = window;
        const {input} = app.$refs;

        let plus = input.$el.querySelector('.jad-icon-plus3');
        let subtract = input.$el.querySelector('.jad-icon-minus4');

        expect(app.hasEmit).toBe(false);

        plus.click();
        await nextTick();
        expect(input.end).toBe(40);
        expect(app.hasEmit).toBe(true);

        setData(app, 'value3', 8);
        await nextTick();
        subtract.click();
        await nextTick();
        expect(input.end).toBe(0);

    });

    test('mode of range is render correctly', async () => {
        const {app} = window;
        const {range} = app.$refs;

        let start = app.value5[0];
        let end = app.value5[1];
        let btn = range.$el.querySelectorAll('.jad-slider-button-wrap');
        let btnNode = [].slice.call(btn);
        let leftArr = btnNode.map(node => node.style.left.slice(0, -1));
        let loaded = range.$el.querySelector('.jad-slider-bar-loaded');
        let everyLeft = leftArr.every(value => app.value5.includes(+value));

        expect(range).toHaveClass('jad-slider-range');
        expect(loaded.style.left).toBe(`${start}%`);
        expect(loaded.style.width).toBe(`${end - start}%`);
        expect(everyLeft).toBe(true);

    });


    test('mode of range is render correctly', async () => {
        const {app} = window;
        const {custom} = app.$refs;

        let start = app.value6[0];
        let end = app.value6[1];
        let min = app.min;
        let max = app.max;
        let btn = custom.$el.querySelectorAll('.jad-slider-button-wrap');
        let loaded = custom.$el.querySelector('.jad-slider-bar-loaded');

        expect(custom).toHaveClass('jad-slider-range');
        expect(loaded.style.left).toBe(`${(start - min)/(max - min) * 100}%`);
        expect(loaded.style.width).toBe(`${(end - start)/(max - min) * 100}%`);

        setData(app, 'value6', [20, 50]);
        await nextTick();
        expect(loaded.style.left).toBe(`${(start - min)/(max - min) * 100}%`);
        expect(loaded.style.width).toBe(`${(end - start)/(max - min) * 100}%`);

    });

    test('mode of vertical is render correctly', async () => {
        const {app} = window;
        const {vertical} = app.$refs;

        let loaded = vertical.$el.querySelector('.jad-slider-bar-loaded');

        expect(vertical).toHaveClass('jad-slider-vertical');
        expect(loaded.style.height).toBe(`${app.value4}%`);
        expect(loaded.style.bottom).toBe('0%');

    });
});