/*
Copyright (C) 2018  Cloudbase Solutions SRL
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// @flow

import type { ShallowWrapper, ReactWrapper } from 'enzyme'

export default class TestWrapper {
  shallow: ShallowWrapper<any> | ReactWrapper<any>
  baseId: ?string
  length: number

  constructor(wrapper: ShallowWrapper<any> | ReactWrapper<any>, baseId?: ?string) {
    this.shallow = wrapper
    this.baseId = baseId
  }

  at(index: number): TestWrapper {
    return new TestWrapper(this.shallow.at(index), this.baseId)
  }

  prop(key: string) {
    return this.shallow.prop(key)
  }

  simulate(event: string, ...args: any[]) {
    this.shallow.simulate(event, ...args)
  }

  click() {
    this.shallow.simulate('click')
  }

  text(render?: boolean) {
    return render ? this.shallow.render().text() : this.shallow.text()
  }

  find(id: string, opts?: {
    isPartialId?: boolean,
    name?: string,
  }) {
    const actualId = this.baseId ? `${this.baseId}-${id}` : id
    let o = opts || {}
    let tw = new TestWrapper(this.shallow.findWhere(w =>
      (
        o.isPartialId ? w.prop('data-test-id') && w.prop('data-test-id').indexOf(actualId) > -1
          : w.prop('data-test-id') === actualId
      )
      &&
      (o.name ? w.name() === o.name : true)
    ), this.baseId)
    tw.length = tw.shallow.length
    return tw
  }

  findPartialId(partialId: string) {
    return this.find(partialId, { isPartialId: true })
  }

  findDiv(id: string) {
    return this.find(id, { name: 'div' })
  }

  findText(id: string, isHostComponent?: boolean, render?: boolean) {
    const wrapper = this.find(id).shallow
    const text = (component: any) => render ? component.render().text() : component.text()
    return isHostComponent ? text(wrapper) : text(wrapper.dive())
  }

  debug() {
    return this.shallow.debug()
  }
}
