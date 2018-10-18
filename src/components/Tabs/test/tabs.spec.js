/*eslint-disable */
import { loadFixture, testVM, setData, nextTick } from '../../../../tests/utils'


describe('tabs', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'tabs'))
    //判断是否渲染完
    testVM()
    it ('should contain basic class', async () => {
        let {app: { $refs }} = window
        let el = $refs.tab_basic.$el
        let cardEl = $refs.tab_card.$el
        expect(el).toHaveClass('jad-tabs')
        expect(el).not.toHaveClass('jad-tabs-card')
        expect(cardEl).toHaveClass('jad-tabs-card')
        let sonNum = el.children.length
        expect(sonNum).toBe(2)
        let tabNode = el.querySelectorAll('.jad-tabs-nav-tab')
        expect(tabNode[2].firstChild).toHaveClass('jad-icon')
        let paneNode = el.querySelectorAll('.jad-tabspane')
        expect(tabNode[0]).toHaveClass('jad-tabs-nav-tab-active')
        tabNode[1].click()
        await nextTick()
        expect(paneNode[1].style.display).toBe('')
        expect(tabNode[0]).not.toHaveClass('jad-tabs-nav-tab-active')
        expect(tabNode[1]).toHaveClass('jad-tabs-nav-tab-active')
    })
    it ('should be disabled when some tab is seted isDisabled', async () => {
        const {app: { $refs }} = window
        let tabNodeList = $refs.tab_disable.$el.querySelectorAll('.jad-tabs-nav-tab')
        expect(tabNodeList[1]).toHaveClass('jad-tabs-nav-tab-disable')
        tabNodeList[1].click()
        await nextTick()
        expect(tabNodeList[1]).not.toHaveClass('jad-tabs-nav-tab-active')
    })
    it ('should custom nav class when className is seted for card type', async () => {
        const {app: { $refs }} = window
        let barNode = $refs.tab_custom.$el.querySelector('.jad-tabs-bar')
        expect(barNode).toHaveClass('custom-class')
    })
    it ('should custom nav height when tabHeight is seted', async () => {
        const {app: { $refs }} = window
        let scrollNode = $refs.tab_height.$el.querySelector('.jad-tabs-nav-scroll')
        expect(scrollNode.style.height).toBe('80px')
        expect(scrollNode.style.lineHeight).toBe('80px')
    })
    it ('should add tabs when slot add is seted', async () => {
        const {app: { $refs }} = window
        let el = $refs.tab_add.$el
        let prevNode = el.getElementsByClassName('jad-tabs-nav-prev')
        let nextNode = el.getElementsByClassName('jad-tabs-nav-next')
        let tabNodeList = el.getElementsByClassName('jad-tabs-nav-tab')
        let addNode = el.querySelector('.jad-icon-plus2')
        expect(prevNode.length).toBe(0)
        expect(nextNode.length).toBe(0)
        expect(tabNodeList.length).toBe(3)
        addNode.click()
        await nextTick()
        expect(tabNodeList.length).toBe(4)
        addNode.click()
        await nextTick()
        expect(tabNodeList.length).toBe(5)
    })
    it ('should trigger event onClick when change tab', async () => {
        const {app: {$refs}} = window
        const basicVm = $refs.tab_basic
        const tabEl = basicVm.$el.querySelectorAll('.jad-tabs-nav-tab')
        const clickSpy = jest.fn(() => {})
        basicVm.$on('on-click', clickSpy)
        tabEl[1].click()
        await nextTick()
        expect(clickSpy).toHaveBeenCalled()
    })
    it ('should be one content dom node', async () => {
        const {app: {$refs}} = window
        let node = $refs.tab_dynamic.$el.lastChild
        let pNode = node.getElementsByTagName('p')
        expect(pNode.length).toBe(1)
    })
})
/*eslint-disable */