/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick
} from '../../../../tests/utils'

describe('spin', async() => {
    beforeEach(loadFixture(__dirname, 'spin'))
    testVM()

    it('basic should contain base class', async() => {
        const {
            app: {
                $refs
            }
        } = window

        expect($refs.basic).toHaveClass('jad-spinner')
    })
})
/*eslint-disable */