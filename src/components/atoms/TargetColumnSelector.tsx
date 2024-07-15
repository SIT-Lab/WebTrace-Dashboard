import React from 'react'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'

/**
 * TargetColumnSelector 컴포넌트의 props를 정의하는 인터페이스
 */
interface TargetColumnSelectorProp {
  isShowMenuInLogTable: ShowMenuInLogTable // 로그 테이블에 어떤 메뉴(컬럼)를 보여줄지 여부를 저장하는 객체
  setIsShowMenuInLogTable: React.Dispatch<React.SetStateAction<ShowMenuInLogTable>> // 상태를 업데이트하는 함수
}

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
      <fieldset>
        <legend>표시할 데이터를 선택하세요</legend>
        <input type="checkbox" name="id" value="id" checked={isShowMenuInLogTable.id} onChange={handleCheckboxChange} />
        <label>id</label>
        <input
          type="checkbox"
          name="eventName"
          value="eventName"
          checked={isShowMenuInLogTable.eventName}
          onChange={handleCheckboxChange}
        />
        <label>eventName</label>
        <input
          type="checkbox"
          name="xpath"
          value="xpath"
          checked={isShowMenuInLogTable.xpath}
          onChange={handleCheckboxChange}
        ></input>
        <label>xpath</label>
        <input
          type="checkbox"
          name="time"
          value="time"
          checked={isShowMenuInLogTable.time}
          onChange={handleCheckboxChange}
        ></input>
        <label>time</label>
        <input
          type="checkbox"
          name="url"
          value="url"
          checked={isShowMenuInLogTable.url}
          onChange={handleCheckboxChange}
        ></input>
        <label>url</label>
        <input
          type="checkbox"
          name="nodeName"
          value="nodeName"
          checked={isShowMenuInLogTable.nodeName}
          onChange={handleCheckboxChange}
        ></input>
        <label>nodeName</label>
        <input
          type="checkbox"
          name="wheelDirection"
          value="wheelDirection"
          checked={isShowMenuInLogTable.wheelDirection}
          onChange={handleCheckboxChange}
        ></input>
        <label>wheelDirection</label>
        <input
          type="checkbox"
          name="wheelState"
          value="wheelState"
          checked={isShowMenuInLogTable.wheelState}
          onChange={handleCheckboxChange}
        ></input>
        <label>wheelState</label>
        <input
          type="checkbox"
          name="whxy"
          value="whxy"
          checked={isShowMenuInLogTable.whxy}
          onChange={handleCheckboxChange}
        ></input>
        <label>whxy</label>
        <input
          type="checkbox"
          name="imageUrl"
          value="imageUrl"
          checked={isShowMenuInLogTable.imageUrl}
          onChange={handleCheckboxChange}
        ></input>
        <label>screenshot</label>
        <input
          type="checkbox"
          name="KeyboardEventState"
          value="KeyboardEventState"
          checked={isShowMenuInLogTable.KeyboardEventState}
          onChange={handleCheckboxChange}
        ></input>
        <label>KeyboardEventState</label>
        <input
          type="checkbox"
          name="KeyboardEventPressedKey"
          value="KeyboardEventPressedKey"
          checked={isShowMenuInLogTable.KeyboardEventPressedKey}
          onChange={handleCheckboxChange}
        ></input>
        <label>KeyboardEventPressedKey</label>
        <input
          type="checkbox"
          name="KeyboardEventKeyCode"
          value="KeyboardEventKeyCode"
          // 인터페이스에서 정의한 이름과 동일하게 맞춰야 함 -> 예) 인터페이스에 imageUrl로 정의되어 있으면 여기도 imageUrl로 해야함
          checked={isShowMenuInLogTable.KeyboardEventKeyCode}
          onChange={handleCheckboxChange}
        ></input>
        <label>KeyboardEventKeyCode</label>
      </fieldset>
    </div>
  )
}

export default TargetColumnSelector
