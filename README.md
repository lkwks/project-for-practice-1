### 2022.9.21 개선사항

1) index.html, style.css

- id 선택자 전부 삭제. js 코드나 css에서 index.html 내 엘리먼트를 호출할 땐 불필요한 클래스 호출이나 임의의 속성 추가보다는 되도록 css 경로("div:nth-child(1)" 같은 스타일)를 활용.

- 불필요한 json 파일 모두 없애고 필요한 뼈대 문구들은 모두 index.html 안에 채워넣음. 불필요하게 동적으로 생성시켰던 엘리먼트들도 최대한 index.html에 채워넣고 정말 필요한 것만 동적으로 생성시키도록 변경.

- js 코드 내에서 직접 엘리먼트의 style 멤버 변수 내용을 변경하는 코드를 거의 없애고 상황에 맞는 class별 속성을 정의하여 class를 add하고 remove 하는 식으로 엘리먼트의 스타일 속성 변경을 구현하도록 변경

- 시간, 날짜 표기하는 포맷 텍스트를 index.html에 적어놓고 js 코드에서 필요할 때 꺼내 쓰도록 함


2) awesomespa.js

- 페이지의 각 요소의 기능별로 class를 생성했는데, 하위 요소 class에 인자를 전달할 때 그 요소 class의 DOM 노드 1개와 꼭 필요한 함수 1-3개만 전달하도록 함

- 중복되고 불필요한 코드를 간소화


3) home.js

- render() 메서드를 처음에 localStorage에 저장된 캐시 불러올 때만 호출하도록 함

- 드래그 앤 드롭의 결과로 버튼이 위치를 변경하는 부분을 과거에는 드래그를 시작한 순간부터 수시로 렌더링 함수를 호출해 비효율적인 렌더링 코드를 사용했으나, 정말 필요할 때만 엘리먼트 위치 변경 함수 호출이 딱 한 번만 위치 조정 작업이 일어나도록 했으며 이를 appendChild() 메서드를 호출하는 것만으로 구현하도록 변경


4) album.js

- 기존 이미지 파일 목록을 li 엘리먼트만으로 구현했고 이미지는 그것의 스타일 속성의 background-image 속성만으로 구현했으나, opacity를 0로 두는 한이 있어도 img 태그를 추가함. 얼핏 불필요한 구현 같아 보이지만, '이미지 파일 목록의 이미지를 클릭하면 그 이미지가 로드된다'라는 개념을 구현했는데, '이미지를 클릭한다'를 'li 엘리먼트 위치를 클릭한다'만으로 구현하는 게 semantic한 관점에서 모순적이라 생각되어서 img 태그가 필요하다고 판단함.






### 1. 프로젝트 간략한 설명

\- index.html을 로드하면, index.html에서 src 폴더의 awesomespa.js 파일을 로드하여 index.html 내부를 동적으로 채움. 

\- awesome.js 파일은 맨 처음 config.json 파일 내용을 읽어 이 값을 App 클래스의 생성자의 인자로 전달. 그 다음으로는 config.json 파일의 내용을 따라 index.html의 내용을 채우는 작업이 수행됨.

\- 전체적인 어플리케이션의 외관을 구성하는 태그는 index.html 파일에 직접 태그를 작성하여 구현. 자바스크립트로 동적으로 내용을 채운 건, .json파일 또는 localStorage에서 읽은 데이터를 루프로 반복하여 리스트로 구성한 것들만. 이렇게 구성한 이유는, 애플리케이션의 외관을 추후 수정하고자 한다면 그 외관이 직접 태그로 작성돼 있어야 수정이 용이할 거라고 생각했기 때문. 이렇게 구현하는 경우 render 과정에서 queryselector 사용이 필수적인데, 이 경우 정적으로 구현된 dom에 변경이 있어도 추적이 어렵다는 단점이 있다고 들음. 정적으로 구현된 dom을 변경하는 코드를 쓰지 않기 위해 주의함.


### 2. 소감

