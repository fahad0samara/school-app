import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; 

const useLanguage = () => {
  const language = useSelector((state: RootState) => state.language.language);
  const isRTL = useSelector((state: RootState) => state.language.isRTL);

  return { language, isRTL };
};

export default useLanguage;
