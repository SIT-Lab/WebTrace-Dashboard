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
  width: 400px;
  height: auto;
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
  width: auto;
  height: 25px;
  border: 1px solid ${COLORS.gray02};
  font-weight: bold;
`

/**
 * 테이블 헤더 행 스타일링
 */
const TableHeaderRow = styled.tr`
  text-align: center;
  width: auto;
`

/**
 * 테이블 컬럼 스타일링
 */
const TableColumn = styled.tr<{ isSelected?: boolean }>`
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? COLORS.blue : 'transparent')};
  width: auto;
`

/**
 * 테이블 행 스타일링
 */
const TableRow = styled.td`
  text-align: center;
  width: auto;
  height: 25px;
  border: 1px solid ${COLORS.gray02};
`

/**
 * 첫 번째 컬럼 헤더 스타일링
 */
const FirstColumnHeader = styled(TableHeader)`
  width: 30%;
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

  let content

  if (filteredLogs.length > 0) {
    const firstLogEventName = filteredLogs[0].eventName

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
          <TableHeaderRow>
            {isShowMenuInLogTable.id && <FirstColumnHeader>ID</FirstColumnHeader>}
            {isShowMenuInLogTable.eventName && <TableHeader>eventName</TableHeader>}
            {isShowMenuInLogTable.nodeName && <TableHeader>nodeName</TableHeader>}
            {(firstLogEventName === 'mouseLeftClick' ||
              firstLogEventName === 'mouseRightClick' ||
              firstLogEventName === 'mouseWheelClick') &&
              isShowMenuInLogTable.whxy && <TableHeader>(width, height, x , y)</TableHeader>}
            {firstLogEventName === 'wheel' && (
              <>
                {isShowMenuInLogTable.wheelState && <TableHeader>wheelState</TableHeader>}
                {isShowMenuInLogTable.wheelDirection && <TableHeader>wheelDirection</TableHeader>}
              </>
            )}
            {firstLogEventName === 'KeyboardEvent' && (
              <>
                {isShowMenuInLogTable.KeyboardEventState && <TableHeader>KeyboardEventState</TableHeader>}
                {isShowMenuInLogTable.KeyboardEventPressedKey && <TableHeader>KeyboardEventPressedKey</TableHeader>}
                {isShowMenuInLogTable.KeyboardEventKeyCode && <TableHeader>KeyboardEventKeyCode</TableHeader>}
              </>
            )}
            {isShowMenuInLogTable.imageUrl && <TableHeader>screenshot</TableHeader>}
          </TableHeaderRow>
          {filteredLogs.map((log, index) => (
            <TableColumn key={index}>
              {isShowMenuInLogTable.id && <TableRow>{`${clusterIndex}.${log.clusterInsideIndex}`}</TableRow>}
              {isShowMenuInLogTable.eventName && <TableRow>{log.eventName}</TableRow>}
              {isShowMenuInLogTable.nodeName && <TableRow>{log.nodeName}</TableRow>}
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
            </TableColumn>
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
