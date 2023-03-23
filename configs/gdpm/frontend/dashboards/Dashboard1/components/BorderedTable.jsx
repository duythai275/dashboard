import { Box, Paper, styled, Table } from "@mui/material";

const StyledTable = styled(Table)({
  "& th": {
    fontWeight: "bold",
  },
  "& th, & td": {
    padding: "6px 10px",
    color: "#555e68",
    borderRight: "1px solid #e0e0e0",
  },
  "& th:last-child, & td:last-child": {
    borderRight: 0,
  },
  "& tr:last-child td": {
    borderBottom: 0,
  },
  "&.enable-hover tr:has(td):hover td": {
    backgroundColor: "#ebedf7",
  },

  "&.stripe-table": {
    "& tr:nth-of-type(odd):has(td)": {
      backgroundColor: "#f8f8f8",
    },
    "&.enable-hover tr:has(td):hover td": {
      backgroundColor: "#ebedf7",
    },
  },
});

const Scroller = styled(Box)({
  width: "100%",
  overflow: "auto",

  "&::-webkit-scrollbar": {
    width: 10,
    height: 10,
  },

  "&::-webkit-scrollbar-track": {
    borderRadius: 0,
    boxShadow: "inset 0 0 3px #e0e0e0",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#cdcdcd",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#aaa",
  },
});

const StyledPaper = styled(Paper)({
  // border: "1px solid #e0e0e0",
  borderRadius: "0 0 4px 4px",
  overflow: "hidden",
});

export const BorderedTable = ({
  stripe,
  enableHover,
  elevation = 0,
  children,
  wrapperStyle,
  maxHeight,
  maxWidth,
  stickyHeader,
  sx,
  ...props
}) => {
  if (stripe) props.className += " stripe-table";
  if (enableHover) props.className += " enable-hover";

  return (
    <StyledPaper elevation={elevation} sx={{ ...wrapperStyle, maxWidth }}>
      <Scroller sx={{ maxHeight, maxWidth }}>
        <StyledTable stickyHeader sx={sx} {...props}>
          {children}
        </StyledTable>
      </Scroller>
    </StyledPaper>
  );
};
