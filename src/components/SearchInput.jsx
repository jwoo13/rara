// import React, { useState } from "react";
// import styled from "styled-components";
//
// const allCities = [
//     "인천", "김포", "제주", "광주", "여수", "청주", "부산", "대구",
//     "오사카", "도쿄", "상하이", "파리", "로스앤젤레스", "뉴욕",
// ];
//
// const InputWrapper = styled.div`
//     position: relative;
// `;
//
// const Input = styled.input`
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     font-size: 16px;
//     width: 100%;
// `;
//
// const Dropdown = styled.div`
//     position: absolute;
//     top: 100%;
//     left: 0;
//     width: 100%;
//     background: white;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;
//
// const Item = styled.div`
//     padding: 10px;
//     cursor: pointer;
//     &:hover {
//         background: #f0f0f0;
//     }
// `;
//
// const ViewAllButton = styled.button`
//     width: 100%;
//     padding: 10px;
//     background: #e0e0e0;
//     border: none;
//     text-align: center;
//     cursor: pointer;
//     &:hover {
//         background: #d0d0d0;
//     }
// `;
//
// function SearchInput({ placeholder, value, setValue, toggleModal, showAutocomplete, setShowAutocomplete }) {
//     const handleChange = (e) => {
//         const inputValue = e.target.value;
//         setValue(inputValue);
//         console.log("Input Value:", inputValue);
//
//         if (inputValue) {
//             setShowAutocomplete(true);
//             console.log("Autocomplete should be visible");
//         } else {
//             setShowAutocomplete(false);
//         }
//     };
//
//     const handleSuggestionClick = (city) => {
//         setValue(city);
//         setShowAutocomplete(false); // 선택 후 자동완성 닫기
//     };
//
//     return (
//         <InputWrapper>
//             <Input
//                 type="text"
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={handleChange}
//                 onFocus={() => setShowAutocomplete(true)}
//             />
//             {showAutocomplete && (
//                 <Dropdown>
//                     {allCities
//                         .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
//                         .map((city, index) => (
//                             <Item key={index} onClick={() => handleSuggestionClick(city)}>
//                                 {city}
//                             </Item>
//                         ))}
//                     <ViewAllButton onClick={toggleModal}>전체 도시 보기</ViewAllButton>
//                 </Dropdown>
//             )}
//
//         </InputWrapper>
//     );
// }
//
// export default SearchInput;