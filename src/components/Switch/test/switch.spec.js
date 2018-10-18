/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick,
    triggerClick,
    triggerEvent,
    triggerKeyDown,
    sleep
} from '../../../../tests/utils'

/**
 * Switch functionality to test:
 * - Sizes: [ 'small','','large' ]
 * - Props: [ disabled ]
 */
const variants = ['small', 'large']

const switchRefs = variants.reduce(
        (memo, variant) => memo.concat({
                variant,
                ref: `switch${variant ? `-${variant}` : ''}`
        }
    ),
    []
)

describe('switch', async() => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'switch'))
    //判断是否渲染完
    testVM()

    it('basic should contain base class', async() => {
        const {
            app: {
                $refs
            }
        } = window
        expect($refs.basic).toHaveClass('jad-switch')
    });
    it('diffrent size should contain relative class names', async () => {
        const {
            app: {
                $refs
            }
        } = window

        switchRefs.forEach(({ref, variant}) => {
            const vm = $refs[ref][0]
            let classList = ['jad-switch', `jad-switch-${variant}`]
            expect(vm).toHaveAllClasses(classList)
        })
    })
    it('Snapshot has the expected html structure', () => {
        const {
            app
        } = window
        expect(app.$el).toMatchSnapshot()
    });
    it('trigger is click', async() => {
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.basic
        expect(vm.$el.classList).not.toContain('jad-switch-checked')
        vm.$el.click()
        await nextTick()
        expect(vm.$el.classList).toContain('jad-switch-checked')
    });
    it('status changes when value is changed', async() => {
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.basic
        let vmElm = vm.$el.children[0]
        let watchValue = $refs.watchValue
        expect(watchValue.$el.classList).not.toContain('jad-switch-checked')
        vmElm.click()
        await nextTick()
        expect(watchValue.$el.classList).toContain('jad-switch-checked')
    });
    it('disabled switch does not switch when clicked', async() => {
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.disabled
        let vmElm = vm.$el.children[0]
        expect(vm.$el.classList).toContain('jad-switch-disabled')
        expect(vm.$el.classList).not.toContain('jad-switch-checked')
        vmElm.click()
        await nextTick()
        expect(vm.$el.classList).not.toContain('jad-switch-checked')
    });
    it('customValue', async() => {
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.customValue
        let vmText = $refs.customValueTextTest
        vm.$el.click()
        await nextTick()
        expect(app.$data.customValueText).toBe(app.$data.valueText)
    });
    it('customColor', async() => {
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.customColor
        expect(vm.$el.style._values['background-color']).toBe('blue')
        vm.$el.click()
        await nextTick()
        expect(vm.$el.style._values['background-color']).toBe('red')
    });
    it('customSlot', async() => {
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.customSlot
        expect(vm.$slots.close._rendered).toBe(true)
        vm.$el.click()
        await nextTick()
        expect(vm.$slots.open._rendered).toBe(true)
    });
})
/*eslint-disable */