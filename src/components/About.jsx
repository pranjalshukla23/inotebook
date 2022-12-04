import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

export const About = () => {
  const a = useContext(NoteContext);
  return <>About page</>;
};