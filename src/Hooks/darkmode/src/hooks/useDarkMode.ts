import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";


export const useDarkMode = () => {
  return useSelector((state: RootState) => state.darkmode.darkmode);
};
