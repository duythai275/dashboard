import { Box, Paper, styled, Table } from "@mui/material";

const StyledTable = styled(Table)({
  "& th": {
    fontWeight: "bold",
  },
  "& th, & td": {
    padding: "5px 10px",
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
    border: "1px solid #e0e0e0",
    borderBottom: 0,
    borderRight: 0,
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#cdcdcd",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#aaa",
  },
});

const StyledPaper = styled(Paper)({
  border: "1px solid #e0e0e0",
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
