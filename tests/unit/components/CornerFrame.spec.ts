import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CornerFrame from '~/components/CornerFrame.vue'

describe('CornerFrame', () => {
  it('renders slot content', () => {
    const wrapper = mount(CornerFrame, {
      slots: { default: '<p>Content inside frame</p>' },
    })
    expect(wrapper.text()).toContain('Content inside frame')
  })

  it('renders all four corner elements', () => {
    const wrapper = mount(CornerFrame)
    const corners = wrapper.findAll('[class*="border-t-2"], [class*="border-b-2"]')
    expect(corners.length).toBe(4)
  })

  it('applies correct classes to container', () => {
    const wrapper = mount(CornerFrame)
    expect(wrapper.find('.relative.group\\/frame').exists()).toBe(true)
  })

  it('has hover transition on corners', () => {
    const wrapper = mount(CornerFrame)
    const corners = wrapper.findAll('.transition-colors')
    expect(corners.length).toBe(4)
  })

  it('renders top-left corner correctly', () => {
    const wrapper = mount(CornerFrame)
    const topLeft = wrapper.find('.absolute.-top-px.-left-px')
    expect(topLeft.exists()).toBe(true)
    expect(topLeft.classes()).toContain('border-t-2')
    expect(topLeft.classes()).toContain('border-l-2')
  })

  it('renders top-right corner correctly', () => {
    const wrapper = mount(CornerFrame)
    const topRight = wrapper.find('.absolute.-top-px.-right-px')
    expect(topRight.exists()).toBe(true)
    expect(topRight.classes()).toContain('border-t-2')
    expect(topRight.classes()).toContain('border-r-2')
  })

  it('renders bottom-left corner correctly', () => {
    const wrapper = mount(CornerFrame)
    const bottomLeft = wrapper.find('.absolute.-bottom-px.-left-px')
    expect(bottomLeft.exists()).toBe(true)
    expect(bottomLeft.classes()).toContain('border-b-2')
    expect(bottomLeft.classes()).toContain('border-l-2')
  })

  it('renders bottom-right corner correctly', () => {
    const wrapper = mount(CornerFrame)
    const bottomRight = wrapper.find('.absolute.-bottom-px.-right-px')
    expect(bottomRight.exists()).toBe(true)
    expect(bottomRight.classes()).toContain('border-b-2')
    expect(bottomRight.classes()).toContain('border-r-2')
  })

  it('renders empty when no slot provided', () => {
    const wrapper = mount(CornerFrame)
    expect(wrapper.find('.relative').exists()).toBe(true)
  })
})