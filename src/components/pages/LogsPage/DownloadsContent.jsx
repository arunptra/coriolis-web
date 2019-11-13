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
import { observer } from 'mobx-react'
import moment from 'moment'

import type { Log as LogType } from '../../../types/Log'

import { Close } from '../../atoms/TextInput'
import DatetimePicker from '../../molecules/DatetimePicker'

import StyleProps from '../../styleUtils/StyleProps'

import downloadImage from './images/download.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
`
const Info = styled.div``
const Dates = styled.div`
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: -48px;
  margin-top: 16px;
`
const DateWrapper = styled.div`
  position: relative;
  margin-left: 48px;
`
const DateLabel = styled.div`
  font-weight: ${StyleProps.fontWeights.medium};
`
const DateInput = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
`
const CloseButton = styled(Close)`
  right: -24px;
  top: 29px;
`
const Logs = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  min-height: 0;
  margin-top: 48px;
`
const Log = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  flex-shrink: 0;
  :first-child {
    margin-top: 0;
  }
`
const LogName = styled.div``
const LogDownload = styled.div`
  ${StyleProps.exactSize('16px')}
  background: url('${downloadImage}') center no-repeat;
  background-size: contain;
  cursor: pointer;
  margin-right: 16px;
`

type State = {
  startDate: ?Date,
  endDate: ?Date,
}
type Props = {
  logs: LogType[],
  onDownloadClick: (logName: string, startDate: ?Date, endDate: ?Date) => void,
}
@observer
class DownloadsContent extends React.Component<Props, State> {
  state = {
    startDate: null,
    endDate: null,
  }

  handleStartDateChange(startDate: Date) {
    this.setState({ startDate })
  }

  handleEndDateChange(endDate: Date) {
    this.setState({ endDate })
  }

  renderDates() {
    return (
      <Dates>
        <DateWrapper>
          <DateLabel>Start Date</DateLabel>
          <DateInput>
            <DatetimePicker
              value={this.state.startDate}
              onChange={date => { this.handleStartDateChange(date) }}
              timezone="utc"
              isValidDate={date => moment(date).isBefore(moment())}
              dispatchChangeContinously
            />
            <CloseButton
              show={this.state.startDate}
              onClick={() => { this.setState({ startDate: null }) }}
            />
          </DateInput>
        </DateWrapper>
        <DateWrapper>
          <DateLabel>End Date</DateLabel>
          <DateInput>
            <DatetimePicker
              value={this.state.endDate}
              onChange={date => { this.handleEndDateChange(date) }}
              timezone="utc"
              isValidDate={date => this.state.startDate ? moment(date).isBefore(moment())
                && moment(date).isAfter(moment(this.state.startDate).subtract(1, 'day'))
                : moment(date).isBefore(moment())}
              dispatchChangeContinously
            />
            <CloseButton
              show={this.state.endDate}
              onClick={() => { this.setState({ endDate: null }) }}
            />
          </DateInput>
        </DateWrapper>
      </Dates>
    )
  }

  renderLogs() {
    return (
      <Logs>
        {this.props.logs.map(log => (
          <Log key={log.log_name}>
            <LogDownload
              onClick={() => {
                this.props.onDownloadClick(log.log_name, this.state.startDate, this.state.endDate)
              }}
            />
            <LogName>{log.log_name}</LogName>
          </Log>
        ))}
      </Logs>
    )
  }

  render() {
    return (
      <Wrapper>
        <Info>
          Optional time range for log download:
        </Info>
        {this.renderDates()}
        {this.renderLogs()}
      </Wrapper>
    )
  }
}

export default DownloadsContent
