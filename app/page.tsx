export default function Home() {
  return (
    <main>
      {(() => {
        const LandingPage = require("./components/LandingPage").default;
        return <LandingPage />;
      })()}
    </main>
  );
}
