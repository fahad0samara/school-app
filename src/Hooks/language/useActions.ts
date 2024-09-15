import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store"; // Adjust the path as needed
import { setLanguage } from "../../redux/Language/languageSlice"; // Adjust the path as needed

const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    setLanguage: (language: string) => dispatch(setLanguage(language)),
    // Add other actions here as needed
  };
};

export default useActions;
