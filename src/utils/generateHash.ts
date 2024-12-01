/**
 * 프로젝트, Task Suite, Task ID를 결합하여 고유한 세션코드 생성 (해쉬사용, 생성된 해쉬의 앞 30자리만 반환)
 * @param projectId string - 프로젝트 ID
 * @param taskSuiteId string - Task Suite ID
 * @param taskId string - Task ID
 * @returns Promise<string> - 생성된 세션코드
 */
export const generateHash = async (
    projectId: string,
    taskSuiteId: string,
    taskId: string
): Promise<string> => {
    const data = `${projectId}-${taskSuiteId}-${taskId}`;
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const fullHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // 전체 Hexadecimal 해시
    return fullHash
};