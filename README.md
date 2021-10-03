
앱의 기본적인 컨셉은 다음과 같이 구성하였다.

1. index.html을 열면 먼저 css파일과 js파일이 로드되며, 그 다음으로 DOM 트리가 로드되면 window.addEventListener("DOMContentLoaded")에 의해 startApplication() 함수가 실행돼 페이지들이 그려진다.

2. 페이지는 기본적으로 layout 폴더에 있는 html 파일들을 파싱하여 DOM 트리로 구성 후 이를 index.html 페이지의 div.page-content 노드의 자식노드로 붙임으로써 화면에 그려진다. 이런 식으로 기능하도록 구조를 짤 경우, 예를 들어 각 페이지의 구성을 추후 변경하고자 할 때 메인 코드가 아니라 layout 폴더 내 파일의 내용만 수정함으로써 수정이 용이하게 할 수 있다는 이점이 있다.

3. 앱에 출력되는 문자들은 모두 json에 저장해두고, 앱 내에서는 json파일을 로드하여 각 위치에 맞는 문자를 json에서 얻어 이를 출력한다. 이 역시도 이와 같이 하는 것이 추후 수정 등에 있어 이점이 있다.



#### 현재 구현 계획

1. drawAlarmContent()

- SAVE 버튼 createElement, setAttribute, classList.add, addEventListener("click", \_=>{newAlarm의 내용을 받아와 로컬 스토리지에 저장});
- NEW 버튼 누르면 newAlarm.style.display = 'block';
- 로컬 스토리지에서 저장된 알람 리스트 가져와 화면에 출력;


2. drawMemoContent()

- drawAlarmContent()와 비슷하게 NEW버튼, 메모 리스트 출력;
- 메모 입력 후 엔터 누르면 로컬 스토리지에 저장.


3. drawAlbumContent()

- album/filelist.json 파일 열어서 파일 목록 가져옴
- 가져온 파일목록에 따라 상단 filelist div에 파일 출력. 현재 클릭된 파일 변수에 저장해놓고 style border 1px solid red 처리
- 파일 클릭 시 하단 view window에 사진 출력.


별 기능 없어 보이는데 막상 구현하려 하면 의욕이 팍팍 떨어지니.. 적어놓고 나면 금방금방 할 것 같은데 막상 코드를 쓰려 하면 좀 더 고민하면 다양한 기능을 추가할 수 있을 거 같단 생각에 아이디어는 계속 나오는데 그렇게 기능 만들려면 써야 하는 코드가 팍팍 늘어나고 의욕 팍팍 떨어지고 그렇다고 그 기능을 버리기는 싫고.. 무한반복. 다른 더 재밌는 일이 먼저 손에 잡히고.. 떠오르는 아이디어까지 포함해 죄다 메모해놓은 그 다음에 코딩으로 들어가야 하나. 그 정도 의지 없으면 프로젝트 끝까지 못 끌고 나갈 거 같다는 생각 듬.. 

미뤄온 포스팅이 너무 많기 때문에 일단 그것부터 처리하고 그 다음에 다시 프로젝트 진행하는 걸로..
