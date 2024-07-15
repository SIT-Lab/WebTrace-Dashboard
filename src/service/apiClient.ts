import { ProjectData, TaskData, TestData } from '../interfaces/apiTypes'
import {
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  where,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebaseConfig'

/**
 * 입력으로 주어진 ID값 document의 경로를를 반환합니다.
 * @param projectID string - Task가 위치한 프로젝트 id
 * @param testID string - Task가 위치한 테스트 id
 * @param taskID string - Task id
 * @returns DocumentReference
 */
const getTaskRef = async (projectID: string, testID: string, taskID: string): Promise<any> => {
  return doc(db, `project/${projectID}/test/${testID}/task/${taskID}`)
}

/**
 * 해당 유저의 프로젝트 목록을 불러옵니다.
 * @param ownerID string - 프로젝트를 소유한 User의 ID
 * @returns Promise<ProjectData[]> - 불러온 프로젝트 목록
 */
export const getProjects = async (ownerID: string): Promise<ProjectData[]> => {
  try {
    const collectionRef = collection(db, 'project')
    const q = query(collectionRef, where('ownerId', '==', ownerID))
    const querySnapshot = await getDocs(q)
    const processedDataList: ProjectData[] = []

    querySnapshot.forEach((doc) => {
      const data: ProjectData = {
        id: doc.id,
        title: doc.data().title,
        ownerID: doc.data().ownerID,
        // Include other properties as needed based on your ProjectData type
      }
      processedDataList.push(data)
    })

    return processedDataList
  } catch (err) {
    console.log('getProjects error : ' + err)
    return [] // Return an empty array in case of an error
  }
}

/**
 * 프로젝트 내부의의 테스트 목록을 불러옵니다.
 * @param projectID string - 불러올 프로젝트의 ID
 * @returns Promise<TestData[]> - 불러온 테스트 목록
 */
export const getTests = async (projectID: string): Promise<TestData[]> => {
  try {
    const collectionRef = collection(db, `project/${projectID}/test/`)
    const querySnapshot = await getDocs(collectionRef)
    const processedDataList: TestData[] = []
    querySnapshot.forEach((doc) => {
      const data: TestData = {
        id: doc.id,
        title: doc.data()?.title,
      }
      processedDataList.push(data)
    })
    return processedDataList
  } catch (err) {
    console.log('getTests error : ' + err)
    return [] // Return an empty array in case of an error
  }
}

/**
 * 해당 Test의 Task목록을 불러옵니다.
 * @param projectID string - Test가 위치한 Project의 ID
 * @param testID string - Task가 위치한 Test의 ID
 * @returns Promise<TaskData[]> - 불러온 Task 목록
 */
export const getTasks = async (projectID: string, testID: string): Promise<TaskData[]> => {
  try {
    const collectionRef = collection(db, `project/${projectID}/test/${testID}/task`)
    const querySnapshot = await getDocs(collectionRef)
    const processedDataList: TaskData[] = []

    querySnapshot.forEach((doc) => {
      const data: TaskData = {
        id: doc.id,
        launchedAt: doc.data().launchedAt,
        modifiedAt: doc.data().modifiedAt,
        log: doc.data().log,
        title: doc.data().title,
      }
      processedDataList.push(data)
    })
    return processedDataList
  } catch (err) {
    console.log('getTasks error : ' + err)
    return [] // Return an empty array in case of an error
  }
}

/**
 * 입력으로 주어진 collection 경로에 data가 담긴 document를 생성합니다.
 * @param collectionReference string - 데이터를 추가할 collection 경로
 * @param data any - 추가할 document data
 * @returns `DocumentReference<any, DocumentData> | null` - 성공 시 documentReference 반환, 실패 시 null
 */
const addByRef = async (collectionReference: string, data: any) => {
  const ref = collection(db, collectionReference)
  if (!ref) {
    console.error('The collection reference is not valid.')
    return null
  }
  try {
    return await addDoc(ref, { ...data })
  } catch (err) {
    console.error('addByRef error: ' + err)
    return null
  }
}

/**
 * 입력으로 주어진 document 경로에 담긴 data를 삭제합니다.
 * @param documentReference string - 데이터를 삭제할 document 경로
 * @returns boolean - 성공 여부
 */
const deleteByRef = async (documentReference: string) => {
  const ref = doc(db, documentReference)
  if (!ref) {
    return false
  }
  try {
    await deleteDoc(ref)
    return true
  } catch (err) {
    console.log('deleteByRef error:' + err)
    return false
  }
}

/**
 * 사용자의 빈 프로젝트를 생성합니다.
 * @param ownerId string - 프로젝트 소유자 ID
 * @param title string - 프로젝트명
 * @returns `DocumentReference<any, DocumentData> | null` 성공 시 documentReference 반환, 실패 시 null
 */
export const addProject = (ownerId: string, title: string) => {
  return addByRef('project', { ownerId: ownerId, title: title })
}

/**
 * 입력받은 프로젝트 ID 경로에 빈 테스트를 생성합니다.
 * @param proejctId string - 프로젝트 ID
 * @param title string - 테스트명
 * @returns `DocumentReference<any, DocumentData> | null` - 성공 시 documentReference 반환, 실패 시 null
 */
export const addTest = async (projectId: string, title: string) => {
  return await addByRef(`project/${projectId}/test`, { title: title })
}

/**
 * 입력받은 프로젝트 ID, 테스트 ID 경로에 빈 태스크를 생성합니다.
 * @param proejctId string - 프로젝트 ID
 * @param testId string - 테스트 ID
 * @param title string - 태스크명
 * @returns `DocumentReference<any, DocumentData> | null` - 성공 시 documentReference 반환, 실패 시 null
 */
export const addTask = async (projectId: string, testId: string, title: string) => {
  return await addByRef(`project/${projectId}/test/${testId}/task`, {
    launchedAt: Timestamp.now(),
    modifiedAt: Timestamp.now(),
    log: [],
    result: [],
    title: title,
  })
}

/**
 * 입력받은 ID의 프로젝트를 제거합니다.
 * @param projectId string - 프로젝트 ID
 * @returns boolean - 성공 여부
 */
export const deleteProject = async (projectId: string) => {
  return await deleteByRef(`project/${projectId}`)
}

/**
 * 입력받은 ID의 테스트를 제거합니다.
 * @param projectId string - 테스트가 위치한 프로젝트의 ID
 * @param testId string - 테스트 ID
 * @returns boolean - 성공 여부
 */
export const deleteTest = async (projectId: string, testId: string) => {
  return await deleteByRef(`project/${projectId}/test/${testId}`)
}

/**
 * 입력받은 ID의 태스크를 제거합니다.
 * @param projectId string - 태스크가 위치한 프로젝트의 ID
 * @param testId string - 태스크가 위치한 테스트의 ID
 * @param taskId string - 태스크의 ID
 * @returns boolean - 성공 여부
 */
export const deleteTask = async (projectId: string, testId: string, taskId: string) => {
  return await deleteByRef(`project/${projectId}/test/${testId}/task/${taskId}`)
}
