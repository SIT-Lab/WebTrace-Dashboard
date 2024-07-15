import React, { ReactNode } from 'react'
import styled from 'styled-components'
import AddImg from '../../assets/add.svg'

/**
 * 마우스 클릭 이벤트를 처리하는 타입
 */
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

const Container = styled.button<{ $color: string; $fontSize: string }>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize};
  border: none;
  border-radius: 8px;
  background-color: transparent;
  border: 2px solid ${({ $color }) => $color};
  padding: 8px;
  display: flex;
  align-items: center;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
`
const TextArea = styled.span`
  padding: 4px 8px 4px 4px;
`

const AddIcon = styled.img``

/**
 * AddButton 컴포넌트의 props를 정의하는 인터페이스
 */
interface AddButtonProps {
  text: string
  color: string
  fontSize?: string
  onClick: (event: ButtonClickEvent) => void
}

/**
 * AddButton 컴포넌트
 * @param {string} text - 버튼에 표시될 텍스트
 * @param {string} color - 버튼의 색상
 * @param {string} [fontSize='16px'] - 텍스트의 폰트 크기
 * @param {function} onClick - 버튼 클릭 이벤트 핸들러
 */
export const AddButton = ({ text, color = 'gray', fontSize = '16px', onClick }: AddButtonProps) => {
  return (
    <Container type="button" onClick={onClick} $color={color} $fontSize={fontSize}>
      {<TextArea>{text}</TextArea>}
      <AddIcon src={AddImg} color={color}></AddIcon>
    </Container>
  )
}
