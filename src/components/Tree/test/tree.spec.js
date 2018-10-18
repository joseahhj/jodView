/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils'

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

describe('switch', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'switch'))
    //判断是否渲染完
    testVM()

    it('should contain class names', async () => {
        const {app: {$refs}} = window

        switchRefs.forEach(({ ref, variant}) => {
            const vm = $refs[ref][0]
            let classList = ['jad-switch', `jad-switch-${variant}`]
            expect(vm).toHaveAllClasses(classList)
        })
    })
    it('renders correctly with different props', async () => {
        const { app } = window
        const vm = app.$refs.switch_disabled
        expect(vm.$el.classList).toContain('jad-switch-disabled')
    })
})
/*eslint-disable */