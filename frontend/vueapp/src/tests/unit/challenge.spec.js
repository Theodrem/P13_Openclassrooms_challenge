import Login from '../../views/Login'
import auth from '@/store/auth'
import { mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'

//Vue.use(Vuex)


test('test profile', async () => {
    //const store = new Vuex.Store(auth);
    const wrapper = mount(Login)
    //const button = wrapper.find('#submit')
    //button.trigger('click');
    const byId = wrapper.find('#submit')
    expect(byId.element.id).toBe('submit')
    //store.state.info_user = 'Cucumber'
    //expect(wrapper.vm.info_user).toEqual(['Cucumber'])
})


