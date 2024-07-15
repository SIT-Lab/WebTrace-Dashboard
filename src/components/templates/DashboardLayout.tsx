import React from 'react'
import { COLORS } from '../../styles/colors'
import { SIZES } from '../../styles/sizes'
import Navbar from '../molecules/Navbar'
import SideMenu from '../organisms/SideMenu'
import styled from 'styled-components'

const Container = styled.div`
  top: 0;
  display: flex;
  flex-direction: row;
  font-family: 'Pretendard-Regular';
  height: 100%;
  width: 100%;
  background-color: ${COLORS.background};
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

const Gap48 = styled.div`
  height: 48px;
`

/**
 * DashboardLayout 컴포넌트
 * @param {React.ReactNode} props.children - 레이아웃에 포함될 자식 요소들
 */
function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <Container>
      <Side>
        <SideMenu
          menu={[
            {
              name: 'Projects',
              iconPath: '/Icon.svg',
            },
          ]}
          selectedMenuIndex={0}
        />
      </Side>
      <RightContent>
        <Navbar title="Projects" />
        <Gap48 />
        <>{props.children}</>
      </RightContent>
    </Container>
  )
}

export default DashboardLayout
