import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MetricTag from '~/components/MetricTag.vue'

describe('MetricTag', () => {
  it('renders with label and value props', () => {
    const wrapper = mount(MetricTag, {
      props: { label: 'Status', value: 'Active' },
    })
    expect(wrapper.text()).toContain('Status')
    expect(wrapper.text()).toContain('Active')
  })

  it('renders without label', () => {
    const wrapper = mount(MetricTag, {
      props: { value: 'Active' },
    })
    expect(wrapper.text()).toContain('Active')
    expect(wrapper.text()).not.toContain('|')
  })

  it('renders slot content when provided', () => {
    const wrapper = mount(MetricTag, {
      props: { label: 'Status' },
      slots: { default: 'Custom Value' },
    })
    expect(wrapper.text()).toContain('Custom Value')
  })

  it('renders status variant with pulse indicator', () => {
    const wrapper = mount(MetricTag, {
      props: { label: 'Status', value: 'Live', variant: 'status' },
    })
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })

  it('does not render pulse indicator for info variant', () => {
    const wrapper = mount(MetricTag, {
      props: { label: 'Info', value: 'Details', variant: 'info' },
    })
    expect(wrapper.find('.animate-pulse').exists()).toBe(false)
  })

  it('renders without props', () => {
    const wrapper = mount(MetricTag)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('applies correct container classes', () => {
    const wrapper = mount(MetricTag, {
      props: { label: 'Test', value: 'Value' },
    })
    expect(wrapper.find('div').classes()).toContain('inline-flex')
  })
})