import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store"; 
import { setLanguage, setIsRTL } from "../../redux/Language/languageSlice"; 

const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    setLanguage: (language: string) => dispatch(setLanguage(language)),
    setIsRTL: (isRTL: boolean) => dispatch(setIsRTL(isRTL)),
   
  };
};

export default useActions;
