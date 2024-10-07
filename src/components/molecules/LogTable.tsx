import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { formatTime } from '../../utils/formatTime'
import { LogData } from '../../interfaces/apiTypes'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'
import { EventClusterItem } from '../../utils/findEventCluster'
import { findEventCluster } from '../../utils/findEventCluster'
import LogDetails from './LogDetails'
import greenCheckIcon from '../../assets/greencheck.svg'
import { Button } from '../atoms/Button'

/**
 * 스타일이 적용된 정보 라인 컨테이너
 */
const InfoLines = styled.div`
  display: flex;
  flex-direction: column;
`

/**
 * 스타일이 적용된 아코디언 컨테이너
 */
const AccordionContainer = styled.div``

/**
 * LogHead 컴포넌트의 props를 정의하는 인터페이스
 */
interface LogHeadProps {
  columns: number
}

/**
 * 스타일이 적용된 로그 헤더
 */
const LogHead = styled.div<LogHeadProps & { hasId: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasId, columns }) => {
    if (hasId) {
      return `0.2fr repeat(${columns - 1}, 0.8fr) 0.2fr` // ID 컬럼이 있을 때, ID는 0.2fr, 나머지는 1fr, abstract는 0.4fr
    } else {
      return `repeat(${columns}, 0.8fr) 0.2fr` // ID 컬럼이 없을 때, 나머지는 1fr, abstract는 0.4fr
    }
  }};
  border-top: 1px solid ${COLORS.gray01};
  padding: 16px;
`

/**
 * 스타일이 적용된 로그 헤더 행
 */
const LogHeadRow = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`

/**
 * LogColumn 컴포넌트의 props를 정의하는 인터페이스
 */
interface LogColumnProps {
  isSelected?: boolean
  columns: number
  eventType: string // eventType을 추가
}

/**
 * 스타일이 적용된 로그 컬럼
 */
const LogColumn = styled.tr<LogColumnProps & { hasId: boolean }>`
  cursor: ${({ eventType: eventType }) =>
    ['left click', 'wheel click', 'right click', 'control input'].includes(eventType) ? 'default' : 'pointer'};
  background-color: ${({ isSelected }) => (isSelected ? COLORS.skyblue : 'transparent')};
  display: grid;
  grid-template-columns: ${({ hasId, columns }) => {
    if (hasId) {
      return `0.2fr repeat(${columns - 1}, 0.8fr) 0.2fr` // ID 컬럼이 있을 때, ID는 0.2fr, 나머지는 1fr, abstract는 0.2fr
    } else {
      return `repeat(${columns}, 0.8fr) 0.2fr` // ID 컬럼이 없을 때, 나머지는 1fr, abstract는 0.2fr
    }
  }};
  border-top: 1px solid ${COLORS.gray01};
  padding: 16px;

  &:hover {
    background-color: ${({ eventType: eventType }) =>
    ['left click', 'wheel click', 'right click', 'control input'].includes(eventType)
      ? 'transparent'
      : '#e6e6fa'}; // 연보라색
  }
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
 * 스타일이 적용된 로그 행
 */
const LogRow = styled.td`
  word-break: break-all;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

/**
 * LogTable 컴포넌트의 props를 정의하는 인터페이스
 */
interface LogTableProps {
  isShowMenuInLogTable: ShowMenuInLogTable
  data: LogData[]
}

/**
 * 스타일이 적용된 로그 컨테이너
 */
const LogContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  border: 1px solid ${COLORS.gray02};
  cursor: pointer;
  user-select: none;
