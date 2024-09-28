# <img src="public/icons/logo.png" width="45" align="left"> WebTrace Dashboard


<p align="left">
  <img src="https://img.shields.io/badge/firebase-v10.1.0-FFCA28?logo=firebase" alt="firebase" />
  <img src="https://img.shields.io/badge/typescript-v4.9.5-3178C6?logo=typescript" alt="typescript" />
  <img src="https://img.shields.io/badge/react-v18.2.0-61DAFB?logo=react" alt="react" />
</p>


The WebTrace Dashboard is a web-based tool for managing and analyzing user interaction data during remote usability testing. It enables testers to add, delete, and review Projects, Task Suites, and Tasks.

 Test participants can engage in tests through [WebTrace Tracker](https://github.com/SIT-Lab/WebTrace-Tracker), where the interaction data collected during tests is stored in Firebase. repetitive interaction data, such as scrolls or long text inputs, are abstracted into more readable datasets. The WebTrace Dashboard offers these abstracted datasets, enhancing the efficiency of interaction data analysis for testers.

## Example version of the WebTrace Dashboard

An example version of the WebTrace Dashboard has been deployed using Vercel.
You can access and explore the examples referenced in **Dashboard Features** through the following link: https://sitlab-dashboard.vercel.app/


<!-- ## 👨🏼‍💻팀원
| **편지승**  | **허민**    |
|:-----------:|:-----------:|
| <img src="https://avatars.githubusercontent.com/vuswltmd" height="130" width="130"></img> | <img src="https://avatars.githubusercontent.com/i-mymeminn" height="130" width="130"></img> |
| <a href="https://github.com/vuswltmd" target="_blank"><img src="https://img.shields.io/badge/GitHub-black.svg?&style=round&logo=github&logoColor=white"/></a> | <a href="https://github.com/i-mymeminn" target="_blank"><img src="https://img.shields.io/badge/GitHub-black.svg?&style=round&logo=github&logoColor=white"/></a> |
| <a href="mailto:sseung7367@jbnu.ac.kr" target="_blank"><img src="https://img.shields.io/badge/Gmail-EA4335?style=round&logo=Gmail&logoColor=white"/></a> | <a href="mailto:heomin02@jbnu.ac.kr" target="_blank"><img src="https://img.shields.io/badge/Gmail-EA4335?style=round&logo=Gmail&logoColor=white"/></a> | -->

<!-- ## Authors

The WebTrace Dashboard was developed by the following team members from the Software Interaction Lab, Division of Computer Science and Engineering, Jeonbuk National University:

| **Name**          | **GitHub**                                             | **Email**                              |
|-------------------|--------------------------------------------------------|----------------------------------------|
| **Ji-Seung Pyeon** | [vuswltmd](https://github.com/vuswltmd)               | [sseung7367@jbnu.ac.kr](mailto:sseung7367@jbnu.ac.kr) |
| **Min Heo**        | [i-mymeminn](https://github.com/i-mymeminn)           | [heomin02@jbnu.ac.kr](mailto:heomin02@jbnu.ac.kr)     | -->
<!-- ## 시스템 아키텍쳐

<p align="center" >
  <img src="https://github.com/user-attachments/assets/754a4389-1bbf-4aee-ab8b-37c5513446e7" width="700" alt="image1" style=""/>
</p> -->
## Getting Started

### 1. Clone the Code
  - Clone the project repository by running the following command:
      ```sh
      git clone https://github.com/SIT-Lab/WebTrace-Dashboard.git
      ```
### 2. Set Environment Variables:
  - Create a `.env` file in the root directory of the project and add the Firebase SDK details as follows:
      ```dosini
      REACT_APP_FIREBASE_API_KEY=Your_Firebase_API_Key
      REACT_APP_FIREBASE_AUTH_DOMAIN=Your_Firebase_Auth_Domain
      REACT_APP_FIREBASE_PROJECT_ID=Your_Firebase_Project_ID
      REACT_APP_FIREBASE_STORAGE_BUCKET=Your_Firebase_Storage_Bucket
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=Your_Firebase_Messaging_Sender_ID
      REACT_APP_FIREBASE_APP_ID=Your_Firebase_App_ID
      REACT_APP_FIREBASE_MEASUREMENT_ID=Your_Firebase_Measurement_ID
      ```
### 3. Install Required Packages:
  - Install the necessary dependencies by running:
      ```sh
      npm install
      ```
### 4. Run the Application:
  - Start the application by running the following command:
      ```sh
      npm start
      ```
### 5. Access the Dashboard:
  - Open your browser and go to: http://localhost:3000
  - From here, you can run the WebTrace Dashboard.

## Dashboard Features
<p align="left" >
  <img src="https://github.com/user-attachments/assets/d507675b-010c-45dd-be88-d99ec3197666" width="100%" alt="image1" style=""/>

  ### A. Project List
 Displays the complete list of projects.
  - By clicking on a desired project, you can view the Task Suites included within that project.

</p>

<p align="left">

  ### B. Add Project Button
  The 'Add Project' button lets you add a new project.
  <div style="margin-left: 20px;">
    <p>
      <img src="https://github.com/user-attachments/assets/268bf128-766e-4573-8eff-fd2d9bbe9370" width="50%" alt="image2" style=""/>
    </p>
  </div>
  <ul>
    <li>When you click the Add Project button, a modal window like the one above will appear.</li>
    <li>Enter the Project Title and click the Add Project button to add a new project.</li>
  </ul>
</p>

<br>
<br>

<p align="left">
  <img src="https://github.com/user-attachments/assets/4c6b734c-ff83-4b0c-b93c-3ad260a4ad49" width="100%" alt="image3" style=""/>

  ### C. Task Suite List
  Displays the list of Task Suites included in the project selected from **A. Project List**
  <ul>
    <li>By clicking on the desired Task Suite from the list, you can view the Tasks included in that Task Suite.</li>
    <li>The image above is an example where Task Suite 2 has been selected.</li>
  </ul>
</p>

<p>

  ### D. Task List
  Displays the list of Tasks included in the selected Task Suite.
  <ul>
    <li>By clicking the dropdown button for the desired Task in the list, you can view the detailed information of that Task</li>
  </ul>
</p>

<p>

  ### E. Add Task Suite Button
   The 'Add Task Suite' button lets you add a new Task Suite to the selected Project.
  <div style="margin-left: 20px;">
    <p>
      <img src="https://github.com/user-attachments/assets/d5dfeb5f-bdec-42ad-b9c8-680ed3fad894" width="50%" alt="image4" style=""/>
    </p>
  </div>

  <ul>
    <li>When you click the Add Task Button, a modal window like the one above will appear.</li>
    <li>Enter the Task Title and click the Add Task button to add a new Task to the current Task Suite.</li>
  </ul>
</p>

<p align="left">

  ### F. Add Task Button
   The 'Add Task' button lets you add a new Task to the selected Task Suite. 

  <div style="margin-left: 20px;">
    <p>
      <img src="https://github.com/user-attachments/assets/c9840e3e-22d6-4cc1-8c80-371a4621c504" width="50%" alt="image5" style=""/>
    </p>
  </div>

  <ul>
    <li>When you click the Add Task Button, a modal window like the one above will appear.</li>
    <li>Enter the Task title and click the Add Task button to add a new Task.</li>
  </ul>
</p>

<br>
<br>

<p align="left">
  <img src="https://github.com/user-attachments/assets/b1acb7c2-9196-4c86-bba3-b33d8b7d4ee6" width="100%" alt="image6" style=""/>

  ### G. Information of Participants Who Engage in Task A and Results
By clicking the dropdown button for a specific Task, information about the participants who engaged in that Task, along with the result data for that Task, will be displayed in each row.

  ### H. Log Button
By clicking the Log button located on the right side of each row, a Log Table modal can be opened.

<br>
<br>

<p>
  <img src="https://github.com/user-attachments/assets/60f123dc-e24f-4415-97a7-985e1eea57a6" width="100%" alt="image7" style=""/>
</p>

  ### I. Log Table
In the Log Table modal, you can view the detailed interaction data that has been collected.
<ul>
  <li>You can select the fields to be displayed in the log table.</li>
  <li>You can turn on/off the abstraction feature.</li>
  <li>You can download a CSV file of the interaction data.</li>
</ul>



<br>
<br>

<p>
  <img src="https://github.com/user-attachments/assets/c2145f7d-dd49-45c2-bde8-0d6f34ff6421" width="100%" alt="image8" style=""/>
</p>

  ### J. Abstracted Interaction Data
  For continuous interactions, such as mouse scrolls or keyboard inputs, abstraction is applied.
<ul>
  <li>If you want to view the data that is grouped into the abstracted dataset, click on the corresponding row.</li>
  <li>Example: Click on dataset corresponding to ID 2 to view the data that is grouped into that dataset.</li>
</ul>

</p>

## License

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