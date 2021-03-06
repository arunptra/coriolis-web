/*
Copyright (C) 2019  Cloudbase Solutions SRL
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

import * as React from 'react'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react'
import Palette from '../../styleUtils/Palette'

const Wrapper = styled.div`
  display: flex;
  min-height: 0;
  flex-grow: 1;
  position: relative;
`
const Navigation = styled.div`
  width: 224px;
  background-image: linear-gradient(rgba(200, 204, 215, 0.54), rgba(164, 170, 181, 0.54));
`
const NavigationItemDiv = styled.div`
  height: 47px;
  border-bottom: 1px solid ${Palette.grayscale[2]};
  color: ${props => props.disabled ? Palette.grayscale[3] : 'black'};
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: 18px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${props => props.selected ? css`
    color: ${Palette.primary};
    background: ${Palette.grayscale[2]};
    cursor: default;
  ` : ''}
`
const Content = styled.div`
  width: 576px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`
const ReloadButton = styled.div`
  font-size: 10px;
  color: ${Palette.grayscale[4]};
  &:hover {
    color: ${Palette.primary};
  }
  cursor: pointer;
  position: absolute;
  bottom: 42px;
  left: 32px;
`

export type NavigationItem = {
  label: string,
  value: string,
  disabled?: boolean,
  title?: string,
}

export type Props = {
  navigationItems: NavigationItem[],
  content: React.Node,
  selectedValue: ?string,
  onChange: (item: NavigationItem) => void,
  style?: any,
  reloadLabel: string,
  onReloadClick: () => void,
}

export const TEST_ID = 'panel'

@observer
class Panel extends React.Component<Props> {
  handleItemClick(item: NavigationItem) {
    if (item.disabled) {
      return
    }
    if (item.value !== this.props.selectedValue) {
      this.props.onChange(item)
    }
  }

  render() {
    return (
      <Wrapper style={this.props.style}>
        <Navigation>
          {this.props.navigationItems.map((item, i) => (
            <NavigationItemDiv
              key={item.value}
              selected={this.props.selectedValue ? this.props.selectedValue === item.value : i === 0}
              onClick={() => { this.handleItemClick(item) }}
              data-test-id={`${TEST_ID}-navItem-${item.value}`}
              disabled={item.disabled}
              title={item.title}
            >{item.label}</NavigationItemDiv>
          ))}
        </Navigation>
        <Content data-test-id={`${TEST_ID}-content`}>{this.props.content}</Content>
        <ReloadButton onClick={() => { this.props.onReloadClick() }}>
          {this.props.reloadLabel}
        </ReloadButton>
      </Wrapper>
    )
  }
}

export default Panel
