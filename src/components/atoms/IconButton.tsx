import React from 'react'
import styled from 'styled-components'

/**
 * IconButton 컴포넌트의 props를 정의하는 인터페이스
 */
interface IconButtonProps {
  iconPath: string
  onClick: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

/**
 * 스타일이 적용된 이미지 버튼 컴포넌트
 */
const Btn = styled.img`
  cursor: pointer;
  padding: 8px;
`

/**
 * IconButton 컴포넌트
 * @param {string} iconPath - 아이콘 이미지의 경로
 * @param {function} onClick - 이미지 클릭 이벤트 핸들러
 */
export const IconButton = ({ iconPath, onClick }: IconButtonProps) => {
  return <Btn src={iconPath} onClick={onClick} />
}
