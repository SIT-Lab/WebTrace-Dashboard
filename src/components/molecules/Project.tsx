import React from 'react'
import { useParams } from 'react-router-dom'
import { TestData } from '../../interfaces/apiTypes'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { addTask, addTest, getTests } from '../../service/apiClient'
import { styled } from 'styled-components'
import { COLORS } from '../../styles/colors'
import { getTasks } from '../../service/apiClient'
import { TaskData } from '../../interfaces/apiTypes'
import Task from './Task'
import { AddButton } from '../atoms/AddButton'
import { OneInputModal } from '../organisms/OneInputModal'

/**
 * 스타일이 적용된 루트 컨테이너
 */
const RootContainer = styled.div`
  height: auto;
`

/**
 * 스타일이 적용된 컨테이너
 */
const Container = styled.div`
  height: auto;
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
  margin-top: 16px;
`

/**
 * 스타일이 적용된 test 컨테이너
 */
const TestsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 16px 0px 0px 32px;
`

/**
 * 스타일이 적용된 Task 컨테이너
 */
const TasksContainer = styled.div`
  margin: 32px 42px;
  height: auto;
  background-color: ${COLORS.background};
`

/**
 * 스타일이 적용된 Test Item
 */
const TestItem = styled.div`
  padding: 8px;
  margin: 8px;
`

/**
 * 스타일이 적용된 선택된 Test Item
 */
const SelectedTestItem = styled.div`
  padding: 8px;
  margin: 8px;
  border-bottom: 2px solid ${COLORS.gray02};
`

/**
 * 스타일이 적용된 16px 간격
 */
const Gap16 = styled.div`
  padding: 16px;
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
  margin-left: 40px;
`

/**
 * 스타일이 적용된 회색 텍스트
 */
const GrayText = styled.span`
  color: ${COLORS.gray02};
`

/**
 * Project 컴포넌트
 */
export default function Project() {
  const { projectid, testid } = useParams()
  const [selectedTest, setSelectedTest] = useState<number>(0)
  const [tests, setTests] = useState<TestData[]>([])
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddTestModal, setIsAddTestModal] = useState(false)
  const [isAddTaskModal, setIsAddTaskModal] = useState(false)

  const navigate = useNavigate()

  /**
   * 프로젝트 데이터를 가져오는 useEffect 훅
   */
  useEffect(() => {
    async function fetchProjects() {
      try {
        const testsData = await getTests(projectid || '')
        setTests(testsData)
        if (!testid) {
          navigate(`/${projectid}/${testsData[0]?.id}`)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setTests([])
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
        const tasksData = await getTasks(projectid || '', testid || '')
        setTasks(tasksData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setTasks([])
        setLoading(false)
      }
    }
    fetchTasks()
  }, [projectid, testid])

  return loading ? (
    <></>
  ) : (
    <RootContainer>
      {tests.length > 0 ? (
        <Container>
          <TopMenuContainer>
            <TestsContainer>
              {tests.map((t, i) => {
                return i == selectedTest ? (
                  <SelectedTestItem
                    key={`${i}`}
                    onClick={() => {
                      navigate(`/${projectid}/${t.id}`)
                      setSelectedTest(i)
                    }}
                  >
                    {t.title ? t.title : `Task Suite${i + 1}`}
                  </SelectedTestItem>
                ) : (
                  <TestItem
                    key={`${i}`}
                    onClick={() => {
                      navigate(`/${projectid}/${t.id}`)
                      setSelectedTest(i)
                    }}
                  >
                    {t.title ? t.title : `Task Suite${i + 1}`}
                  </TestItem>
                )
              })}
            </TestsContainer>
            <AddButton
              text="Add Task Suite"
              color="gray"
              onClick={() => {
                setIsAddTestModal(true)
              }}
            />
            <OneInputModal
              sendInputValue={async (value) => {
                const docRef = await addTest(projectid || '', value)
                if (docRef) {
                  alert('You have successfully added the Task Suite.')
                  location.reload()
                } else {
                  alert('Failed to add the Task Suite.')
                }
              }}
              isShowModal={isAddTestModal}
              setIsShowModal={setIsAddTestModal}
              label="Enter a title for the Task Suite you want to create."
              placeholder="Task Suite title"
              buttonText="Add Task Suite"
            />
          </TopMenuContainer>
          <MainContainer>
            <IDBox>
              <b>{'ID: '}</b>
              <GrayText>{testid}</GrayText>
            </IDBox>
            <TasksContainer>
              <b>Tasks</b>
              <Gap16 />
              {tasks.length > 0 ? (
                tasks.map((t, i) => (
                  <Task
                    key={i}
                    id={t.id}
                    log={t.log}
                    title={t.title}
                    launchedAt={t.launchedAt}
                    modifiedAt={t.modifiedAt}
                  />
                ))
              ) : (
                <div>{'No Tasks Found'}</div>
              )}
            </TasksContainer>
            <SetRight>
              <AddButton
                text="Add Task"
                color="gray"
                onClick={() => {
                  setIsAddTaskModal(true)
                }}
              />
              <OneInputModal
                sendInputValue={async (value) => {
                  const docRef = await addTask(projectid || '', testid || '', value)
                  if (docRef) {
                    alert('You have successfully added the task.')
                    location.reload()
                  } else {
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
        </Container>
      ) : (
        <div>
          <TopMenuContainer style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <>
              <AddButton
                text="Add Task Suite"
                color="gray"
                onClick={() => {
                  setIsAddTestModal(true)
                }}
              />
              <OneInputModal
                sendInputValue={async (value) => {
                  const docRef = await addTest(projectid || '', value)
                  if (docRef) {
                    alert('You have successfully added the Task Suite.')
                    location.reload()
                  } else {
                    alert('Failed to add the Task Suite.')
                  }
                }}
                isShowModal={isAddTestModal}
                setIsShowModal={setIsAddTestModal}
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
