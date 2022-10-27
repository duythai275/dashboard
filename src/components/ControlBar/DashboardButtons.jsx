import useSelectionStore from "@/state/selection";
import { IconButton, Button, Popover, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
const LANGUAGES = [
  {
    code: "gb",
    name: "English"
  },
  {
    code: "pk",
    name: "اُردُو"
  }
];

const DashboardButtons = () => {
  const { language, selectLanguage } = useSelectionStore((state) => ({
    language: state.language,
    selectLanguage: state.selectLanguage
  }));
  const selectedLanguage = LANGUAGES[language];
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<img src={`https://flagcdn.com/60x45/${selectedLanguage.code}.png`} width="25" />}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {selectedLanguage.name}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <List>
          {LANGUAGES.map((language, index) => (
            <ListItem
              disablePadding
              onClick={() => {
                selectLanguage(index);
                setAnchorEl(null);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <img src={`https://flagcdn.com/60x45/${language.code}.png`} width="27" />
                </ListItemIcon>
                <ListItemText primary={language.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};
export default DashboardButtons;
