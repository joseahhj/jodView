/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick
} from '../../../../tests/utils'
describe('badge', async () => {
    beforeEach(loadFixture(__dirname, 'badge'))
    testVM()

    it('basic should contain base class', async () => {
        const {app} = window
        const basicVm = app.$refs.basic

        expect(basicVm).toHaveClass('jad-badge')
        expect(basicVm.$el.querySelector('sup')).toHaveClass('jad-badge-content')
    })

    it('value is number,or String', async () => {
        const {app} = window
        const valueVm = app.$refs.valueContent

        await setData(app, 'value', 66)
        await nextTick()
        expect(valueVm.content).toBe(66)

        await setData(app, 'value', 'new')
        await nextTick()
        expect(valueVm.content).toBe('new')

    })


    it('type is defined,need type class', async () => {
        const {app: {$refs}} = window
        const types = ['success', 'info', 'warn', 'error'];
        types.forEach(function (item) {
            const typeVm = $refs['type' + item]
            expect(typeVm[0].$el.querySelector('sup').className).toContain('jad-badge-' + item)
        })

    })

    it('if slot is default ,should be fixed', async () => {
        const {app} = window
        const fixedVm = app.$refs.fixed

        expect(fixedVm.$el.querySelector('sup')).toHaveClass('jad-badge-fixed')
    })

    it('dot is defined,should be dot', async () => {
        const {app} = window
        const dotVm = app.$refs.dot

        expect(dotVm.$el.querySelector('sup')).toHaveClass('jad-badge-dot')
    })

    it('value is larger max,dispaly max+', async () => {
        const {app} = window
        const maxVm = app.$refs.max
        await setData(app, 'value', 1000)
        await setData(app, 'max', 999)
        await nextTick()
        expect(maxVm.content).toBe('999+')

        await setData(app, 'value', 998)
        await setData(app, 'max', 999)
        await nextTick()
        expect(maxVm.content).toBe(998)
    })

    it('define class name', async ()=>{
        const {app} = window;
        
        const classVm = app.$refs.defineClass
        const className = classVm.className
        expect(classVm.$el.querySelector('sup')).toHaveClass(className)
        

    })

    it('size is defined , default is large', async ()=>{
        const {app} = window
        const sizeVm = app.$refs.size
        expect(sizeVm.$el.querySelector('sup')).toHaveClass('jad-badge-large')

        await setData(app, 'size', 'small')
        await nextTick()
        expect(sizeVm.$el.querySelector('sup')).toHaveClass('jad-badge-small')

    })

    it('is-visible is false ,badge is hidden', async ()=>{
        const {app} = window
        const showVm = app.$refs.show
        expect(showVm.isVisible).toBe(false)

        await setData(app, 'show', true)
        await nextTick()
        expect(showVm.isVisible).toBe(true)
        
    })
})
/*eslint-disable */