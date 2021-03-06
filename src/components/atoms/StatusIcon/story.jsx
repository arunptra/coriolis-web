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
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import StatusIcon from '.'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const STATUSES = [
  'SCHEDULED',
  'UNSCHEDULED',
  'COMPLETED',
  'RUNNING',
  'PENDING',
  'CANCELLING',
  'CANCELLING_AFTER_COMPLETION',
  'CANCELED',
  'CANCELED_AFTER_COMPLETION',
  'CANCELED_FOR_DEBUGGING',
  'FORCE_CANCELED',
  'WARNING',
  'ERROR',
  'DEADLOCKED',
  'STRANDED_AFTER_DEADLOCK',
]

storiesOf('StatusIcon', module)
  .add('all statuses', () => (
    <Wrapper>
      {STATUSES.map(status => (
        <span style={{ marginLeft: '16px', marginBottom: '16px' }}>
          {status}
          <StatusIcon
            key={status}
            status={status}
          />
        </span>
      ))}
    </Wrapper>
  ))
  .add('completed hollow', () => (
    <StatusIcon status="COMPLETED" hollow />
  ))
  .add('error hollow', () => (
    <StatusIcon status="ERROR" hollow />
  ))
