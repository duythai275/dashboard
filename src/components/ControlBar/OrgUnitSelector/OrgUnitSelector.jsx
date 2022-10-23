import { useEffect, useState } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { Popover, Button, Checkbox, Typography, TextField } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import "./OrgUnitSelector.css";

const OrgUnitSelector = ({ disabled, value, change }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tree, setTree] = useState([]);
  const openPopover = Boolean(anchorEl);
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  const orgUnit = orgUnits.find((ou) => ou.id === value);
  const [selected, setSelected] = useState(orgUnit ? orgUnit : null);
  const [expanded, setExpanded] = useState(
    selected && selected.id ? [...selected.ancestors.map((a) => a.id), selected.id] : []
  );
  useEffect(() => {
    const generated = generateTreeObject();
    setTree([...generated]);
  }, [orgUnits.length]);

  const generateTreeObject = () => {
    const transformed = orgUnits.map((ou) => {
      const newOu = { ...ou };
      if (ou.parent) {
        newOu.parent = ou.parent.id;
      } else {
        newOu.parent = null;
      }
      return newOu;
    });
    //https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript/40732240#40732240
    const createDataTree = (dataset) => {
      const hashTable = Object.create(null);
      dataset.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }));
      const dataTree = [];
      dataset.forEach((aData) => {
        if (aData.parent) hashTable[aData.parent].children.push(hashTable[aData.id]);
        else dataTree.push(hashTable[aData.id]);
      });
      return dataTree;
    };
    const result = createDataTree(transformed);
    return result;
  };

  const renderTree = (nodes) =>
    nodes.map((node) => {
      let checked;
      if (node !== null && selected !== null) {
        checked = selected.id === node.id;
      } else {
        checked = false;
      }
      return (
        <TreeItem
          sx={{ bgcolor: "unset" }}
          key={node.id}
          nodeId={node.id}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                sx={{ height: 28 }}
                disableRipple
                name="tree-check-box"
                checked={checked}
                onChange={(event) => {
                  if (event.target.checked) {
                    const foundOu = orgUnits.find((ou) => ou.id === node.id);
                    setSelected({ ...foundOu });
                  } else {
                    setSelected(null);
                  }
                }}
              />
              &nbsp;&nbsp;
              <Typography>{node.displayName}</Typography>
            </div>
          }
        >
          {Array.isArray(node.children) ? node.children.map((child) => renderTree([child])) : null}
        </TreeItem>
      );
    });
  return (
    <div className="org-unit-selector-container">
      <div
        style={{ width: "100%" }}
        onClick={(event) => {
          if (!disabled) setAnchorEl(event.currentTarget);
        }}
      >
        <TextField value={orgUnit ? orgUnit.displayName : ""} />
      </div>
      <Popover
        elevation={20}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={(event, reason) => {
          if (reason === "backdropClick") return;
          setAnchorEl(null);
        }}
      >
        <div className="org-unit-tree-container">
          <TreeView
            selected={selected && selected.id ? [selected.id] : []}
            expanded={expanded}
            defaultCollapseIcon={<ArrowDropUp fontSize="large" />}
            defaultExpandIcon={<ArrowDropDown fontSize="large" />}
            onNodeToggle={(event, nodeIds) => {
              setExpanded(nodeIds);
            }}
          >
            {renderTree(tree)}
          </TreeView>
        </div>
        <div className="org-unit-selector-apply-button-container">
          <Button
            variant="contained"
            onClick={() => {
              change(selected.id);
              setAnchorEl(null);
            }}
          >
            {t("apply")}
          </Button>
          &nbsp;&nbsp;
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default OrgUnitSelector;
