# v-interactive-3d
인터랙티브 웹 3D Toy Project

## 핵심 정리

### CSS
**perspective**
- Element에 3D요소를 주기 위해서는 persperctive 속성을 준다.
- Perspective CSS 속성은 3D 위치 요소에 약간의 원근감을 주기 위해 z=0 평면과 사용자 사이의 거리를 결정
- perspective: 1000px

**transform-style**
- persperctive가 설정된 요소의 자식요소에게 3d효과를 전달하는 속성이다.

## 발생했던 문제점

### CSS
1. body에 perspective를 주면 자식 element에 position: fixed가 안먹는 상황
    - UI가 3D효과만 있는 상황이기 때문에 body에 perpective 속성을 주고 시작했다.
    - 아래 자식요소에서 position: fixed가 제대로 작동하지 않아 한참 해맴
    - 스크롤 이벤트를 활용하기 위해서 높이를 많이 높여놨다.
    - 그런 상태에서 body에 perpective를 주어서 굉장히 크고 긴 element에 3d요소가 주어지면서 fixed가 제대로 작동하지 않았다.
 
## 추가 기능 구현
1. 점프 기능 - 21.10.07
2. 키보드 (W, S, A, D)로 움직이는 기능 - 21.10.07
3. ES6 문법으로 변경(모듈, class) - 21.10.08

## 버그
1. 캐릭터를 움직이면서 Space를 눌러 점프하면 캐릭터가 계속 움직이는 현상
2. 창 스크롤 후 캐릭터 이동 시 위치 변화
