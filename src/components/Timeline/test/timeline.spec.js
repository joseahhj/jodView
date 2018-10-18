/*eslint-disable */
import {loadFixture, testVM, setData, nextTick} from '../../../../tests/utils'

/**
 * Steps functionality to test:
 * - Props: [ step, status, direction ]
 */
const variants = ['error', 'process', 'finish']

const stepsRefs = variants.reduce(
    (memo, variant) => memo.concat(
        {
            variant,
            ref: `steps${variant ? `_${variant}` : ''}`
        }
    ),
    []
)

describe('steps', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'steps'))
    //判断是否渲染完
    testVM()
})
/*eslint-disable */