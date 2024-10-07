import { Timestamp } from 'firebase/firestore'

/**
 * LogData 인터페이스: 개별 로그 항목의 속성을 정의
 */
export interface LogData {
  eventType: string // Type of event (e.g., scroll, leftClick, right click, keyboard input)
  // nodeName: string // Name of node (e.g., h2, div)
  hostName: string // Hostname of URL
  pathName: string // Pathname of URL
  url: string // Full URL
  hash: string // Unique hashcode of evented DOM element
  xpath: string // XPath of evented DOM element

  /* FIXME: 스크롤 up/down 위치 정보 */
  scrollState?: string // ('scroll start', 'scrolling', 'scroll end', undefined)
  scrollDirection?: string // Scroll up/down information
  x: number // X position of DOM element
  y: number // Y position of DOM element
  w: number // Width of evented DOM element
  h: number // Height of evented DOM element
  time: Timestamp // Evented time of DOM element

  /**
   * 키보드의 상태에 대한 정보.
   * - 'input start': 키보드 이벤트가 시작됨을 나타냄.
   * - 'input ongoing': 키보드 이벤트가 진행 중임을 나타냄.
   * - 'input end': 키보드 이벤트가 종료됨을 나타냄.
   */
  keyboardInputState?: string

  /**
   * 키보드 이벤트의 유형을 나타냄.
   * - 'keydown': 키를 눌렀을 때 발생하는 이벤트.
   * - 'keyup': 키를 뗐을 때 발생하는 이벤트.
   * - 'keypress': 키를 누르는 동안 발생하는 이벤트.
   */
  keyboardInputType?: string

  /**
   * 사용자가 누른 키에 대한 정보.
   * - 'a': 사용자가 'a' 키를 눌렀을 때.
   * - 'Enter': 사용자가 'Enter' 키를 눌렀을 때.
   */
  keyboardInputPressedKey?: string

  /**
   * 키의 코드에 대한 상세한 정보.
   * 이 필드는 눌린 키의 고유한 코드 값을 나타냄.
   * 일반적으로 키보드 이벤트에서 제공하는 `event.keyCode` 값을 사용함.
   * 예시:
   * - '65': 'A' 키의 키코드.
   * - '13': 'Enter' 키의 키코드.
   */
  keyboardInputKeyCode?: string

  // 스크린샷한 화면 이미지의 Firebase URL.
  imageUrl?: string
}

/**
 * LogArray 인터페이스: 로그 데이터 배열과 결과 데이터를 정의
 */
export interface LogArray {
  data: LogData[] // User log data
  result: ResultData // Result data about log
}

/**
 * ResultData 인터페이스: 로그 결과 데이터의 속성을 정의
 */
export interface ResultData {
  accessedAt: Timestamp // Timestamp of when the task was accessed.
  browser: string // Browser of the user who performed the task.
  os: string // OS of the user who performed the task.
  device: string // Device of the user who performed the task.
  durationSec: number // Duration in seconds of the task.
  successRate: number // Success rate of the task.
  userId: string // User ID of the individual who performed the task.
  isFinished: boolean // Task was Finished or Quit

  userAge: number // Age of the user
  userGender: string // Gender of the user
  userCountry: string // Country of the user
}

/**
 * TaskData 인터페이스: 작업 데이터의 속성을 정의
 */
export interface TaskData {
  id: string
  launchedAt: Timestamp // (write by owner) Timestamp of when the task was launched.
  modifiedAt: Timestamp // Timestamp of when the task was modified.
  log: LogArray[] // Click or wheel logs of the user who performed the task.
  title: string // (write by owner) Title of Task
}

/**
 * TaskSuiteData 인터페이스: 테스트 데이터의 속성을 정의
 */
export interface TaskSuiteData {
  id: string
  title?: string // Title of Task Suite
}

/**
 * ProjectData 인터페이스: 프로젝트 데이터의 속성을 정의
 */
export interface ProjectData {
  id: string
  title: string // Title of project
  ownerID: string // Project owner user's ID
}
