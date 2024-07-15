import { ReactNode } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'

/**
 * RootContainer 컴포넌트: 모달의 가장 바깥쪽을 감싸는 컨테이너
 * @param {boolean} $isShow - 모달의 보이기/숨기기 상태를 제어하는 값
 */
const RootContainer = styled.div<{ $isShow: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: auto; /// pointer-events: auto로 설정하면 모달창이 열려있는 상태에서 배경을 클릭하여 모달을 닫을 수 있음
  visibility: ${(props) => (props.$isShow ? 'visible' : 'hidden')};
  font-size: large;
`

/**
 * ChildContainer 컴포넌트: 실제 모달의 내용을 담는 컨테이너
 */
const ChildContainer = styled.div`
  min-width: 300px;
  width: 80%;
  height: 85%;
  top: 10%;
  left: 10%;
  overflow-y: hidden;
  position: fixed;
  border-radius: 16px;
  background-color: ${COLORS.white};
  border: 2px solid ${COLORS.primary_purple};
  box-sizing: border-box;
  z-index: 9;
`

/**
 * GrayBackground 컴포넌트: 모달 뒤의 회색 배경
 */
const GrayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  cursor: pointer;
  height: 100vh;
  z-index: 8;
`

/**
 * Modal 컴포넌트의 props를 정의하는 인터페이스
 */
interface ModalProps {
  children: ReactNode
  isShow: boolean
  setIsShowModal: (isShowModal: boolean) => void
}

/**
 * Modal 컴포넌트
 * @param {ReactNode} children - 모달 안에 들어갈 내용
 * @param {boolean} isShow - 모달의 보이기/숨기기 상태
 * @param {function} setIsShowModal - 모달의 보이기/숨기기 상태를 설정하는 함수
 */
export const Modal = ({ children, isShow, setIsShowModal }: ModalProps) => {
  return (
    <RootContainer $isShow={isShow}>
      <GrayBackground
        onClick={(e) => {
          e.preventDefault()
          setIsShowModal(false)
        }}
      ></GrayBackground>
      <ChildContainer>{children}</ChildContainer>
    </RootContainer>
  )
}
