import { useState } from 'react'
import styled from 'styled-components'

/**
 * SwitchContainer 컴포넌트: 토글 스위치의 컨테이너
 */
const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

/**
 * Slider 컴포넌트: 토글 스위치의 슬라이더 부분
 */
const Slider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`

/**
 * Input 컴포넌트: 실제 토글 input을 숨김
 */
const Input = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #2196f3;
  }
  // 체크박스가 체크되었을 때의 스타일을 정의. 이 코드는 해당 체크박스 뒤에 오는 Slider 컴포넌트에 스타일을 적용.

  &:focus + ${Slider} {
    box-shadow: 0 0 1px #2196f3;
  }
  // 체크박스가 포커스되었을 때의 스타일을 정의. 포커스되었을 때는 Slider 컴포넌트에 박스 쉐도우 스타일이 적용.

  &:checked + ${Slider}:before {
    transform: translateX(26px);
  }
  // 체크박스가 체크되었을 때 슬라이더의 위치를 이동.
`

/**
 * ToggleSwitchProps 인터페이스: ToggleSwitch 컴포넌트의 props 정의
 */
interface ToggleSwitchProps {
  onChange: () => void
}

/**
 * ToggleSwitch 컴포넌트
 * @param {function} onChange - 토글 스위치 상태 변경 이벤트 핸들러
 */
export const ToggleSwitch = ({ onChange }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState(false)
  return (
    <SwitchContainer>
      <Input
        type="checkbox"
        checked={checked}
        onChange={() => {
          onChange()
          setChecked(!checked)
        }}
      />
      <Slider></Slider>
    </SwitchContainer>
  )
}
