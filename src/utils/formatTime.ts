/**
 * 주어진 시간을 포맷된 문자열로 변환합니다.
 * @param time - 포맷할 시간. 밀리초 단위의 숫자 또는 날짜 객체를 받아들입니다.
 * @returns 포맷된 시간 문자열.
 */
export function formatTime(time: any) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // 주어진 time을 Date 객체로 변환
  const now = new Date(time)
  const day = now.getDate()
  const monthIndex = now.getMonth()
  const year = now.getFullYear()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  // 시간, 분, 초를 포맷팅. 10보다 작은 숫자 앞에는 0을 붙임
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`

  // 가져온 날짜 정보와 시간 정보를 사용하여 포맷된 문자열을 생성
  return formattedTime
}
