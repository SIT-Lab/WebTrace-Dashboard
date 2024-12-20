import React from 'react'
import { useParams } from 'react-router-dom'
import { TaskSuiteData } from '../../interfaces/apiTypes'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { addTask, addTaskSuite, getTaskSuites } from '../../service/apiClient'
import { styled } from 'styled-components'
import { COLORS } from '../../styles/colors'
import { getTasks } from '../../service/apiClient'
import { TaskData } from '../../interfaces/apiTypes'
import Task from './Task'
import { AddButton } from '../atoms/AddButton'
import { OneInputModal } from '../organisms/OneInputModal'
import { addSessionCode } from '../../service/apiClient'
import { generateHash } from '../../utils/generateHash'

/**
 * 스타일이 적용된 루트 컨테이너
 */
const RootContainer = styled.div`
  height: auto;
  background-color: ${COLORS.background};
  margin-left: 42px;
  margin-right: 42px;
`

/**
 * 스타일이 적용된 컨테이너
 */
const Container = styled.div`
  height: auto;
  background-color: white;
  border-radius: 16px;
`

/**
 * 스타일이 적용된 메인 컨테이너
 */
const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: ${COLORS.background};
  flex-direction: column;
`

/**
 * 스타일이 적용된 상단 메뉴 컨테이너
 */
const TopMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
`

/**
 * 스타일이 적용된 Task Suite 컨테이너
 */
const TaskSuiteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

/**
 * 스타일이 적용된 Task 컨테이너
 */
const TasksContainer = styled.div`
  background-color: ${COLORS.background};
`

/**
 * 스타일이 적용된 TaskSuite Item
 */
const TaskSuiteItem = styled.div`
  padding: 8px;
  margin: 8px;
`

/**
 * 스타일이 적용된 선택된 TaskSuite Item
 */
const SelectedTaskSuiteItem = styled.div`
  padding: 8px;
  margin: 8px;
  border-bottom: 2px solid ${COLORS.gray02};
  font-weight: bold;
`

/**
 * 스타일이 적용된 16px 간격
 */
const Gap16 = styled.div`
  padding: 16px;
`

/**
 * 스타일이 적용된 8px 간격
 */
const Gap8 = styled.div`
  padding: 8px;
`

/**
 * 스타일이 적용된 가운데 텍스트
 */
const CenterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

/**
 * 스타일이 적용된 오른쪽 정렬
 */
const SetRight = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 40px);
`

/**
 * 스타일이 적용된 ID 박스
 */
const IDBox = styled.div`
  padding: 16px;
`

/**
 * 스타일이 적용된 회색 텍스트
 */
const GrayText = styled.span`
  color: ${COLORS.gray02};
`

/**
 * 스타일이 적용된 세션코드 컨테이너
 */
const SessionCodeContainer = styled.div``

const SessionCodeContainerHeader = styled.div`
  margin-top: 8px; /* 위쪽 간격 조정 */
  padding: 6px 10px; /* 상하, 좌우 여백 줄이기 */
  background-color: ${COLORS.light_purple}; /* 배경색 */
  color: ${COLORS.white}; /* 텍스트 색상 */
  border-top-left-radius: 6px; /* 왼쪽 상단 둥근 모서리 */
  border-bottom-left-radius: 0; /* 왼쪽 하단은 직각 */
  border-bottom-right-radius: 0; /* 오른쪽 하단은 직각 */
  font-size: 12px; /* 글씨 크기 조정 */
  font-weight: 500; /* 약간 얇게 설정 */
  display: inline-block; /* 텍스트를 한 줄로 유지 */
  line-height: 1.2; /* 텍스트 높이 조정 */
`

const SessionCode = styled.span`
  margin-top: 8px; /* 위쪽 간격 조정 */
  padding: 6px 10px; /* 상하, 좌우 여백 줄이기 */
  background-color: ${COLORS.gray01}; /* 회색 배경 */
  color: ${COLORS.gray02}; /* 텍스트 색상 */
  border-top-right-radius: 6px; /* 오른쪽 상단 둥근 모서리 */
  border-bottom-left-radius: 0; /* 왼쪽 하단은 직각 */
  border-bottom-right-radius: 0; /* 오른쪽 하단은 직각 */
  font-size: 12px; /* 글씨 크기 조정 */
  font-weight: 500; /* 약간 얇게 설정 */
  display: inline-block; /* 텍스트를 한 줄로 유지 */
  line-height: 1.2; /* 텍스트 높이 조정 */
