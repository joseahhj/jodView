/*eslint-disable */
import { loadFixture, testVM, setData, nextTick, triggerEvent, triggerKeyDown} from '../../../../tests/utils'

const sizes = ['mini', 'small', 'normal', 'large'];

const inputRefs = sizes.reduce(
    (first, variant) =>
    first.concat({
            variant,
            ref: `input${variant ? `_${variant}` : ''}`
    }), []
)

describe('inputNumber', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'inputNumber'))
    //判断是否渲染完
    testVM()

    it ('should have all classes', async () => {
        const {app: {$refs}} = window
        inputRefs.forEach(({ ref, variant}) => {
            const vm = $refs[ref][0]
            let classList = ['jad-inputnumber', `jad-inputnumber-${variant}`]
            expect(vm).toHaveAllClasses(classList)
        })
    })
    it ('should be disabled when prop isDisabled is seted true', async () => {
        const { app: {$refs} } = window
        const disabledVm = $refs.input_disable
        const disabledInputEl = disabledVm.$el.querySelector('input')
        await nextTick()
        expect(disabledInputEl).toHaveProperty('disabled', true)
    })
    it ('should be readonly when prop isRead is seted true', async () => {
        const { app: {$refs} } = window
        const readOnlyVm= $refs.input_readonly
        const readonlyInputEl = readOnlyVm.$el.querySelector('input')
        expect(readonlyInputEl).toHaveProperty('readOnly', true)
        const increaseVm = readOnlyVm.$el.querySelector('.jad-inputnumber-increase')
        const decreaseVm = readOnlyVm.$el.querySelector('.jad-inputnumber-decrease')
        increaseVm.click()
        expect(app.initValue).toBe(2)
        decreaseVm.click()
        expect(app.initValue).toBe(2)
    })
    it ('should not edit when prop isEdit is seted false', async () => {
        const { app: {$refs} } = window
        const editVM = $refs.input_edit;
        const editInputEl = editVM.$el.querySelector('input')
        expect(editInputEl).toHaveProperty('readOnly', true)
        const increaseEl = editVM.$el.querySelector('.jad-inputnumber-increase')
        const decreaseEl = editVM.$el.querySelector('.jad-inputnumber-decrease')
        increaseEl.click()
        expect(app.val).toBe(3)
        decreaseEl.click()
        expect(app.val).toBe(2)
    })
    it ('should can custom icon when prop iconName is seted', async () => {
        const {app} = window
        let el = app.$refs.input_icon.$el
        let decreaseEl = el.querySelector('.jad-inputnumber-decrease').firstChild
        let increaseEl = el.querySelector('.jad-inputnumber-increase').firstChild
        await setData(app, 'iconArr', ['caret-left', 'caret-right']);
        await nextTick()
        expect(decreaseEl).toHaveClass('jad-icon-caret-left')
        expect(increaseEl).toHaveClass('jad-icon-caret-right')
    })
    it ('should can set icon placement when prop placement is seted left or right', async () => {
        const {app} = window
        let decreaseEl = app.$refs.input_place.$el.querySelector('.jad-inputnumber-decrease')
        let increaseEl = app.$refs.input_place.$el.querySelector('.jad-inputnumber-increase')
        await setData(app, 'place', 'right')
        await nextTick()
        expect(increaseEl).toHaveClass('jad-inputnumber-increase-right')
        expect(decreaseEl).toHaveClass('jad-inputnumber-decrease-right')
    })
    it ('should can set add number when prop step is seted', async () => {
        const {app} = window
        let increaseEl = app.$refs.input_step.$el.querySelector('.jad-inputnumber-increase')
        let decreaseEl = app.$refs.input_step.$el.querySelector('.jad-inputnumber-decrease')
        await setData(app, 'stepValue', 5)
        await nextTick()
        increaseEl.click()
        expect(app.stepInitValue).toBe(6)
        await setData(app, 'stepValue', 2)
        await nextTick()
        decreaseEl.click()
        expect(app.stepInitValue).toBe(4)
    })

    it('should emit events', async () => {
        const { app: {$refs} } = window
        const basicVm = $refs.input_basic
        const inputEl = basicVm.$el.querySelector('input')
        const decreaseEl = basicVm.$el.querySelector('.jad-inputnumber-decrease')
        const focusSpy = jest.fn(() => {})
        const inputSpy = jest.fn(() => {})
        const blurSpy = jest.fn(() => {})
        const changeSpy = jest.fn(() => {})
        basicVm.$on('on-focus', focusSpy)
        basicVm.$on('on-input', inputSpy)
        basicVm.$on('on-blur', blurSpy)
        basicVm.$on('on-change', changeSpy)
        expect(focusSpy).not.toHaveBeenCalled()
        inputEl.focus()
        await nextTick()
        expect(focusSpy).toHaveBeenCalled()

        expect(inputSpy).not.toHaveBeenCalled()
        triggerEvent(inputEl, 'input')
        await nextTick()
        expect(inputSpy).toHaveBeenCalled()

        expect(blurSpy).not.toHaveBeenCalled()
        inputEl.blur()
        await nextTick()
        expect(blurSpy).toHaveBeenCalled()

        expect(changeSpy).not.toHaveBeenCalled()
        decreaseEl.click()
        await nextTick()
        expect(changeSpy).toHaveBeenCalled()
    })

    it ('should stop click when prop min or max is seted', async () => {
        const {app} = window
        let el = app.$refs.input_scope.$el;
        let decreaseEl = el.querySelector('.jad-inputnumber-decrease');
        let increaseEl = el.querySelector('.jad-inputnumber-increase');
        await setData(app, 'scopeValue', 9);
        await nextTick()
        increaseEl.click()
        await nextTick()
        expect(increaseEl).toHaveClass('jad-inputnumber-increase-disabled')
        await setData(app, 'scopeValue', 3);
        await nextTick()
        decreaseEl.click()
        await nextTick()
        expect(decreaseEl).toHaveClass('jad-inputnumber-decrease-disabled')
    })
    it ('should not show control button when prop isControls is seted false', async () => {
        const { app: { $refs }} = window
        const controlEl = $refs.input_control.$el
        const sonNodeLen = controlEl.children.length
        expect(sonNodeLen).toBe(1)
    })
    it ('should show control button when prop isControls is not seted', async () => {
        const { app: { $refs }} = window
        const controlEl = $refs.input_keydown.$el
        const spanNode = controlEl.querySelectorAll('span')
        expect(spanNode[0]).toHaveClass('jad-inputnumber-decrease')
        expect(spanNode[1]).toHaveClass('jad-inputnumber-increase')
    })
    it ('value in input flame should change when keydown event trigger for key code is equal 38 or 40', async () => {
        const {app: { $refs }} = window
        const basicVm = $refs.input_keydown
        const inputEl = basicVm.$el.querySelector('input')
        inputEl.focus()
        triggerKeyDown(inputEl, 38)
        expect(app.initValue).toBe(3)
        triggerKeyDown(inputEl, 40)
        expect(app.initValue).toBe(2)
    })
})