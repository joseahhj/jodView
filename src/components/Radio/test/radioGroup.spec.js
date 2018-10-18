/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils'
import { findComponentsDownward } from '../../../utils/assist'

describe('radioGroup', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'radioGroup'))
    //判断是否渲染完
    testVM()

    const isUnchecked = (vm) => {
        expect(vm.realCheck).toBeFalsy()
        expect(vm.$el.querySelector('input').checked).toBeFalsy()
        expect(vm.$el.classList).not.toContain('jad-radio-wrapper-checked')
        expect(vm.$el.children.item(0).classList).not.toContain('jad-radio-checked')
    }
    const isChecked = (vm) => {
        expect(vm.realCheck).toBeTruthy()
        expect(vm.$el.querySelector('input').checked).toBeTruthy()
        expect(vm.$el.classList).toContain('jad-radio-wrapper-checked')
        expect(vm.$el.children.item(0).classList).toContain('jad-radio-checked')
    }
    it('has the expected html structure', () => {
        const { app } = window
        expect(app.$el).toMatchSnapshot()
    })
    it('should be inited correctly', async () => {
        const { app: { $refs: { radioGroup } } } = window

        let children = findComponentsDownward(radioGroup, 'Radio')
        children.forEach(vm => {
            if (vm.label === radioGroup.value) {
                isChecked(vm)
            } else {
                isUnchecked(vm)
            }
        })
    })
    it('renders vertically', async () => {
        const { app: { $refs: { verticalGroup } } } = window

        expect(verticalGroup.$el.classList).toContain('jad-radio-group-vertical')
    })
    it('renders with slots correctlly', async () => {
        const { app: { $refs: { slotGroup } } } = window

        let children = findComponentsDownward(slotGroup, 'Radio')
        children.forEach(vm => {
            isUnchecked(vm)
        })
        children[0].$el.click()
        await nextTick()
        expect(slotGroup.value).toEqual(children[0].label)
        children.forEach((vm, index) => {
            if (index === 0) {
                isChecked(vm)
            } else {
                isUnchecked(vm)
            }
        })
    })
    it('renders with button correctlly', async () => {
        const { app: { $refs: { buttonGroup } } } = window

        expect(buttonGroup.$el.classList).toContain('jad-radio-group-button')
        expect(buttonGroup.$el.classList).toContain('jad-radio-group-vertical')
    })
    it('renders with button size correctlly', async () => {
        const { app: { $refs: { buttonSizeGroups } } } = window

        let sizes = ['large', 'medium', 'small']
        sizes.forEach((size, index) => {
            expect(buttonSizeGroups[index].$el.classList).toContain(`jad-radio-group-button-${size}`)
        })
    })
    it('emits change event only on user input', async () => {
        const { app: { $refs: { eventGroup } } } = window

        const onChangeFunc = jest.fn(() => { })
        app.onChange = onChangeFunc
        app.eventGroup = app.options[0].label
        await nextTick()
        expect(onChangeFunc).not.toHaveBeenCalled()
        let children = findComponentsDownward(eventGroup, 'Radio')
        let radioEl = children[1].$el
        radioEl.click()
        await nextTick()
        expect(onChangeFunc).toHaveBeenCalledTimes(1)
    })
})
/*eslint-disable */