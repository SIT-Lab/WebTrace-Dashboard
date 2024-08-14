import React from 'react'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'
import styled from 'styled-components'

/**
 * TargetColumnSelector 컴포넌트의 props를 정의하는 인터페이스
 */
interface TargetColumnSelectorProp {
  isShowMenuInLogTable: ShowMenuInLogTable // 로그 테이블에 어떤 메뉴(컬럼)를 보여줄지 여부를 저장하는 객체
  setIsShowMenuInLogTable: React.Dispatch<React.SetStateAction<ShowMenuInLogTable>> // 상태를 업데이트하는 함수
}

/**
 * 스타일이 적용된 필드셋
 */
const StyledFieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 70%;
  padding: 10px; /* 여백 추가 */
  box-sizing: border-box; /* padding이 너비에 포함되도록 설정 */
`

/**
 * 스타일이 적용된 체크박스와 레이블의 컨테이너
 */
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`

/**
 * TargetColumnSelector 컴포넌트
 * @param {ShowMenuInLogTable} isShowMenuInLogTable - 로그 테이블에 표시할 컬럼의 상태 객체
 * @param {function} setIsShowMenuInLogTable - 로그 테이블에 표시할 컬럼의 상태를 업데이트하는 함수
 */
const TargetColumnSelector: React.FC<TargetColumnSelectorProp> = ({
  isShowMenuInLogTable,
  setIsShowMenuInLogTable,
}) => {
  /**
   * 체크박스의 변경 이벤트를 처리하는 함수
   * @param {React.ChangeEvent<HTMLInputElement>} event - 체크박스 변경 이벤트 객체
   */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target

    if (name in isShowMenuInLogTable) {
      setIsShowMenuInLogTable((prevState) => ({
        ...prevState,
        [name]: checked,
      }))
    }
  }

  return (
    <div>
      <StyledFieldset>
        <legend>표시할 데이터를 선택하세요</legend>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="abstract"
            value="abstract"
            checked={isShowMenuInLogTable.abstract}
            onChange={handleCheckboxChange}
          />
          <label>abstract</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="id"
            value="id"
            checked={isShowMenuInLogTable.id}
            onChange={handleCheckboxChange}
          />
          <label>id</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="eventName"
            value="eventName"
            checked={isShowMenuInLogTable.eventName}
            onChange={handleCheckboxChange}
          />
          <label>eventName</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="xpath"
            value="xpath"
            checked={isShowMenuInLogTable.xpath}
            onChange={handleCheckboxChange}
          />
          <label>xpath</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="time"
            value="time"
            checked={isShowMenuInLogTable.time}
            onChange={handleCheckboxChange}
          />
          <label>time</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="url"
            value="url"
            checked={isShowMenuInLogTable.url}
            onChange={handleCheckboxChange}
          />
          <label>url</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="nodeName"
            value="nodeName"
            checked={isShowMenuInLogTable.nodeName}
            onChange={handleCheckboxChange}
          />
          <label>nodeName</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="wheelDirection"
            value="wheelDirection"
            checked={isShowMenuInLogTable.wheelDirection}
            onChange={handleCheckboxChange}
          />
          <label>wheelDirection</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="wheelState"
            value="wheelState"
            checked={isShowMenuInLogTable.wheelState}
            onChange={handleCheckboxChange}
          />
          <label>wheelState</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="whxy"
            value="whxy"
            checked={isShowMenuInLogTable.whxy}
            onChange={handleCheckboxChange}
          />
          <label>whxy</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="imageUrl"
            value="imageUrl"
            checked={isShowMenuInLogTable.imageUrl}
            onChange={handleCheckboxChange}
          />
          <label>screenshot</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="KeyboardEventState"
            value="KeyboardEventState"
            checked={isShowMenuInLogTable.KeyboardEventState}
            onChange={handleCheckboxChange}
          />
          <label>KeyboardEventState</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="KeyboardEventPressedKey"
            value="KeyboardEventPressedKey"
            checked={isShowMenuInLogTable.KeyboardEventPressedKey}
            onChange={handleCheckboxChange}
          />
          <label>KeyboardEventPressedKey</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="KeyboardEventKeyCode"
            value="KeyboardEventKeyCode"
            checked={isShowMenuInLogTable.KeyboardEventKeyCode}
            onChange={handleCheckboxChange}
          />
          <label>KeyboardEventKeyCode</label>
        </CheckboxWrapper>

      </StyledFieldset>
    </div>
  )
}

export default TargetColumnSelector
