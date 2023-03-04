import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";

export const AppContainer = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <LeftSection />
          </div>
          {/* <div className="column">
            <RightSection />
          </div> */}
        </div>
      </div>
    </div>
  );
};
