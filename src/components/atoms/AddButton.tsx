import React from 'react'
import styled from 'styled-components'
import AddImg from '../../assets/add.svg'

/**
 * 마우스 클릭 이벤트를 처리하는 타입
 */
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

const Container = styled.button<{
  $color: string
  $fontSize: string
  $height: string
  $width: string
  $borderRadius: string
}>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize};
  border: none;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background-color: transparent;
  border: 2px solid ${({ $color }) => $color};
  padding: 8px;
  display: flex;
  justify-content: center; /* 텍스트와 아이콘을 가운데 정렬 */
  align-items: center;
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  cursor: pointer;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  height?: string
  width?: string
  borderRadius?: string
  onClick: (event: ButtonClickEvent) => void
}

/**
 * AddButton 컴포넌트
 * @param {string} text - 버튼에 표시될 텍스트
 * @param {string} color - 버튼의 색상
 * @param {string} [fontSize='16px'] - 텍스트의 폰트 크기
 * @param {string} [height='auto'] - 버튼의 높이
 * @param {string} [width='fit-content'] - 버튼의 너비
 * @param {string} [borderRadius='8px'] - 버튼의 보더 레디어스 (굴곡)
 * @param {function} onClick - 버튼 클릭 이벤트 핸들러
 */
export const AddButton = ({
  text,
  color = 'gray',
  fontSize = '16px',
  height = 'auto',
  width = 'fit-content',
  borderRadius = '8px',
  onClick,
}: AddButtonProps) => {
  return (
    <Container
      type="button"
      onClick={onClick}
      $color={color}
      $fontSize={fontSize}
      $height={height}
      $width={width}
      $borderRadius={borderRadius}
    >
      <ContentWrapper>
        <TextArea>{text}</TextArea>
        <AddIcon src={AddImg} color={color} />
      </ContentWrapper>
    </Container>
  )
}
