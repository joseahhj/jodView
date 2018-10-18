/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils'

const types = ['info', 'success', 'warn', 'error'];

const alertRefs = types.reduce(
    (first, variant) =>
    first.concat({
            variant,
            ref: `alert${variant ? `-${variant}` : ''}`
    }), []
)

describe('alert', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'alert'))
    //判断是否渲染完
    testVM()

    it ('should have all classes', async () => {
        const {app: {$refs}} = window
        alertRefs.forEach(({ ref, variant}) => {
            const vm = $refs[ref][0]
            let classList = ['jad-alert', `jad-alert-${variant}`]
            expect(vm).toHaveAllClasses(classList)
        })
    })
    it ('should can be closed when prop isClosable is seted true', async () => {
        const {app: {$refs}} = window
        let closeVM = $refs.alert_close.$el.lastChild;
        expect(closeVM).toHaveClass('jad-alert-close')
    })
    it ('should emit onClose event when close', async () => {
        const {app: {$refs} } = window
        const alert = $refs.alert_close_emit
        const spy = jest.fn()
        // alert.$el.lastChild.addEventListener('on-close', spy)
        alert.$on('on-close', spy)
        alert.$el.lastChild.click()
        await nextTick()
        expect(spy).toHaveBeenCalled()
    })
    it ('should have icon when prop isShowIcon is seted true', async () => {
        const {app: {$refs}} = window
        let iconVm = $refs.alert_icon.$el.firstChild;
        expect(iconVm).toHaveClass('jad-alert-icon')
    })
    it ('should have descripe message when prop desc is seted', async () => {
        const {app} = window 
        await setData(app, 'descInfo', 'I am some descripe message')
        await nextTick()
        expect(app.descInfo).toBe('I am some descripe message')
    })
    it ('should be on one line when isNowrap is seted for too much content', async () => {
        const {app: {$refs}} = window;
        let alertVm = $refs.alert_nowrap.$el;
        expect(alertVm).toHaveClass('jad-alert-nowrap')
    }) 
})