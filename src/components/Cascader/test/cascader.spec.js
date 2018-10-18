/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    sleep,
    triggerEvent,
    nextTick
} from '../../../../tests/utils'


describe('cascader', async() => {
    beforeEach(loadFixture(__dirname, 'cascader'));
    testVM();

    test('cascader component render correctly', () => {
        const {app} = window;
        const {basicClick} = app.$refs;

        let input = basicClick.$el.querySelector('.jad-input');
        let icon = basicClick.$el.querySelectorAll('.jad-icon-angle-down');
        let label = basicClick.$el.querySelector('.jad-cascader-label');
        let mensu = document.body.querySelectorAll('.jad-cascader-menus');

        expect(basicClick).toHaveClass('jad-cascader');
        expect(input).not.toBeNull();
        expect(input.placeholder).toBe("请选择");
        expect(input.value).toBe("");
        expect(icon).toHaveLength(1);
        expect(label).not.toBeNull();
        expect(mensu).toHaveLength(9);
    });

    test('defaultValue has been showed correctly', () => {
        const {app} = window;
        const {defaultVal} = app.$refs;

        let label = defaultVal.$el.querySelector('.jad-cascader-label');
        expect(label).not.toBeNull();
        expect(label.innerHTML.replace(/\s*/g,"")).toBe('组件/Form/Cascader 级联选择'.replace(/\s*/g,""));
    });

    test('click input should trigger the menus', () => {
        const {app} = window;
        const {basicClick} = app.$refs;

        let input = basicClick.$el.querySelector('.jad-input-wrapper');
        const spy = jest.fn();
        input.addEventListener('click', spy);

        for (let i of [1, 2]) {
            let expectVal = i == 1 ? true : false;
            input.click();
            expect(basicClick.isShow).toBe(expectVal);
            expect(spy).toHaveBeenCalled();
        }
        expect(basicClick.isShow).toBe(false);
    });

    test('not show all of path, only the last level path', () => {
        const {app} = window;
        const {levels} = app.$refs;
        let input = levels.$el.querySelector('.jad-input-wrapper');
        let menu = null;

        input.click();
        menu = document.body.querySelector('.levels');
        expect(menu).not.toBeNull();
        levels.$nextTick(() => {
            menu.querySelectorAll('.jad-cascader-menu')[0].querySelector('.jad-cascader-menu-item').click();
            levels.$nextTick(() => {
                menu.querySelectorAll('.jad-cascader-menu')[1].querySelector('.jad-cascader-menu-item').click();
                levels.$nextTick(() => {
                    expect(levels.activeAry.length).toBe(2);
                    let label = levels.$el.querySelector('.jad-cascader-label');
                    expect(label.innerHTML.replace(/\s*/g, "")).toBe('安装');
                    expect(levels.isShow).toBe(false);
                })
            })
        });
    });

    test('the input value will be change when you click the menus', () => {
        const {app} = window;
        const {change} = app.$refs;
        let input = change.$el.querySelector('.jad-input-wrapper');
        let label = change.$el.querySelector('.jad-cascader-label');
        let menu = null;

        input.click();
        menu = document.body.querySelector('.change');
        expect(menu).not.toBeNull();
        change.$nextTick(() => {
            menu.querySelectorAll('.jad-cascader-menu')[0].querySelector('.jad-cascader-menu-item').click();
            change.$nextTick(() => {
                expect(label.innerHTML.replace(/\s*/g,"")).toBe('开发指南');
                menu.querySelectorAll('.jad-cascader-menu')[1].querySelector('.jad-cascader-menu-item').click();
                change.$nextTick(() => {
                    expect(label.innerHTML.replace(/\s*/g,"")).toBe('开发指南/安装');
                    expect(change.isShow).toBe(false);
                })
            })
        });
    });

    test('click the item that has children in the menu attribute will trigger the event', () => {
        const {app} = window;
        const {change} = app.$refs;
        let menu = null;
        let input = change.$el.querySelector('.jad-input-wrapper');
        const spy = jest.fn();

        input.click();
        menu = document.body.querySelector('.change');
        expect(menu).not.toBeNull();
        change.$nextTick(() => {
            let firstItem = menu.querySelectorAll('.jad-cascader-menu')[0].querySelector('.jad-cascader-menu-item');
            firstItem.addEventListener('click', spy);
            firstItem.click();
            expect(spy).toHaveBeenCalled();

            input.click();
            expect(change.isShow).toBe(false);
        });
    });

    test('in basic demo, clicking menus should change active value', () => {
        const {app} = window;
        const {basicClick} = app.$refs;
        let input = basicClick.$el.querySelector('.jad-input-wrapper');
        let menu = null;

        input.click();
        menu = document.body.querySelector('.basicClick');

        basicClick.$nextTick(() => {
            menu.querySelectorAll('.jad-cascader-menu')[0].querySelector('.jad-cascader-menu-item').click();
            expect(basicClick.activeAry[0].active.label).toBe('开发指南');

            basicClick.$nextTick(() => {
                menu.querySelectorAll('.jad-cascader-menu')[1].querySelector('.jad-cascader-menu-item').click();
                expect(basicClick.activeAry[1].active.label).toBe('安装');

                basicClick.$nextTick(() => {
                    let label = basicClick.$el.querySelector('.jad-cascader-label');
                    expect(label).not.toBeNull();
                    expect(label.innerHTML.replace(/\s*/g,"")).toBe('开发指南/安装');
                    expect(basicClick.isShow).toBe(false);
                });
            });
        });
    });


    test('in basic demo, hovering menus should change active value', () => {
        const {app} = window;
        const {basicHover} = app.$refs;
        let input = basicHover.$el.querySelector('.jad-input-wrapper');
        let menu = null;

        input.click();
        menu = document.body.querySelector('.basicHover');
        basicHover.$nextTick(() => {
            triggerEvent(menu.querySelectorAll('.jad-cascader-menu')[0].querySelectorAll('.jad-cascader-menu-item')[1], 'mouseenter');
            expect(basicHover.activeAry[0].active.label).toBe('组件');

            basicHover.$nextTick(() => {
                triggerEvent(menu.querySelectorAll('.jad-cascader-menu')[1].querySelectorAll('.jad-cascader-menu-item')[1], 'mouseenter');
                expect(basicHover.activeAry[1].active.label).toBe('Form');
                basicHover.$nextTick(() => {
                    menu.querySelectorAll('.jad-cascader-menu')[2].querySelector('.jad-cascader-menu-item').click();
                    expect(basicHover.activeAry[2].active.label).toBe('Cascader 级联选择');
                    basicHover.$nextTick(() => {
                        let label = basicHover.$el.querySelector('.jad-cascader-label');
                        expect(label).not.toBeNull();
                        expect(label.innerHTML.replace(/\s*/g,"")).toBe('组件/Form/Cascader 级联选择');
                        expect(basicHover.isShow).toBe(false);
                    })
                })
            });
        })
    });
});
/*eslint-disable */