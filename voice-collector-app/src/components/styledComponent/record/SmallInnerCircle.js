import styled from 'styled-components';

const SmallInnerCircle = styled.div`
  width: 150px; /* 내부 원의 지름이 작아지도록 크기 조절 */
  height: 150px;
  border-radius: 50%;
  background-color: #FF6161;
  position: absolute;
  top: 25px; /* 위치 조절 */
  left: 25px;
`;

export default SmallInnerCircle