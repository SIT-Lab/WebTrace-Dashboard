import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'
import { EventClusterItem } from '../../utils/findEventCluster'
import downIcon from '../../assets/down.svg'

/**
 * 스타일이 적용된 이미지 컴포넌트
 */
const StyledImage = styled.img`
  width: 100%;      /* 너비를 셀 크기에 맞게 설정 */
  max-width: 400px; /* 이미지의 최대 너비를 설정 */
  height: auto;     /* 높이는 자동으로 조정 */
  border-radius: 5px;
`

/**
 * 상세 정보 테이블 스타일링
 */
const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f8f8f8da;
`

/**
 * 상세 정보 컨테이너 스타일링
 */
const DetailsContainer = styled.div`
  position: static;
  width: calc(100% - 10px);
  background-color: ${COLORS.blue};
  max-height: 700px;
  overflow-x: auto;
  overflow-y: auto;
  z-index: 10;
  padding: 4px;
`

/**
 * 테이블 헤더 스타일링
 */
const TableHeader = styled.th`
  text-align: center;
  border: 1px solid ${COLORS.gray02};
  font-weight: bold;
  height: auto; /* 높이를 자동으로 조정 */
`

/**
 * 테이블 행 스타일링
 */
const TableRow = styled.td`
  text-align: center;
  border: 1px solid ${COLORS.gray02};
  height: auto; /* 높이를 자동으로 조정 */
  word-break: break-word; /* 긴 내용은 자동 줄바꿈 */
`

/**
 * 테이블 헤더 행 스타일링
 */
const TableHeaderRow = styled.tr<{ hasId: boolean; columns: number; hasScreenshot: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasId, columns, hasScreenshot }) => {
    let template = hasId ? `0.2fr ` : ``; // ID 컬럼 고정
    template += `repeat(${columns - 1 - (hasScreenshot ? 1 : 0)}, 1fr)`; // 일반 컬럼들
    if (hasScreenshot) {
      template += ` 2fr`; // 스크린샷 컬럼의 너비를 더 크게 설정
    }
    return template;
  }};
`

/**
 * DropdownDetails 컴포넌트의 props를 정의하는 인터페이스
 */
interface DropdownDetailsProps {
  eventClusterItems: EventClusterItem[]
  clusterIndex: number | null
  isShowMenuInLogTable: ShowMenuInLogTable
}

/**
 * DropdownDetails 컴포넌트
 * @param {EventClusterItem[]} eventClusterItems - 이벤트 클러스터 항목들
 * @param {number | null} clusterIndex - 선택된 클러스터의 인덱스
 * @param {ShowMenuInLogTable} isShowMenuInLogTable - 로그 테이블에 표시할 메뉴 상태 객체
 */
