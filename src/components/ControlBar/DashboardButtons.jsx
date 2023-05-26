import useSelectionStore from "@/state/selection";
import { IconButton, Button, Popover, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { languages } from "@/config/config";
import { convertLanguageNametoCountryName } from "@/utils/utils";
import { useTranslation } from "react-i18next";

const DashboardButtons = () => {
  const { t } = useTranslation();
  const { language, selectLanguage } = useSelectionStore((state) => ({
    language: state.language,
    selectLanguage: state.selectLanguage
  }));
  const selectedLanguage = languages.find((l) => l.code === language);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<img src={`https://flagcdn.com/h20/${convertLanguageNametoCountryName(selectedLanguage.code)}.png`} width="25" />}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {selectedLanguage.code === "lo" ? t(selectedLanguage.code) : selectedLanguage.name}
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
          {languages.map((language, index) => (
            <ListItem
              disablePadding
              onClick={() => {
                selectLanguage(language.code);
                setAnchorEl(null);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <img src={`https://flagcdn.com/h20/${convertLanguageNametoCountryName(language.code)}.png`} width="25" />
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
