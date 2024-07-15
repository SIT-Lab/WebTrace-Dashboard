import { LogData } from '../interfaces/apiTypes'

/**
 * EventClusterItem 인터페이스: LogData 인터페이스를 확장하여 추가 속성을 정의
 */
export interface EventClusterItem extends LogData {
  index: number // 로그 항목의 인덱스
  clusterIndex: number // 클러스터 인덱스
  clusterInsideIndex: number // 클러스터 내부 인덱스
}

/**
 * 주어진 로그 배열을 클러스터로 분류합니다.
 * @param logArray - 클러스터로 분류할 로그 배열
 * @returns EventClusterItem 배열
 */
export const findEventCluster = (logArray: any[]): EventClusterItem[] => {
  const eventCluster: EventClusterItem[] = []
  let beforeEventName: string | undefined
  let clusterIndex = 0 // 초기값 0으로 시작
  let clusterInsideIndex = 0
  let wheelStateCount = 0 // "WheelDuring" 상태인 이벤트의 개수
  let keyboardEventCount = 0 // "KeyboardDuring" 상태인 이벤트의 개수
  let shouldStartNewCluster = false // 새 클러스터를 시작해야 하는지 여부

  logArray.forEach((log, index) => {
    if (index != 0) {
      // 첫 번째 이벤트가 아니면 클러스터 인덱스를 증가시키고 클러스터 내부 인덱스를 초기화
      if (shouldStartNewCluster || beforeEventName !== log.eventName) {
        clusterIndex++
        clusterInsideIndex = 0 // 클러스터 내부 인덱스 초기화
        shouldStartNewCluster = false // 새 클러스터 시작 플래그 초기화
      } else {
        clusterInsideIndex++
      }
    }

    if (log.eventName === 'wheel' && log.wheelState === 'WheelDuring') {
      wheelStateCount++
    } else if (log.eventName === 'KeyboardEvent' && log.KeyboardEventState === 'KeyboardDuring') {
      keyboardEventCount++
    }

    // 종료 이벤트를 확인하여 다음 이벤트를 새로운 클러스터로 시작해야 하는지 결정
    const isEndEvent =
      (log.eventName === 'wheel' && log.wheelState.split(' ')[0] === 'WheelEnd') ||
      (log.eventName === 'KeyboardEvent' && log.KeyboardEventState.split(' ')[0] === 'KeyboardEnd') ||
      log.eventName === 'mouseLeftClick' ||
      log.eventName === 'mouseRightClick' ||
      log.eventName === 'mouseWheelClick'

    // //// 종료 이벤트 확인2
    // const isEndEvent = (log.eventName === 'wheel') ||
    //   (log.eventName === 'KeyboardEvent') ||
    //   (log.eventName === 'mouseLeftClick') || (log.eventName === 'mouseRightClick') || (log.eventName === 'mouseWheelClick');

    if (isEndEvent) {
      shouldStartNewCluster = true // 다음 이벤트를 새로운 클러스터로 시작
    }

    beforeEventName = log.eventName

    eventCluster.push({
      ...log, // log의 모든 속성을 그대로 복사
      index,
      clusterIndex,
      clusterInsideIndex,
    })
  })

  return eventCluster
}
