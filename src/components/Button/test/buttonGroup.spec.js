/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils'


describe('buttonGroup', async() => {
    beforeEach(loadFixture(__dirname, 'buttonGroup'))
    testVM()

    it('basic should contain base class', async() => {
        const {
            app: {
                $refs
            }
        } = window

        expect($refs.basic).toHaveClass('jad-btn-group')
    })

    it('should apply vertical class', async() => {
        const {
            app: {
                $refs
            }
        } = window

        expect($refs.vertical).toHaveClass('jad-btn-group-vertical')
    })

    it('should apply size class', async() => {
        const {
            app: {
                $refs
            }
        } = window

        expect($refs.size).toHaveClass('jad-btn-group-large')
    })
    it('should apply block class', async() => {
        const {
            app: {
                $refs
            }
        } = window

        expect($refs.block).toHaveClass('jad-btn-group-block')
    })
    it('should apply shape class', async() => {
        const {
            app: {
                $refs
            }
        } = window

        expect($refs.shape).toHaveClass('jad-btn-group-circle')
    })
})

/*eslint-disable */