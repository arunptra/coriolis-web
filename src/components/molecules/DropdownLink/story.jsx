/*
Copyright (C) 2017  Cloudbase Solutions SRL
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

import React from 'react'
import { storiesOf } from '@storybook/react'
import DropdownLink from '.'
import Palette from '../../styleUtils/Palette'

type Props = {
  multipleSelection?: boolean,
  getLLabel?: (items: string[]) => string,
}
type State = {
  items: { label: string, value: string }[],
  selectedItem: string,
  selectedItems: string[],
}
class Wrapper extends React.Component<Props, State> {
  state = {
    items: [
      { label: 'Item 1', value: 'item-1' },
      { label: 'Item 2', value: 'item-2' },
      { label: 'Item 3', value: 'item-3' },
    ],
    selectedItem: 'item-1',
    selectedItems: [],
  }

  handleItemChange(selectedItem) {
    if (this.props.multipleSelection) {
      let selectedItems = this.state.selectedItems
      if (selectedItems.find(i => i === selectedItem)) {
        this.setState({ selectedItems: selectedItems.filter(i => i !== selectedItem) })
      } else {
        this.setState({ selectedItems: [...selectedItems, selectedItem] })
      }
    } else {
      this.setState({ selectedItem })
    }
  }

  render() {
    return (
      <div style={{ marginLeft: '100px' }}>
        <DropdownLink
          items={this.state.items}
          selectedItem={this.state.selectedItem}
          selectedItems={this.state.selectedItems}
          onChange={item => { this.handleItemChange(item.value) }}
          getLabel={this.props.getLLabel ? () => this.props.getLLabel ? this.props.getLLabel(this.state.selectedItems) : '' : undefined}
          {...this.props}
        />
      </div>
    )
  }
}

storiesOf('DropdownLink', module)
  .add('default', () => (
    <Wrapper />
  ))
  .add('searchable', () => (
    <Wrapper
      searchable
    />
  ))
  .add('multiple selection', () => (
    <Wrapper
      width="200px"
      getLLabel={items => items.length > 0 ? items.join(', ') : 'Choose something'}
      listWidth="120px"
      itemStyle={item => `color: ${item.value === 'remove' ? Palette.alert : Palette.black};`}
      multipleSelection
      items={[
        { value: 'owner' },
        { value: 'admin' },
        { value: 'member', label: 'member' },
      ]}
      labelStyle={{ color: Palette.black }}
    />
  ))
