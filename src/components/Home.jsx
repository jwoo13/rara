import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef } from "react"; // 추가



const Wrapper = styled.div`
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: center; /* 수평 중앙 정렬 */
    justify-content: center; /* 수직 중앙 정렬 */
    position: absolute; /* 화면 중앙 배치 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%); /* 정확히 중앙에 위치 */
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: fit-content; /* 자식 요소 크기에 맞춤 */
`;

const Title = styled.h1`
    text-align: center;
    color: #406ac1;
    margin-bottom: 20px; /* 타이틀과 폼 간 간격 */
`;

const SearchForm = styled.div`
    display: flex;
    flex-direction: row; /* 가로 정렬 */
    gap: 10px; /* 요소 간 간격 */
    align-items: center;
    width: auto; /* 내용 크기에 맞춤 */
`;
const Input = styled.input`
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    flex-shrink: 0; /* 크기 고정 */
    width: auto; /* 내용에 맞는 너비 */
`;

const Button = styled.button`
    padding: 10px 20px;
    background: #406ac1;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap; /* 버튼 텍스트 줄바꿈 방지 */
    flex-shrink: 0; /* 크기 고정 */
    &:hover {
        background: #2980b9;
    }
`;

const Dropdown = styled.div`
    position: relative;
    width: 100%;
`;

const AutocompleteDropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AutocompleteItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CategoryTitle = styled.h3`
    margin-top: 20px;
    font-size: 18px;
    color: #2c3e50;
    text-align: left;
`;

const CityList = styled.ul`
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const CityItem = styled.li`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    &:hover {
        background: #f9f9f9;
    }
`;

const CloseButton = styled(Button)`
    margin-top: 20px;
    background: #e74c3c;

    &:hover {
        background: #c0392b;
    }
`;

function Home() {
    const [search, setSearch] = useState({ start: "", destination: "", startDate: "", endDate: "" });
    const [suggestionsStart, setSuggestionsStart] = useState([]);
    const [suggestionsDestination, setSuggestionsDestination] = useState([]);
    const [showAllCities, setShowAllCities] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const dropdownRefStart = useRef(null); // 출발지용 Ref
    const dropdownRefDestination = useRef(null); // 도착지용 Ref
    const navigate = useNavigate();

    const allCities = {
        국내선: ["인천", "김포", "제주", "광주", "여수", "청주", "부산", "대구"],
        국제선: ["오사카", "광저우", "나고야", "도쿄", "베이징", "상하이", "삿포로"],
    };

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRefStart.current && !dropdownRefStart.current.contains(e.target)) {
                setSuggestionsStart([]); // 출발지 드롭다운 닫기
            }
            if (dropdownRefDestination.current && !dropdownRefDestination.current.contains(e.target)) {
                setSuggestionsDestination([]); // 도착지 드롭다운 닫기
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // 입력값 변경 처리
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setSearch((prev) => ({ ...prev, [field]: value }));

        if (value.trim() !== "") {
            const matchedCities = [
                ...allCities.국내선,
                ...allCities.국제선,
            ].filter((city) => city.toLowerCase().includes(value.toLowerCase()));

            if (field === "start") {
                setSuggestionsStart(matchedCities);
            } else if (field === "destination") {
                setSuggestionsDestination(matchedCities);
            }
        } else {
            if (field === "start") {
                setSuggestionsStart([]);
            } else if (field === "destination") {
                setSuggestionsDestination([]);
            }
        }
    };

    // 자동완성 항목 클릭 시
    const handleSuggestionClick = (city, field) => {
        setSearch((prev) => ({ ...prev, [field]: city }));
        if (field === "start") {
            setSuggestionsStart([]);
        } else if (field === "destination") {
            setSuggestionsDestination([]);
        }
    };

    // 전체 도시 보기 클릭
    const toggleShowAllCities = (field) => {
        setActiveField(field);
        setShowAllCities(true);
    };

    // 모달에서 도시 선택 시
    const handleCitySelection = (city) => {
        setSearch((prev) => ({ ...prev, [activeField]: city }));
        setSuggestionsStart([]);
        setSuggestionsDestination([]);
        setShowAllCities(false);
    };

    const handleSearch = () => {
        navigate("/main", { state: { search } });
    };

    return (
        <Wrapper>
            <Title>항공편 검색</Title>
            <SearchForm>
                <Dropdown ref={dropdownRefStart}>
                    <Input
                        type="text"
                        placeholder="출발지"
                        value={search.start}
                        onChange={(e) => handleInputChange(e, "start")}
                    />
                    {suggestionsStart.length > 0 && (
                        <AutocompleteDropdown>
                            {suggestionsStart.map((city, index) => (
                                <AutocompleteItem
                                    key={index}
                                    onClick={() => handleSuggestionClick(city, "start")}
                                >
                                    {city}
                                </AutocompleteItem>
                            ))}
                            <Button onClick={() => toggleShowAllCities("start")}>전체 도시 보기</Button>
                        </AutocompleteDropdown>
                    )}
                </Dropdown>

                <Dropdown ref={dropdownRefDestination}>
                    <Input
                        type="text"
                        placeholder="도착지"
                        value={search.destination}
                        onChange={(e) => handleInputChange(e, "destination")}
                    />
                    {suggestionsDestination.length > 0 && (
                        <AutocompleteDropdown>
                            {suggestionsDestination.map((city, index) => (
                                <AutocompleteItem
                                    key={index}
                                    onClick={() => handleSuggestionClick(city, "destination")}
                                >
                                    {city}
                                </AutocompleteItem>
                            ))}
                            <Button onClick={() => toggleShowAllCities("destination")}>전체 도시 보기</Button>
                        </AutocompleteDropdown>
                    )}
                </Dropdown>

                <Input
                    type="date"
                    value={search.startDate}
                    onChange={(e) => setSearch({ ...search, startDate: e.target.value })}
                />
                <Input
                    type="date"
                    value={search.endDate}
                    onChange={(e) => setSearch({ ...search, endDate: e.target.value })}
                />
                <Button onClick={handleSearch} style={{ maxWidth: "120px" }}>검색</Button>
            </SearchForm>

            {showAllCities && (
                <Modal>
                    <ModalContent>
                        <h2>전체 도시</h2>
                        {Object.entries(allCities).map(([category, cities], index) => (
                            <div key={index}>
                                <CategoryTitle>{category}</CategoryTitle>
                                <CityList>
                                    {cities.map((city, cityIndex) => (
                                        <CityItem
                                            key={cityIndex}
                                            onClick={() => handleCitySelection(city)}
                                        >
                                            {city}
                                        </CityItem>
                                    ))}
                                </CityList>
                            </div>
                        ))}
                        <CloseButton onClick={() => setShowAllCities(false)}>닫기</CloseButton>
                    </ModalContent>
                </Modal>
            )}
        </Wrapper>
    );
}

export default Home;
