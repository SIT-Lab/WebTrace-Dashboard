import styled from 'styled-components'
import { COLORS } from '../../styles/colors'

/**
 * Container 컴포넌트: 네비게이션 바의 스타일을 정의하는 컨테이너
 */
const Container = styled.div`
  background-color: ${COLORS.white};
  padding: 16px;
  width: 100%;
  position: fixed;
  top: 0;
`

/**
 * NavbarProps 인터페이스: Navbar 컴포넌트의 props를 정의
 */
export interface NavbarProps {
  title: string
}

/**
 * Navbar 컴포넌트
 * @param {NavbarProps} props - 네비게이션 바에 전달될 props
 * @param {string} props.title - 네비게이션 바에 표시될 제목
 */
function Navbar(props: NavbarProps) {
  return <Container>{props.title}</Container>
}

export default Navbar
