import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 200px;
  }
`;

export const Card = styled.div`
  background: #FFF;
  width: 50%;
  border-radius: 8px;
  padding: 20px;
  margin-top: 15px;
  box-shadow: 0 6px 10px 0 rgba(0,0,0,0.20);

  h2 {
  font-size: 28px;
  color: #392D2D;
  margin-bottom: 10px;
}
`;

export const Templates = styled.div`
  width: 100%;
  height: 150px;
  background: #EEE;
  border-radius: 8px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 30px;

  button{
    background: transparent;
    margin-right: 10px;
    border: 2px solid transparent;
    &.selected {
      border-color: #4395D8;
    }
    img{
      width: 120px;
      height: 120px;
    }
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    border: 1px solid #DBDBDB;
    padding: 0 15px;
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: #4395D8;
  color: #FFF;
  font-weight: bold;
  transition: background 0.2s ease-in;
  font-size: 24px;
  border: 2px solid transparent;
    
    &:hover {
      background: #3672A3;
    }
`;