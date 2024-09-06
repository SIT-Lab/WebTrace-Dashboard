import { LogData } from '../interfaces/apiTypes'

/**
 * Firestore 타임스탬프 또는 숫자를 JavaScript Date 객체로 변환합니다.
 * @param timestamp - 변환할 타임스탬프, 초와 나노초를 포함하는 객체 또는 숫자입니다.
 * @returns 해당하는 Date 객체.
 */
function convertTimestampToDate(timestamp: { seconds: number; nanoseconds: number } | number): Date {
  if (typeof timestamp === 'number') {
    return new Date(timestamp)
  }
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
}

/**
 * 주어진 시간을 포맷된 문자열로 변환합니다.
 * @param time - 포맷할 시간. 밀리초 단위의 숫자 또는 날짜 객체를 받아들입니다.
 * @returns 포맷된 날짜 및 시간 문자열 (엑셀에서 문자열로 인식되도록 함).
 */
function formatTimeForExcel(time: any): string {
  // 주어진 time을 Date 객체로 변환
  const now = new Date(time)
  const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19) // 'YYYY-MM-DD HH:mm:ss' 형식으로 반환
  return `="${formattedTime}"` // 엑셀에서 날짜가 아닌 문자열로 인식되도록 처리
}

/**
 * LogData 객체 배열을 CSV 문자열로 변환합니다.
 * @param data - LogData 객체 배열.
 * @returns 로그 데이터의 CSV 문자열 표현.
 */
function convertLogDataToCSV(data: LogData[]): string {
  const headerOrder = [
    'event Type',
    'xpath',
    'event time',
    'url',
    'hostName',
    'pathName',
    'event State', // 새로 추가된 eventState 항목
    'w',
    'h',
    'x',
    'y',
    'imageUrl',
    'pressed key',
    'key code',
  ]

  const header = headerOrder.join(',')

  const csvRows = data.map((log) => {
    const formattedTime = log.time ? formatTimeForExcel(convertTimestampToDate(log.time)) : ''

    // eventState를 키보드 입력 상태와 스크롤 상태로 생성
    const eventState = log.keyboardInputState || log.scrollState || ''

    return [
      log.eventType,
      log.xpath,
      formattedTime,
      log.url,
      log.hostName,
      log.pathName,
      eventState,
      log.w,
      log.h,
      log.x,
      log.y,
      log.imageUrl,
      log.keyboardInputPressedKey,
      log.keyboardInputKeyCode,
    ].join(',')
  })

  return [header, ...csvRows].join('\n')
}

/**
 * LogData 배열을 CSV 파일로 다운로드합니다.
 * @param data - LogData 배열.
 * @param filename - 다운로드할 파일의 이름.
 */
export function downloadLogDataCSV(data: LogData[], filename: string): void {
  if (!data) {
    console.error('No LogData')
    return
  }
  const csvContent = convertLogDataToCSV(data)

  // UTF-8 BOM을 추가하여 한글 깨짐 방지
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
