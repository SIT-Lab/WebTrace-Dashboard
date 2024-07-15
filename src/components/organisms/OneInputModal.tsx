import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../molecules/Modal'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'

/**
 * OneInputModal 컴포넌트의 props를 정의하는 인터페이스
 */
interface OneInputModalProps {
  label: string
  isShowModal: boolean
  placeholder: string
  buttonText: string
  setIsShowModal: (isShow: boolean) => void
  sendInputValue: (value: string) => void
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Form = styled.form`
  padding: 16px;
`

const Label = styled.label`
  font-size: 16px;
  padding: 16px 16px 0px 20px;
`

/**
 * OneInputModal 컴포넌트
 * @param {OneInputModalProps} props - OneInputModal 컴포넌트에 전달될 props
 * @param {string} props.label - 입력 필드의 레이블
 * @param {boolean} props.isShowModal - 모달의 보이기/숨기기 상태
 * @param {string} props.placeholder - 입력 필드의 플레이스홀더
 * @param {string} props.buttonText - 버튼에 표시될 텍스트
 * @param {function} props.setIsShowModal - 모달의 보이기/숨기기 상태를 설정하는 함수
 * @param {function} props.sendInputValue - 입력 필드의 값을 전송하는 함수
 */
export const OneInputModal = ({
  label,
  isShowModal,
  setIsShowModal,
  sendInputValue,
  placeholder,
  buttonText,
}: OneInputModalProps) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Modal isShow={isShowModal} setIsShowModal={setIsShowModal}>
      <Container>
        <Label>{label}</Label>
        <Form>
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            type="text"
            placeholder={placeholder}
          />
          <Button onClick={() => sendInputValue(inputValue)}>{buttonText}</Button>
        </Form>
      </Container>
    </Modal>
  )
}
