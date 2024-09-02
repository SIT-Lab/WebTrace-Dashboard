/**
 * ShowMenuInLogTable 인터페이스
 * 각 필드의 표시 여부를 boolean 값으로 나타냅니다.
 */
export interface ShowMenuInLogTable {
  // abstract: boolean //추상화 여부
  id: boolean // ID 표시 여부
  eventType: boolean // 이벤트 이름 표시 여부
  xpath: boolean // XPath 표시 여부
  time: boolean // 시간 표시 여부
  url: boolean // URL 표시 여부
  // nodeName: boolean // 노드 이름 표시 여부
  scrollDirection: boolean // 스크롤 방향 표시 여부
  scrollState: boolean // 스크롤 상태 표시 여부
  whxy: boolean // 너비, 높이, x, y 좌표 표시 여부
  imageUrl: boolean // 테스트용 스크린샷 이미지 URL 표시 여부

  keyboardInputState: boolean // 키보드 입력 상태 표시 여부
  keyboardInputPressedKey: boolean // 키보드 입력 누른 키 표시 여부
  keyboardInputKeyCode: boolean // 키보드 입력 키 코드 표시 여부
}
