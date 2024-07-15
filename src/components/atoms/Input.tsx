import styled from 'styled-components'
import React, { ChangeEvent } from 'react'
import { COLORS } from '../../styles/colors'

/**
 * 스타일이 적용된 입력 필드 컴포넌트
 */
const StyledInput = styled.input`
  border-color: ${COLORS.primary_purple};
  padding: 8px;
  min-width: 256px;
  border-radius: 8px;
`

/**
 * Input 컴포넌트의 props를 정의하는 인터페이스
 */
interface InputProps {
  value: string
  type: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 컴포넌트
 * @param {string} value - 입력 필드의 값
 * @param {string} type - 입력 필드의 타입
 * @param {string} placeholder - 입력 필드의 플레이스홀더
 * @param {function} onChange - 입력 값 변경 이벤트 핸들러
 */
export const Input = ({ type, value, onChange, placeholder }: InputProps) => {
  return <StyledInput value={value} onChange={onChange} type={type} placeholder={placeholder}></StyledInput>
}