`

/**
 * LogTable 컴포넌트
 * @param {LogData[]} data - 로그 데이터 배열
 * @param {ShowMenuInLogTable} isShowMenuInLogTable - 로그 테이블에 표시할 메뉴 상태 객체
 */
const LogTable: React.FC<LogTableProps> = ({ data, isShowMenuInLogTable }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [eventClusterItems, setEventClusterItems] = useState<EventClusterItem[]>([])

  /**
   * findEventCluster 함수를 메모이제이션하여 캐싱된 값을 반환
   */
  const memoizedFindEventCluster = useCallback(() => {
    return findEventCluster(Object.values(data))
  }, [data])

  /**
   * 컴포넌트가 마운트될 때 이벤트 클러스터 항목을 설정
   */
  useEffect(() => {
    const items = memoizedFindEventCluster()
    setEventClusterItems(items)
  }, [memoizedFindEventCluster])

  /**
   * 로그 컬럼 클릭 이벤트 핸들러
   * @param {number} index - 클릭된 컬럼의 인덱스
   * @param {any} event - 이벤트 객체
   */
  const handleOptionClick = (index: number, event: any) => {
    // 'left click', 'wheel click', 'right click'은 추상화를 적용하지 않으므로 드롭다운을 펼치지 않음
    if (
      ['left click', 'wheel click', 'right click', 'control input'].includes(
        eventClusterItems[firstItemsInClusters[index]].eventType
      )
    ) {
      return // 클릭 이벤트 무시
    }

    if (selectedRowIndex === index) {
      setIsOpen(!isOpen)
      setSelectedRowIndex(null)
    } else {
      setIsOpen(true)
      setSelectedRowIndex(index)
    }
  }

  const firstItemsInClusters: number[] = []

  eventClusterItems.forEach((item, index) => {
    if (index === 0 || item.clusterIndex !== eventClusterItems[index - 1].clusterIndex) {
      firstItemsInClusters.push(index)
    }
  })

  const columnsCount = [
    isShowMenuInLogTable.id,
    isShowMenuInLogTable.eventType,
    isShowMenuInLogTable.xpath,
    isShowMenuInLogTable.whxy,
    isShowMenuInLogTable.time,
    isShowMenuInLogTable.url,
    isShowMenuInLogTable.keyboardInputKeyCode,
    isShowMenuInLogTable.imageUrl, // 스크린샷을 위한 컬럼 추가
  ].filter(Boolean).length

  /**
   * 스크린샷 버튼 클릭 이벤트 핸들러
   * @param {string} imageUrl - 이미지 URL
   */
  const handleScreenshotClick = (imageUrl: string) => {
    window.open(imageUrl, '_blank') // 새 창에서 이미지 URL 열기
  }

  return (
    <LogContainer>
      <InfoLines>
        <LogHead columns={columnsCount} hasId={isShowMenuInLogTable.id}>
          {isShowMenuInLogTable.id ? (
            <LogHeadRow>
              <span>id</span>
            </LogHeadRow>
          ) : null}
          {isShowMenuInLogTable.eventType ? <LogHeadRow>event type</LogHeadRow> : null}
          {isShowMenuInLogTable.time ? <LogHeadRow>event time</LogHeadRow> : null}
          {isShowMenuInLogTable.url ? <LogHeadRow>url</LogHeadRow> : null}
          {isShowMenuInLogTable.xpath ? <LogHeadRow>xpath</LogHeadRow> : null}
          {isShowMenuInLogTable.whxy ? <LogHeadRow>whxy</LogHeadRow> : null}
          {isShowMenuInLogTable.keyboardInputKeyCode ? <LogHeadRow>key code</LogHeadRow> : null}
          {isShowMenuInLogTable.imageUrl ? <LogHeadRow>screenshot</LogHeadRow> : null}
          <LogHeadRow /> {/* abstract 컬럼을 위한 빈 헤더 */}
        </LogHead>
      </InfoLines>

      <AccordionContainer>
        {firstItemsInClusters.length > 0 ? (
          firstItemsInClusters.map((item, index) => {
            const isSelected = index === selectedRowIndex

            return (
              <React.Fragment key={index}>
                <LogColumn
                  isSelected={isSelected}
                  columns={columnsCount}
                  hasId={isShowMenuInLogTable.id}
                  eventType={eventClusterItems[item].eventType} // 이 부분을 추가
                  onClick={(event) => handleOptionClick(index, event)}
                >
                  {isShowMenuInLogTable.id ? <LogRow>{eventClusterItems[item].clusterIndex}</LogRow> : null}
                  {isShowMenuInLogTable.eventType && (
                    <LogRow>
                      <div>
                        {eventClusterItems[item].eventType === 'scroll'
                          ? `${eventClusterItems[item].scrollDirection}`
                          : eventClusterItems[item].eventType}
                        {['left click', 'wheel click', 'right click', 'control input'].includes(
                          eventClusterItems[item].eventType
                        ) ? (
                            ''
                          ) : (
                            <>
                              <br />
                              <div style={{ color: 'purple' }}>(Abstracted)</div>
                            </>
                          )}
                      </div>
                    </LogRow>
                  )}
                  {isShowMenuInLogTable.time ? <LogRow>{formatTime(eventClusterItems[item].time)}</LogRow> : null}
                  {isShowMenuInLogTable.url ? <LogRow>{eventClusterItems[item].url}</LogRow> : null}
                  {isShowMenuInLogTable.xpath ? <LogRow>{eventClusterItems[item].xpath}</LogRow> : null}
                  {isShowMenuInLogTable.whxy && (
                    <LogRow>
                      {['left click', 'wheel click', 'right click'].includes(eventClusterItems[item].eventType)
                        ? `(${eventClusterItems[item].w}, ${eventClusterItems[item].h}, ${eventClusterItems[item].x}, ${eventClusterItems[item].y})`
                        : '-'}
                    </LogRow>
                  )}

                  {isShowMenuInLogTable.keyboardInputKeyCode && (
                    <LogRow>
                      {['control input'].includes(eventClusterItems[item].eventType)
                        ? `${eventClusterItems[item].keyboardInputKeyCode}`
                        : '-'}
                    </LogRow>
                  )}

                  {isShowMenuInLogTable.imageUrl && eventClusterItems[item].imageUrlForCluster ? (
                    <LogRow>
                      {eventClusterItems[item].imageUrlForCluster === 'screenshot capture failed' ? (
                        <>
                          {console.log(eventClusterItems[item].imageUrlForCluster)}
                          screenshot capture failed
                        </>
                      ) : eventClusterItems[item].imageUrlForCluster ? (
                        <>
                          {console.log(eventClusterItems[item].imageUrlForCluster)}
                          <Button
                            onClick={() => handleScreenshotClick(eventClusterItems[item].imageUrlForCluster!)}
                            bgColor="#800080" // 보라색 배경
                            textColor="#FFFFFF" // 하얀 글씨
                          >
                            view
                          </Button>
                        </>
                      ) : (
                        '/'
                      )}
                    </LogRow>
                  ) : isShowMenuInLogTable.imageUrl ? (
                    <LogRow>-</LogRow>
                  ) : null}
                  <LogRow>
                    {['scroll', 'data input'].includes(eventClusterItems[item].eventType) ? (
                      <TriangleIcon isSelected={isSelected} /> // 아이콘을 이미지로 렌더링
                    ) : (
                      ' ' // 조건에 맞지 않을 경우 공백 출력
                    )}
                  </LogRow>
                </LogColumn>
                {isOpen && selectedRowIndex === index && (
                  <LogDetails
                    eventClusterItems={eventClusterItems}
                    clusterIndex={selectedRowIndex}
                    isShowMenuInLogTable={isShowMenuInLogTable}
                  />
                )}
              </React.Fragment>
            )
          })
        ) : (
          <LogColumn
            columns={columnsCount}
            hasId={isShowMenuInLogTable.id}
            eventType="none" // 기본 eventType을 전달
          >
            <LogRow>No logs Found</LogRow>
          </LogColumn>
        )}
      </AccordionContainer>
    </LogContainer>
  )
}

export default LogTable
