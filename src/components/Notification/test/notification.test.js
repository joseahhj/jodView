/*eslint-disable */
import { loadFixture, testVM, setData, nextTick, triggerEvent } from '../../../../tests/utils';

import Notification from  '../index'

describe('notification', async() => {
    //渲染组件到body中
    beforeEach(loadFixture(__dirname, 'notification'));
    //判断是否渲染完
    testVM();

    it('base info', async() => {
        Notification({
            message: '这是标题',
            description: '这是消息框的文案'
        })
        setTimeout(() => {
            expect(document.querySelector('.jad-notification')).not.toBeNull();
        }, 1000)
    })

    it('automatically close', async() => {
        Notification({
            message: '这是标题',
            duration: 500
        });
        setTimeout(() => {
            expect(document.querySelector('.jad-notification')).not.toBeNull();
            setTimeout(() => {
                expect(document.querySelector('.jad-notification')).toBeNull();
            }, 1000);
        }, 0)
    });


    it('manually close', async() => {
        Notification({
            message: '这是标题'
        });
        setTimeout(() => {
            expect(document.querySelector('.jad-notification')).not.toBeNull();
            const $el = document.querySelector('.jad-notification-close');
            $el.click();
            setTimeout(() => {
                expect(document.querySelector('.jad-notification')).toBeNull();
            }, 500);
        }, 500)
    });

    it('message and description', async() => {
        Notification({
            message: '这是标题',
            description: '这是消息框的文案'
        })
        setTimeout(() => {
            expect(document.querySelector('.jad-notification-content')).not.toBeNull();
            expect(document.querySelector('.jad-notification-content-message')).not.toBeNull();
            expect(document.querySelector('.jad-notification-content-description')).not.toBeNull();
            expect(document.querySelector('.jad-notification-content-message').textContent).toEqual('这是标题');
            expect(document.querySelector('.jad-notification-content-description').textContent).toEqual('这是消息框的文案');
        }, 1000)
    })

    it('html string as description', async() => {

        Notification({
            message: '这是标题',
            description: '<h1>这是消息框的文案</h1>'
        })
        setTimeout(() => {
            const description = document.querySelector('.jad-notification-content-description');
            expect(description).not.toBeNull();
            expect(description.innerHTML).toEqual('<h1>这是消息框的文案</h1>');
        }, 1000)
    })


    it('duration is 0,it is always to be not close;duration is defined,it is closed after defined time;', async() => {
        Notification({
            message: '这是标题',
            duration:3
        })
        setTimeout(() => {
            expect(document.querySelector('.jad-notification')).not.toBeNull();
            Notification({
                message: '这是标题',
                duration:0
            });
            setTimeout(() => {
                expect(document.querySelector('.jad-notification')).toBeNull();
            }, 8000)
        }, 3000);
    })

    it('no close btn', async() => {
        Notification({
            message: '这是标题',
            isClosable: false
        });

        setTimeout(() => {
            expect(document.querySelector('.jad-notification-close')).toBeNull();
        }, 1000)

    })

    it('define different position,it should be display in different position', async() => {
        const positions = ['bottom-left', 'bottom-right', 'top-right', 'top-left'];
        for (let i = 0, len = positions.length; i < len; i++) {
            let position = positions[i],
                horizontal = ~position.indexOf('right') ? 'right' : 'left',
                vertical = ~position.indexOf('top') ? 'top' : 'top';
            (function(i) {
                Notification({
                    message: '这是标题',
                    position: position
                });
                setTimeout(() => {
                    expect(document.querySelector('.jad-notification-' + horizontal)).not.toBeNull();
                    expect(document.querySelector('.jad-notification-' + horizontal).style[vertical]).not.toBe('');
                }, 1000)
            })(i);
        }
    })


    it('different type', async() => {
        Notification.success({
            message:'这是标题'
        });
        setTimeout(()=>{
            expect(document.querySelector('.jad-notification').__vue__.type).to.equal('success');
        },0)
    })


    it('mouseenter reset timer, and mouseleave start timer', async() => {
        Notification.success({
            message:'这是标题'
        });

        setTimeout(() => {
            const $el = document.querySelector('.jad-notification');
            triggerEvent($el, 'mouseenter');
            setTimeout(() => {
                triggerEvent($el, 'mouseleave');
                expect($el.__vue__.timer).toBeNull();
                expect(document.querySelector('.jad-notification')).not.toBeNull();
            }, 7000)
        }, 1000)
    })

    it('onClick is param',async()=>{
        const spy = jest.fn();
        Notification({
            onClick:spy,
            message:'这是标题'
        });
        setTimeout(() => {
            const $el = document.querySelector('.jad-notification');
            $el.click();
            expect(spy).toHaveBeenCalled();
        }, 1000)

    })


})
/*eslint-disable */