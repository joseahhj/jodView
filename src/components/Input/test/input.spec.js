/*eslint-disable */
import { loadFixture, testVM, nextTick, triggerEvent } from '../../../../tests/utils'

describe('input', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'input'))
    //判断是否渲染完
    testVM()

    it('has the expected html structure', () => {
        const { app } = window
        expect(app.$el).toMatchSnapshot()
    })
    it('should be inited correctly', async () => {
        const { app: {$refs} } = window
        const basicVm = $refs.basicVm

        expect(basicVm.currentValue).toBe('')
        expect(basicVm.$el.querySelector('input').placeholder).toBe('placeholder')

        app.basicValue = 'changed basic value'
        await nextTick()
        expect(basicVm.currentValue).toBe('changed basic value')
    })

    it('can show hover style', async () => {
        const { app: {$refs} } = window
        const basicVm = $refs.basicVm
        const innerEl = basicVm.$el.querySelector('.jad-input-inner')
        triggerEvent(innerEl, 'mouseover')
        await nextTick()
        expect(basicVm.isHovered).toBe(true)

        triggerEvent(innerEl, 'mouseout')
        await nextTick()
        expect(basicVm.isHovered).toBe(false)
    })

    it('should emit events', async () => {
        const { app: {$refs} } = window
        const basicVm = $refs.basicVm
        const inputEl = basicVm.$el.querySelector('input')
        const text = 'test input'

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
        expect(basicVm.isFocused).toBe(true)
        expect(focusSpy).toHaveBeenCalledTimes(1)

        expect(inputSpy).not.toHaveBeenCalled()
        inputEl.value = text
        let inputEvent = triggerEvent(inputEl, 'input')
        await nextTick()
        expect(basicVm.currentValue).toBe(text)
        expect(app.basicValue).toBe(text)
        expect(inputSpy).toHaveBeenCalledTimes(1)
        expect(inputSpy).toHaveBeenCalledWith(text, inputEvent)

        expect(blurSpy).not.toHaveBeenCalled()
        inputEl.blur()
        await nextTick()
        expect(blurSpy).toHaveBeenCalledTimes(1)

        expect(changeSpy).not.toHaveBeenCalled()
        let changeEvent = triggerEvent(inputEl, 'change')
        await nextTick()
        expect(changeSpy).toHaveBeenCalledTimes(1)
        expect(changeSpy).toHaveBeenCalledWith(text, changeEvent)
    })

    it('should be disabled when prop isDisabled set to \'true\'', async () => {
        const { app: {$refs} } = window
        const {disabledVm} = $refs
        const disabledInputEl = disabledVm.$el.querySelector('input')

        await nextTick()
        expect(disabledInputEl).toHaveProperty('disabled', true)
    })

    it('should be readonly', async () => {
        const { app: {$refs: {readonlyVm}} } = window
        const readonlyInputEl = readonlyVm.$el.querySelector('input')

        expect(readonlyInputEl).toHaveProperty('readOnly', true)
    })

    it('has prefix & suffix icon', async () => {
        const { app: {$refs: {iconVm}} } = window

        const prefixIconEl = iconVm.$el.querySelector('.jad-input-prefix-icon .jad-icon')
        const suffixIconEl = iconVm.$el.querySelector('.jad-input-suffix-icon .jad-icon')
        expect(prefixIconEl.className).toContain('jad-icon-home')
        expect(suffixIconEl.className).toContain('jad-icon-home')

        const prefixSpy = jest.fn()
        const suffixSpy = jest.fn()
        iconVm.$on('on-prefix-icon-click', prefixSpy)
        iconVm.$on('on-suffix-icon-click', suffixSpy)
        prefixIconEl.click()
        suffixIconEl.click()

        expect(prefixSpy).toHaveBeenCalledTimes(1)
        expect(suffixSpy).toHaveBeenCalledTimes(1)

        app.iconVmDisabled = true
        await nextTick()

        prefixIconEl.click()
        suffixIconEl.click()

        expect(prefixSpy).toHaveBeenCalledTimes(1)
        expect(suffixSpy).toHaveBeenCalledTimes(1)
    })

    it('should have correct length', async () => {
        const { app: {$refs: {lengthVm}} } = window

        app.length = 'short'
        await nextTick()
        expect(lengthVm.$el.className).toContain('jad-input-wrapper-length-short')

        app.length = 'medium'
        await nextTick()
        expect(lengthVm.$el.className).toContain('jad-input-wrapper-length-medium')

        app.length = 'long'
        await nextTick()
        expect(lengthVm.$el.className).toContain('jad-input-wrapper-length-long')
    })

    it('should have correct size', async () => {
        const { app: {$refs: {sizeVm}} } = window

        app.size = 'small'
        await nextTick()
        expect(sizeVm.$el.className).toContain('jad-input-wrapper-size-small')

        app.size = 'medium'
        await nextTick()
        expect(sizeVm.$el.className).toContain('jad-input-wrapper-size-medium')

        app.size = 'large'
        await nextTick()
        expect(sizeVm.$el.className).toContain('jad-input-wrapper-size-large')
    })

    it('is clearable', async () => {
        const { app: {$refs: {clearableVm}} } = window

        expect(clearableVm.currentValue).toBe('is clearable')
        expect(clearableVm.$el.querySelector('input').value).toBe('is clearable')

        clearableVm.$el.querySelector('.jad-input-icon-clearable').click()
        await nextTick()

        expect(clearableVm.currentValue).toBe('')
        expect(clearableVm.$el.querySelector('input').value).toBe('')

        app.clearableValue = 'is clearable'
        app.clearableDisabled = true
        await nextTick()

        clearableVm.$el.querySelector('.jad-input-icon-clearable').click()
        await nextTick()

        expect(clearableVm.currentValue).toBe('is clearable')
        expect(clearableVm.$el.querySelector('input').value).toBe('is clearable')
    })

    it('can auto focus', async () => {
        const { app: {$refs: {focusVm}} } = window

        const focusSpy = jest.fn()
        focusVm.$on('on-focus', focusSpy)
        app.$set(app, 'isFocus', true)
        await nextTick()
        expect(focusSpy).toHaveBeenCalledTimes(1)

        app.$set(app, 'isFocus', false)
        await nextTick()
        expect(focusSpy).toHaveBeenCalledTimes(1)
    })

    it('shows prepend & append', async () => {
        const { app: {$refs: {pendVm}} } = window

        const prependEl = pendVm.$el.querySelector('.jad-input-prepend')
        const appendEl = pendVm.$el.querySelector('.jad-input-append')
        expect(prependEl.innerHTML).toBe('Account')
        expect(appendEl.innerHTML).toBe('@jd.com')
    })

    it('has precast styles', async () => {
        const { app: {$refs: {precastVm}} } = window
        let suffixIconEl
        let innerEl

        app.precast = 'error'
        await nextTick()
        suffixIconEl = precastVm.$el.querySelector('.jad-input-suffix-icon')
        innerEl = precastVm.$el.querySelector('.jad-input-inner')
        expect(suffixIconEl.className).toContain('jad-input-icon-error')
        expect(suffixIconEl.querySelector('.jad-icon').className).toContain('jad-icon-notice')
        expect(innerEl.className).toContain('jad-input-inner-error')

        app.precast = 'success'
        await nextTick()
        suffixIconEl = precastVm.$el.querySelector('.jad-input-suffix-icon')
        innerEl = precastVm.$el.querySelector('.jad-input-inner')
        expect(suffixIconEl.className).toContain('jad-input-icon-success')
        expect(suffixIconEl.querySelector('.jad-icon').className).toContain('jad-icon-checkmark')
        expect(innerEl.className).toContain('jad-input-inner-success')

        app.precast = 'search'
        await nextTick()
        suffixIconEl = precastVm.$el.querySelector('.jad-input-suffix-icon')
        innerEl = precastVm.$el.querySelector('.jad-input-inner')
        expect(suffixIconEl.querySelector('.jad-icon').className).toContain('jad-icon-search')
        const searchSpy = jest.fn()
        const suffixSpy = jest.fn()
        precastVm.$on('on-search', searchSpy)
        precastVm.$on('on-suffix-icon-click', suffixSpy)
        suffixIconEl.click()
        await nextTick()
        expect(searchSpy).toHaveBeenCalledTimes(1)
        expect(suffixSpy).not.toHaveBeenCalled()
    })

    it('can set custom classname', async () => {
        const { app: {$refs: {classnameVm}} } = window

        expect(classnameVm.$el.className).toMatch(/custom-class$/)
    })

    it('filters input content', async () => {
        const { app: {$refs: {filterVm}} } = window
        const inputEl = filterVm.$el.querySelector('input')

        inputEl.value = 'test'
        triggerEvent(inputEl, 'input')
        await nextTick()
        expect(filterVm.currentValue).toBe('test')
        inputEl.value = 'test '
        triggerEvent(inputEl, 'input')
        await nextTick()
        expect(app.filterValue).toBe('test')
        expect(filterVm.currentValue).toBe('test')
        expect(inputEl.value).toBe('test')

        inputEl.value = '123'
        triggerEvent(inputEl, 'input')
        await nextTick()
        expect(app.filterValue).toBe('321')
        expect(filterVm.currentValue).toBe('321')
        expect(inputEl.value).toBe('321')

        inputEl.value = '123'
        triggerEvent(inputEl, 'input')
    })

    it('can set to textarea type', async () => {
        const { app: {$refs: {textareaVm}} } = window
        const textareaEl = textareaVm.$el.querySelector('.jad-input')

        expect(textareaEl.className).toContain('jad-input-textarea')

        textareaEl.value = 'textarea'
        triggerEvent(textareaEl, 'input')
        await nextTick()
        expect(textareaVm.currentValue).toBe('textarea')
    })

    it('can set to textarea type', async () => {
        const { app: {$refs: {rowTextareaVm}} } = window
        const textareaEl = rowTextareaVm.$el.querySelector('.jad-input')

        expect(textareaEl.rows).toBe(3)
        expect(rowTextareaVm.rowsCount).toBe(3)

        app.textRows = {min: 4}
        await nextTick()
        expect(textareaEl.rows).toBe(4)
        expect(rowTextareaVm.rowsCount).toBe(4)
    })

    it('can autosize when textarea is autosized', async () => {
        const { app: {$refs: {autosizeTextareaVm}} } = window
        const textareaEl = autosizeTextareaVm.$el.querySelector('.jad-input')
        expect(autosizeTextareaVm.rowsObj).toEqual(expect.objectContaining({
            min: null,
            max: null
        }))
        // mock getBoundingClientRect function to continue
        // details in https: //stackoverflow.com/questions/38656541/change-element-size-using-jest
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 228,
                height: 216,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        })
        Object.defineProperty(Element.prototype, 'scrollHeight', {
            get() {
                return 216
            }
        })

        textareaEl.value = 'textarea\ncan\nautosize\nwhen\nisAutosize\nis\nset\nto\ntrue'
        triggerEvent(textareaEl, 'input')
        await nextTick()
        expect(autosizeTextareaVm.textareaStyle.height).toEqual('216px')

        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 228,
                height: 48,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        })
        Object.defineProperty(Element.prototype, 'scrollHeight', {
            get() {
                return 0
            }
        })
        app.textareaValue = ''
        await nextTick()
        expect(autosizeTextareaVm.textareaStyle.height).toEqual('48px')
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        })
        Object.defineProperty(Element.prototype, 'scrollHeight', {
            get() {
                return 0
            }
        })
    })

    it('autosize in limit rows', async () => {
        const { app: {$refs: {autosizeRowTextareaVm}} } = window

        app.rows = {
            min: 3,
            max: 6
        }
        await nextTick()
        expect(autosizeRowTextareaVm.rowsObj).toEqual(expect.objectContaining({
            min: 3,
            max: 6
        }))
        expect(autosizeRowTextareaVm.rowsCount).toBe(null)

        app.rows = 5
        await nextTick()
        expect(autosizeRowTextareaVm.rowsObj).toEqual(expect.objectContaining({
            min: 5,
            max: null
        }))

        app.rows = {
            min: -1,
            max: -1
        }
        await nextTick()
        expect(autosizeRowTextareaVm.rowsObj).toEqual(expect.objectContaining({
            min: null,
            max: null
        }))
    })

    it('can drag and resize', async () => {
        const { app: {$refs: {resizeTextareaVm}} } = window
        const textareaEl = resizeTextareaVm.$el.querySelector('.jad-input-textarea')

        expect(textareaEl.className).toContain('jad-input-textarea-resizable')
    })

    it('can set to other types', async () => {
        const { app: {$refs: {typesVm}} } = window
        let types = ['', 'color', 'date', 'datetime-local', 'month', 'number', 'password', 'time', 'week', 'text', 'textarea']
        for (let type of types) {
            app.inputType = type
            await nextTick()
        }
    })
})
/*eslint-disable */