const LogDetails: React.FC<DropdownDetailsProps> = ({ eventClusterItems, clusterIndex, isShowMenuInLogTable }) => {
  if (!eventClusterItems.length || clusterIndex === null) return null

  const filteredLogs = eventClusterItems.filter((log) => log.clusterIndex === clusterIndex)

  let columnsCount = 0;

  const firstLogEventName = filteredLogs.length > 0 ? filteredLogs[0].eventName : '';

  if (firstLogEventName === 'wheel') {
    columnsCount = [
      isShowMenuInLogTable.id,
      isShowMenuInLogTable.eventName,
      isShowMenuInLogTable.wheelState,
      isShowMenuInLogTable.wheelDirection,
      isShowMenuInLogTable.imageUrl,
    ].filter(Boolean).length; // 총 5개
  } else if (firstLogEventName === 'KeyboardEvent') {
    columnsCount = [
      isShowMenuInLogTable.id,
      isShowMenuInLogTable.eventName,
      isShowMenuInLogTable.KeyboardEventState,
      isShowMenuInLogTable.KeyboardEventPressedKey,
      isShowMenuInLogTable.KeyboardEventKeyCode,
      isShowMenuInLogTable.imageUrl,
    ].filter(Boolean).length; // 총 6개
  } else if (['mouseLeftClick', 'mouseRightClick', 'mouseWheelClick'].includes(firstLogEventName)) {
    columnsCount = [
      isShowMenuInLogTable.id,
      isShowMenuInLogTable.eventName,
      isShowMenuInLogTable.whxy,
      isShowMenuInLogTable.imageUrl,
    ].filter(Boolean).length; // 총 4개
  }

  console.log("카운트: ", columnsCount);

  let content

  if (filteredLogs.length > 0) {
    const firstLogEventName = filteredLogs[0].eventName
    const hasScreenshot = Boolean(isShowMenuInLogTable.imageUrl);

    content = (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f8f8f9',
            borderRadius: '10px 10px 0 0',
          }}
        >
          <img src={downIcon} alt="Toggle" />
        </div>
        <DetailsTable>
          <TableHeaderRow hasId={isShowMenuInLogTable.id} columns={columnsCount} hasScreenshot={hasScreenshot}>
            {isShowMenuInLogTable.id && <TableHeader>id</TableHeader>}
            {isShowMenuInLogTable.eventName && <TableHeader>event name</TableHeader>}
            {(firstLogEventName === 'mouseLeftClick' ||
              firstLogEventName === 'mouseRightClick' ||
              firstLogEventName === 'mouseWheelClick') &&
              isShowMenuInLogTable.whxy && <TableHeader>(width, height, x , y)</TableHeader>}
            {firstLogEventName === 'wheel' && (
              <>
                {isShowMenuInLogTable.wheelState && <TableHeader>state</TableHeader>}
                {isShowMenuInLogTable.wheelDirection && <TableHeader>wheel direction</TableHeader>}
              </>
            )}
            {firstLogEventName === 'KeyboardEvent' && (
              <>
                {isShowMenuInLogTable.KeyboardEventState && <TableHeader>state</TableHeader>}
                {isShowMenuInLogTable.KeyboardEventPressedKey && <TableHeader>pressed key</TableHeader>}
                {isShowMenuInLogTable.KeyboardEventKeyCode && <TableHeader>key code</TableHeader>}
              </>
            )}
            {isShowMenuInLogTable.imageUrl && <TableHeader>screenshot</TableHeader>}
          </TableHeaderRow>
          {filteredLogs.map((log, index) => (
            <TableHeaderRow key={index} hasId={isShowMenuInLogTable.id} columns={columnsCount} hasScreenshot={hasScreenshot}>
              {isShowMenuInLogTable.id && <TableRow>{`${clusterIndex}.${log.clusterInsideIndex}`}</TableRow>}
              {isShowMenuInLogTable.eventName && <TableRow>{log.eventName}</TableRow>}
              {(firstLogEventName === 'mouseLeftClick' ||
                firstLogEventName === 'mouseRightClick' ||
                firstLogEventName === 'mouseWheelClick') &&
                isShowMenuInLogTable.whxy && <TableRow>{`(${log.w}, ${log.h}, ${log.x}, ${log.y})`}</TableRow>}
              {log.eventName === 'wheel' && (
                <>
                  {isShowMenuInLogTable.wheelState && <TableRow>{log.wheelState}</TableRow>}
                  {isShowMenuInLogTable.wheelDirection && <TableRow>{log.wheelDirection}</TableRow>}
                </>
              )}
              {log.eventName === 'KeyboardEvent' && (
                <>
                  {isShowMenuInLogTable.KeyboardEventState && <TableRow>{log.KeyboardEventState}</TableRow>}
                  {isShowMenuInLogTable.KeyboardEventPressedKey && <TableRow>{log.KeyboardEventPressedKey}</TableRow>}
                  {isShowMenuInLogTable.KeyboardEventKeyCode && <TableRow>{log.KeyboardEventKeyCode}</TableRow>}
                </>
              )}
              {log.imageUrl === '캡쳐에러발생' && isShowMenuInLogTable.imageUrl && (
                <TableRow>{'캡쳐에러발생'}</TableRow>
              )}
              {log.imageUrl !== '캡쳐에러발생' && isShowMenuInLogTable.imageUrl && (
                <TableRow>
                  <StyledImage src={log.imageUrl} />
                </TableRow>
              )}
            </TableHeaderRow>
          ))}
        </DetailsTable>
      </>
    )
  } else {
    content = <p>No event details available.</p>
  }

  return (
    <div>
      <DetailsContainer>{content}</DetailsContainer>
    </div>
  )
}

export default LogDetails