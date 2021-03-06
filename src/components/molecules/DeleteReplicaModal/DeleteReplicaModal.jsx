/*
Copyright (C) 2020  Cloudbase Solutions SRL
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
import { observer } from 'mobx-react'
import styled from 'styled-components'

import Modal from '../Modal'
import Button from '../../atoms/Button'
import StatusImage from '../../atoms/StatusImage'

import Palette from '../../styleUtils/Palette'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
`
const Message = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 48px;
`
const ExtraMessage = styled.div`
  color: ${Palette.grayscale[4]};
  margin: 11px 0 48px 0;
  text-align: center;
  font-size: 12px;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`
const ButtonsColumn = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
  hasDisks: boolean,
  isMultiReplicaSelection?: boolean,
  onDeleteReplica: () => void,
  onDeleteDisks: () => void,
  onRequestClose: () => void,
}

@observer
class DeleteReplicaModal extends React.Component<Props> {
  renderExtraMessage() {
    if (this.props.hasDisks) {
      if (this.props.isMultiReplicaSelection) {
        return (
          <ExtraMessage>
            Some of the selected Replicas have been executed at least once and thus may have disks created on the destination platform.
            If those Replicas are to be deleted now, the disks on the destination will persist.
            If this is not desired, please use the &quot;Delete Replica Disks&quot; option to delete those disks before deleting the Replicas themselves.
          </ExtraMessage>
        )
      }

      return (
        <ExtraMessage>
          This Replica has been executed at least once and thus may have disks created on the destination platform.
          If the Replica is to be deleted now, the disks on the destination will persist.
          If this is not desired, please use the &quot;Delete Replica Disks&quot; option to delete the disks before deleting the Replica itself.
        </ExtraMessage>
      )
    }

    return (
      <ExtraMessage>
        Deleting a Coriolis Replica is permanent!
      </ExtraMessage>
    )
  }

  render() {
    let title = this.props.isMultiReplicaSelection ? 'Delete Selected Replicas?' : 'Delete Replica?'
    let message = this.props.isMultiReplicaSelection ? 'Are you sure you want to delete the selected replicas?' : 'Are you sure you want to delete this replica?'
    return (
      <Modal
        isOpen
        title={title}
        onRequestClose={this.props.onRequestClose}
      >
        <Wrapper>
          <StatusImage status="QUESTION" />
          <Message>{message}</Message>
          {this.renderExtraMessage()}
          <Buttons>
            <Button secondary onClick={this.props.onRequestClose}>Cancel</Button>
            <ButtonsColumn>
              {this.props.hasDisks ? (
                <Button
                  onClick={this.props.onDeleteDisks}
                  hollow
                  style={{ marginBottom: '16px' }}
                  alert
                >
                  Delete Replica Disks
                </Button>
              ) : null}
              <Button
                onClick={this.props.onDeleteReplica}
                alert
              >
                Delete Replica{this.props.isMultiReplicaSelection ? 's' : ''}
              </Button>
            </ButtonsColumn>
          </Buttons>
        </Wrapper>
      </Modal>
    )
  }
}

export default DeleteReplicaModal
