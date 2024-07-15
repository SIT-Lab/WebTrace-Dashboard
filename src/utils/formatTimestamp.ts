import { Timestamp } from 'firebase/firestore'

/**
 * Firestore 타임스탬프를 포맷된 날짜 문자열로 변환합니다.
 * @param timestamp - 변환할 Firestore 타임스탬프
 * @returns 포맷된 날짜 문자열
 */
export function formatTimestamp(timestamp: Timestamp) {
  if (!timestamp) {
    return 'undefined'
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  // 월, 일, 연도를 사용하여 포맷된 날짜 문자열을 생성합니다
  const formattedDate = `${months[monthIndex]} ${day} ${year}`
  return formattedDate
}

/**
 * Firestore 타임스탬프를 UTC 형식의 ISO 문자열로 변환합니다.
 * @param timestamp - 변환할 Firestore 타임스탬프
 * @returns ISO 형식의 UTC 날짜 문자열
 */
export function formatTimestampUTC(timestamp: Timestamp) {
  if (!timestamp) {
    return 'undefined'
  }

  // 타임스탬프를 밀리초로 변환하여 Date 객체를 생성합니다
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
  return date.toISOString()
}
