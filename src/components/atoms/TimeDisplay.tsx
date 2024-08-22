import React from 'react';

/**
 * TimeDisplay 컴포넌트의 props를 정의하는 인터페이스
 */
interface TimeDisplayProps {
  time: any;
}

/**
 * TimeDisplay 컴포넌트
 * @param {any} time - 포맷할 시간. 밀리초 단위의 숫자 또는 날짜 객체를 받아들입니다.
 * @returns 포맷된 시간 JSX 요소.
 */
const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
  const now = new Date(time);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const grayStyle = { color: 'gray' };

  return (
    <>
      {hours.toString().padStart(2, '0')}
      <span style={grayStyle}>h </span>
      {minutes.toString().padStart(2, '0')}
      <span style={grayStyle}>m </span>
      {seconds.toString().padStart(2, '0')}
      <span style={grayStyle}>s</span>
    </>
  );
};

export default TimeDisplay;
