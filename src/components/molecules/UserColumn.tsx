import { ResultData } from '../../interfaces/apiTypes'
import styled from 'styled-components'
import { formatTimestamp } from '../../utils/formatTimestamp'
import { COLORS } from '../../styles/colors'
import { Button } from '../atoms/Button'

interface UserColumnProps {
  data: ResultData
  onLogButtonClick: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid ${COLORS.gray01};
  padding: 16px;
`
const Row = styled.div`
  width: 20%;
  text-align: center;
`

/**
 * UserColumn 컴포넌트
 * @param {UserColumnProps} props - UserColumn 데이터
 */
function UserColumn(props: UserColumnProps) {
  const isFinished = props.data.isFinished ? 'Finish' : 'Give up'
  return (
    <Container>
      <Row>{props.data.userId}</Row>
      <Row>{props.data.userAge}</Row>
      <Row>{props.data.userGender}</Row>
      <Row>{props.data.userCountry}</Row>
      <Row>
        <div>{`${props.data.browser}`}</div>
        <div>{`${props.data.os}`}</div>
        <div>{`${props.data.device}`}</div>
      </Row>
      <Row>{formatTimestamp(props.data.accessedAt)}</Row>
      <Row>{props.data.durationSec.toFixed(2).toString()}</Row>
      <Row>{isFinished}</Row>
      <Row>
        <Button onClick={props.onLogButtonClick} text="Log"></Button>
      </Row>
    </Container>
  )
}

export default UserColumn
