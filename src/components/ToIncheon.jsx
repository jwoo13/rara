import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #e0f7ff, #b3e0ff); /* 하늘색 그라데이션 */
    font-family: "Arial", sans-serif;
    color: #333;
    padding: 20px;
`;

const ContentBox = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 900px;
    width: 100%;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: #406ac1;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Dropdown = styled.select`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 2px solid #b3e0ff;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    appearance: none;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
    background: #406ac1;
    color: #fff;
    padding: 12px;
    font-size: 16px;
    text-transform: uppercase;
`;

const TableCell = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
    background: #f9f9f9;
    text-align: center;
    color: #333;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f1f8ff;
    }

    &:hover {
        background-color: #e6f7ff;
    }
`;

function ToIncheon() {
    const [flights, setFlights] = useState([]);
    const [start, setStart] = useState(""); // 출발지 선택

    useEffect(() => {
        fetch("/airlines.json")
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error("JSON 데이터 가져오기 실패:", error));
    }, []);

    const filteredFlights = start
        ? flights.filter(
            (flight) => flight.destination === "ICN" && flight.start === start
        )
        : [];

    return (
        <Wrapper>
            <ContentBox>
                <Title>✈️ 인천공항 도착 항공편 조회 ✈️</Title>
                <Dropdown value={start} onChange={(e) => setStart(e.target.value)}>
                    <option value="">--- 목적지를 선택하세요 ---</option>
                    <option value="NRT">도쿄/나리타</option>
                    <option value="LHR">런던/히드로</option>
                    <option value="JFK">뉴욕/존에프케네디</option>
                    <option value="1">광저우</option>
                    <option value="2">난징</option>
                    <option value="3">마카오</option>
                    <option value="4">베이징</option>
                    <option value="5">상하이</option>
                    <option value="6">홍콩</option>
                    <option value="7">타이베이</option>
                    <option value="8">울란바토르</option>
                    <option value="9">하노이</option>
                    <option value="10">호치민</option>
                    <option value="11">마닐라</option>
                    <option value="12">보홀</option>
                    <option value="13">방콕</option>
                    <option value="14">싱가포르</option>
                    <option value="15">델리</option>
                    <option value="16">콜롬보</option>
                    <option value="17">런던</option>
                </Dropdown>

                {start && (
                    <Table>
                        <thead>
                        <tr>
                            <TableHeader>운항편명</TableHeader>
                            <TableHeader>항공사</TableHeader>
                            <TableHeader>도착시간</TableHeader>
                            <TableHeader>출발지</TableHeader>
                            <TableHeader>터미널</TableHeader>
                            <TableHeader>월</TableHeader>
                            <TableHeader>화</TableHeader>
                            <TableHeader>수</TableHeader>
                            <TableHeader>목</TableHeader>
                            <TableHeader>금</TableHeader>
                            <TableHeader>토</TableHeader>
                            <TableHeader>일</TableHeader>
                            <TableHeader>운항기간</TableHeader>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredFlights.map((flight, index) => (
                            <TableRow key={index}>
                            <TableCell>{flight.id}</TableCell>
                                <TableCell>{flight.airline}</TableCell>
                                <TableCell>{flight.time}</TableCell>
                                <TableCell>{flight.start}</TableCell>
                                <TableCell>{flight.terminal}</TableCell>
                                {flight.weekdays.map((day, i) => (
                                    <TableCell key={i}>
                                        {day === "Y" ? "✈️" : "-"}
                                    </TableCell>
                                ))}
                                <TableCell>{flight.period}</TableCell>
                            </TableRow>
                        ))}
                        </tbody>
                    </Table>
                )}
            </ContentBox>
        </Wrapper>
    );
}

export default ToIncheon;
