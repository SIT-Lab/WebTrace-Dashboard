import { ProjectData, TaskData, TaskSuiteData } from '../interfaces/apiTypes'
import {
  query,
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  where,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebaseConfig'
import { generateHash } from '../utils/generateHash'

/**
 * 입력으로 주어진 ID값 document의 경로를를 반환합니다.
 * @param projectID string - Task가 위치한 프로젝트 id
 * @param taskSuiteID string - Task가 위치한 task suite id
 * @param taskID string - Task id
 * @returns DocumentReference
 */
const getTaskRef = async (projectID: string, taskSuiteID: string, taskID: string): Promise<any> => {
  return doc(db, `project/${projectID}/taskSuite/${taskSuiteID}/task/${taskID}`)
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
 * 프로젝트 내부의의 task suite 목록을 불러옵니다.
 * @param projectID string - 불러올 프로젝트의 ID
 * @returns Promise<TaskSuiteData[]> - 불러온 task suite 목록
 */
export const getTaskSuites = async (projectID: string): Promise<TaskSuiteData[]> => {
  try {
    const collectionRef = collection(db, `project/${projectID}/taskSuite/`)
    const querySnapshot = await getDocs(collectionRef)
    const processedDataList: TaskSuiteData[] = []
    querySnapshot.forEach((doc) => {
      const data: TaskSuiteData = {
        id: doc.id,
        title: doc.data()?.title,
      }
      processedDataList.push(data)
    })
    return processedDataList
  } catch (err) {
    console.log('getTaskSuites error : ' + err)
    return [] // Return an empty array in case of an error
  }
}

/**
 * 해당 Task Suite의 Task목록을 불러옵니다.
 * @param projectID string - Task Suite가 위치한 Project의 ID
 * @param taskSuiteID string - Task가 위치한 Task suite ID
 * @returns Promise<TaskData[]> - 불러온 Task 목록
 */
export const getTasks = async (projectID: string, taskSuiteID: string): Promise<TaskData[]> => {
  try {
    const collectionRef = collection(db, `project/${projectID}/taskSuite/${taskSuiteID}/task`)
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
 * 입력받은 프로젝트 ID 경로에 빈 task suite를 생성합니다.
 * @param proejctId string - 프로젝트 ID
 * @param title string - task suite 명
 * @returns `DocumentReference<any, DocumentData> | null` - 성공 시 documentReference 반환, 실패 시 null
 */
export const addTaskSuite = async (projectId: string, title: string) => {
  return await addByRef(`project/${projectId}/taskSuite`, { title: title })
}

/**
 * 입력받은 프로젝트 ID, task suite ID 경로에 빈 태스크를 생성합니다.
 * @param proejctId string - 프로젝트 ID
 * @param taskSuiteID string - task suite ID
 * @param title string - 태스크명
 * @returns `DocumentReference<any, DocumentData> | null` - 성공 시 documentReference 반환, 실패 시 null
 */
export const addTask = async (projectId: string, taskSuiteID: string, title: string) => {
  return await addByRef(`project/${projectId}/taskSuite/${taskSuiteID}/task`, {
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
 * 입력받은 ID의 task suite를 제거합니다.
 * @param projectId string - task suite가 위치한 프로젝트의 ID
 * @param taskSuiteID string - Task Suite ID
 * @returns boolean - 성공 여부
 */
export const deleteTaskSuite = async (projectId: string, taskSuiteID: string) => {
  return await deleteByRef(`project/${projectId}/taskSuite/${taskSuiteID}`)
}

/**
 * 입력받은 ID의 태스크와 해당 태스크에 연결된 세션코드를 제거합니다.
 * @param projectId string - 태스크가 위치한 프로젝트의 ID
 * @param taskSuiteID string - 태스크가 위치한 task suite ID
 * @param taskId string - 태스크의 ID
 * @returns Promise<boolean> - 성공 여부
 */
export const deleteTask = async (projectId: string, taskSuiteID: string, taskId: string): Promise<boolean> => {
  try {
    // 1. Task 삭제
    const taskDocRef = `project/${projectId}/taskSuite/${taskSuiteID}/task/${taskId}`;
    await deleteByRef(taskDocRef);
    console.log(`Task deleted: ${taskId}`);

    // 2. 세션코드 생성 (기존 로직과 동일한 방식으로 생성)
    const sessionCode = await generateHash(projectId, taskSuiteID, taskId);

    // 3. 세션코드 삭제
    const sessionCodeDocRef = `sessionCode/${sessionCode}`;
    await deleteByRef(sessionCodeDocRef);
    console.log(`Session Code deleted: ${sessionCode}`);

    return true;
  } catch (error) {
    console.error('Error deleting task or Session Code:', error);
    return false;
  }
};

/*------------------------------*/
/**
 * 프로젝트, Task Suite, Task ID를 사용하여 세션코드를 생성하고 Firestore에 저장
 * @param projectId string - 프로젝트 ID
 * @param taskSuiteId string - Task Suite ID
 * @param taskId string - Task ID
 * @returns Promise<boolean> - 저장 성공 여부
 */
export const addSessionCode = async (
  projectId: string,
  taskSuiteId: string,
  taskId: string
): Promise<boolean> => {
  try {
    // 세션코드 생성 (간단히 ID들을 결합해 해싱)
    const sessionCode = await generateHash(projectId, taskSuiteId, taskId);

    // Firestore 경로 정의
    const sessionCodeDocRef = doc(db, `sessionCode/${sessionCode}`);

    // Firestore에 저장할 데이터
    const sessionCodeData = {
      projectId,
      taskSuiteId,
      taskId,
    };

    // Firestore에 데이터 저장
    await setDoc(sessionCodeDocRef, sessionCodeData);

    console.log('Session Code saved successfully:', sessionCode);
    return true;
  } catch (error) {
    console.error('Error saving Session Code:', error);
    return false;
  }
};