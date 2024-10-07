import React, { useEffect } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { useProject } from '../../context/ProjectContext'

/**
 * Container 컴포넌트: 네비게이션 바의 스타일을 정의하는 컨테이너
 */
const Container = styled.div`
  margin-left: 42px;
  margin-right: 42px;
  margin-top: 32px;
  width: 100%;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`

/**
 * Title 컴포넌트: 네비게이션 바의 제목 스타일
 */
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

/**
 * ProjectInfo 컴포넌트: 프로젝트 정보를 표시하는 컴포넌트
 */
const ProjectInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px; // 각 정보 사이에 간격 추가
  padding: 16px;
  background-color: ${COLORS.white};
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box; /* 이 줄을 추가 */
`

/**
 * Label 컴포넌트: 프로젝트 정보의 라벨 스타일
 */
const Label = styled.div`
  font-weight: bold;
  color: black;
`

/**
 * Value 컴포넌트: 프로젝트 정보의 값 스타일
 */
const Value = styled.div`
  color: ${COLORS.gray02};
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
function Navbar() {
  const { selectedProjectId, selectedProjectName, setSelectedProjectId, setSelectedProjectName } = useProject()

  // 선택된 프로젝트의 정보
  const selectedProject = {
    name: selectedProjectName || 'No Name',
    id: selectedProjectId || 'No ID',
  }

  // 선택된 프로젝트 정보를 localStorage에 저장
  useEffect(() => {
    if (selectedProjectId) {
      localStorage.setItem('selectedProjectId', selectedProjectId)
      localStorage.setItem('selectedProjectName', selectedProjectName || '')
    }
  }, [selectedProjectId, selectedProjectName])

  // 컴포넌트가 마운트될 때 localStorage에서 값 복원
  useEffect(() => {
    const storedProjectId = localStorage.getItem('selectedProjectId')
    const storedProjectName = localStorage.getItem('selectedProjectName')

    if (storedProjectId) {
      setSelectedProjectId(storedProjectId)
    }

    if (storedProjectName) {
      setSelectedProjectName(storedProjectName)
    }
  }, [setSelectedProjectId, setSelectedProjectName])

  return (
    <Container>
      <Title>Project</Title>
      {selectedProjectId && (
        <ProjectInfo>
          <Label>Name:</Label> <Value>{selectedProject.name}</Value>
          <Label>ID:</Label> <Value>{selectedProject.id}</Value>
        </ProjectInfo>
      )}
    </Container>
  )
}

export default Navbar
