# <img src="public/icons/logo.png" width="45" align="left"> Sitlab Dashboard


<p align="left">
  <img src="https://img.shields.io/badge/firebase-v10.1.0-FFCA28?logo=firebase" alt="firebase" />
  <img src="https://img.shields.io/badge/typescript-v4.9.5-3178C6?logo=typescript" alt="typescript" />
  <img src="https://img.shields.io/badge/react-v18.2.0-61DAFB?logo=react" alt="react" />
</p>

Sitlab Dashboard는 전북대학교 소프트웨어 인터랙션 연구실에서 개발한 인터랙션 데이터 분석 도구입니다. 이 도구는 웹 애플리케이션 형태로 제공되며, 테스터는 웹에 접속하여 Project, Task Suite, Task를 추가, 삭제 및 확인할 수 있습니다.

실험 참여자는 [SitLab Test Tracker](https://github.com/SIT-Lab/sitlab-test-tracker)를 통해 Test에 참여할 수 있으며, Test중 수집된 인터랙션 데이터는 파이어베이스에 저장됩니다. 저장된 마우스 휠 스크롤이나 긴 텍스트 입력과 같은 반복적인 인터랙션 데이터는 추상화를 거쳐 가독성이 향상된 데이터셋으로 재가공되며, SitLab Dashboard 애플리케이션을 통해 보여집니다. 결과적으로 테스터의 인터랙션 데이터 분석 효율성을 높이는 데 도움을 줍니다.

## 👨🏼‍💻팀원
| **편지승**  | **허민**    |
|:-----------:|:-----------:|
| <img src="https://avatars.githubusercontent.com/vuswltmd" height="130" width="130"></img> | <img src="https://avatars.githubusercontent.com/i-mymeminn" height="130" width="130"></img> |
| <a href="https://github.com/vuswltmd" target="_blank"><img src="https://img.shields.io/badge/GitHub-black.svg?&style=round&logo=github&logoColor=white"/></a> | <a href="https://github.com/i-mymeminn" target="_blank"><img src="https://img.shields.io/badge/GitHub-black.svg?&style=round&logo=github&logoColor=white"/></a> |
| <a href="mailto:sseung7367@jbnu.ac.kr" target="_blank"><img src="https://img.shields.io/badge/Gmail-EA4335?style=round&logo=Gmail&logoColor=white"/></a> | <a href="mailto:heomin02@jbnu.ac.kr" target="_blank"><img src="https://img.shields.io/badge/Gmail-EA4335?style=round&logo=Gmail&logoColor=white"/></a> |

## 시스템 아키텍쳐
<작성예정>

## 💿사용방법
<p align="left" >
  <img src="https://github.com/user-attachments/assets/e89f1808-e2ac-4ae7-97ab-50be7ac2f177" width="100%" alt="image1" style=""/>

  ### A. Task 프로젝트 목록
 전체 프로젝트 목록을 보여줍니다.
  - 원하는 프로젝트를 클릭하면 해당 프로젝트에 포함된 Task Suite를 확인할 수 있습니다.

</p>

<p align="left">

  ### B. 프로젝트 추가버튼
  프로젝트를 추가할 수 있는 버튼입니다
  <div style="margin-left: 20px;">
    <p>
      <img src="https://github.com/user-attachments/assets/268bf128-766e-4573-8eff-fd2d9bbe9370" width="50%" alt="image2" style=""/>
    </p>
  </div>
  <ul>
    <li>프로젝트 추가버튼을 클릭하면 위와 같이 모달창이 나타납니다.</li>
    <li>Project Title을 입력하고 Add Project 버튼을 누르면 새로운 프로젝트가 추가됩니다.</li>
  </ul>
</p>

<p align="left">
  <img src="https://github.com/user-attachments/assets/81e3c574-bbbd-4163-9756-50ef19686b95" width="100%" alt="image3" style=""/>

  ### C. Task Suite 목록
  **A. Task 프로젝트 목록**에서 선택한 프로젝트에 포함된 Task Suite 목록들을 나타냅니다.
  <ul>
    <li>목록 중 원하는 Task Suite를 클릭하면 해당 Task Suite에 포함된 Tasks목록을 확인할 수 있습니다.</li>
    <li>위 사진은 Task Suite2를 선택한 예시입니다.</li>
  </ul>
</p>

<p>

  ### D. Tasks 목록
  선택한 Task Suite에 포함된 Task 목록을 나타냅니다.
  <ul>
    <li>목록 중 원하는 Task의 드롭다운 버튼을 클릭하면 해당 Task의 세부 정보를 확인할 수 있습니다.</li>
  </ul>
</p>

<p>

  ### E. Task Suite 추가 버튼
  선택한 Project에 새로운 Task Suite를 추가할 수 있는 버튼입니다.
  <div style="margin-left: 20px;">
    <p>
      <img src="https://github.com/user-attachments/assets/d5dfeb5f-bdec-42ad-b9c8-680ed3fad894" width="50%" alt="image4" style=""/>
    </p>
  </div>

  <ul>
    <li>Task 추가 버튼을 클릭하면 위와 같이 모달 창이 나타납니다.</li>
    <li>Task Title을 입력하고 Add Task 버튼을 누르면 현재 Task Suite에 새로운 Task가 추가됩니다.</li>
  </ul>
</p>

<p align="left">

  ### F. Tasks 추가버튼
  선택한 Task Suite에 새로운 Task를 추가할 수 있는 버튼입니다. 

  <div style="margin-left: 20px;">
    <p>
      <img src="https://github.com/user-attachments/assets/c9840e3e-22d6-4cc1-8c80-371a4621c504" width="50%" alt="image5" style=""/>
    </p>
  </div>

  <ul>
    <li>Task 추가버튼을 클릭하면 위와 같이 모달창이 나타납니다.</li>
    <li>Task title을 입력하고 Add Task버튼을 누르면 새로운 Task가 추가됩니다.</li>
  </ul>
</p>

<p align="left">
  <img src="https://github.com/user-attachments/assets/f0fea35c-abf5-4157-a80a-694d61619803" width="100%" alt="image6" style=""/>

  ### G. Task 상세 정보
특정 Task의 드롭다운 버튼을 클릭하면 해당 Task에 대한 상세 정보를 확인할 수 있습니다. Task 상세 정보에는 해당 Task에 참여한 사용자와 각 사용자가 수행한 Task에 대한 정보가 포함되어 있습니다. 각 행의 오른쪽에 위치한 Log 버튼을 클릭하면 수집된 상세한 인터랙션 데이터와 그에 대한 추상화된 데이터셋을 확인할 수 있습니다.

<p>
  <img src="https://github.com/user-attachments/assets/528d210b-98a9-4d37-9ae7-a80fa2b3240e" width="100%" alt="image7" style=""/>
</p>

<ul>
  <li>추상화가 적용된 인터랙션 데이터셋</li>
</ul>

<p>
  <img src="https://github.com/user-attachments/assets/21835235-466d-42b2-9a74-26ff7f14b30f" width="100%" alt="image8" style=""/>
</p>

<ul>
  <li>추상화가 적용된 데이터셋을 구성하는 데이터를 확인하고 싶다면 해당 행을 클릭하세요.</li>
  <li>예시: 2번 데이터셋을 클릭하면 2번 데이터셋을 구성하는 데이터들을 확인할 수 있습니다.</li>
</ul>

</p>

## ⚙️설치방법

1. **필수 조건:**
   - 먼저, [Node.js](https://nodejs.org/)가 설치되어 있어야 합니다.

   #### Node.js 설치방법

    #### Windows
    1. [Node.js 다운로드 페이지](https://nodejs.org/)로 이동합니다.
    2. 'LTS' (Long Term Support) 버전을 선택하여 다운로드합니다.
    3. 다운로드한 설치 파일을 실행하고, 화면의 지시에 따라 설치를 완료합니다.

   #### macOS
   - 방법 1: Node.js 다운로드 페이지 이용
     1. [Node.js 다운로드 페이지](https://nodejs.org/)로 이동합니다.
     2. 'LTS' (Long Term Support) 버전을 선택하여 다운로드합니다.
     3. 다운로드한 설치 파일을 실행하고, 화면의 지시에 따라 설치를 완료합니다.

   - 방법 2: Homebrew 이용
     1. Homebrew가 설치되어 있는지 확인합니다. 설치되어 있지 않다면 [Homebrew 웹사이트](https://brew.sh/)의 지시에 따라 설치합니다.
     2. 터미널을 열고, 다음 명령어를 입력하여 Node.js를 설치합니다:
        ```sh
        brew install node
        ```

    #### Linux
    1. NodeSource 바이너리 배포판을 사용하여 설치할 수 있습니다:
        ```sh
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
        ```

2. **코드 클론:**
   - GitHub에서 이 프로젝트의 코드를 클론합니다.
      ```sh
      git clone https://github.com/SIT-Lab/sitlab-dashboard.git
      cd sitlab-dashboard
      ```
3. **환경 변수 설정:**
    - 프로젝트의 루트 디렉토리에 .env 파일을 생성하고, 다음 내용을 추가합니다. Firebase 콘솔에서 발급받은 값을 넣어주세요
      ```sh
      REACT_APP_FIREBASE_API_KEY=발급받아서_넣어주세요
      REACT_APP_FIREBASE_AUTH_DOMAIN=발급받아서_넣어주세요
      REACT_APP_FIREBASE_PROJECT_ID=발급받아서_넣어주세요
      REACT_APP_FIREBASE_STORAGE_BUCKET=발급받아서_넣어주세요
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=발급받아서_넣어주세요
      REACT_APP_FIREBASE_APP_ID=발급받아서_넣어주세요
      REACT_APP_FIREBASE_MEASUREMENT_ID=발급받아서_넣어주세요
      ```
4. **필수 패키지 설치:**
   - 프로젝트의 루트 디렉토리에서 npm을 사용하여 필요한 패키지를 설치합니다.
      ```sh
      npm install
      ```
5. **애플리케이션 실행:**
   - 아래 명령어를 사용하여 애플리케이션을 실행합니다.
      ```sh
      npm start
      ```
6. **웹 브라우저에서 확인:**
   - 웹 브라우저를 열고 http://localhost:3000으로 접속하여 애플리케이션을 확인합니다.

## 📜License

This project is licensed under the Apache License 2.0. For more details, please refer to the  [LICENSE](LICENSE) file.

This project includes third-party libraries that are licensed under the Apache License 2.0. For more details, please refer to the [NOTICE](NOTICE) file.
```
   Copyright [2024] [Division of Computer Science and Engineering,
   Jeonbuk National University SIT Lab]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```