`

/**
 * Project 컴포넌트
 */
export default function Project() {
  const { projectid, tasksuiteid } = useParams()
  const [selectedTaskSuite, setSelectedTaskSuite] = useState<number>(0)
  const [TaskSuites, setTaskSuites] = useState<TaskSuiteData[]>([])
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddTaskSuiteModal, setIsAddTaskSuiteModal] = useState(false)
  const [isAddTaskModal, setIsAddTaskModal] = useState(false)
  const [sessionCodes, setSessionCodes] = useState<{ [key: string]: string }>({})

  const navigate = useNavigate()

  /**
   * 프로젝트 데이터를 가져오는 useEffect 훅
   */
  useEffect(() => {
    async function fetchProjects() {
      try {
        const TaskSuiteData = await getTaskSuites(projectid || '')
        setTaskSuites(TaskSuiteData)
        if (!tasksuiteid) {
          navigate(`/${projectid}/${TaskSuiteData[0]?.id}`)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setTaskSuites([])
      }
    }
    fetchProjects()
  }, [])

  /**
   * task 데이터를 가져오는 useEffect 훅
   */
  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasksData = await getTasks(projectid || '', tasksuiteid || '')
        setTasks(tasksData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setTasks([])
        setLoading(false)
      }
    }
    fetchTasks()
  }, [projectid, tasksuiteid])

  /**
   * 세션코드 표시를 위한 useEffect 훅 task.id를 키로 설정, 키에 해당하는 해시를 연결
   */
  useEffect(() => {
    const generateSessionCode = async () => {
      const numbers: { [key: string]: string } = {}
      for (const task of tasks) {
        const hash = await generateHash(projectid || '', tasksuiteid || '', task.id)
        numbers[task.id] = hash
      }
      setSessionCodes(numbers)
    }

    generateSessionCode()
  }, [tasks, projectid, tasksuiteid])

  return loading ? (
    <></>
  ) : (
    <RootContainer>
      <Gap16 />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <b style={{ fontSize: '18px', fontWeight: 'bold' }}>Task Suite</b>
        <AddButton
          text="Add Task Suite"
          color="gray"
          fontSize="14px"
          height="30px"
          borderRadius="12px"
          width="150px"
          onClick={() => {
            setIsAddTaskSuiteModal(true)
          }}
        />
      </div>
      {TaskSuites.length > 0 ? (
        <>
          <Container>
            <TopMenuContainer>
              <TaskSuiteContainer>
                {TaskSuites.map((t, i) => {
                  return i == selectedTaskSuite ? (
                    <SelectedTaskSuiteItem
                      key={`${i}`}
                      onClick={() => {
                        navigate(`/${projectid}/${t.id}`)
                        setSelectedTaskSuite(i)
                      }}
                    >
                      {t.title ? t.title : `Task Suite${i + 1}`}
                    </SelectedTaskSuiteItem>
                  ) : (
                    <TaskSuiteItem
                      key={`${i}`}
                      onClick={() => {
                        navigate(`/${projectid}/${t.id}`)
                        setSelectedTaskSuite(i)
                      }}
                    >
                      {t.title ? t.title : `Task Suite${i + 1}`}
                    </TaskSuiteItem>
                  )
                })}
              </TaskSuiteContainer>
              <OneInputModal
                sendInputValue={async (value) => {
                  const docRef = await addTaskSuite(projectid || '', value)
                  if (docRef) {
                    alert('You have successfully added the Task Suite.')
                    location.reload()
                  } else {
                    alert('Failed to add the Task Suite.')
                  }
                }}
                isShowModal={isAddTaskSuiteModal}
                setIsShowModal={setIsAddTaskSuiteModal}
                label="Enter a title for the Task Suite you want to create."
                placeholder="Task Suite title"
                buttonText="Add Task Suite"
              />
            </TopMenuContainer>
            {/* <IDBox>
              <b>{'ID: '}</b>
              <GrayText>{tasksuiteid}</GrayText>
            </IDBox> */}
          </Container>
          <Gap16 />
          <MainContainer>
            <TasksContainer>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
              >
                <b style={{ fontSize: '18px', fontWeight: 'bold' }}>Task</b>
                <AddButton
                  text="Add Task"
                  color="gray"
                  fontSize="14px"
                  height="30px"
                  borderRadius="12px"
                  width="150px"
                  onClick={() => {
                    setIsAddTaskModal(true)
                  }}
                />
              </div>
              {tasks.length > 0 ? (
                tasks.map((t, i) => (
                  <>
                    <SessionCodeContainer>
                      <SessionCodeContainerHeader>Session Code</SessionCodeContainerHeader>
                      <SessionCode>{sessionCodes[t.id] || 'Loading...'}</SessionCode>
                    </SessionCodeContainer>
                    <Task
                      key={i}
                      id={t.id}
                      log={t.log}
                      title={t.title}
                      launchedAt={t.launchedAt}
                      modifiedAt={t.modifiedAt}
                    />
                    <Gap8 />
                  </>
                ))
              ) : (
                <div>{'No Tasks Found'}</div>
              )}
            </TasksContainer>
            <SetRight>
              <OneInputModal
                sendInputValue={async (value) => {
                  const docRef = await addTask(projectid || '', tasksuiteid || '', value)
                  if (docRef) {
                    // Task 생성 성공
                    alert('You have successfully added the task.')

                    // Task ID 추출
                    const taskId = docRef.id

                    // 세션코드 생성 및 저장
                    const sessionCodeSaved = await addSessionCode(projectid || '', tasksuiteid || '', taskId)

                    if (sessionCodeSaved) {
                      alert('Session Code successfully saved.')
                    } else {
                      alert('Failed to save Session Code.')
                    }

                    location.reload()
                  } else {
                    // Task 생성 실패
                    alert('Failed to add the task.')
                  }
                }}
                isShowModal={isAddTaskModal}
                setIsShowModal={setIsAddTaskModal}
                label="Enter a title for the task you want to create."
                placeholder="task title"
                buttonText="Add Task"
              />
            </SetRight>
          </MainContainer>
        </>
      ) : (
        <div>
          <TopMenuContainer style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <>
              {/* <AddButton
                  text="Add Task Suite"
                  color="gray"
                  onClick={() => {
                    setIsAddTaskSuiteModal(true)
                  }}
                /> */}
              <OneInputModal
                sendInputValue={async (value) => {
                  const docRef = await addTaskSuite(projectid || '', value)
                  if (docRef) {
                    alert('You have successfully added the Task Suite.')
                    location.reload()
                  } else {
                    alert('Failed to add the Task Suite.')
                  }
                }}
                isShowModal={isAddTaskSuiteModal}
                setIsShowModal={setIsAddTaskSuiteModal}
                label="Enter a title for the Task Suite you want to create."
                placeholder="Task Suite title"
                buttonText="Add Task Suite"
              />
            </>
          </TopMenuContainer>
          <CenterText style={{ marginTop: '20px' }}>Not Found</CenterText>
        </div>
      )}
    </RootContainer>
  )
}
