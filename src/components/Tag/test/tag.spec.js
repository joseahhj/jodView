/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick
} from '../../../../tests/utils'

const variants = [
    'primary', 'success', 'warning', 'error', 'info', 'text', 'dash',
    'outline-primary', 'outline-success', 'outline-warning', 'outline-error', 'outline-info',
    'outline-text',
    'circle', 'rectangle',
    'small', 'medium', 'large'
]



const btnRefs = variants.reduce(
        (memo, variant) =>
        memo.concat({
                variant,
                ref: `tag${variant ? `-${variant}` : ''}`
    }), []
)
describe('tag', async() => {
        beforeEach(loadFixture(__dirname, 'tag'))
        testVM()

        it('should have `type` `size` `shape` classes', async () => {
            const {
                app: {
                    $refs
                }
            } = window

            btnRefs.forEach(({
                ref,
                variant
            }) => {
                const vm = $refs[ref][0]
                let classList = `jad-label-${variant}`
                expect(vm).toHaveClass(classList)
            })
            const vmBlockDisabled = $refs['tag-disabled']
            expect(vmBlockDisabled).toHaveClass('jad-label-disabled')
           
        })
        it('should emit "click" event when isClosable click', async () => {
            const {
                app: {
                    $refs
                }
            } = window
            const labelBtn = $refs.tag_closable
            const spy = jest.fn()
            labelBtn.$el.querySelector('.jad-icon').addEventListener('click', spy)
            labelBtn.$el.querySelector('.jad-icon').click()

            expect(spy).toHaveBeenCalled()
        })
        it('should not emit click event when isClosable and isDisable click', async () => {
            const {
                app: {
                    $refs
                }
            } = window
            const labelBtn = $refs.tag_closable_disabled
            const spy = jest.fn()
            labelBtn.$el.querySelector('.jad-icon').addEventListener('click', spy)
            labelBtn.$el.querySelector('.jad-icon').click()
            expect(labelBtn.isDisabled).toBe(true)
            expect(spy).toHaveBeenCalled()
        })



    })
    /*eslint-disable */