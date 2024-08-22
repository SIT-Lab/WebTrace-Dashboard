import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { SIZES } from '../../styles/sizes'
import { useNavigate } from 'react-router-dom'
import logoIcon from '../../assets/logo.svg'
import { useProject } from '../../context/ProjectContext'
import { ProjectData } from '../../interfaces/apiTypes'
import { getProjects, addProject } from '../../service/apiClient' // API 호출 함수 가져오기
import { AddButton } from '../atoms/AddButton'
import { OneInputModal } from '../organisms/OneInputModal'

/**
 * SideMenuProps 인터페이스: SideMenu 컴포넌트의 props를 정의
 */
export interface SideMenuProps {
  ownerID: string;  // 프로젝트 소유자의 ID를 받아옴
}

/**
 * Container: 사이드 메뉴 전체를 감싸는 컨테이너 스타일
 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: ${SIZES.side_menu};
  left: 0;
  top: 0;
  background-color: ${COLORS.white};
  height: 100%;
  z-index: 1000;
`
/**
 * MenuItemBox: 개별 프로젝트 항목의 스타일을 정의
 */
const MenuItemBox = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${({ isSelected }) => (isSelected ? COLORS.primary_purple : COLORS.white)};
  color: ${({ isSelected }) => (isSelected ? COLORS.white : '#000000')};
  padding: 12px 20px;
  border-radius: 12px;
  margin: 0px 16px;
  cursor: pointer;
`
/**
 * Banner: 사이드 메뉴 상단의 로고와 텍스트를 포함한 배너 스타일
 */
const Banner = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px;
  cursor: pointer;
`
/**
 * BannerText: 배너 내 텍스트 스타일
 */
const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
`
/**
 * Gap16: 사이드 메뉴 내 요소 간의 간격을 위한 스타일
 */
const Gap16 = styled.div`
  padding-top: 16px;
`
/**
 * ButtonContainer: 'Add Project' 버튼을 포함하는 컨테이너 스타일
 */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`
/**
 * SideMenu 컴포넌트
 * @param {SideMenuProps} props - SideMenu 컴포넌트에 전달될 props
 */
function SideMenu({ ownerID }: SideMenuProps) {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [isShowModal, setIsShowModal] = useState(false)  // 모달 표시 상태
  const navigate = useNavigate()
  const { selectedProjectId, setSelectedProjectId, setSelectedProjectName } = useProject()

  /**
   * 프로젝트 데이터를 가져오는 useEffect 훅
   * 컴포넌트가 마운트될 때 및 ownerID가 변경될 때 실행
   */
  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsData = await getProjects(ownerID)
        setProjects(projectsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
        setLoading(false)
      }
    }
    fetchProjects()
  }, [ownerID])

  /**
   * 새 프로젝트를 추가하는 함수
   * @param {string} title - 새 프로젝트의 제목
   */
  const handleAddProject = async (title: string) => {
    const docRef = await addProject(ownerID, title)
    if (docRef) {
      alert('You have successfully added the project.')
      // 새로 추가된 프로젝트를 다시 불러오기
      const projectsData = await getProjects(ownerID)
      setProjects(projectsData)
    } else {
      alert('Failed to add the project.')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Banner
        onClick={() => {
          setSelectedProjectId("")  // 선택된 프로젝트 ID를 null로 설정
          navigate('/')  // 홈 화면으로 이동
        }}
      >
        <img src={logoIcon} />
        <BannerText>
          <span>Task Cov.</span>
          <span>Admin Dashboard</span>
        </BannerText>
      </Banner>
      <Gap16 />

      {projects.map((project) => (
        <MenuItemBox
          key={project.id}
          isSelected={selectedProjectId === project.id}
          onClick={() => {
            setSelectedProjectId(project.id);
            setSelectedProjectName(project.title); // 프로젝트 이름을 상태에 설정
            navigate(`/${project.id}`);
            window.location.reload();
          }}
        >
          <div>{project.title}</div>
        </MenuItemBox>
      ))}

      <ButtonContainer>
        <AddButton
          color="gray"
          text="Add Project"
          onClick={() => setIsShowModal(true)}
        />
      </ButtonContainer>

      {isShowModal && (
        <OneInputModal
          sendInputValue={async (value) => {
            await handleAddProject(value)
            setIsShowModal(false)
          }}
          label="Enter a title for the project you want to create."
          buttonText="Add Project"
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          placeholder="project title"
        />
      )}
    </Container>
  )
}

export default SideMenu
