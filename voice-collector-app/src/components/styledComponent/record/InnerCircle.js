import styled from 'styled-components';
const InnerCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    from ${(props) => props.start}deg,
    #fff ${(props) => props.start}deg,
    #fff ${(props) => props.end}deg,
    #000000 ${(props) => props.end}deg,
    #000000 360deg
  );
  position: absolute;
  top: 0;
  left: 0;
`;

export default InnerCircle;