굉장히 많은 걸 배울 수 있었던 미니 프로젝트. SPA를 실제로 구현할 때 프론트엔드에서는 어떤 지점을 고려해야 하는지를 굉장히 절실히 느낄 수 있었고, 구상한 것을 실제로 구현으로 옮길 때 자바스크립트 관련 문법 지식의 기초를 얼마나 잘 알아야 하는지를 절실히 느낄 수 있었음. 

1\) 구현에 앞서 고려해야 하는 사항들 소감

\- 변수명, 함수명, 클래스명, 태그 ID명 등에 대하여 확고한 네이밍 규칙을 갖고 시작하는 게 중요하다고 느낌. 원칙 없이 지어놓은 이름은 개발이 한참 진행된 이후에 그것이 무엇을 위해 사용된 변수, 함수인지 잘 안 떠올라서 나중에는 쓰지 않는 경우가 많아짐.

\- 태그의 스타일링을 class로 할지 id로 할지에 대해 충분한 기준을 가지고 구현에 들어가는 게 바람직해 보임. 이 정도 규모 프로젝트에서는 class와 id의 차이가 크지 않으나 규모가 커지면 현저한 차이를 보일 것으로 생각됨.



2\) 문법지식 소감

\- 코드는 써놨는데 문법에 맞지 않거나 의도대로 작동하지 않아 이를 고치는 시간이 개발시간의 2/3 이상은 차지한 듯. 

\- 모듈 번들러 없이 크롬에서 지원하는 기능만 갖고 작동하도록 import, export 구문을 쓰려고 노력했는데, 웹에서 검색해 얻은 자료로는 크롬에서 지원하는 import, export의 문법을 제대로 찾기 어려워서 굉장히 고생. 

\- ul, li 태그를 어떨 때 사용하는 게 적절한지 한참 고민했었는데, 일단 div로 구현한 후 각 태그를 살펴보며 ul, li로 바꾸는 게 적절해 보이는 부분만 바꿨더니 적절하게 수정이 된 듯.

\- css 문법을 다루는 데 미숙해서 일부분에만 지정한 css 스타일링이 왜 모든 영역의 태그에 영향을 미치는지 이해를 못해 한참 고민하기도. 

\- img 태그가 아니라 div 태그 background 속성으로 이미지를 다루었는데 img보다 훨씬 더 간편하게 이미지를 다룰 수 있어서 아주 적절한 선택이었다고 생각됨.

\- 콜백함수를 인자로 넣을 때 함수명에 ()를 붙이는 경우와 안 붙이는 경우, 람다식의 함수 내용으로 넣는 경우의 차이를 몰라 각각의 차이를 이해하는 데 한참 고생함.

\- 홈-앨범-메모-알람 순으로 구현했는데 알람이 제일 힘들었음. index.html에 저장 버튼이 정적으로 이미 구현돼있기에, 알람 페이지를 로드할 때마다 동적으로 저장 버튼에 click event listener를 추가되는 문제를 깨닫는 데 시간이 꽤 걸렸기 때문. 

\- 모듈 내에서만 쓴다 하더라도 전역변수의 남용은 좋은 습관이 아니라 생각하고 전역변수 사용에 관해 명확한 기준을 가져야 한다고 생각. 예를 들어 addEventListener의 콜백함수를 쓸 때처럼 전역변수가 아니면 에러가 나는 경우가 있음. 이처럼 전역변수를 꼭 써야 하는 상황에만 제한적으로 전역변수를 사용하고 그 외에는 사용을 자제하는 게 좋다고 생각하는데, 이를 명확히 구분하고 싶고 이러한 상황이 또 언제 나타나는지를 명확히 알고 싶음.

\- 체계적인 공부 없이 무작정 구현부터 하고 보는 게 아주 좋은 공부법은 아니라는 생각이 듬. 막 짜봤다가 잘 안되니까 지우고 다시 쓴 코드들이 많은데, 그러고 나니까 정상 작동은 하는데 그래서 지웠던 코드는 왜 안되는지 이해도 안되고 머리에도 안 남음. 틀린 코드를 반복해 쓸 가능성이 아직 남아있다고 생각. 완성된 코드 보니까 내가 기존에 알던 지식만 갖고 깔끔하고 쉽게 잘 짠 것처럼 보이는데 과정 생각하면 전혀 그렇지 않았어서 완성된 코드를 보고 확신이 안생기고 오히려 의아하기만 함.

