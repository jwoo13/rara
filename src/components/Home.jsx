import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #e0f7ff, #b3e0ff); /* 하늘 그라데이션 */
    color: #fff;
    font-family: "Arial", sans-serif;
`;

const Header = styled.div`
    background: linear-gradient(135deg, #406ac1, #305599);
    padding: 20px 50px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin-bottom: 40px;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    color: #fff; /* 밝은 금색 */
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const Button = styled.button`
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(to right, #406ac1, #305599);
    border: none;
    border-radius: 50px; /* 둥근 버튼 */
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

    &:hover {
        background: linear-gradient(to right, #305599, #1f3f7e);
        transform: scale(1.05); /* 약간 확대 */
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
    }
`;

const Footer = styled.div`
    margin-top: 40px;
    font-size: 14px;
    color: #666;
`;

function Home() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header>
                <Title>✈️ 항공편 조회 시스템 ✈️</Title>
            </Header>
            <ButtonContainer>
                <Button onClick={() => navigate("/main")}>인천공항 → 국제선</Button>
                <Button onClick={() => navigate("/to-incheon")}>국제선 → 인천공항</Button>
                <Button onClick={() => navigate("/international")}>국제선 → 국제선</Button>
            </ButtonContainer>
            <Footer>© 2024 항공편 조회 시스템 | All Rights Reserved</Footer>
        </Wrapper>
    );
}

export default Home;
