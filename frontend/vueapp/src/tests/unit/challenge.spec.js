import Profile from '@/views/Profile.vue'
import { mount } from '@vue/test-utils'

describe('test', () => {
    test('test profile', async () => {
        const wrapper = mount(Profile)
        await wrapper.setData({"username": 'paul'})
        const w = wrapper.find("#info-username")
        expect(w.html()).toContain('paul');
    })
})