\- 앱을 처음 그리는 과정을 클래스의 생성자를 통해 구현하고, 앱의 각 파트를 보이고 숨기고를 클래스의 멤버함수를 호출하는 형태로 구현하니 SPA의 구현이 객체화가 잘 되는 것을 알 수 있었음.

\- _클래스의 생성자 함수가 수행되면서 다른 클래스의 생성자 함수를 수행할 때 this를 인자로 넘겨야 하는 부분이 많았는데(=자식 클래스가 부모 클래스의 멤버함수를 호출하는 경우가 많았음), 이러한 방식의 코딩이 향후 유지보수에 이익이라고 할 수 있는지 확신이 없음. (얼핏 느끼기에는 스파게티 코드 같은 느낌이 있는데, 이게 실제로 그와 비슷한 문제를 발생시켜서 그런지 아니면 자식 클래스가 부모 클래스의 멤버 함수를 참조하는 식의 코드를 써본 경험이 아직 부족해서 둘이 단지 비슷하게 느껴질 뿐인 거고 실제로 우려할 정도의 문제는 없는 건지 잘 모르겠음. 얼핏 느끼기에는 자식 클래스의 멤버함수들이 부모 클래스의 변수를 수정하는 코드만 안 쓰면 큰 문제는 없을 것 같기는 한데..) 유지보수에 불이익이 있다면 어떤 점에서 불이익이 있는지, 그리고 그 불이익을 어떻게 극복해야 하는지 아직은 잘 모르겠음._ this를 인자에서 지우고 새 객체를 정의해 이를 전달하는 방식으로 변경. 이 경우 여기서 우려한 '부모 객체의 멤버 변수 수정'이라는 가능성은 원천 차단. 그 밖에 다른 조심해야 할 문제가 있는지는 좀 더 공부가 필요한 듯.

\- querySelector가 많이 쓰이나 한편으로 querySelector의 속도에 대해 비판이 있어 getElementById를 쓸 수 있다면 이를 쓰는 것이 더 추천된다고 하는데, 개인적으로 느끼기에 getElementById는 거의 모든 태그에 id를 지정하게 하고 그 id는 보통 그 엘리먼트와 그 주변 엘리먼트 사이 관계에 대한 정보를 담고 있지 않아 semantic한 코드를 작성하는 데는 방해가 된다고 생각. 개인적으로 유지보수 그리고 개발 과정에서의 생산성 등을 고려할 때 semantic한 코드를 쓰는 것이 굉장히 중요하다고 생각하기 때문에, getElementById를 쓰는 것은 가급적 피하고 싶었음. 대안으로 getElementsByTagName 같은 걸 쓸 수 있는데, 많이 본 방법은 아니라서 아직은 과감하게 사용하진 못하겠음..


### 3. 새로 배운 문법 지식 정리

1\) import, export

\- export할 때, default를 반드시 하나 써야 함.

\- default는 import할 때 어떤 이름으로든 import할 수 있으며, {}를 필요로 하지 않음. 그러나 그 외의 것들은 {}로 감싸야만 import가 일어남.

\- 경로를 적을 땐 반드시 파일명 앞에 /가 들어가야 함.


2\) Math.floor()

3\) Array 객체의 splice 메서드

\- 그 배열에서 지정한 위치에서 지정한 원소 개수만큼 삭제됨.

\- 메서드 자체는 잘려나간 부분에 해당하는 배열이 리턴됨.

4\) Array 객체의 unshift 메서드

5\) 크롬 검사 탭에서 element.style {} 부분은 자바스크립트로 동적으로 지정한 스타일이 적혀있는 부분.

6\) Object.keys 메서드

7\) removeEventListener 메서드

\- addEventListener로 추가된 익명함수는 삭제할 수 없음에 주의. 

\- addEventListener로 콜백함수 넣을 때 인자를 받는 기명함수를 넣으려면 function func1(event) {} 하는 형태의 기명함수를 넣으면 됨.

