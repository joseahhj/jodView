/*eslint-disable */
import { loadFixture, testVM, setData, nextTick, triggerEvent } from '../../../../tests/utils';
import { findComponentsUpward,findComponentUpward } from '../../../utils/assist.js';
const computedSubMenuItem = (_this) => {
    const subJMenuItems = _this.$children.filter(item => item.$options.name === 'MenuItem');
    const parentSubmenuNum = findComponentsUpward(subJMenuItems[0], 'Submenu', 'Menu').length || 0;
    const expectPaddingLeft = parentSubmenuNum * 12 + 30 + 'px';
    return {
        parentSubmenuNum,
        expectPaddingLeft
    }
}

const menuGroupTest = (menuGroup) => {
 
    menuGroup.$children.forEach(item => {
        item.$options.name === 'Submenu' && item.$children.forEach(_item => {
            if (_item.$options.name !== 'MenuGroup') {
                return;
            }

            const title = _item.title;
            expect(_item.$el.classList.value).toContain('jad-menu-group');
            expect(_item.$parent.$options.name).toBe('Submenu');
            if (title) {
                expect(_item.$el.querySelector('.jad-menu-group-title')).not.toBeNull();
                expect(_item.$el.querySelector('.jad-menu-group-title').innerHTML).toBe(title);
                if (menuGroup.mode === 'vertical'&&findComponentUpward(_item,'Menu')) {
                    const expectItem = computedSubMenuItem(_item);
                    expect(_item.$el.querySelector('.jad-menu-group-title').style.paddingLeft).toBe(expectItem.expectPaddingLeft);
                    expectItem.parentSubmenuNum && expect(_item.$el.querySelector('.jad-menu-item').style.paddingLeft).toBe(expectItem.expectPaddingLeft);
                } else {
                    expect(_item.$el.querySelector('.jad-menu-group-title').style.paddingLeft).toBe("");
                    expect(_item.$el.querySelector('.jad-menu-item').style.paddingLeft).toBe("");
                }

            } else {
                expect(_item.$el.querySelector('.jad-menu-group-title')).toBeNull();
                if (menuGroup.mode === 'vertical'&&findComponentUpward(_item,'Menu')) {
                    const expectItem = computedSubMenuItem(_item);
                    expectItem.parentSubmenuNum && expect(_item.$el.querySelector('.jad-menu-item').style.paddingLeft).toBe(expectItem.expectPaddingLeft);
                } else {
                    expect(_item.$el.querySelector('.jad-menu-item').style.paddingLeft).toBe("");
                }
            }
            if (!!_item.className) {
                const cls = _item.className;
                expect(_item.$el.classList.value).toContain(cls);
            }


        });
    });
}
describe('menu', async() => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'menu'));
    //判断是否渲染完
    testVM();

    it('basic should contain base info', async() => {
        const { app } = window;
        const { basic, basicItem1, basicItem2 } = app.$refs;

        expect(basic).toHaveClass('jad-menu');
        expect(basicItem1).toHaveClass('jad-menu-item');
        expect(basicItem2).toHaveClass('jad-menu-item');
        expect(basic).toHaveClass('menu-cls');
        basicItem1.$el.click();
        setTimeout(() => {
            expect(basicItem1.$el.classList.value).toContain('jad-menu-item-active');
            basicItem2.$el.click();
            setTimeout(() => {
                expect(basicItem2.$el.classList.value).toContain('jad-menu-item-active');
                expect(basicItem1.$el.classList.value).not.toContain('jad-menu-item-active');
            }, 0)
        }, 0)
    })

    it('define menu width', async() => {
        const { app } = window;
        const { width, basic } = app.$refs;
        const w = width.width + 'px';
        const defaultW = '160px';
        await setData(app, 'mode', 'vertical');
        await nextTick();
        expect(width.$el.style.width).toBe(w);
        expect(basic.$el.style.width).toBe(defaultW);

        await setData(app, 'mode', 'horizontal');
        await nextTick();
        expect(width.$el.style.width).not.toBe(w);
    })

    it('default mode is vertical,it can define horizontal', async() => {
        const { app } = window;
        const { basic, mode } = app.$refs;
        expect(basic.$el.classList.value).toContain('jad-menu-vertical');
        expect(mode.$el.classList.value).toContain('jad-menu-horizontal');
    })

    it('default theme is light,it can define blue', async() => {
        const { app } = window;
        const { basic, theme } = app.$refs;
        expect(basic.$el.classList.value).toContain('jad-menu-light');
        expect(theme.$el.classList.value).toContain('jad-menu-blue');
    })

    it('activeKey is defined', async() => {
        const { app } = window;
        const { activeKey } = app.$refs;
        const option = activeKey.activeKey;
        activeKey.$children.forEach(item => {
            if (item.$options.name === "MenuItem" && item.$options.props.itemKey === option) {
                expect(item.$el.classList.value).toContain('jad-menu-item-active');
            }
        })

    })

   
    it('menu item is disabled', async() => {
        const { app } = window;
        const { disabled, noDisabled } = app.$refs;

        expect(disabled.$el.classList.value).toContain('jad-menu-item-disabled');
        expect(noDisabled.$el.classList.value).not.toContain('jad-menu-item-disabled');
        disabled.$el.click();
        setTimeout(() => {
            expect(disabled.$el.classList.value).not.toContain('jad-menu-item-active');
            noDisabled.$el.click();
            setTimeout(() => {
                expect(noDisabled.$el.classList.value).toContain('jad-menu-item-active');
            }, 0)
        }, 0)

    })


    it('sub menu is used', async() => {
        const { app } = window;
        const { subMenu, subMenu4, subMenu4Sub, subMenu4Item1, subMenu4Item2 } = app.$refs;

        expect(subMenu4.$el.classList.value).toContain('jad-menu-sub');
        expect(subMenu4.$el.querySelector('.jad-menu-sub-title')).not.toBeNull();
        expect(subMenu4Sub.$el.classList.value).toContain('jad-menu-sub');
        expect(subMenu4Sub.$el.querySelector('.jad-menu-sub-title')).not.toBeNull();

        const subMenu4Title = subMenu4.title;
        expect(subMenu4.$el.querySelector('.jad-menu-sub-title span').innerHTML).toBe(subMenu4Title);
        expect(subMenu4.$slots.title).toBeUndefined();
        expect(subMenu4Sub.title).toBeUndefined();
        expect(subMenu4Sub.$slots.title).not.toBeUndefined();


        if (subMenu4.mode === 'vertical') {
            const computedSubMenuItem1 = computedSubMenuItem(subMenu4);
            computedSubMenuItem1.parentSubmenuNum && expect(subMenu4.$el.querySelector('.jad-menu-item').style.paddingLeft).toBe(computedSubMenuItem1.expectPaddingLeft);

            const computedSubMenuItem = computedSubMenuItem(subMenu4Sub);
            computedSubMenuItem.parentSubmenuNum && expect(subMenu4Sub.$el.querySelector('.jad-menu-item').style.paddingLeft).toBe(computedSubMenuItem.expectPaddingLeft);

        }

        const className = subMenu4.className;
        if (!!className) {
            className && expect(subMenu4.$el.classList.value).toContain(className);
        }

        subMenu4.$el.click();
        setTimeout(()=>{
            expect(subMenu4.opened).toBe(true);
            expect(subMenu4.$el.classList.value).toContain('jad-menu-sub-opened');
            subMenu4.$el.click();
            setTimeout(()=>{
                expect(subMenu4.opened).toBe(false);
                expect(subMenu4.$el.classList.value).not.toContain('jad-menu-sub-opened');
            },0);
        },0);

    })

    it('sub menu is clicked and its menu item is clicked,if its mode is vertical', async() => {
        const { app } = window;
        const { subMenu4, subMenu4Item1, subMenu4Item2 } = app.$refs;

        let jIcon = subMenu4.$children.filter(item => item.$options.name === 'Icon');
        jIcon = jIcon[0];

        expect(jIcon.type).toBe('angle-right');
        subMenu4.$el.click();
        setTimeout(() => {
            expect(subMenu4.$el.classList.value).toContain('jad-menu-sub-opened');
            expect(subMenu4.$el.querySelector('.jad-menu-sub-content').style.display).not.toBe('none');
            expect(jIcon.type).toBe('angle-down');
            subMenu4Item1.$el.click();
            setTimeout(() => {
                expect(subMenu4Item1.$el.classList.value).toContain('jad-menu-item-active');
                expect(subMenu4.$el.classList.value).toContain('jad-menu-sub-active');
                subMenu4Item2.$el.click();
                setTimeout(() => {
                    expect(subMenu4Item1.$el.classList.value).not.toContain('jad-menu-item-active');
                    expect(subMenu4Item2.$el.classList.value).toContain('jad-menu-item-active');
                    expect(subMenu4.$el.classList.value).toContain('jad-menu-sub-active');
                    subMenu4.$el.click();
                    setTimeout(() => {
                        expect(subMenu4.$el.classList.value).not.toContain('jad-menu-sub-opened');
                        expect(subMenu4.$el.querySelector('.jad-menu-sub-content').style.display).toBe('none');
                        expect(jIcon.type).not.toBe('angle-right');
                    }, 0)
                }, 0)
            }, 0)
        }, 0);
    })

    it('sub menu is clicked and its menu item is clicked,if its mode is horizontal', async() => {
        const { app } = window;
        const { subMenu4Horizontal, subMenu4SubHorizontal, subMenu4HorizontalItem1 } = app.$refs;
        const parentSubmenu = findComponentsUpward(subMenu4Horizontal, 'Submenu', 'Menu');

        expect(subMenu4Horizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');

        let jIcon = subMenu4Horizontal.$children.filter(item => item.$options.name === 'Icon');
        jIcon = jIcon[0];

        expect(jIcon.type).toBe('angle-down');
        subMenu4Horizontal.$el.click();
        setTimeout(() => {
            expect(subMenu4Horizontal.$el.classList.value).toContain('jad-menu-sub-active');
            expect(subMenu4Horizontal.$el.querySelector('.jad-dropdown-popper').style.display).not.toBe('none');
            expect(jIcon.type).toBe('angle-up');
            let jSubIcon = subMenu4SubHorizontal.$children.filter(item => item.$options.name === 'Icon');
            jSubIcon = jSubIcon[0];
            expect(jIcon.type).toBe('angle-right');
            expect(subMenu4SubHorizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');
            subMenu4SubHorizontal.$el.click();
            setTimeout(() => {
                expect(jIcon.type).toBe('angle-left');
                expect(subMenu4SubHorizontal.$el.querySelector('.jad-dropdown-popper').style.display).not.toBe('none');
                subMenu4HorizontalItem1.$el.click();
                setTimeout(() => {
                    expect(subMenu4HorizontalItem1.$el.classList.value).toContain('jad-menu-item-active');
                    expect(subMenu4Horizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');
                    expect(subMenu4SubHorizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');
                    expect(jIcon.type).toBe('angle-right');
                    expect(jIcon.type).toBe('angle-down');
                }, 0)
            }, 0)
        }, 0)

    })

    it('submenu can trigger mouseenter and mouseleave event if its menu is horizontal', async() => {
        const { app } = window;
        const { subMenu4Horizontal, subMenu4SubHorizontal, subMenu4HorizontalItem1 } = app.$refs;


        expect(subMenu4Horizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');

        let jIcon = subMenu4Horizontal.$children.filter(item => item.$options.name === 'Icon');
        jIcon = jIcon[0];

        expect(jIcon.type).toBe('angle-down');
  
        triggerEvent(subMenu4Horizontal.$el, 'mouseenter');

        setTimeout(() => {
            expect(subMenu4Horizontal.$el.classList.value).toContain('jad-menu-sub-active');
            expect(subMenu4Horizontal.$el.querySelector('.jad-dropdown-popper').style.display).not.toBe('none');
            expect(jIcon.type).toBe('angle-up');
            let jSubIcon = subMenu4SubHorizontal.$children.filter(item => item.$options.name === 'Icon');
            jSubIcon = jSubIcon[0];
            expect(jIcon.type).toBe('angle-right');
            expect(subMenu4SubHorizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');
            triggerEvent(subMenu4SubHorizontal.$el, 'mouseenter');
            setTimeout(() => {
                expect(jIcon.type).toBe('angle-left');
                expect(subMenu4SubHorizontal.$el.querySelector('.jad-dropdown-popper').style.display).not.toBe('none');
                subMenu4HorizontalItem1.$el.click();
                setTimeout(() => {
                    expect(subMenu4HorizontalItem1.$el.classList.value).toContain('jad-menu-item-active');
                    expect(subMenu4Horizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');
                    expect(subMenu4SubHorizontal.$el.querySelector('.jad-dropdown-popper').style.display).toBe('none');
                    expect(jIcon.type).toBe('angle-right');
                    expect(jIcon.type).toBe('angle-down');
                }, 0)
            }, 0)
        }, 0)
    })

    it('openKey is defined,submenu matched key are be opend defaultly', async() => {
        const { app } = window;
        const { openKeysSub2,openKeysSub3 } = app.$refs;
   
        await setData(app, 'mode', 'vertical');
        await nextTick();
        setTimeout(()=>{
            expect(openKeysSub2.opened).toBe(true);
            expect(openKeysSub3.opened).toBe(false);
            expect(openKeysSub2.$el.classList.value).toContain('jad-menu-sub-opened');
            expect(openKeysSub3.$el.classList.value).not.toContain('jad-menu-sub-opened');
        },0)
        
        await setData(app, 'mode', 'horizontal');
        await nextTick();
        setTimeout(()=>{
            expect(openKeysSub2.opened).toBe(false);
            expect(openKeysSub3.opened).toBe(false);
            expect(openKeysSub2.$el.classList.value).not.toContain('jad-menu-sub-opened');
            expect(openKeysSub3.$el.classList.value).not.toContain('jad-menu-sub-opened');
        },0)
        
     
    })

    it('sub menu is disabled', async() => {
        const { app } = window;
        const { subMenu5 } = app.$refs;
        expect(subMenu5.$el.classList.value).toContain('jad-menu-sub-disabled');
        expect(subMenu5.$el.querySelector('.jad-menu-sub-content').style.display).toBe('none');

        subMenu5.$el.click();
        setTimeout(() => {
            expect(subMenu5.$el.querySelector('.jad-menu-sub-content').style.display).toBe('none');
            expect(subMenu5.$el.classList.value).not.toContain('jad-menu-sub-opened');
        }, 0)
    })

    it('if it is vertical and isAccordion is true,it should be one is allowed to expand,or expand more ', async() => {
        const { app } = window;
        const { isAccordion, subMenuAccordionItem1, subMenuAccordionItem2 } = app.$refs;
        await setData(app, 'mode', 'vertical');
        await setData(app, 'accordion', true);
        await nextTick();
        subMenuAccordionItem1.$el.click();
        setTimeout(() => {
            expect(subMenuAccordionItem1.$el.classList.value).toContain('jad-menu-sub-opened');
            subMenuAccordionItem1.$el.click();
            setTimeout(() => {
                expect(subMenuAccordionItem2.$el.classList.value).toContain('jad-menu-sub-opened');
                expect(subMenuAccordionItem1.$el.classList.value).not.toContain('jad-menu-sub-opened');
            }, 0)
        }, 0)

        await setData(app, 'accordion', false);
        await nextTick();
        subMenuAccordionItem1.$el.click();
        setTimeout(() => {
            expect(subMenuAccordionItem1.$el.classList.value).toContain('jad-menu-sub-opened');
            subMenuAccordionItem1.$el.click();
            setTimeout(() => {
                expect(subMenuAccordionItem2.$el.classList.value).toContain('jad-menu-sub-opened');
                expect(subMenuAccordionItem1.$el.classList.value).toContain('jad-menu-sub-opened');
            }, 0)
        }, 0)

    })

    it('if it is horizontal ,isAccordion is true or false,it is always be expand one ', async() => {
        const { app } = window;
        const { isAccordion, subMenuAccordionItem1, subMenuAccordionItem2 } = app.$refs;


        await setData(app, 'mode', 'horizontal');
        await setData(app, 'accordion', true);
        await nextTick();
        subMenuAccordionItem1.$el.click();
        setTimeout(() => {
            expect(subMenuAccordionItem1.$el.classList.value).toContain('jad-menu-sub-opened');
            subMenuAccordionItem1.$el.click();
            setTimeout(() => {
                expect(subMenuAccordionItem2.$el.classList.value).toContain('jad-menu-sub-opened');
                expect(subMenuAccordionItem1.$el.classList.value).not.toContain('jad-menu-sub-opened');
            }, 0)
        }, 0)

        await setData(app, 'accordion', false);
        await nextTick();
        subMenuAccordionItem1.$el.click();
        setTimeout(() => {
            expect(subMenuAccordionItem1.$el.classList.value).toContain('jad-menu-sub-opened');
            subMenuAccordionItem1.$el.click();
            setTimeout(() => {
                expect(subMenuAccordionItem2.$el.classList.value).toContain('jad-menu-sub-opened');
                expect(subMenuAccordionItem1.$el.classList.value).not.toContain('jad-menu-sub-opened');
            }, 0)
        }, 0)
    })

    it('menu group is used', async() => {
        const { app } = window;
        const { menuGroup } = app.$refs;

        await setData(app, 'mode', 'vertical');
        await nextTick();

        menuGroupTest(menuGroup);

        await setData(app, 'mode', 'horizontal');
        await nextTick();
        menuGroupTest(menuGroup);
    })

    it('on-open-change,on-select event is trigger', async() => {
        const { app } = window;
        const { selectItem, selectSubMenu } = app.$refs;
        triggerEvent(selectItem.$el, 'click');
        setTimeout(() => {
            expect(app.curChooseOption).toBe(selectItem.itemKey);
            triggerEvent(selectSubMenu.$el, 'click');
            setTimeout(() => {
                expect(app.isOpened).toBe(true);
                expect(app.curKey).toBe(selectSubMenu.itemKey);
                expect(app.currentOpenKeys).toEqual([...selectSubMenu.itemKey]);
            }, 0)
        }, 0)
    })
})
/*eslint-disable */