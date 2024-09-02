import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { formatTime } from '../../utils/formatTime'
import TimeDisplay from '../atoms/TimeDisplay'
import { LogData } from '../../interfaces/apiTypes'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'

const LogContainer = styled.table`
  border: 1px solid ${COLORS.gray02};
  width: 100%; 
  height: 100%;
  border-collapse: collapse;
`

const LogHeader = styled.th`
  border: 1px solid ${COLORS.gray02};
  width: 12.5%;
  min-width: 100px;
`

const LogColumn = styled.tr``

const LogRow = styled.td`
  word-break: break-all;
  text-align: center;
  width: 12.5%;
  border: 1px solid ${COLORS.gray02};
`

const StyledImage = styled.img`
  width: 400px; 
  height: auto; 
  border-radius: 5px; 
`

interface LogTableProps {
    isShowMenuInLogTable: ShowMenuInLogTable
    data: LogData[]
}

const LogTable: React.FC<LogTableProps> = ({ data, isShowMenuInLogTable }) => {
    const logArray = Object.values(data)

    return (
        <LogContainer>
            {isShowMenuInLogTable.id ? <LogHeader>id</LogHeader> : null}
            {isShowMenuInLogTable.eventType ? <LogHeader>event type</LogHeader> : null}
            {/* {isShowMenuInLogTable.nodeName ? <LogHeader>nodeName</LogHeader> : null} */}
            {isShowMenuInLogTable.time ? <LogHeader>event time</LogHeader> : null}
            {isShowMenuInLogTable.url ? <LogHeader>url</LogHeader> : null}
            {isShowMenuInLogTable.xpath ? <LogHeader>xpath</LogHeader> : null}
            {isShowMenuInLogTable.whxy ? <LogHeader>(width, height, x , y)</LogHeader> : null}
            {isShowMenuInLogTable.imageUrl ? <LogHeader>screenshot</LogHeader> : null}
            {isShowMenuInLogTable.scrollState || isShowMenuInLogTable.keyboardInputState ? <LogHeader>event state</LogHeader> : null}
            {/* {isShowMenuInLogTable.scrollDirection ? <LogHeader>scroll direction</LogHeader> : null} */}
            {isShowMenuInLogTable.keyboardInputPressedKey ? <LogHeader>pressed key</LogHeader> : null}
            {isShowMenuInLogTable.keyboardInputKeyCode ? <LogHeader>key code</LogHeader> : null}

            {logArray.length > 0 ? (
                logArray.map((l: LogData, i) => {
                    return (
                        <LogColumn key={`${i}`}>
                            {isShowMenuInLogTable.id ? <LogRow>{i}</LogRow> : null}
                            {isShowMenuInLogTable.eventType ? <LogRow>{l.eventType}</LogRow> : null}
                            {isShowMenuInLogTable.time ? <LogRow>{formatTime(l.time)}</LogRow> : null}
                            {isShowMenuInLogTable.url ? <LogRow>{l.url}</LogRow> : null}
                            {isShowMenuInLogTable.xpath ? <LogRow>{l.xpath}</LogRow> : null}
                            {isShowMenuInLogTable.whxy ? <LogRow>{`(${l.w}, ${l.h}, ${l.x}, ${l.y})`}</LogRow> : null}
                            {isShowMenuInLogTable.imageUrl ? (
                                <LogRow>
                                    {l.imageUrl ? (
                                        l.imageUrl === "screenshot capture failed" ? (
                                            "screenshot capture failed" // imageUrl이 "screenshot capture failed"이라면 그대로 출력
                                        ) : (
                                            <StyledImage src={l.imageUrl} alt="Log Image" /> // 그렇지 않으면 이미지를 표시
                                        )
                                    ) : (
                                        "-" // imageUrl이 없을 경우 "-"
                                    )}
                                </LogRow>
                            ) : null}
                            {isShowMenuInLogTable.scrollState || isShowMenuInLogTable.keyboardInputState ? (
                                <LogRow>
                                    {l.scrollState !== undefined ? l.scrollState : l.keyboardInputState !== undefined ? l.keyboardInputState : '-'}
                                </LogRow>
                            ) : null}
                            {/* {isShowMenuInLogTable.scrollDirection ? <LogRow>{`${l.scrollDirection}`}</LogRow> : null} */}
                            {isShowMenuInLogTable.keyboardInputPressedKey ? <LogRow>{l.keyboardInputPressedKey || '-'}</LogRow> : null}
                            {isShowMenuInLogTable.keyboardInputKeyCode ? <LogRow>{l.keyboardInputKeyCode || '-'}</LogRow> : null}
                        </LogColumn>
                    )
                })
            ) : (
                <LogColumn> <LogRow>No logs Found</LogRow></LogColumn>
            )}
        </LogContainer>
    )
}

export default LogTable
