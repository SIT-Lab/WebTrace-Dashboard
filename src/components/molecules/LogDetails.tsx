import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'
import { EventClusterItem } from '../../utils/findEventCluster'
import { formatTime } from '../../utils/formatTime'
import downIcon from '../../assets/down.svg'
import upIcon from '../../assets/up.svg'

/**
 * 스타일이 적용된 이미지 컴포넌트
 */
const StyledImage = styled.img`
  width: 100%; /* 너비를 셀 크기에 맞게 설정 */
  max-width: 400px; /* 이미지의 최대 너비를 설정 */
  height: auto; /* 높이는 자동으로 조정 */
  border-radius: 5px;
`
/**
 * 테이블 상단, 하단 바
 */
const TableBar = styled.div<{ isTop?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8f9;
  border: 1px solid ${COLORS.gray03};
  border-radius: ${({ isTop }) => (isTop ? '10px 10px 0 0' : '0px 0px 10px 10px')};
  height: 22px;
`

/**
 * 상세 정보 테이블 스타일링
 */
const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

/**
 * 상세 정보 컨테이너 스타일링
 */
const DetailsContainer = styled.div`
  position: static;
  width: calc(70% - 10px);
  margin: 0 auto; /* 중앙 정렬 */
  background-color: 'COLORS.skyblue'; /* 연한 하늘색 */
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
  border: 1px solid ${COLORS.gray03};
  font-weight: bold;
  height: auto; /* 높이를 자동으로 조정 */
  background-color: #f8f8f8f9;
`

/**
 * 테이블 행 스타일링
 */
const TableRow = styled.td`
  text-align: center;
  border: 1px solid ${COLORS.gray03};
  height: auto; /* 높이를 자동으로 조정 */
  word-break: break-word; /* 긴 내용은 자동 줄바꿈 */
  background-color: #f8f8f8f9;
`

/**
 * 테이블 헤더 행 스타일링
 */
const TableHeaderRow = styled.tr<{ hasId: boolean; columns: number; hasScreenshot: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasId, columns, hasScreenshot }) => {
    let template = hasId ? '0.2fr ' : '' // ID 컬럼 고정
    template += `repeat(${columns - 1 - (hasScreenshot ? 1 : 0)}, 1fr)` // 일반 컬럼들
    if (hasScreenshot) {
      template += ' 2fr' // 스크린샷 컬럼의 너비를 더 크게 설정
    }
    return template
  }};
`

/**
 * 삼각형 아이콘을 스타일링하는 컴포넌트
 */
const TriangleIcon = styled.div<{ isSelected: boolean }>`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: ${({ isSelected }) => (isSelected ? 'none' : '8px solid purple')};
  border-bottom: ${({ isSelected }) => (isSelected ? '8px solid purple' : 'none')};
  border-radius: 3px; /* 모서리를 둥글게 만듭니다 */
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

  let columnsCount = 0

  const firstLogEventType = filteredLogs.length > 0 ? filteredLogs[0].eventType : ''

  if (firstLogEventType === 'scroll') {
    columnsCount = [
      isShowMenuInLogTable.id,
      // isShowMenuInLogTable.eventType,
      isShowMenuInLogTable.scrollState,
      // isShowMenuInLogTable.scrollDirection,
      // isShowMenuInLogTable.imageUrl,
      isShowMenuInLogTable.time,
    ].filter(Boolean).length // 총 3개
  } else if (firstLogEventType === 'data input') {
    columnsCount = [
      isShowMenuInLogTable.id,
      // isShowMenuInLogTable.eventType,
      isShowMenuInLogTable.keyboardInputState,
      isShowMenuInLogTable.keyboardInputPressedKey,
      isShowMenuInLogTable.keyboardInputKeyCode,
      isShowMenuInLogTable.time,
      // isShowMenuInLogTable.imageUrl,
    ].filter(Boolean).length // 총 4개
  } else if (['left click', 'right click', 'wheel click'].includes(firstLogEventType)) {
    columnsCount = [
      isShowMenuInLogTable.id,
      // isShowMenuInLogTable.eventType,
      isShowMenuInLogTable.whxy,
      // isShowMenuInLogTable.imageUrl,
      isShowMenuInLogTable.time,
    ].filter(Boolean).length // 총 3개
  }

  console.log('카운트: ', columnsCount)

  let content

  if (filteredLogs.length > 0) {
    const firstLogEventType = filteredLogs[0].eventType
    const hasScreenshot = Boolean(isShowMenuInLogTable.imageUrl)

    content = (
      <>
        <DetailsTable>
          <TableBar isTop>
            <TriangleIcon isSelected={true} />
          </TableBar>
          <TableHeaderRow hasId={isShowMenuInLogTable.id} columns={columnsCount} hasScreenshot={false}>
            {isShowMenuInLogTable.id && <TableHeader>id</TableHeader>}
            {/* {isShowMenuInLogTable.eventType && <TableHeader>event type</TableHeader>} */}
            {(firstLogEventType === 'left click' ||
              firstLogEventType === 'right click' ||
              firstLogEventType === 'wheel click') &&
              isShowMenuInLogTable.whxy && <TableHeader>(width, height, x , y)</TableHeader>}
            {firstLogEventType === 'scroll' && (
              <>
                {isShowMenuInLogTable.scrollState && <TableHeader>event state</TableHeader>}
                {isShowMenuInLogTable.time && <TableHeader>event time</TableHeader>}
                {/* {isShowMenuInLogTable.scrollDirection && <TableHeader>scroll direction</TableHeader>} */}
              </>
            )}
            {firstLogEventType === 'data input' && (
              <>
                {isShowMenuInLogTable.keyboardInputState && <TableHeader>event state</TableHeader>}
                {isShowMenuInLogTable.time && <TableHeader>event time</TableHeader>}
                {isShowMenuInLogTable.keyboardInputPressedKey && <TableHeader>pressed key</TableHeader>}
                {isShowMenuInLogTable.keyboardInputKeyCode && <TableHeader>key code</TableHeader>}
              </>
            )}
            {/* {isShowMenuInLogTable.imageUrl && <TableHeader>screenshot</TableHeader>} */}
          </TableHeaderRow>
          {filteredLogs.map((log, index) => (
            <TableHeaderRow key={index} hasId={isShowMenuInLogTable.id} columns={columnsCount} hasScreenshot={false}>
              {isShowMenuInLogTable.id && <TableRow>{`${clusterIndex}.${log.clusterInsideIndex}`}</TableRow>}
              {/* {isShowMenuInLogTable.eventType && <TableRow>{log.eventType}</TableRow>}
              {(firstLogEventType === 'left click' ||
                firstLogEventType === 'right click' ||
                firstLogEventType === 'wheel click') &&
                isShowMenuInLogTable.whxy && <TableRow>{`(${log.w}, ${log.h}, ${log.x}, ${log.y})`}</TableRow>} */}
              {log.eventType === 'scroll' && (
                <>
                  {isShowMenuInLogTable.scrollState && <TableRow>{log.scrollState}</TableRow>}
                  {isShowMenuInLogTable.time && <TableRow>{formatTime(log.time)}</TableRow>}
                  {/* {isShowMenuInLogTable.scrollDirection && <TableRow>{log.scrollDirection}</TableRow>} */}
                </>
              )}
              {log.eventType === 'data input' && (
                <>
                  {isShowMenuInLogTable.keyboardInputState && <TableRow>{log.keyboardInputState}</TableRow>}
                  {isShowMenuInLogTable.time && <TableRow>{formatTime(log.time)}</TableRow>}
                  {isShowMenuInLogTable.keyboardInputPressedKey && <TableRow>{log.keyboardInputPressedKey}</TableRow>}
                  {isShowMenuInLogTable.keyboardInputKeyCode && <TableRow>{log.keyboardInputKeyCode}</TableRow>}
                </>
              )}
            </TableHeaderRow>
          ))}
          <TableBar>{/* 업아이콘 대신 공백 */}</TableBar>
        </DetailsTable>
      </>
    )
  } else {
    content = <p>No event details available.</p>
  }

  return (
    <div style={{ backgroundColor: COLORS.skyblue }}>
      <DetailsContainer>{content}</DetailsContainer>
    </div>
  )
}

export default LogDetails
