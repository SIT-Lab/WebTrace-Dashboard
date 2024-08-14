import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { formatTime } from '../../utils/formatTime'
import { LogData } from '../../interfaces/apiTypes'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'
import { EventClusterItem } from '../../utils/findEventCluster'
import { findEventCluster } from '../../utils/findEventCluster'
import LogDetails from './LogDetails'
import greenCheckIcon from '../../assets/greencheck.svg';

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
const LogHead = styled.div<LogHeadProps & { hasAbstract: boolean, hasId: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasAbstract, hasId, columns }) => {
    if (hasAbstract && hasId) {
      return `0.5fr 0.5fr repeat(${columns - 2}, 1fr)`; // abstract와 id가 모두 있을 때
    } else if (hasAbstract) {
      return `0.5fr repeat(${columns - 1}, 1fr)`; // abstract만 있을 때
    } else if (hasId) {
      return `0.5fr repeat(${columns - 1}, 1fr)`; // id만 있을 때
    } else {
      return `repeat(${columns}, 1fr)`; // 아무 것도 없을 때
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
  font-size: large;
`

/**
 * LogColumn 컴포넌트의 props를 정의하는 인터페이스
 */
interface LogColumnProps {
  isSelected?: boolean
  columns: number
}

/**
 * 스타일이 적용된 로그 컬럼
 */
const LogColumn = styled.tr<LogColumnProps & { hasAbstract: boolean, hasId: boolean }>`
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? COLORS.blue : 'transparent')};
  display: grid;
  grid-template-columns: ${({ hasAbstract, hasId, columns }) => {
    if (hasAbstract && hasId) {
      return `0.5fr 0.5fr repeat(${columns - 2}, 1fr)`; // abstract와 id가 모두 있을 때
    } else if (hasAbstract) {
      return `0.5fr repeat(${columns - 1}, 1fr)`; // abstract만 있을 때
    } else if (hasId) {
      return `0.5fr repeat(${columns - 1}, 1fr)`; // id만 있을 때
    } else {
      return `repeat(${columns}, 1fr)`; // 아무 것도 없을 때
    }
  }};
  border-top: 1px solid ${COLORS.gray01};
  padding: 16px;
`

/**
 * 스타일이 적용된 로그 행
 */
const LogRow = styled.td`
  word-break: break-all;
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
    isShowMenuInLogTable.abstract,
    isShowMenuInLogTable.id,
    isShowMenuInLogTable.eventName,
    isShowMenuInLogTable.xpath,
    isShowMenuInLogTable.time,
    isShowMenuInLogTable.url,
  ].filter(Boolean).length

  return (
    <LogContainer>
      <InfoLines>
        <LogHead columns={columnsCount} hasAbstract={isShowMenuInLogTable.abstract} hasId={isShowMenuInLogTable.id}>
          {isShowMenuInLogTable.abstract ? (<LogHeadRow ><span>abstract</span></LogHeadRow>) : null}
          {isShowMenuInLogTable.id ? (<LogHeadRow><span>ID</span></LogHeadRow>) : null}
          {isShowMenuInLogTable.eventName ? <LogHeadRow>eventName</LogHeadRow> : null}
          {isShowMenuInLogTable.xpath ? <LogHeadRow>xpath</LogHeadRow> : null}
          {isShowMenuInLogTable.time ? <LogHeadRow>time</LogHeadRow> : null}
          {isShowMenuInLogTable.url ? <LogHeadRow>url</LogHeadRow> : null}
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
                  hasAbstract={isShowMenuInLogTable.abstract}
                  hasId={isShowMenuInLogTable.id}
                  onClick={(event) => handleOptionClick(index, event)}
                >
                  {isShowMenuInLogTable.abstract ? (
                    <LogRow>
                      {['wheel', 'KeyboardEvent'].includes(eventClusterItems[item].eventName) ? (
                        <img src={greenCheckIcon} alt="Green Check Icon" width={20} height={20} /> // 아이콘을 이미지로 렌더링
                      ) : (
                        " " // 조건에 맞지 않을 경우 공백 출력
                      )}
                    </LogRow>
                  ) : null}
                  {isShowMenuInLogTable.id ? <LogRow>{eventClusterItems[item].clusterIndex}</LogRow> : null}
                  {isShowMenuInLogTable.eventName && (
                    <LogRow>
                      {eventClusterItems[item].eventName === 'wheel'
                        ? `${eventClusterItems[item].wheelDirection}`
                        : eventClusterItems[item].eventName}
                      {['mouseLeftClick', 'mouseWheelClick', 'mouseRightClick', 'Wheel'].includes(
                        eventClusterItems[item].eventName
                      )
                        ? ''
                        : ' 데이터셋'}
                    </LogRow>
                  )}
                  {isShowMenuInLogTable.xpath ? <LogRow>{eventClusterItems[item].xpath}</LogRow> : null}
                  {isShowMenuInLogTable.time ? <LogRow>{formatTime(eventClusterItems[item].time)}</LogRow> : null}
                  {isShowMenuInLogTable.url ? <LogRow>{eventClusterItems[item].url}</LogRow> : null}
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
          <LogColumn columns={columnsCount} hasAbstract={isShowMenuInLogTable.abstract} hasId={isShowMenuInLogTable.id}>
            <LogRow>No logs Found</LogRow>
          </LogColumn>
        )}
      </AccordionContainer>
    </LogContainer>
  )
}

export default LogTable
