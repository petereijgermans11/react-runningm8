import { mount, shallowMount } from '@vue/test-utils'
import App from '../../src/App'
import Schemas from '../../src/views/Schemas'
import EditSchema from '../../src/views/EditSchema'
import Workout from "../../src/views/Workout"

describe('App', () => {
  it('has data', () => {
    expect(typeof App.data).toBe('function')
  })
})
describe('Must be logged in to view Schemas', () => {
  const wrapper = mount(Schemas)
  it('displays a login message', () => {
    expect(wrapper.html()).toContain('Log eerst in!')
  })
})
describe('Must be standard schema when no id selected', () => {
  const wrapper = shallowMount(Workout)
  it('should display hardlopen', () => {
    expect(wrapper.html()).toContain('Hardlopen')
  })
})