8\) max-height, min-height류 스타일 속성 설정했다 지우는 법

\- 'none'으로 지정하면 기존에 지정돼있던 속성을 지울 수 있음.


9\) classList.add, remove 메서드

10\) background-position 속성

\- 백그라운드 이미지를 지정하기 이전에 position부터 지정하면, 나중에 백그라운드 이미지를 변경했을 때 지정된 position 속성이 적용 안되는 경우가 있음. 따라서 백그라운드 이미지 변경 후 position 속성도 반드시 그 다음에 지정해야 함.

11\) background-size: cover, contain

12\) appendChild

\- 같은 노드를 여러 번 appendChild 하면 그 부모노드 아래에 같은 내용이 계속 중복돼서 추가됨. 이런 상황을 원하지 않는다면 부모노드.innerHTML ='';로 내용을 지운 다음에 추가해야.

13\) dragstart, dragend

\- dragstart의 콜백함수로 drag 하던 타겟의 style.display 속성을 none으로 바꾸면 바로 dragend 이벤트가 발생한 것으로 간주됨. (dragstart 때 opacity를 0.1 이하로 변경해주면 none으로 바꾼 것과 아주 유사한 효과를 얻을 수는 있음.)

\- draggable 속성을 true로 지정해주지 않으면 dragstart 이벤트가 일어나지 않음.

14\) event listener에 콜백함수를 추가할 때, ()를 쓰지 않고 함수명을 등록하는 것과 함수명을 익명함수 안에 담아 익명함수를 등록하는 것과는 차이가 있음을 유의해야.

\- 특히 클래스의 멤버함수를 콜백함수로 등록할 때. ()를 쓰지 않고 함수명을 등록할 땐 event listener에 이를 등록할 당시 메모리에 있는 내용 그대로 그 함수 내용이 콜백함수로 등록되는데(=그 부분이 실행되는 시점에서 그 클래스의 선언이 완벽히 이루어지지 않은 경우라면 undefined인 상태에서 콜백함수 내용이 등록됨) 익명함수를 등록하면 event listener가 발동될 때에야 비로소 그 시점에 메모리에 있는 내용대로 함수 호출이 일어나더라.



#### * 개발 중에 했던 기억 나는 삽질 포인트

\- import, export 문법에 맞게 제대로 쓰느라 진짜 너무 고생함.. 상세히 문법 설명해주는 인터넷 페이지 진짜 못 찾음..

\- input box, select box 같은 거 동적으로 구성하려다가 어떻게 해야 이런 태그 동적 추가를 간결하게 코딩할 수 있는지 한참 고민하다가 동적으로 추가한다는 계획 포기하고 index.html에 정적으로 그려놓은 후 display를 none과 block/inline으로 보여주기 안보여주기 자바스크립트로 조절하는 방향으로 코딩함. 기획 때 잠깐 떠올랐을 때 굳이 메모 안해뒀던 아이디어였는데 알람 부분 구현할 때 돼서 가까스로 다시 떠오름. 알람 구현하기 전까지만 해도 div#page-content 이하는 전부 다 동적으로 구성하는 방식으로 코딩했었는데, 이 아이디어 떠올린 다음에 index.html의 div#page-content 아래에 div#alarm-content, div#memo-content, div#album-content, div#home-content 태그 네 개를 추가. 동적으로 구성돼있던(document.createElment로 만들고 div#page-content 태그 아래에 appendChild로 붙였던) 태그들 다 뜯어서 index.html에 정적으로 그림. 이 방향으로 코드를 개선하면서 훨씬 구조가 간결해지게 됨을 느낌.

\- 전체적으로 구현 과정이 크게 4단계로 나뉜다고 생각.

