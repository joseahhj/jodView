/*eslint-disable */
import {loadFixture, testVM, setData, nextTick,sleep} from '../../../../tests/utils'
describe('checkbox', async () => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'checkbox'));
    //判断是否渲染完
    testVM();

    it('basic should contain base class,and has the expected html structure', async () => {
        const {app} = window;
        const basicVm = app.$refs.basic;
        expect(basicVm).toHaveClass('jad-checkbox-wrapper');
        expect(basicVm.$el).toMatchSnapshot();
    })

    it('if it is choosed,it will be hava choose class;or it will not be.',async()=>{
    	const {app} = window;
        const basicVm = app.$refs.basic;
        await setData(app, 'apple', true);
        await nextTick();
        expect(basicVm).toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(true);
        await setData(app, 'apple', false);
        await nextTick();
        expect(basicVm).not.toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).not.toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(false);

    });



    it('value is String,Number,or Boolean',async()=>{
    	const {app} = window;
    	const basicVm = app.$refs.basic;

        await setData(app, 'apple', 'apple');
        await nextTick();
        expect(basicVm).toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(true);
        await setData(app, 'apple', '');
        await nextTick();
        expect(basicVm).not.toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).not.toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(false);
        
        await setData(app, 'apple', 1);
        await nextTick();
        expect(basicVm).toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(true);
        await setData(app, 'apple', 0);
        await nextTick();
        expect(basicVm).not.toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).not.toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(false);

        await setData(app, 'apple', true);
        await nextTick();
        expect(basicVm).toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(true);
        await setData(app, 'apple', false);
        await nextTick();
        expect(basicVm).not.toHaveClass('jad-checkbox-wrapper-checked');
        expect(basicVm.$el.querySelector('.jad-checkbox')).not.toHaveClass('jad-checkbox-checked');
        expect(basicVm.$el.querySelector('input[type=checkbox]').checked).toBe(false);
    })
    
    it('isDisabled is true defined,it is not able to use',async()=>{
    	const {app} = window;
    	const disabledVm = app.$refs.disabled;
    	expect(disabledVm).toHaveAllClasses(['jad-checkbox-wrapper','jad-checkbox-wrapper-disabled']);
    	expect(disabledVm.$el.querySelector('.jad-checkbox')).toHaveClass('jad-checkbox-disabled');
    	expect(disabledVm.$el.querySelector('input[type=checkbox]').disabled).toBe(true);
        const spy = jest.fn();
        disabledVm.$on('on-change', spy);    
        expect(spy).not.toHaveBeenCalled();
        expect(app.apple).toBe(true);
        expect(app.text).toBe('');
    })

    it('checkbox is click,change event is trigger',async()=>{
    	const {app} = window;
    	const changeVm = app.$refs.change;
    	
        let cur = app.apple;
        changeVm.$el.click();
        await sleep(10);
        if(!!cur){
            expect(app.text).toBe(false);
        }else{
            expect(app.text).toBe(true);
        }
        
    })
})
/*eslint-disable */