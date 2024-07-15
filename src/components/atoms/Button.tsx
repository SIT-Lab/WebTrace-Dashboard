import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CSSProperties } from 'react'

/**
 * 마우스 클릭 이벤트를 처리하는 타입
 */
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

const Container = styled.button`
  color: #43454e;
  background-color: #f4f7fa;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  height: fit-content;
`

/**
 * Button 컴포넌트의 props를 정의하는 인터페이스
 */
interface ButtonProps {
  text?: string
  children?: ReactNode
  fontSize?: string
  style?: CSSProperties
  onClick: (event: ButtonClickEvent) => void
}

/**
 * Button 컴포넌트
 * @param {string} [text] - 버튼에 표시될 텍스트 (선택적)
 * @param {ReactNode} [children] - 버튼의 자식 요소 (선택적)
 * @param {string} [fontSize] - 텍스트의 폰트 크기 (선택적)
 * @param {CSSProperties} [style] - 추가적인 스타일 (선택적)
 * @param {function} onClick - 버튼 클릭 이벤트 핸들러
 */
export const Button = ({ children, text, fontSize, onClick }: ButtonProps) => {
  return (
    <Container type="button" onClick={onClick}>
      {text ? <span>{text}</span> : children}
    </Container>
  )
}