1\) home의 드래그앤드롭 기능 구현 이전 단계. 머리에 생각은 많은데 도저히 구체적 구현 방향이 머릿속에 제대로 떠오르지 않아 의욕이 잘 안 생기던 시기. 상태바 back 버튼, new 버튼을 어떻게 구현해야 할지, 어떻게 해야 버튼들이 적당한 크기와 간격으로 예쁘게 줄서는지 한참 고민함. (div 태그의 중앙 정렬 문제. 현재 코드는 안팎으로 모두 display:flex 속성을 주고 justify-item:center 속성을 줘서 해결. 잘 몰라서 position을 absolute로 줘보기도 하는 등 한참 고민함.. 이때 이 문제로도 멘붕 진짜 많이 함..) 이 시기에는 1초마다 시간이 바뀌는 시계 기능을 만들고 대단한거라도 만든 듯 뿌듯함을 좀 느꼈었음. 이때까지만 해도 이런 시계 만들어본 건 처음이긴 하니까..

2\) home의 드래그앤 드롭 기능 구현 단계. '일단 이것부터 해보자' 하고 마음먹고 꾹 참고 구현했고, 생각보다 빠른 시간 내에 구현하는 데 성공. 버튼을 끌어당기면 버튼이 사라지는 것처럼 보이게 하고 싶어서 dragstart 때 display='none' 되는 콜백함수를 이벤트 리스너로 넣었는데 제대로 작동 안해서 많이 당황했었음. 근데 이 문제 해결하고 나니까 나머지는 생각외로 엄청 쉽게 풀림.

3\) 앨범-메모 기능 구현 단계. css 문법을 잘 몰라서 display:flex를 상태바에만 적용했다고 생각했는데 알고보니 페이지 전체 div에 적용하고 있었고 이래서 이미지 리스트 부분 구현이 진짜 제대로 안됐었는데 이거 해결하고 나니까 생각보다 엄청 빨리 풀림. css 문법 제대로 이해한 상태에서 이미지들을 div background 속성으로 처리하니까 굉장히 간단하게 구현 성공. 앨범 구현 성공하고 나니까 메모 기능도 굉장히 빠른 시간 내에 구현하는 데 성공함.

4\) 알람 기능 구현 단계. 전체적으로 메모 기능과 코드가 거의 유사하다고 생각했는데, 두 지점에서 크게 헤맴. (1)input, select 박스를 동적으로 구성하려던 지점에서 헤맴. (2)알람 페이지 열 때마다 저장 버튼에 이벤트 리스너가 계속 추가돼서 저장은 한 번 눌렀는데 알람은 40개씩 저장되는 일이 일어나서 매우 고통을 느꼈었음.. 프로젝트의 마지막 고비.

\- 고난을 극복할 수 있었던 포인트를 정리해보면..

1\) 내 능력에 벅차다고 느껴질 정도로 큰 프로젝트라 하더라도 내 능력 범위 내에서 구현할 수 있는 사소하고 작은 기능들이 분명 있다. 그것들을 하나씩 구현하다 보면 점점 실력도 쌓이고, 그렇게 실력이 쌓이다 보면 내가 구현할 수 있는 기능의 수준이 점점 높아지게 된다. 계단을 밟아나가다 보면 전체 프로젝트를 완성하는 순간이 반드시 온다.

2\) css 문법을 정확히 이해하는 게 중요하다. 틀린 문법으로 css를 채워나가다 보면 '틀린 문법에도 불구하고 그럴싸해 보이는 페이지 만들기'가 목표가 돼서 이상한 태그들을 덕지덕지 붙여 쓰는 이상한 페이지를 만들 위험이 있다.

3\) css 문법 이해도를 높이는 데 있어 크롬의 검사 기능이 굉장히 도움이 많이 됐다. css에서 내가 지정한 속성이 특정 부분에서 왜 죽는지를 검사 기능을 잘 살펴보면 충분히 쉽게 이해할 수 있다.

4\) css를 쓸 땐 비슷한 결과를 내더라도 최대한 적은 속성을 건드려 결과를 내도록 노력하는 게 중요하다. 너무 많은 속성을 추가하다 보면, 나중에 새로 기능을 추가했을 때 갑자기 전체 뷰가 망가져 버리는 경우가 생겨도 이를 디버깅하는 일이 굉장히 어려워진다.

