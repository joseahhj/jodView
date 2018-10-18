/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    triggerEvent,
    nextTick
} from '../../../../tests/utils'


describe('card', async() => {
    beforeEach(loadFixture(__dirname, 'card'));
    testVM();

    it('should have header or body', async () => {
        const {
            app: {
                $refs
            }
        } = window;

        const basicVM = $refs.basicVM;
        const simpleVM = $refs.simpleVM;
        expect(simpleVM.$el.querySelector('.card-body')).toBeDefined();
        expect(basicVM.$el.querySelector('.card-header')).toBeDefined();
    });

    it('should have body-style', async () => {
        const {
            app: {
                $refs
            }
        } = window;

        const body = $refs.imgVM.$el.querySelector('.card-body');
        expect(body.style.padding).toBe('0px');
    });

    it('should have `shadow` classes', async () => {
        const {
            app: {
                $refs
            }
        } = window;

        const hoverVM = $refs.hoverShadowVM;
        expect(hoverVM.$el.querySelector('.hover-shadow')).toBeDefined();
    });

    it('should have `width` style', async () => {
        const {
            app: {
                $refs
            }
        } = window;

        const body = $refs.setWidthOneVM.$el.querySelector('.jad-card');
        expect(body.style.width).toBe('300px');
    });

    it('should emit "click" event when clicking', async () => {
        const {
            app: {
                $refs
            }
        } = window;
        const basicCard = $refs.basicVM;
        const spy = jest.fn();
        basicCard.$el.querySelector('.text-btn').addEventListener('click', spy);
        basicCard.$el.querySelector('.text-btn').click();

        expect(spy).toHaveBeenCalled();
    })
});
/*eslint-disable */