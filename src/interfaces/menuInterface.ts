/**
 * ShowMenuInLogTable 인터페이스
 * 각 필드의 표시 여부를 boolean 값으로 나타냅니다.
 */
export interface ShowMenuInLogTable {
  id: boolean // ID 표시 여부
  eventName: boolean // 이벤트 이름 표시 여부
  xpath: boolean // XPath 표시 여부
  time: boolean // 시간 표시 여부
  url: boolean // URL 표시 여부
  nodeName: boolean // 노드 이름 표시 여부
  wheelDirection: boolean // 휠 방향 표시 여부
  wheelState: boolean // 휠 상태 표시 여부
  whxy: boolean // 너비, 높이, x, y 좌표 표시 여부
  imageUrl: boolean // 테스트용 스크린샷 이미지 URL 표시 여부

  KeyboardEventState: boolean // 키보드 이벤트 상태 표시 여부
  KeyboardEventPressedKey: boolean // 키보드 이벤트 누른 키 표시 여부
  KeyboardEventKeyCode: boolean // 키보드 이벤트 키 코드 표시 여부
}
