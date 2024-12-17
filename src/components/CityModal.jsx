// import React from "react";
// import styled from "styled-components";
//
// const ModalWrapper = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;
//
// const ModalContent = styled.div`
//     background: white;
//     padding: 20px;
//     border-radius: 8px;
//     width: 80%;
//     max-width: 600px;
//     text-align: center;
//     overflow-y: auto; /* 긴 목록에 스크롤 추가 */
// `;
//
// const CategoryWrapper = styled.div`
//     margin-bottom: 20px;
// `;
//
// const CategoryTitle = styled.h3`
//     margin-bottom: 10px;
//     color: #3498db;
// `;
//
// const SubCategoryTitle = styled.h4`
//     margin: 10px 0;
//     color: #2c3e50;
// `;
//
// const CityButton = styled.button`
//     margin: 5px;
//     padding: 10px 20px;
//     background: #3498db;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     &:hover {
//         background: #2980b9;
//     }
// `;
//
// const CloseButton = styled.button`
//     margin-top: 20px;
//     padding: 10px 20px;
//     background: #e74c3c;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     &:hover {
//         background: #c0392b;
//     }
// `;
//
// const allCities = {
//     국내선: ["인천", "김포", "제주", "광주", "여수", "청주", "부산", "대구"],
//     국제선: {
//         동북아시아: ["오사카", "도쿄", "상하이"],
//         미주: ["뉴욕", "로스앤젤레스"],
//         유럽: ["파리", "로마"],
//     },
// };
//
// function CityModal({ closeModal, setCity }) {
//     const handleCityClick = (city) => {
//         setCity(city); // 선택된 도시 설정
//         closeModal(); // 모달 닫기
//     };
//
//     return (
//         <ModalWrapper>
//             <ModalContent>
//                 <h2>전체 도시</h2>
//                 {Object.entries(allCities).map(([category, cities], index) => (
//                     <CategoryWrapper key={index}>
//                         <CategoryTitle>{category}</CategoryTitle>
//                         {Array.isArray(cities) ? (
//                             cities.map((city, cityIndex) => (
//                                 <CityButton key={cityIndex} onClick={() => handleCityClick(city)}>
//                                     {city}
//                                 </CityButton>
//                             ))
//                         ) : (
//                             Object.entries(cities).map(([subCategory, subCities]) => (
//                                 <div key={subCategory}>
//                                     <SubCategoryTitle>{subCategory}</SubCategoryTitle>
//                                     {subCities.map((city, subIndex) => (
//                                         <CityButton key={subIndex} onClick={() => handleCityClick(city)}>
//                                             {city}
//                                         </CityButton>
//                                     ))}
//                                 </div>
//                             ))
//                         )}
//                     </CategoryWrapper>
//                 ))}
//                 <CloseButton onClick={closeModal}>닫기</CloseButton>
//             </ModalContent>
//         </ModalWrapper>
//     );
// }
//
// export default CityModal;
