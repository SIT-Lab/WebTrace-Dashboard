import React, { useEffect, useState } from 'react'
import { deleteProject, getProjects } from '../../service/apiClient'
import { ProjectData } from '../../interfaces/apiTypes'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '../atoms/IconButton'
import deleteIcon from '../../assets/trash.svg'
import { useProject } from '../../context/ProjectContext'

const Container = styled.div`
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${COLORS.white};
  min-width: 300px;
`

const Item = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.gray01};
`
const ItemInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
  margin-left: 15px;
`

/**
 * 스타일이 적용된 16px 간격
 */
const Gap16 = styled.div`
  padding: 16px;
`

const GrayText = styled.span`
  color: ${COLORS.gray02};
`
/**
 * ProjectsProps 인터페이스: Projects 컴포넌트의 props를 정의
 */
export interface ProjectsProps {
  ownerID: string
}
/**
 * Projects 컴포넌트
 * @param {ProjectsProps} props - Projects 컴포넌트에 전달될 props
 * @param {string} props.ownerID - 프로젝트 소유자의 ID
 */
function Projects(props: ProjectsProps) {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { setSelectedProjectId, setSelectedProjectName } = useProject()

  /**
   * 프로젝트 데이터를 가져오는 useEffect 훅
   */
  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsData = await getProjects(props.ownerID)
        setProjects(projectsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
        setLoading(false)
      }
    }
    fetchProjects()
  }, [props.ownerID])

  return (
    <>
      <Gap16 />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '42px' }}>
        <b style={{ fontSize: '18px', fontWeight: 'bold' }}>Project</b>
      </div>
      <Container>
        {projects.length > 0 ? (
          projects.map((proj, i) => (
            <Item
              key={i}
              onClick={() => {
                setSelectedProjectId(proj.id) // 프로젝트 ID를 전역 상태로 저장
                setSelectedProjectName(proj.title) // 프로젝트 이름을 전역 상태로 저장
                navigate(`/${proj.id}`)
              }}
            >
              <ItemInfoBox>
                <span>{proj.title}</span>
                {/* <GrayText>{`ID: ${proj.id}`}</GrayText> */}
              </ItemInfoBox>
              <IconButton
                iconPath={deleteIcon}
                onClick={async (e) => {
                  e.stopPropagation()
                  const response = confirm('Do you want to permanently delete the project?')
                  if (response) {
                    console.log(proj.id)
                    if (await deleteProject(proj.id)) {
                      alert('You have successfully deleted the project.')
                      location.reload()
                    } else {
                      alert('Failed to delete the project.')
                    }
                  }
                }}
              />
            </Item>
          ))
        ) : (
          <div>{loading ? 'Loading...' : 'No Projects found.'}</div>
        )}
      </Container>
    </>
  )
}

export default Projects
