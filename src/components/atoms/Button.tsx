import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CSSProperties } from 'react'

/**
 * 마우스 클릭 이벤트를 처리하는 타입
 */
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

/**
 * 스타일이 적용된 버튼 컴포넌트
 */
const Container = styled.button<{
  bgColor?: string
  textColor?: string
  fontSize?: string
  borderRadius?: string
}>`
  color: ${({ textColor }) => textColor || '#43454e'};
  background-color: ${({ bgColor }) => bgColor || '#f4f7fa'};
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  padding: 8px;
  cursor: pointer;
  height: fit-content;
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
`

/**
 * Button 컴포넌트의 props를 정의하는 인터페이스
 */
interface ButtonProps {
  text?: string
  children?: ReactNode
  fontSize?: string
  style?: CSSProperties
  bgColor?: string
  textColor?: string
  borderRadius?: string
  onClick: (event: ButtonClickEvent) => void
}

/**
 * Button 컴포넌트
 * @param {string} [text] - 버튼에 표시될 텍스트 (선택적)
 * @param {ReactNode} [children] - 버튼의 자식 요소 (선택적)
 * @param {string} [fontSize] - 텍스트의 폰트 크기 (선택적)
 * @param {CSSProperties} [style] - 추가적인 스타일 (선택적)
 * @param {string} [bgColor] - 버튼의 배경색 (선택적)
 * @param {string} [textColor] - 버튼의 글자색 (선택적)
 * @param {string} [borderRadius] - 버튼의 테두리 반경 (선택적)
 * @param {function} onClick - 버튼 클릭 이벤트 핸들러
 */
export const Button = ({
  children,
  text,
  fontSize,
  bgColor,
  textColor,
  borderRadius,
  style,
  onClick,
}: ButtonProps) => {
  return (
    <Container
      type="button"
      onClick={onClick}
      fontSize={fontSize}
      bgColor={bgColor}
      textColor={textColor}
      borderRadius={borderRadius}
      style={style}
    >
      {text ? <span>{text}</span> : children}
    </Container>
  )
}
