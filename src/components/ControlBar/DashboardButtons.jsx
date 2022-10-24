import { IconButton, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
const DashboardButtons = () => {
  return (
    <Button variant="outlined" color="grey" endIcon={<LanguageIcon />}>
      Language
    </Button>
  );
};
export default DashboardButtons;
