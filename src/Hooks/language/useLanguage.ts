import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust the path as needed

const useLanguage = () => {
  return useSelector((state: RootState) => state.language.language);
};

export default useLanguage;
