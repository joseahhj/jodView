/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick,
    triggerClick,
    triggerEvent,
    triggerKeyDown,
    sleep
} from '../../../../tests/utils'
describe('select', async() => {
        beforeEach(loadFixture(__dirname, 'select'))
        testVM()

        it('basic should contain base class', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            expect($refs.basic).toHaveClass('jad-select')
        });
        it('Snapshot has the expected html structure', () => {
            const {
                app
            } = window
            expect(app.$el).toMatchSnapshot()
        });
        it('renders correctly with defaultValue single selected', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.defaultSelect;
            expect(dropdown.currentValue).toBe('banana');
            expect(dropdown.valueArray).toHaveLength(1);
        });
        it('renders correctly with defaultValue multi selected', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.defaultMilt;
            expect(dropdown.currentValue).toEqual(
                expect.arrayContaining(["banana", "grape"])
            );
            expect(dropdown.valueArray).toHaveLength(2);
        });
        it('trigger is click', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.trigger_click;
            let dropdownElm = dropdown.$el.children[0];

            const spy = jest.fn()
            dropdownElm.addEventListener('click', spy)
            dropdownElm.click()
            expect(dropdown.isShow).toBe(true);
            expect(spy).toHaveBeenCalled()
        });
        it('group_single, renders correctly with select group', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.groupSingle;
            let dropdownElm = dropdown.$el.children[0];
            let dropdownElmItem = document.querySelector('.group_single_test .jad-select-ul-bd').querySelectorAll('.jad-dropdown-item');
            triggerEvent(dropdownElm, 'click');
            expect(dropdown.isShow).toBe(true);
            triggerEvent(dropdownElmItem[0], 'click');
            expect(dropdown.valueArray).toHaveLength(1);
            expect(dropdown.valueArray[0].label).toBe('梁平');
        })
        it('group_multi, renders correctly with select all', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdownGroup = $refs.groupMulti;
            let dropdownGroupElm = dropdownGroup.$el.children[0];
            let checkAllGroup = document.querySelector('.group_multi_test .jad-select-multi-all')
            dropdownGroupElm.click()
            expect(dropdownGroup.isShow).toBe(true);
            triggerEvent(checkAllGroup, 'click');
            expect(dropdownGroup.valueArray).toHaveLength(2);
            expect(dropdownGroup.valueArray[0].label).toBe('梁平');
        })
        it('type is input and multiple, renders correctly with isSearch and isExtra', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.search_multiple_input;
            let dropdownElm = dropdown.$el.children[0];
            let dropdownElmInput = dropdownElm.querySelector('input');
            let dropdownElmClear = dropdownElm.querySelector('.jad-select-input-clear');
            triggerEvent(dropdownElm, 'click');
            triggerEvent(dropdownElmInput, 'focus')
            dropdownElmInput.value = "abc"
            triggerEvent(dropdownElmInput, 'input')
            expect(dropdown.isShow).toBe(true);
            triggerKeyDown(dropdownElmInput, 13)
            expect(dropdown.valueArray).toHaveLength(3);
            expect(dropdown.valueArray).toEqual(
                expect.arrayContaining([{
                    "isExtra": true,
                    "value": "abc",
                    "label": "abc"
                }]),
            )
            await dropdown.$set(dropdown, 'searchText', 'a')
                //清除input
            triggerEvent(dropdownElm, 'mouseenter')
            triggerEvent(dropdownElmClear, 'click')
            expect(dropdown.valueArray).toHaveLength(0);


        })
        it('type is input and remote_select, renders correctly with search remote', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.remote_select;
            let dropdownElm = dropdown.$el.children[0];
            let dropdownElmInput = dropdownElm.querySelector('input');
            triggerEvent(dropdownElm, 'click');
            await dropdown.$set(dropdown, 'searchText', 'a')
            sleep(300)
            expect(dropdown.searchText).toBe('a');
            expect(app.remoteOption).toHaveLength(36);
            dropdown.$set(dropdown, 'searchText', 'l')
            let dropdownElmLi = document.querySelector('.remote_select_test .jad-select-ul-bd').querySelectorAll('li')
            triggerEvent(dropdownElmLi[2], 'click')
            expect(dropdown.valueArray).toHaveLength(1);
            dropdown.$set(dropdown, 'searchText', 'al')
            expect(dropdown.searchText).toBe('al');
            triggerEvent(dropdownElm, 'click');
            expect(dropdown.isShow).toBe(true);

        })
        it('filter_method, renders correctly with search filter', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.filter_method;
            let dropdownElm = dropdown.$el.children[0];
            let dropdownElmInput = dropdownElm.querySelector('input');
            triggerEvent(dropdownElm, 'click');
            await dropdown.$set(dropdown, 'searchText', 'H')
            expect(dropdown.searchText).toBe('H');
            expect(dropdown.filterOptions).toHaveLength(3);
            dropdown.$set(dropdown, 'searchText', 'HN')
            expect(dropdown.filterOptions).toHaveLength(2);

        })
        it('type is input and single, renders correctly with isSearch and isExtra', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.search_input;
            let dropdownElm = dropdown.$el.children[0];
            let dropdownElmInput = dropdownElm.querySelector('input');
            let dropdownElmClear = dropdownElm.querySelector('.jad-select-input-clear');
            triggerEvent(dropdownElm, 'click');
            dropdownElmInput.focus()
            dropdownElmInput.value = "rr"
            triggerEvent(dropdownElmInput, 'input')
            expect(dropdown.isShow).toBe(true);
            triggerKeyDown(dropdownElmInput, 13)
            expect(dropdown.valueArray[0].label).toBe('rr');
            dropdownElmInput.blur()
            await nextTick()
            dropdownElmInput.focus()
            let allLi = document.querySelector('.search_input_test').querySelectorAll('.jad-dropdown-item')
            await triggerEvent(allLi[5], 'mouseenter')
            let customLi = allLi[5].querySelector('.jad-select-extra-icon')
            triggerEvent(customLi, 'click')
                //清除input
            triggerEvent(dropdownElm, 'mouseenter')
            triggerEvent(dropdownElmClear, 'click')
            expect(dropdown.valueArray).toHaveLength(0);

        })
        it('select-single-item && disabled click', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.basic;
            let dropdownElm = dropdown.$el.children[0];
            let dropdownItem = document.querySelector('.basic_test .jad-select-ul-bd').querySelectorAll('li')

            dropdownElm.click()
            expect(dropdown.isShow).toBe(true);
            triggerEvent(dropdownItem[0], 'click')
            triggerEvent(dropdownItem[1], 'click')
            await expect(dropdown.valueArray).toHaveLength(1);
            expect(dropdownItem[0]).toHaveClass('jad-dropdown-item-disabled')
            expect(dropdownItem[1]).toHaveClass('jad-dropdown-item-selected')
        });
        it('select-multi-item', async() => {
            const {
                app: {
                    $refs
                }
            } = window
            let dropdown = $refs.selectMilt;
            let dropdownElm = dropdown.$el.children[0];
            let dropdownItem = document.querySelector('.select_multi_test .jad-select-ul-multi').querySelectorAll('li');
            let firstChild = dropdownItem[2];
            let secondChild = dropdownItem[4];
            let checkAll = document.querySelector('.select_multi_test .jad-select-multi-all')
            await dropdownElm.click();
            // await nextTick();
            expect(dropdown.isShow).toBe(true)
                //多选选中
            triggerEvent(firstChild, 'click');
            expect(dropdown.valueArray).toHaveLength(1);
            triggerEvent(secondChild, 'click');
            expect(dropdown.valueArray).toHaveLength(2);
            expect(dropdown.isShow).toBe(true)
            await nextTick();
            expect(firstChild).toHaveClass('jad-multi-item-selected')
            expect(secondChild).toHaveClass('jad-multi-item-selected')
                //多选删除
            triggerEvent(firstChild, 'click');
            expect(dropdown.valueArray).toHaveLength(1);
            triggerEvent(secondChild, 'click');
            expect(dropdown.valueArray).toHaveLength(0);
            checkAll.click()
            expect(dropdown.valueArray).toHaveLength(4);
            checkAll.click()
                //tag删除一个
            checkAll.click()
            let tagClear = dropdownElm.querySelector('.jad-label .jad-icon-cancel4')
            triggerEvent(tagClear, 'click');
            expect(dropdown.valueArray).toHaveLength(3);

            // await nextTick();
        });






    })
    /*eslint-disable */