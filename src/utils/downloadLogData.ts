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
 * JavaScript Date 객체를 UTC 문자열로 형식화합니다.
 * @param date - 형식화할 Date 객체.
 * @returns ISO 형식의 날짜 문자열.
 */
function formatTimestampUTC(date: Date): string {
  return date.toISOString()
}

/**
 * LogData 객체 배열을 CSV 문자열로 변환합니다.
 * @param data - LogData 객체 배열.
 * @returns 로그 데이터의 CSV 문자열 표현.
 */
function convertLogDataToCSV(data: LogData[]): string {
  const headerOrder = [
    'eventName',
    'xpath',
    'time',
    'url',
    'hostname',
    'pathname',
    // 'nodeName',
    'wheelState',
    'wheelDirection',
    'w',
    'h',
    'x',
    'y',
    'imageUrl',
    'KeyboardEventState',
    'pressed key',
    'key code',
    'hash',
  ]

  const header = headerOrder.join(',')

  const csvRows = data.map((log, index) => {
    const formattedTime = log.time ? convertTimestampToDate(log.time) : ''
    return [
      log.eventName,
      log.xpath,
      formattedTime,
      log.url,
      log.hostname,
      log.pathname,
      // log.nodeName,
      log.wheelState,
      log.wheelDirection,
      log.w,
      log.h,
      log.x,
      log.y,
      log.imageUrl,
      log.KeyboardEventState,
      log.KeyboardEventPressedKey,
      log.KeyboardEventKeyCode,
      log.hash,
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

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
