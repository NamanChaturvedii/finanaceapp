import {useState} from 'react'
import { Link } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box,Typography,useTheme } from '@mui/material';
import FlexBetween from '@/components/flexBetween';



const Navbar = () => {
    const {palette} = useTheme();
    const [selected, setSelected] = useState("dashboard");
    return (
        <FlexBetween mb='0.25rem' p="0.5rem 0rem " color={palette.grey[300]} >
            {/* {Left side} */}
            <FlexBetween gap="0.75rem">
            <AttachMoneyIcon sx={{fontSize:"28px"}}/>
            <Typography variant="h4" fontSize="16px">Financer</Typography>
            </FlexBetween>

            {/* {Right side} */}
            <FlexBetween gap="2rem">    
                <Box sx={{"&:hover":{color:palette.primary[100]}}}>
                    <Link to="/" onClick={()=>setSelected("dashboard")}
                    style={{
                        color:selected === "dashboard" ? palette.primary[100] : palette.grey[700],
                        textDecoration:"inherit"
                    }}>
                        Dashboard
                    </Link>
                </Box>
                <Box sx={{"&:hover":{color:palette.primary[100]}}}>
                    <Link to="/predictions" onClick={()=>setSelected("predictions")}
                    style={{
                        color:selected === "predictions" ? palette.primary[100] : palette.grey[700],
                        textDecoration:"inherit"
                    }}>
                        Predicitons
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar;