import { useEffect, useState } from "react";
import { Popover, Button, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSquareCheck, faChevronDown, faPlusSquare, faMinusSquare, faFolderOpen, faFolder } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import CheckboxTree from "react-checkbox-tree";
import { useTranslation } from "react-i18next";
import "./OrgUnitSelector.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const OrgUnitSelector = ({ orgUnits, initialOrgUnit, accept }) => {
  const { t } = useTranslation();
  const [orgUnit, setOrgUnit] = useState(initialOrgUnit);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tree, setTree] = useState([]);
  const openPopover = Boolean(anchorEl);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const generateTreeObject = (transformed) => {
    //https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript/40732240#40732240
    const createDataTree = (dataset) => {
      const hashTable = Object.create(null);
      dataset.forEach((aData) => (hashTable[aData.id] = { ...aData }));
      const dataTree = [];
      dataset.forEach((aData) => {
        if (aData.parent) {
          if (hashTable[aData.parent].children) {
            hashTable[aData.parent].children.push(hashTable[aData.id]);
          } else {
            hashTable[aData.parent].children = [];
            hashTable[aData.parent].children.push(hashTable[aData.id]);
          }
        } else dataTree.push(hashTable[aData.id]);
      });
      return dataTree;
    };
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const tree = (items, id = null, link = "parent") =>
    //   items.filter((item) => item[link] === id).map((item) => ({ ...item, children: tree(items, item.id) }));
    const result = createDataTree(transformed);
    return result;
  };

  useEffect(() => {
    const transformed = orgUnits.map((ou) => {
      const newOu = { ...ou };
      newOu.value = newOu.id;
      newOu.label = newOu.displayName;
      if (ou.parent) {
        newOu.parent = ou.parent.id;
      } else {
        newOu.parent = null;
      }
      return newOu;
    });
    const generated = generateTreeObject(transformed);
    setTree([...generated]);
  }, []);

  return (
    <div className="org-unit-selector-container">
      <div
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {t("selectUnit")}
        <TextField value={orgUnit ? orgUnit.displayName : ""} />
      </div>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <div className="org-unit-tree-container">
          <CheckboxTree
            icons={{
              check: <FontAwesomeIcon icon={faSquareCheck} />,
              uncheck: <FontAwesomeIcon icon={faSquare} />,
              halfCheck: <FontAwesomeIcon icon={faSquareCheck} />,
              expandClose: <FontAwesomeIcon icon={faChevronRight} />,
              expandOpen: <FontAwesomeIcon icon={faChevronDown} />,
              expandAll: <FontAwesomeIcon icon={faPlusSquare} />,
              collapseAll: <FontAwesomeIcon icon={faMinusSquare} />,
              parentClose: <FontAwesomeIcon icon={faFolder} />,
              parentOpen: <FontAwesomeIcon icon={faFolderOpen} />,
              leaf: null
            }}
            noCascade={true}
            nodes={tree}
            checked={checked}
            expanded={expanded}
            onCheck={(checked, targetNode) => {
              setChecked([targetNode.value]);
            }}
            onExpand={(expanded) => setExpanded(expanded)}
          />
        </div>
        <div className="org-unit-selector-apply-button-container">
          <Button
            variant="contained"
            onClick={() => {
              const foundOrgUnit = orgUnits.find((ou) => ou.id === checked[0]);
              setOrgUnit({ ...foundOrgUnit });
              setAnchorEl(null);
              accept(foundOrgUnit);
            }}
          >
            {t("apply")}
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default OrgUnitSelector;
