import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Iconify from "../../iconify";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 300,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    boxShadow: `0 8px 16px 0 ${alpha("#919EAB", 0.16)}`,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.6)} !important`,
  },
}));

export default function UserListToolbar({
  filterName,
  onFilterName,
  clearFilterName,
  placeholderMessage,
}) {
  return (
    <StyledRoot>
      <StyledSearch
        id="zero"
        value={filterName}
        onChange={onFilterName}
        placeholder={placeholderMessage}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
        endAdornment={
          <IconButton
            sx={{ visibility: filterName ? "visible" : "hidden" }}
            onClick={clearFilterName}
          >
            <Iconify icon="ic:twotone-clear" />
          </IconButton>
        }
      />

      {/* <Tooltip title="Atualizar">
        <IconButton>
          <Iconify icon="material-symbols:refresh" />
        </IconButton>
      </Tooltip> */}
    </StyledRoot>
  );
}
