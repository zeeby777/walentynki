import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Button, Dialog } from '@mui/material';
import { useState } from 'react';

function Gambling(){
    const [gamblingOpen, setGamblingOpen] = useState(false)
    function handleGamblingOpen(){
        setGamblingOpen(true)
    }

    function handleGamblingClose(){
        setGamblingOpen(false)
    }

    return(
        <>
            <Button sx={{ backgroundColor: "#2196F3", 
                '&:hover': { backgroundColor: "#1976D2" },
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '0.8rem 1.5rem', 
                borderRadius: '8px',
                fontWeight: 'bold',}}
                onClick={handleGamblingOpen}
                >
                <RocketLaunchIcon sx={{ marginRight: '8px' }} />
                Kliknij, aby gambling
            </Button>

            
        </>
    )
}

export default Gambling