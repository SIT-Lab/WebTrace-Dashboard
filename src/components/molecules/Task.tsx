import { useState } from 'react'
import { styled } from 'styled-components'
import { TaskData } from '../../interfaces/apiTypes'
import { formatTimestamp } from '../../utils/formatTimestamp'
import { COLORS } from '../../styles/colors'
import UserColumn from './UserColumn'
import LogPopup from '../organisms/LogPopup'
import downIcon from '../../assets/down.svg'
import upIcon from '../../assets/up.svg'
import { IconButton } from '../atoms/IconButton'
import deleteIcon from '../../assets/trash.svg'
import { deleteTask } from '../../service/apiClient'
import { useParams } from 'react-router-dom'

/**
 * 스타일이 적용된 루트 컨테이너
 */
const Root = styled.div`
  width: 100%;
  min-width: 600px;
`

/**
 * 스타일이 적용된 컨테이너
 */
const Container = styled.div`
  border-radius: 16px;
  background-color: ${COLORS.white};
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`

/**
 * 스타일이 적용된 화살표 드로어
 */
const ArrowDrawer = styled.div`
  border-top: 1px solid ${COLORS.gray01};
  display: flex;
  justify-content: center;
`

/**
 * 스타일이 적용된 정보 컨테이너
 */
const InfoContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

/**
 * 스타일이 적용된 정보 라인 컨테이너
 */
const InfoLines = styled.div`
  display: flex;
  flex-direction: column;
`

/**
 * 스타일이 적용된 정보 라인
 */
const InfoLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  line-height: 20px;
`

/**
 * 스타일이 적용된 회색 텍스트
 */
const GrayText = styled.span`
  color: ${COLORS.gray02};
`

/**
 * 왼쪽으로 16px 패딩을 추가한 스타일
 */
const PadLeft16 = styled.span`
  padding-left: 16px;
`

/**
 * 스타일이 적용된 아코디언 컨테이너
 */
const AccordionContainer = styled.div``

/**
 * 스타일이 적용된 사용자 헤드
 */
const UserHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid ${COLORS.gray01};
  padding: 16px;
`

/**
 * 스타일이 적용된 사용자 헤드 행
 */
const UserHeadRow = styled.div`
  width: 20%;
  text-align: center;
  font-weight: bold;
`

/**
 * Task 컴포넌트
 * @param {TaskData} props - Task 데이터
 */
function Task(props: TaskData) {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isShowLog, setIsShowLog] = useState<boolean>(false)
  const [showLogIndex, setShowLogIndex] = useState<number>(0)
  const { projectid, tasksuiteid } = useParams()

  return (
    <Root>
      <Container>
        <InfoContainer>
          <InfoLines>
            <InfoLine>
              <span>
                <span style={{ fontWeight: 'bold' }}>Title: </span>
                <GrayText>{props.title}</GrayText>
              </span>
            </InfoLine>
            <InfoLine>
              <span>
                <span style={{ fontWeight: 'bold' }}>ID: </span>
                <GrayText>{props.id}</GrayText>
              </span>
            </InfoLine>
            <InfoLine>
              <span>
                <span style={{ fontWeight: 'bold' }}>Modified At: </span>
                <GrayText>{formatTimestamp(props.modifiedAt)}</GrayText>
              </span>
              <PadLeft16>
                <span style={{ fontWeight: 'bold' }}>Launched At: </span>
                <GrayText>{formatTimestamp(props.launchedAt)}</GrayText>
              </PadLeft16>
            </InfoLine>
          </InfoLines>
          <IconButton
            iconPath={deleteIcon}
            onClick={async (e) => {
              e.stopPropagation()
              console.log(`Project ID: ${projectid}, Task Suite ID: ${tasksuiteid}`) // 여기서 ID 값 출력
              const response = confirm('Do you want to permanently delete the task?')
              if (response) {
                if (projectid && tasksuiteid) {
                  if (await deleteTask(projectid, tasksuiteid, props.id)) {
                    alert('You have successfully deleted the task.')
                  } else {
                    alert('Failed to delete the task.')
                  }
                } else {
                  alert('Failed to delete the task. You dont have right projectId and tasksuiteid')
                }
              }
            }}
          />
        </InfoContainer>
        {isOpened ? (
          <>
            <UserHead>
              <UserHeadRow>User ID</UserHeadRow>
              <UserHeadRow>Age</UserHeadRow>
              <UserHeadRow>Gender</UserHeadRow>
              <UserHeadRow>Country</UserHeadRow>
              <UserHeadRow>Browser/OS/Device</UserHeadRow>
              <UserHeadRow>Accessed Time</UserHeadRow>
              <UserHeadRow>Task Time(sec)</UserHeadRow>
              <UserHeadRow>End Type</UserHeadRow>
              <UserHeadRow>Log</UserHeadRow>
            </UserHead>
            <AccordionContainer>
              {props.log.map((item, index) => {
                const p = {
                  data: { ...item.result },
                  onLogButtonClick: () => {
                    setShowLogIndex(index)
                    setIsShowLog(!isShowLog)
                  },
                }
                return <UserColumn key={index} {...p} />
              })}
            </AccordionContainer>
          </>
        ) : (
          <AccordionContainer></AccordionContainer>
        )}
        <ArrowDrawer onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? <img src={upIcon} /> : <img src={downIcon} />}
        </ArrowDrawer>
      </Container>
      {isShowLog ? (
        <LogPopup
          logs={{ ...props.log[showLogIndex] }}
          isShowModal={isShowLog}
          setIsShowModal={setIsShowLog}
        ></LogPopup>
      ) : (
        <></>
      )}
    </Root>
  )
}

export default Task