5\) 아무리 모르는 것도 웬만하면 검색하면 나오지만, 검색해도 원인을 찾기 힘든 경우도 꽤 있더라. 그럴 땐 내 코드를 고쳐 검색 결과 중 그나마 가장 유사해보이는 상황과 비슷한 상황을 만든 후 거기서 내가 원하는 결과가 나올 때까지 조금씩 코드를 고쳐보면서 정상작동과 오작동을 가르는 지점을 정확히 알아보려 하는 것이 큰 도움이 되더라. 잘 모르는 상태에서 했던 터무니 없는 시도들이 굉장히 많았는데, 검색해서 나온 정상작동 코드를 일단 그대로 쓴 후 거기서 조금씩 고치다보니 내가 처음에 썼던 터무니 없던 코드는 나중에는 있었는 줄도 모르게 된 상황이 정말 많았다. 사실 내가 썼던 그 '터무니 없는 코드'를 아무 미련 없이 깔끔히 지우고 검색해서 나온 정상작동코드를 일단 그대로 옮겨적어 실험해보는 게 말이 쉽지 실제로 하기는 어려운 점이 많다. 터무니없는 코드를 쓰는 이유는 그게 터무니없다는 걸 모르기 때문. 즉, '내 코드도 맞는 코드인데 조금 틀렸을 뿐'이라는 생각을 갖고 있을 때가 많기 때문에, 그 생각을 미련없이 포기하는 건 정말 어려운 일. 개발 과정에서 많은 시간이 걸린 건 '미련없이 포기하기' 할 수 있게 되는 데 걸린 시간이 정말 길었기 때문이라고 생각. 내가 자바스크립트를 진짜 많이 모르는데도, '그래도 내가 아예 모르는 건 아닐 거야' 하는 막연한 믿음(또는 자존심? 자존감? '내가 그렇게 무능한 건 아닐거야' 하는 일종의 자기애랄까..) 때문에 '내가 쓴 코드도 맞겠지' 하는 믿음이 그만큼 강했던 것 같음. 자바스크립트 개발 경험이 늘어나 여러 함수의 사용법에 대한 이해가 깊어지면 터무니 없는 코드와 잘 쓴 코드를 구분하기 쉬워질 테고 그러면 개발속도도 많이 나아지지 않을까 싶음. 글 써본 경험이 늘어나니 못 쓴 표현과 잘쓴 표현을 구분하기 쉬워져 글쓰기 속도가 빨라질 수 있었던 것처럼.

6\) 정적 구현과 동적 구현 사이에서 정말 많이 왔다갔다 했는데.. 일단 header, main, hn, div, ul, li, span 같은 태그를 이용해 체계적으로 잘 구성된 웹페이지를 만들어본 적이 살면서 단 한 번도 없어서 동적이든 정적이든 자신감이 전혀 없었다는 점이 제일 큼. 어려서부터 제로보드 스킨 고치기 수준 웹개발은 많이 해오기는 했는데, 지금 생각해보면 ㅋㅋ css 지식도 없고 div absolute relative 용도 구분도 제대로 못해(이건 지금도;;) 항상 엉망진창 체계 없는 개발을 해왔었고 그게 자신감 하락의 한 원인. 그래서 '정적 구현을 적당히 활용하자'는 괜찮은 아이디어를 갖고 있어도 끝까지 밀어붙이지 못하고 다 잊어버리고 '일단 되는대로' 동적 구현부터 하고 봤던 거. 잘 모를 땐 나쁘지 않은 판단 같음. 만드는 게 어렵지 고치기는 그에 비하면 쉬운 건 맞으니까. 구현 완성도가 점점 높아지면서 div-ul-li 시리즈 이해도가 높아지니까 그제서야 자신감을 갖고 정적 구현으로 옮길 수 있었고 그때부터 서서히 앱의 완성도가 높아진 듯.

