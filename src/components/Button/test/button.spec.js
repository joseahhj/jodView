/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils'

/**
 * Button functionality to test:
 * - Style variants: [ 'primary','secondary','success' ]
 * - Sizes: [ 'sm','','lg' ]
 * - Props: [ disabled, block ]
 * - elements: [ <button/>, <a/> ]
 */
const variants = [
        'primary', 'success', 'warning', 'error', 'info', 'text', 'dash',
        'outline-primary', 'outline-success', 'outline-warning', 'outline-error', 'outline-info',
        'outline-text', 'outline-linear', 'outline-linear-red', 'outline-dash',
        'linear-primary', 'linear-success', 'linear-warning', 'linear-error', 'linear-info',
        'linear-text', 'linear-dash', 'linear', 'linear-red',
        'circle', 'rectangle',
        'small', 'medium', 'large'
    ]
    // const outlineVariants = colorVariants.map(v => `outline-${v}`)
    // const variants = colorVariants.concat(outlineVariants, 'link')


const btnRefs = variants.reduce(
        (memo, variant) =>
        memo.concat({
                variant,
                ref: `btn${variant ? `-${variant}` : ''}`
        }),
    []
)

describe('button', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'button'))
    //判断是否渲染完
    testVM()

    it('should have all classes', async () => {
        const {app: {$refs}} = window
        
        btnRefs.forEach(({ ref, variant}) => {
            const vm = $refs[ref][0]
            let classList = ['jad-btn', `jad-btn-${variant}`]
            expect(vm).toHaveAllClasses(classList)
        })

        const vmBlockLoading = $refs['btn_loading']
        expect(vmBlockLoading).toHaveAllClasses(['jad-btn', `jad-btn-loading`])
    })
    
    it('has the expected html structure', () => {
        const { app } = window
        expect(app.$el).toMatchSnapshot()
    })
    it('renders correctly with different props', async () => {
        const { app } = window
        // const vm = app.$refs.btn_pressed

        await setData(app, 'btnText', 'Hello')
        await setData(app, 'icon', 'list')
        await nextTick()
        expect(app.btnText).toBe('Hello')
        expect(app.icon).toBe('list')
    })
    it('should emit "click" event when clicked', async () => {
        const {
            app: {
                $refs
            }
        } = window
        const btn = $refs.btn_click
        const spy = jest.fn()
        btn.$el.addEventListener('click', spy)
        btn.$el.click()

        expect(spy).toHaveBeenCalled()
    })
    it('should be disabled and not emit click event with `disabled` prop true', async () => {
        const {
            app: {
                $refs
            }
        } = window
        const btn = $refs.btn_block_disabled
        const spy = jest.fn()
        btn.$el.addEventListener('click', spy)
        btn.$el.click()
        expect(btn.isDisabled).toBe(true)
        expect(spy).not.toHaveBeenCalled()
    })
    it('should be isLoading and not emit click event with `isLoading` prop true', async () => {
        const {
            app: {
                $refs
            }
        } = window
        const btnLoading = $refs.btn_loading
        const spy = jest.fn()
        btnLoading.$el.addEventListener('click', spy)
        btnLoading.$el.click()
        expect(btnLoading.isLoading).toBe(true)
        // expect(spy).toHaveBeenCalled()
    })
})
/*eslint-disable */