import { LeftSection } from "./LeftSection";

export const AppContainer = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <LeftSection />
          </div>
        </div>
      </div>
    </div>
  );
};
