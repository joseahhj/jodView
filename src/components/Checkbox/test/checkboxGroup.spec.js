/*eslint-disable */
import { loadFixture, testVM, setData, nextTick, sleep } from '../../../../tests/utils'
import {findComponentsDownward} from '../../../utils/assist.js'
describe('checkboxGroup', async() => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'checkboxGroup'))
    //判断是否渲染完
    testVM()

    it('basic should contain base class', async() => {
        const { app } = window;
        const basicVm = app.$refs.basic;
        expect(basicVm).toHaveClass('jad-checkbox-group')
    })


    it('label is defined  combined and singled,its value is the content of its label', async() => {
        const { app } = window;

        const singleVm = app.$refs.single;
        expect(singleVm.$el.querySelector('input[type=checkbox]').value).toEqual('apple');

        const basicVm = app.$refs.basic;
        const checkboxs = basicVm.$el.getElementsByClassName('jad-checkbox-input');
        const labels = [];
        app.list.map(item=>labels.push(item.label));
        Array.from(checkboxs).forEach(item => {
            expect(labels).toContain(item.value);
        })
    })

    it('change event is trigger,value is changed', async() => {
        const { app } = window;
        const basicVm = app.$refs.basic;

        const checkboxs = basicVm.$children.filter(item => item.$options.name === 'Checkbox')


        let len = app.fruit.length,
        	fruits = [];

        const index = Math.floor(Math.random() * 3),
            target = checkboxs[index];

        target.$el.click();
        await sleep(1000);
        target.$el.querySelector('input[type=checkbox]').checked ? len++ : len--;
        expect(app.fruit).toHaveLength(len);
        
        checkboxs.forEach(item => {
            const itemEle = item.$el.querySelector('input[type=checkbox]');
            if (itemEle.checked) {
                fruits.push(itemEle.value);
            }
        });

        expect(fruits.sort().join(',')).toEqual(app.fruit.sort().join(','));

    })

    it('indeterminate is defined,it is represented to be half selected;and all can be  selected,also all can not be selected;',async()=>{
    	const { app } = window;
        const basicVm = app.$refs.basic;
        const indeterminateVm = app.$refs.indeterminate;
    	const indeterminate = app.indeterminate;
        const listLength = app.list.length;
    	if(indeterminate){
    		expect(indeterminateVm.$el.querySelector('.jad-checkbox')).toHaveClass('jad-checkbox-indeterminate');
    		indeterminateVm.$el.click();
    		await sleep(1000);
    		expect(app.checkAll).toBe(false);
    		expect(app.fruit).toHaveLength(0);
    		expect(app.indeterminate).toBe(false);
    		expect(indeterminateVm.$el.querySelector('.jad-checkbox')).not.toHaveClass('jad-checkbox-indeterminate');
    	}

        indeterminateVm.$el.click();

        await sleep(1000);
        expect(app.checkAll).toBe(true);
        expect(app.fruit).toHaveLength(listLength);
        
    })

    // it('checkboxGroup props value',async()=>{
    //     const { app } = window;
    //     const basicVm = app.$refs.basic;
    //     const fruit = ['apple', 'banana'];
    //     await setData(app, 'fruit', fruit);
    //     await nextTick();
        
    //     basicVm.$children.forEach(item=>{
    //         if(item.$options.name==='Checkbox' && fruit.indexOf(item.label)>-1){
    //             expect(item.$el.classList.value).toContain('jad-checkbox-wrapper-checked');
    //             expect(item.$el.querySelector('.jad-checkbox')).toHaveClass('jad-checkbox-checked');
    //         } 

    //         item.$options.name==='Checkbox' && expect(item.group).toBe(true);

    //     })
    // })

    // it('checkboxGroup value is empty array defautly',async()=>{
    //     const {app} = window;
    //     const {checkboxGroup,checkboxItem2,checkboxItem1} = app.$refs;
    //     expect(checkboxGroup.value).toHaveLength(0);
    //     expect(checkboxItem1.$el.classList.value).not.toContain('jad-checkbox-wrapper-checked');
    //     expect(checkboxItem2.$el.classList.value).not.toContain('jad-checkbox-wrapper-checked');
    //     let childrens = findComponentsDownward(checkboxGroup, 'Checkbox');
    //     expect(childrens.length).toBeTruthy();
    //     expect(checkboxItem2.group).toBe(true);
    //     expect(checkboxItem1.group).toBe(true);
                       
    // })

})
/*eslint-disable */