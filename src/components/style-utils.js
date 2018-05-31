import styled, { css } from "styled-components";
// import Card from "./Card";

export const respond = {
   handheld: (...args) => css`
      @media (max-width: 420px) {
         ${css(...args)};
      }
   `
};

export const WrapperMenu = styled.header`
   display: grid;
   grid-column: 2/3;
   height: 5rem;
   width: 80%;
   margin: 0 auto;
   background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
`;

export const WrapperSideBar = styled.aside`
   display: grid;
   grid-column: 1/2;
   grid-row: 1/3;
   background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
`;

export const WrapperFooter = styled.footer`
   display: grid;
   grid-column: 1/3;
   grid-row: 3/4;
   height: 9rem;
   background-color: var(--color-grey-dark-1);
`;

export const WrapperSection = styled.section`
   display: grid;
   grid-gap: 2rem 2rem;
   /* justify-content: center; */
   justify-items: center;
   width: 80%;
   margin: 4rem auto;
   padding: 3rem;
   grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
   background: linear-gradient(to right, #3e5151, #decba4);
`;

export const WrapperMain = styled.main`
   display: grid;
   grid-column: 2/3;
   /* grid-row:  */
   width: 100%;
   /* margin: 4rem auto; */
   /* grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); */
   background: rgba(11, 222, 222, 0.1);
`;

export const WrapperApp = styled.div`
   display: grid;
   grid-template-columns: 17rem 1fr;
   grid-template-rows: 5rem repeat(auto-fill, minmax(20rem, 1fr)) 9rem;
   justify-content: center;
   background-color: rgba(122, 11, 255, 0.1);
`;
