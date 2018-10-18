/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick,
    triggerEvent
} from '../../../../tests/utils'
describe('dropDown', async() => {
        beforeEach(loadFixture(__dirname, 'dropDown'))
        testVM()

        it('basic should contain base class', async() => {
            const {
                app: {
                    $refs
                }
            } = window

            expect($refs.basic).toHaveClass('jad-dropdown')
        })
        it('Snapshot has the expected html structure', () => {
            const {
                app
            } = window
            expect(app.$el).toMatchSnapshot()
        })

        it('trigger is hover', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.basic;
            let dropdownElm = dropdown.$el.children[0];
            triggerEvent(dropdownElm, 'mouseenter');
            await nextTick()
            expect(dropdown.isShow).toBe(true);
            triggerEvent(dropdownElm, 'mouseleave');
            await nextTick()
            expect(dropdown.isShow).toBe(false);
        })
        it('trigger is click', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.triggerClick;
            let dropdownElm = dropdown.$el.children[0];

            const spy = jest.fn()
            dropdownElm.addEventListener('click', spy)
            dropdownElm.click()
            await nextTick()
            expect(dropdown.isShow).toBe(true);
            expect(spy).toHaveBeenCalled()
        })
        it('renders correctly with click drop_item', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            //click_select_item

            let dropdown = $refs.click_item;
            let dropdownElm = dropdown.$el.children[0];
            let clickItem = $refs.click_select_item.$el;
            const spy = jest.fn()
            clickItem.addEventListener('click', spy)
            triggerEvent(dropdownElm, 'mouseenter');
            await nextTick()
            expect(dropdown.isShow).toBe(true);
            clickItem.click()
            await nextTick()
            triggerEvent(dropdownElm, 'mouseleave');
            expect(dropdown.isShow).toBe(false);
            expect(spy).toHaveBeenCalled()
        })
        it('click drop_item disabled', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.triggerClickDis;
            let dropdownElm = dropdown.$el.children[0];
            let clickItem = $refs.click_disable.$el;
            const spy = jest.fn()
            clickItem.addEventListener('click', spy)
            triggerEvent(dropdownElm, 'mouseenter');
            await nextTick()
            clickItem.click()
            expect(dropdown.isShow).toBe(true);
            expect(spy).toHaveBeenCalled()
        })
        it('renders correctly with different isDisabled props', async() => {
            const {
                app
            } = window
            const vm = app.$refs.isDisable

            await setData(app, 'isDisabled', true)
            expect(vm.isDisabled).toBe(true)
            expect(vm.$el).toHaveClass('jad-dropdown-disabled')
        })
        it('renders correctly with default selected', async() => {
            const {
                app
            } = window
            const vm = app.$refs.selected_item
            expect(vm.$el).toHaveClass('jad-dropdown-item-selected')
        })
        it('renders correctly with is-hide-click props', async() => {
            const {
                app
            } = window
            const vm = app.$refs.hide_click
            const downItem = app.$refs.down_item.$el
            const spy = jest.fn()
            vm.$el.children[0].click()
            downItem.addEventListener('click', spy)
            downItem.click()
            expect(vm.isHideClick).toBe(true)
            expect(vm.isShow).toBe(true);
            expect(spy).toHaveBeenCalled()

        })
        it('renders correctly with nesting', async() => {
            const {
                app
            } = window
            const vm = app.$refs.layer1
            const downItem = app.$refs.layer2
            const downItemLi = app.$refs.layer3
            const spy = jest.fn()
            vm.$el.children[0].click()
            expect(vm.isShow).toBe(true)
            downItem.$el.click()
            expect(vm.isShow).toBe(true)
            downItemLi.$el.addEventListener('click', spy)
            downItemLi.$el.click()
                //expect(vm.isShow).toBe(false)
            expect(spy).toHaveBeenCalled()

        })
        it('renders correctly with trigger is custom', async() => {
            const {
                app
            } = window
            const vm = app.$refs.custom
            const downItem = app.$refs.customLi
            const customNest = app.$refs.customNest
            const customNestLi = app.$refs.customNestLi
            const spy = jest.fn()
            vm.$el.click()
            await setData(app, 'isManual', true)
            expect(vm.isShow).toBe(true)
            downItem.$el.addEventListener('click', spy)
            downItem.$el.click()
            expect(vm.isShow).toBe(true)
            expect(spy).toHaveBeenCalled()
            customNest.$el.click()
            customNestLi.$el.click()
            expect(vm.isShow).toBe(true)
        })



    })
    /*eslint-disable */