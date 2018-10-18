/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick
} from '../../../../tests/utils'


function computeBkPtClass(type, breakpoint, val) {
    let className = type
    if (val === false || val === null || val === undefined) {
        return undefined
    }
    if (breakpoint) {
        className += `-${breakpoint}`
    }
    if (type === 'jad-col' && (val === '' || val === true)) {
        // .col-md
        return className.toLowerCase()
    }
    // .order-md-6
    className += `-${val}`
    return className.toLowerCase()
}
describe('grid', async() => {
        beforeEach(loadFixture(__dirname, 'grid'))
        testVM()

        it('basic should contain base class', async() => {
            const {
                app: {
                    $refs
                }
            } = window

            expect($refs.basic).toHaveClass('jad-row')
        })
        it("should apply '.jad-col-span-*' class with 'cols' prop", async() => {
            const {
                $refs
            } = window.app
            $refs.cols.forEach((vnode, i) => {
                const size = i + 1
                expect(vnode).toHaveClass(`jad-col-span-${size}`)

            })
        })

        it("should apply 'detroy' class with destroy", async() => {
            const {
                $refs
            } = window.app
            window.app.$destroy()
        })
        it('renders correctly with different `gutter` props', async() => {
            const {
                app
            } = window
            const vm = app.$refs.gutter_change

            await setData(app, 'gutter', 10)
            await nextTick()
                //vm.updateGutter(vm.gutter)
            expect(vm.gutter).toBe(10)
        })

        it('computeBkPtClass helper should compute boolean classes', async() => {
            expect(computeBkPtClass('jad-col', 'sm', true)).toBe('jad-col-sm')
            expect(computeBkPtClass('jad-col', 'md', true)).toBe('jad-col-md')
            expect(computeBkPtClass('jad-col', 'lg', true)).toBe('jad-col-lg')
            expect(computeBkPtClass('jad-col', 'xl', true)).toBe('jad-col-xl')
        })

        it('computeBkPtClass helper should compute boolean classes when given empty string', async() => {
            expect(computeBkPtClass('jad-col', 'sm', '')).toBe('jad-col-sm')
            expect(computeBkPtClass('jad-col', 'md', '')).toBe('jad-col-md')
            expect(computeBkPtClass('jad-col', 'lg', '')).toBe('jad-col-lg')
            expect(computeBkPtClass('jad-col', 'xl', '')).toBe('jad-col-xl')
        })

        it("computeBkPtClass helper should NOT compute boolean classes when value 'false' (return 'undefined')", async() => {
            expect(computeBkPtClass('col', 'sm', false)).toBe(undefined)
            expect(computeBkPtClass('col', 'md', false)).toBe(undefined)
            expect(computeBkPtClass('col', 'lg', false)).toBe(undefined)
            expect(computeBkPtClass('col', 'xl', false)).toBe(undefined)
        })

    })
    /*eslint-disable */