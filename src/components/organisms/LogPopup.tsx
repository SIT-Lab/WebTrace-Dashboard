import React, { useState } from 'react'
import LogTable from '../molecules/LogTable'
import { LogArray, LogData } from '../../interfaces/apiTypes'
import { styled } from 'styled-components'
import { COLORS } from '../../styles/colors'
import { Modal } from '../molecules/Modal'
import addIcon from '../../assets/add.svg'
import csvIcon from '../../assets/csv.png'
import { downloadLogDataCSV } from '../../utils/downloadLogData'
import TargetColumnSelector from '../atoms/TargetColumnSelector'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'
import UnAbstractTable from '../molecules/UnAbstractTable'

const Container = styled.div`
  margin: 16px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow-y: hidden;
  height: 100%;
`

/**
 * 스타일이 적용된 헤더 컨테이너
 */
const HeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${COLORS.white};
  z-index: 10;
  padding: 16px 0;
`

/**
 * 버튼들을 묶는 새로운 컨테이너
 */
const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8%;
  align-items: center;
`

const ButtonBase = styled.button`
  border-radius: 12px;
  border: 1px solid ${COLORS.gray02};
  background-color: transparent;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  height: 44%; /* 동일한 높이 설정 */
  margin-right: 10px;
`

const DownloadButton = styled(ButtonBase)`
  max-width: 150px;
`

const RemoveAbstractionButton = styled(ButtonBase)`
  max-width: 150px;
  padding-left: 20px;
`

const IconInButton = styled.img`
`

/**
 * 스타일이 적용된 콘텐츠 영역
 */
const Content = styled.div`
  margin-top: 10px;
  overflow-y: auto;
  width: 100%;
`

const RemoveAbstractionCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  border: 1px solid ${COLORS.gray02};
  border-radius: 4px;
  display: inline-block;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #2196f3;
  }
`
const CheckboxLabel = styled.span`
  padding-left: 8px;
`

/**
 * LogPopup 컴포넌트의 props를 정의하는 인터페이스
 */
interface LogPopupProps {
  logs: LogArray
  isShowModal: boolean
  setIsShowModal: (isShowModal: boolean) => void
}

/**
 * LogPopup 컴포넌트
 * @param {LogArray} logs - 로그 데이터 배열
 * @param {boolean} isShowModal - 모달의 보이기/숨기기 상태
 * @param {function} setIsShowModal - 모달의 보이기/숨기기 상태를 설정하는 함수
 */
function LogPopup({ logs, isShowModal, setIsShowModal }: LogPopupProps) {
  const [isShowMenuInLogTable, setIsShowMenuInLogTable] = useState<ShowMenuInLogTable>({
    id: true,
    eventType: true,
    // nodeName: true,
    url: true,
    time: true,
    scrollState: true,
    scrollDirection: true,
    whxy: true,
    xpath: true,
    imageUrl: true,
    keyboardInputState: true,
    keyboardInputPressedKey: true,
    keyboardInputKeyCode: true,
  })

  const [isAbstract, setIsAbstract] = useState<boolean>(false)

  const handleCheckboxChange = () => {
    setIsAbstract(!isAbstract)
  }

  return (
    <Modal isShow={isShowModal} setIsShowModal={setIsShowModal}>
      <Container>
        <HeaderCont>
          <TargetColumnSelector
            isShowMenuInLogTable={isShowMenuInLogTable}
            setIsShowMenuInLogTable={setIsShowMenuInLogTable}
          ></TargetColumnSelector>

          <ButtonGroupContainer>
            <RemoveAbstractionButton onClick={handleCheckboxChange}>
              <RemoveAbstractionCheckbox checked={isAbstract} onChange={handleCheckboxChange} />
              <CheckboxLabel>Remove Abstraction</CheckboxLabel>
            </RemoveAbstractionButton>

            <DownloadButton onClick={() => { downloadLogDataCSV(logs.data, 'logdata.csv') }}>
              <IconInButton src={csvIcon} style={{ width: '30px', height: '30px', marginRight: '20px' }} />
              Download CSV
            </DownloadButton>
          </ButtonGroupContainer>
        </HeaderCont>

        <Content>
          {!isAbstract ? (
            <LogTable data={logs.data} isShowMenuInLogTable={isShowMenuInLogTable} />
          ) : (
            <UnAbstractTable data={logs.data} isShowMenuInLogTable={isShowMenuInLogTable} />
          )}
        </Content>

      </Container>
    </Modal>
  )
}

export default LogPopup
