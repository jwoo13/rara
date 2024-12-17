import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    color: #406ac1;
    margin-bottom: 20px;
`;

const Results = styled.div`
    margin-top: 20px;
`;

const Card = styled.div`
    background: #ecf0f1;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Main() {
    const { state } = useLocation();
    const { search = {} } = state || {};
    const [flights, setFlights] = useState([]); // 항공편 데이터 저장

    // JSON 데이터 가져오기
    useEffect(() => {
        fetch("/airlines.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("항공편 데이터:", data);
                setFlights(data); // 데이터를 상태에 저장
            })
            .catch((error) => console.error("JSON 데이터 가져오기 실패:", error));
    }, []);

    const filteredFlights = Array.isArray(flights)
        ? flights.filter((flight) => {
            const flightDate = new Date(flight.date);
            const startDate = search.startDate ? new Date(search.startDate) : null;
            const endDate = search.endDate ? new Date(search.endDate) : null;

            const isDateInRange = startDate && endDate
                ? flightDate >= startDate && flightDate <= endDate
                : true;

            return (
                (!search.start || flight.start.includes(search.start)) &&
                (!search.destination || flight.destination.includes(search.destination)) &&
                isDateInRange
            );
        })
        : [];




    return (
        <Wrapper>
            <Title>검색 결과</Title>
            <Results>
                {filteredFlights.length > 0 ? (
                    filteredFlights.map((flight, index) => (
                        <Card key={index}>
                            <p>
                                <strong>경로:</strong> {flight.start} → {flight.destination}
                            </p>
                            <p>
                                <strong>날짜:</strong> {flight.date}, <strong>시간:</strong> {flight.time}
                            </p>
                        </Card>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </Results>
        </Wrapper>
    );
}

export default Main;
