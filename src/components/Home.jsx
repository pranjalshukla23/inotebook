import { Notes } from "./Notes";

export const Home = ({ showAlert }) => {
  return (
    <div className="container my-3">
      <Notes showAlert={showAlert} />
    </div>
  );
};