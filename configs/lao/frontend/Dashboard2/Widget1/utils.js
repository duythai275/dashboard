export const checkCategory = (list, selectedCategories) => {
  if (!selectedCategories || !selectedCategories.length) return list;
  return list.filter(
    (item) =>
      item.attributes.find(
        (attribute) => attribute.attribute === "N55gZ9oPehi"
      ) &&
      selectedCategories.includes(
        item.attributes.find(
          (attribute) => attribute.attribute === "N55gZ9oPehi"
        ).value
      )
  );
};

export const checkOwnership = (list, selectedOwnerships) => {
  if (!selectedOwnerships || !selectedOwnerships.length) return list;
  return list.filter(
    (item) =>
      item.attributes.find(
        (attribute) => attribute.attribute === "Lazma6Rapgs"
      ) &&
      selectedOwnerships.includes(
        item.attributes.find(
          (attribute) => attribute.attribute === "Lazma6Rapgs"
        ).value
      )
  );
};

export const checkService = (list, selectedServices) => {
  if (!selectedServices || !selectedServices.length) return list;
  let result = [];
  list.forEach((item) => {
    const dataValues = item.enrollments[0].events[0]?.dataValues || [];
    const checked = selectedServices.find((service) => {
      const targetDe = dataValues.find((dv) => dv.dataElement === service);
      return targetDe && targetDe.value;
    })
      ? true
      : false;
    checked && result.push(item);
  });
  return result;
};

export const checkType = (list, selectedTypes) => {
  if (!selectedTypes || !selectedTypes.length) return list;
  return list.filter(
    (item) =>
      item.attributes.find(
        (attribute) => attribute.attribute === "KVaIZ8B0a1B"
      ) &&
      selectedTypes.includes(
        item.attributes.find(
          (attribute) => attribute.attribute === "KVaIZ8B0a1B"
        ).value
      )
  );
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0].cellData, b[0].cellData);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
