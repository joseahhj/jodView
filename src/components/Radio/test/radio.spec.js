/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils'

describe('radio', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'radio'))
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

    it('should be unchecked initially', async () => {
        const { app: {$refs} } = window

        $refs.radios.forEach((vm) => {
            isUnchecked(vm)
        })
    })
    it('has the expected html structure', () => {
        const { app } = window
        expect(app.$el).toMatchSnapshot()
    })
    it('renders correctly with checked status', async () => {
        const { app: {$refs} } = window

        $refs.radios[0].$el.click()
        await nextTick()
        $refs.radios.forEach((vm, index) => {
            if (index === 0) {
                isChecked(vm)
            } else {
                isUnchecked(vm)
            }
        })

        app.radioOne = app.choices[1]
        await nextTick()
        $refs.radios.forEach((vm, index) => {
            if (index === 1) {
                isChecked(vm)
            } else {
                isUnchecked(vm)
            }
        })
    })
    it('renders correctly with disabled status', async () => {
        const { app: { $refs: { disabledRadio} } } = window

        expect(disabledRadio.$el.classList).toContain('jad-radio-wrapper-disabled')
        expect(disabledRadio.$el.children.item(0).classList).toContain('jad-radio-disabled')

        isUnchecked(disabledRadio)
        disabledRadio.$el.click()
        await nextTick()
        isUnchecked(disabledRadio)
    })
    it('emits change event only on user input', async () => {
        const { app: { $refs: { eventRadios } } } = window

        const onChangeFunc = jest.fn(() => {})
        app.onChange = onChangeFunc
        app.eventOne = app.choices[0]
        await nextTick()
        expect(onChangeFunc).not.toHaveBeenCalled()
        eventRadios[1].$el.click()
        await nextTick()
        expect(onChangeFunc).toHaveBeenCalledTimes(1)
    })
})
/*eslint-disable */