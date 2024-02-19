import LogoImg from "../assets/quiz-logo.png";

export default function Header({ children }) {
  return (
    <>
      <header>
        <img src={LogoImg} alt={"quiz logo"} />
        <h1> React Quiz</h1>
      </header>
      <section>{children}</section>
    </>
  );
}
