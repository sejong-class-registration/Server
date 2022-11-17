export const lectureMatching = (name) => {
  if (name === "일반물리학및실험1") name = "일반물리학1";
  if (name === "일반물리학및실험2") name = "일반물리학2";
  if (name === "다변수미적분학") name = "미적분학2";
  if (name === "일변수미적분학") name = "미적분학1";
  if (name === "취업역량개발론") name = "취창업과진로설계";
  if (name === "신입생세미나") name = "신입생세미나A";
  if (name === "대학생활과진로설계") name = "신입생세미나B";
  if (name === "신입생세미나1") name = "신입생세미나B";
  if (name === "대학생활과진로탐색") name = "신입생세미나B";
  if (name === "프로그래밍이해-P") name = "프로그래밍활용-P";
  if (name === "프로그래밍입문-P") name = "프로그래밍활용-P";
  if (name === "고급프로그래밍이해-P" || name === "고급프로그래밍입문-P")
    name = "고급프로그래밍활용";
  if (name === "일반화학및실험1" || name === "일반화학") name = "일반화학1";
  if (name === "일반화학및실험2") name = "일반화학2";

  return name;
};
