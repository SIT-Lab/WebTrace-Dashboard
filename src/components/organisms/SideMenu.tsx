import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { SIZES } from '../../styles/sizes'
import { useNavigate } from 'react-router-dom'
import logoIcon from '../../assets/logo.svg'

/**
 * MenuItem 인터페이스: 메뉴 항목의 속성을 정의
 */
export interface MenuItem {
  name: string
  iconPath: string
}

/**
 * SideMenuProps 인터페이스: SideMenu 컴포넌트의 props를 정의
 */
export interface SideMenuProps {
  selectedMenuIndex: number
  menu: MenuItem[]
}

const Container = styled.div`
  display: flex;
  position: fixed;
  width: ${SIZES.side_menu};
  left: 0;
  top: 0;
  flex-direction: column;
  background-color: ${COLORS.white};
  height: 100%;
`
const MenuItemBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${COLORS.primary_purple};
  color: ${COLORS.white};
  padding: 12px 20px;
  border-radius: 12px;
  margin: 0px 16px;
`
const MenuItemIcon = styled.img`
  padding-right: 12px;
`
const Banner = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px;
`
const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
`
const Gap16 = styled.div`
  padding-top: 16px;
`

/**
 * SideMenu 컴포넌트
 * @param {SideMenuProps} props - SideMenu 컴포넌트에 전달될 props
 * @param {number} props.selectedMenuIndex - 선택된 메뉴 항목의 인덱스
 * @param {MenuItem[]} props.menu - 메뉴 항목의 배열
 */
function SideMenu(props: SideMenuProps) {
  const navigate = useNavigate()
  return (
    <Container>
      <Banner onClick={() => navigate('/')}>
        <img src={logoIcon} />
        <BannerText>
          <span>Task Cov.</span>
          <span>Admin Dashbord</span>
        </BannerText>
      </Banner>
      <Gap16 />

      {props.menu.map((item, index) => (
        <MenuItemBox key={index} onClick={() => navigate('/')}>
          <MenuItemIcon src={item.iconPath} />
          <div>{item.name}</div>
        </MenuItemBox>
      ))}
    </Container>
  )
}

export default SideMenu
