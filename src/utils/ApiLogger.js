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

type LogType = 'REQUEST' | 'RESPONSE'

type LogOptions = {
  url: string,
  method: string,
  type: LogType,
  description?: string,
  requestStatus?: number | 'canceled',
  requestError?: any,
}

type Log = LogOptions & {
  date: Date,
}
const MAX_LOGS = 3000
class Storage {
  static NAME = 'apiLog'

  static getLogRaw(): string {
    return localStorage.getItem(this.NAME) || '[]'
  }

  static getLog(): Log[] {
    let logs: Log[] = JSON.parse(localStorage.getItem(this.NAME) || '[]')
    return logs
  }

  static saveLog(options: LogOptions) {
    let logs: Log[] = JSON.parse(localStorage.getItem(this.NAME) || '[]')
    let newLog: Log = {
      date: new Date(),
      ...options,
    }

    if (logs.length > MAX_LOGS) {
      logs.splice(0, logs.length - MAX_LOGS)
    }

    logs.push(newLog)
    localStorage.setItem(this.NAME, JSON.stringify(logs))
  }
}

class ApiLogger {
  log(options: LogOptions) {
    if (options.type === 'REQUEST') {
      console.log(`%cSending ${options.method} Request to ${options.url}`, 'color: #F5A623')
    } else if (options.requestError) {
      console.log(`%cError Response: ${options.url}`, 'color: #D0021B', options.requestError)
    } else if (options.requestStatus === 'canceled') {
      console.log(`%cRequest Canceled: ${options.url}`, 'color: #0044CA')
    } else if (options.requestStatus === 500) {
      console.log(`%cError Something happened in setting up the request: ${options.url}`, 'color: #D0021B')
    }

    if (options.requestError && options.requestError.response && options.requestError.response.data) {
      options.requestError = options.requestError.response.data.error
    }

    Storage.saveLog(options)
  }

  download() {
    let href: string = `data:text/json;charset=utf-8,${encodeURIComponent(Storage.getLogRaw())}`
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', href)
    downloadAnchorNode.setAttribute('download', 'coriolis-log.json')
    if (document.body) {
      document.body.appendChild(downloadAnchorNode) // required for firefox
    }
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
}

export default new ApiLogger()
