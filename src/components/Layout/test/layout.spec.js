/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick
} from '../../../../tests/utils'
describe('layout', async() => {
        beforeEach(loadFixture(__dirname, 'layout'))
        testVM()

        it('basic should contain base class', async() => {
            const {
                app: {
                    $refs
                }
            } = window

            expect($refs.basic).toHaveClass('jad-layout')
        })

        // it('should apply type class', async () => {
        //     const {
        //         app: {
        //             $refs
        //         }
        //     } = window

        //     expect($refs.type).toHaveClass('jad-icon-pencil')
        // })
        // it('renders `fontsize``color` with different props', async () => {
        //     const {
        //         app
        //     } = window
        //     // const vm = app.$refs.btn_pressed

        //     await setData(app, 'fontsize', '18')
        //     await setData(app, 'color', 'red')
        //     await nextTick()
        //     expect(app.fontsize).toBe('18')
        //     expect(app.color).toBe('red')
        // })

    })
    /*eslint-disable */