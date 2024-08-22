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
            {isShowMenuInLogTable.eventName ? <LogHeader>event name</LogHeader> : null}
            {/* {isShowMenuInLogTable.nodeName ? <LogHeader>nodeName</LogHeader> : null} */}
            {isShowMenuInLogTable.url ? <LogHeader>url</LogHeader> : null}
            {isShowMenuInLogTable.time ? <LogHeader>event time</LogHeader> : null}
            {isShowMenuInLogTable.wheelState || isShowMenuInLogTable.KeyboardEventState ? <LogHeader>state</LogHeader> : null}
            {isShowMenuInLogTable.wheelDirection ? <LogHeader>wheel direction</LogHeader> : null}
            {isShowMenuInLogTable.whxy ? <LogHeader>(width, height, x , y)</LogHeader> : null}
            {isShowMenuInLogTable.xpath ? <LogHeader>xpath</LogHeader> : null}
            {isShowMenuInLogTable.imageUrl ? <LogHeader>screenshot</LogHeader> : null}
            {isShowMenuInLogTable.KeyboardEventPressedKey ? <LogHeader>pressed key</LogHeader> : null}
            {isShowMenuInLogTable.KeyboardEventKeyCode ? <LogHeader>key code</LogHeader> : null}

            {logArray.length > 0 ? (
                logArray.map((l: LogData, i) => {
                    return (
                        <LogColumn key={`${i}`}>
                            {isShowMenuInLogTable.id ? <LogRow>{i}</LogRow> : null}
                            {isShowMenuInLogTable.eventName ? <LogRow>{l.eventName}</LogRow> : null}
                            {/* {isShowMenuInLogTable.nodeName ? <LogRow>{l.nodeName}</LogRow> : null} */}
                            {isShowMenuInLogTable.url ? <LogRow>{l.url}</LogRow> : null}
                            {/* {isShowMenuInLogTable.time ? <LogRow><TimeDisplay time={l.time} /></LogRow> : null} */}
                            {isShowMenuInLogTable.time ? <LogRow>{formatTime(l.time)}</LogRow> : null}
                            {isShowMenuInLogTable.wheelState || isShowMenuInLogTable.KeyboardEventState ? (
                                <LogRow>
                                    {l.wheelState !== undefined ? `${l.wheelState}` : ""}
                                    {l.KeyboardEventState !== undefined ? `${l.KeyboardEventState}` : ""}
                                </LogRow>
                            ) : null}
                            {isShowMenuInLogTable.wheelDirection ? <LogRow>{`${l.wheelDirection}`}</LogRow> : null}
                            {isShowMenuInLogTable.whxy ? <LogRow>{`(${l.w}, ${l.h}, ${l.x}, ${l.y})`}</LogRow> : null}
                            {isShowMenuInLogTable.xpath ? <LogRow>{l.xpath}</LogRow> : null}
                            {isShowMenuInLogTable.imageUrl ? (
                                <LogRow>
                                    {l.imageUrl ? (
                                        <StyledImage src={l.imageUrl} alt="Log Image" />
                                    ) : (
                                        " " // 이미지가 없을 경우 공백 문자 표시
                                    )}
                                </LogRow>
                            ) : null}
                            {isShowMenuInLogTable.KeyboardEventPressedKey ? <LogRow>{`${l.KeyboardEventPressedKey}`}</LogRow> : null}
                            {isShowMenuInLogTable.KeyboardEventKeyCode ? <LogRow>{`${l.KeyboardEventKeyCode}`}</LogRow> : null}
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
