import {SxProps} from "@mui/material";

export const  filterButtonsContainerSx : SxProps ={
    display: "flex",
    justifyContent: "space-between",
    gap: '5px'
}
export const ListItemSx  =(isDone: boolean): SxProps => ({
    p: '0px',
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
})
