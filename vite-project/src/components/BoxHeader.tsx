import { Box, Typography, colors, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./flexBetween";

type Props = {
    title: string;
    sideText: string;
    subtitle?: string;
    icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
    const { palette } = useTheme();
    return (
        <FlexBetween color={palette.grey[500]} margin="1.5rem 1rem 0 1rem">
            <FlexBetween>
                {icon}
                <Box width="100%">
                    <Typography style={{fontSize:"18.2px"}} fontWeight="bold" color="white"  mb="-0.1rem">
                        {title}
                    </Typography>
                    <Typography color="lightskyblue" style={{fontSize:"12px"}}>  {subtitle}</Typography>
                </Box>
            </FlexBetween>
            <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
                {sideText}
            </Typography>
        </FlexBetween>
    );
};

export default BoxHeader;