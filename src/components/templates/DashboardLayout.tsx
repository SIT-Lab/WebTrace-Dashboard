import React from 'react'
import { COLORS } from '../../styles/colors'
import { SIZES } from '../../styles/sizes'
import Navbar from '../molecules/Navbar'
import SideMenu from '../organisms/SideMenu'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  top: 0;
  display: flex;
  flex-direction: row;
  font-family: 'Pretendard-Regular';
  height: 100%;
  width: 100%;
  background-color: ${COLORS.background};
  z-index: 1000;
`

/**
 * 스타일이 적용된 사이드 메뉴 컨테이너
 */
const Side = styled.div`
  width: ${SIZES.side_menu};
  height: 100vh;
  @media (max-width: 700px) {
    display: none; // Hide SideMenu on small screens
  }
`

/**
 * 스타일이 적용된 오른쪽(메인) 콘텐츠 영역
 */
const RightContent = styled.main`
  width: calc(100% - ${SIZES.side_menu});
  height: 100%;
  box-sizing: border-box;
  @media (max-width: 700px) {
    width: 100%; // Hide SideMenu on small screens
  }
`

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`

/**
 * DashboardLayout 컴포넌트
 * @param {React.ReactNode} props.children - 레이아웃에 포함될 자식 요소들
 */
function DashboardLayout(props: { children: React.ReactNode }) {
  const location = useLocation() // 현재 경로를 확인

  return (
    <Container>
      <Side>
        <SideMenu ownerID="xKjePzOPc1YWsUmgBMui" />
      </Side>
      <RightContent>
        {location.pathname !== '/' && (
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>
        )}
        <div style={{ backgroundColor: COLORS.background }}>{props.children}</div>
      </RightContent>
    </Container>
  )
}

export default DashboardLayout
