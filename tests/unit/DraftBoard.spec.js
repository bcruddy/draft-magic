import {shallowMount} from '@vue/test-utils';
import DraftBoard from '@/components/DraftBoard.vue';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const wrapper = shallowMount(DraftBoard);
        expect(wrapper.isVueInstance());
    });
});
