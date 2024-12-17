import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #e0f7ff, #b3e0ff);
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
`;

const Dropdown = styled.select`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 2px solid #b3e0ff;
    border-radius: 8px;
    font-size: 16px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHeader = styled.th`
    background: #406ac1;
    color: #fff;
    padding: 12px;
`;

const TableCell = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
`;

function International() {
    const [flights, setFlights] = useState([]);
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");

    useEffect(() => {
        fetch("/airlines.json")
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error("데이터 가져오기 실패:", error));
    }, []);

    // 출발지와 도착지가 모두 선택된 경우만 필터링
    const filteredFlights = flights.filter(
        (flight) =>
            start && destination && flight.start === start && flight.destination === destination
    );

    return (
        <Wrapper>
            <ContentBox>
                <Title>✈️ 국제선 → 국제선 항공편 조회 ✈️</Title>
                <Dropdown value={start} onChange={(e) => setStart(e.target.value)}>
                    <option value="">--- 출발지를 선택하세요 ---</option>
                    <option value="JFK">뉴욕/존에프케네디</option>
                    <option value="LHR">런던/히드로</option>
                    <option value="NRT">도쿄/나리타</option>
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

                <Dropdown value={destination} onChange={(e) => setDestination(e.target.value)}>
                    <option value="">--- 도착지를 선택하세요 ---</option>
                    <option value="JFK">뉴욕/존에프케네디</option>
                    <option value="LHR">런던/히드로</option>
                    <option value="NRT">도쿄/나리타</option>
                    <option value="CAN">광저우</option>
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

                {filteredFlights.length > 0 && (
                    <Table>
                        <thead>
                        <tr>
                            <TableHeader>운항편명</TableHeader>
                            <TableHeader>항공사</TableHeader>
                            <TableHeader>출발시간</TableHeader>
                            <TableHeader>출발지</TableHeader>
                            <TableHeader>도착지</TableHeader>
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
                            <tr key={index}>
                                <TableCell>{flight.id}</TableCell>
                                <TableCell>{flight.airline}</TableCell>
                                <TableCell>{flight.time}</TableCell>
                                <TableCell>{flight.start}</TableCell>
                                <TableCell>{flight.destination}</TableCell>
                                <TableCell>{flight.terminal}</TableCell>
                                {flight.weekdays.map((day, i) => (
                                    <TableCell key={i}>
                                        {day === "Y" ? "✈️" : "-"}
                                    </TableCell>
                                ))}
                                <TableCell>{flight.period}</TableCell>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </ContentBox>
        </Wrapper>
    );
}

export default International;
