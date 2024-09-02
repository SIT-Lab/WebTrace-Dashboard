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

    if (name === 'event state') {
      // event state 체크박스를 변경하면 scrollState와 keyboardInputState를 함께 변경
      setIsShowMenuInLogTable((prevState) => ({
        ...prevState,
        scrollState: checked,
        keyboardInputState: checked,
        state: checked,
      }))
    } else if (name in isShowMenuInLogTable) {
      setIsShowMenuInLogTable((prevState) => ({
        ...prevState,
        [name]: checked,
      }))
    }
  }

  return (
    <div>
      <StyledFieldset>
        <legend><b>Select Fields to Display</b></legend>

        {/* <CheckboxWrapper>
          <input
            type="checkbox"
            name="abstract"
            value="abstract"
            checked={isShowMenuInLogTable.abstract}
            onChange={handleCheckboxChange}
          />
          <label>abstract</label>
        </CheckboxWrapper> */}

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
            name="eventType"
            value="eventType"
            checked={isShowMenuInLogTable.eventType}
            onChange={handleCheckboxChange}
          />
          <label>event type</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="time"
            value="time"
            checked={isShowMenuInLogTable.time}
            onChange={handleCheckboxChange}
          />
          <label>event time</label>
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
            name="event state"
            value="event state"
            checked={isShowMenuInLogTable.scrollState && isShowMenuInLogTable.keyboardInputState}
            onChange={handleCheckboxChange}
          />
          <label>event state</label>
        </CheckboxWrapper>

        {/* <CheckboxWrapper>
          <input
            type="checkbox"
            name="scrollDirection"
            value="scrollDirection"
            checked={isShowMenuInLogTable.scrollDirection}
            onChange={handleCheckboxChange}
          />
          <label>scroll direction</label>
        </CheckboxWrapper> */}


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
            name="keyboardInputPressedKey"
            value="keyboardInputPressedKey"
            checked={isShowMenuInLogTable.keyboardInputPressedKey}
            onChange={handleCheckboxChange}
          />
          <label>pressed key</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="keyboardInputKeyCode"
            value="keyboardInputKeyCode"
            checked={isShowMenuInLogTable.keyboardInputKeyCode}
            onChange={handleCheckboxChange}
          />
          <label>key code</label>
        </CheckboxWrapper>
      </StyledFieldset>
    </div>
  )
}

export default TargetColumnSelector
