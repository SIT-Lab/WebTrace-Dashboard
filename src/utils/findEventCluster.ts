import { LogData } from '../interfaces/apiTypes'

/**
 * EventClusterItem 인터페이스: LogData 인터페이스를 확장하여 추가 속성을 정의
 */
export interface EventClusterItem extends LogData {
  index: number // 로그 항목의 인덱스
  clusterIndex: number // 클러스터 인덱스
  clusterInsideIndex: number // 클러스터 내부 인덱스
  imageUrlForCluster?: string // 클러스터 내의 유효한 imageUrl 또는 '캡쳐에러발생'
}

/**
 * 주어진 로그 배열을 클러스터로 분류합니다.
 * @param logArray - 클러스터로 분류할 로그 배열
 * @returns EventClusterItem 배열
 */
export const findEventCluster = (logArray: any[]): EventClusterItem[] => {
  const eventCluster: EventClusterItem[] = []
  let beforeEventType: string | undefined
  let clusterIndex = 0 // 초기값 0으로 시작
  let clusterInsideIndex = 0
  let scrollStateCount = 0 // "scrolling" 상태인 이벤트의 개수
  let dataInputCount = 0 // "input ongoing" 상태인 이벤트의 개수
  let shouldStartNewCluster = false // 새 클러스터를 시작해야 하는지 여부

  const clusterImageUrlMap = new Map<number, string>() // 클러스터별 이미지 URL 저장

  logArray.forEach((log, index) => {
    if (index != 0) {
      // 첫 번째 이벤트가 아니면 클러스터 인덱스를 증가시키고 클러스터 내부 인덱스를 초기화
      if (shouldStartNewCluster || beforeEventType !== log.eventType) {
        clusterIndex++
        clusterInsideIndex = 0 // 클러스터 내부 인덱스 초기화
        shouldStartNewCluster = false // 새 클러스터 시작 플래그 초기화
      } else {
        clusterInsideIndex++
      }
    }

    if (log.eventType === 'scroll' && log.scrollState === 'scrolling') {
      scrollStateCount++
    } else if (log.eventType === 'data input' && log.keyboardInputState === 'input ongoing') {
      dataInputCount++
    }

    // 종료 이벤트를 확인하여 다음 이벤트를 새로운 클러스터로 시작해야 하는지 결정
    const isEndEvent =
      (log.eventType === 'scroll' && log.scrollState.startsWith('scroll end')) ||
      (log.eventType === 'data input' && log.keyboardInputState?.startsWith('input end')) ||
      log.eventType === 'control input' ||
      log.eventType === 'left click' ||
      log.eventType === 'right click' ||
      log.eventType === 'Wheel click'

    if (isEndEvent) {
      shouldStartNewCluster = true // 다음 이벤트를 새로운 클러스터로 시작
    }

    // 유효한 imageUrl 또는 '캡쳐에러발생'이 있으면 클러스터별로 저장
    if (log.imageUrl) {
      if (!clusterImageUrlMap.has(clusterIndex) || log.imageUrl === '캡쳐에러발생') {
        clusterImageUrlMap.set(clusterIndex, log.imageUrl)
      }
    }

    beforeEventType = log.eventType

    eventCluster.push({
      ...log, // log의 모든 속성을 그대로 복사
      index,
      clusterIndex,
      clusterInsideIndex,
    })
  })

  return eventCluster.map((item) => ({
    ...item,
    imageUrlForCluster: clusterImageUrlMap.get(item.clusterIndex) || '',
  }))
}