7\) 저장버튼 하나에 이벤트 리스너 40개씩 붙었던 것도 ㅋㅋ 동적-정적 사이 왔다갔다 하면서 헤맨 지점 중 하나. 동적으로 페이지 열 때마다 정적으로 구현된 버튼 태그에 이벤트 리스너를 계속 달았으니 페이지 로드 때마다 이벤트 리스너가 붙었던 것.. ㅠㅠ 동적으로 DOM을 다룰 때 어떤 지점을 주의해야 하는지에 대한 이해가 전혀 없는 상태에서 프로젝트에 뛰어들었기에 이런 상황에 부닥치게 된 건데. 이렇게 '내가 그래도 아주 모르는 건 아니구나' 하는 자신감을 갖고 뛰어들었는데 알고보니 '중요한 지점에서 아무것도 모른 채로 다짜고짜 뛰어들었구나' 하는 걸 깨닫게 될 때마다 스트레스가 상당했음. '이 정도 지식은 있지'라고 생각하고 안심했는데 알고보니 그거 몇 배는 되는 지식이 더 있어야 비로소 문제를 풀기 충분한 실력이 된다라는 걸 새로 깨달은 셈이니까. 그래도 그럴 때마다 이해가 부족한 지점이 무엇인지 제대로 이해하려고 매우 집중했고, 이런 상황이 나타날 때마다 이해도를 높이기 위해 생각을 많이 하고 실험을 많이 해서 제대로 확실히 익히려고 노력함. 아예 잘못된 관점을 갖고 있었단 얘긴데 그걸 제대로 수정하지 않으면 앞으로 계속 고생.

8\) 디버그 할 때마다 느낀 건데, '오작동(에러메시지는 없지만 분명 이상하게 작동)'의 원인을 찾아내는 게 굉장히 어려운 일이라는 거. 코드를 아주 조금씩 고치면서 문제의 원인이 도대체 무엇인지 고민해야 하는 시간이 많았는데, 위 7번 문제 같은 경우에는 고쳐도 원인을 알 수 없는 경우가 많아 굉장히 곤란한 기분이었음. 코드의 전체적인 논리에 대해 차근차근 복기를 하는 시간이 많았고, '맞는 코드'라고 확신했던 부분도 한줄한줄 의심에 의심을 거듭한 끝에 원인을 발견할 수 있었음. 원인을 찾지 못할 때마다 오작동 원인에 대한 '대담한 가정'을 하나씩 떠올린 후 하나씩 실험을 해봐야 했는데 맞다고 확신한 지식까지 의심을 해보지 않으면 디버그가 불가능할 때가 많아서 원인을 발견하기까지 너무 힘든 여정이었음.

9\) 이벤트 리스너에 붙인 콜백함수 내부 변수는 전역변수가 아니면 이상하게 작동하더라는 걸 발견했을 때도 좀 끔찍한 기분이었음. 

\- 정말 중간에 관두고 싶었던 시간이 정말 많고, 하기 싫다고 다 제쳐두고 손을 놨던 시간이 많았음에도 불구하고.. 프로젝트 전체적으로 그렇게 엄청 어려운 건 분명 아니었다고 생각함. 너무 어렵다고 생각한 지점들도 사실 시간 조금 더 투자하니 금방 풀린 문제들이 많고, 대부분의 문제가 자바스크립트의 언어적 특성이나 함수/메서드의 사용 방식, 자료형의 이해, css 기초문법 등 기초지식을 탄탄하게 쌓으면 다시는 실수할 일 없을 거라고 확신할 수 있는 문제들이었음. 구현하면서 '도저히 해결 방법을 떠올리는 게 불가능할 것 같다' 싶은 논리와 알고리즘을 요하는 문제는 전혀 발견하지 못함. 프론트엔드 지식을 계속 공부한다면 여러가지 복잡한 기능이 있는 라이브러리, 함수를 적절히 사용하는 지식들을 풍부하게 익힐 수 있겠다는 생각은 드는데, '프로세서가 감당하기 힘들 정도로 대량의 데이터를 다뤄야 하는 어렵고 복잡한 문제를 신기한 아이디어로 간단하게 해결'하는 상황을 아주 많이 만나지는 않을 것 같다는 생각을 함. 사용할 수 있는 기능이 복잡다양할 뿐 그 자체가 어려운 논리로 작동하는 게 아니라면 그런 복잡다양한 지식을 익히는 것 정도는 그렇게 크게 어렵지 않게 할 수 있겠다고 생각함.
