import React from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Stack, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BoxContainer = styled(Stack)({
    "@media (min-width: 960px)": {
        padding: "15%",
        fontSize: "24px"
    },

    "@media (min-width: 520px) and (max-width: 959px)": {
        padding: "15%",
        fontSize: "18px"
    },

    "@media (max-width: 519px)": {
        padding: "25% 15%",
        fontSize: "12px"
    }
});



const Image = ({ src, alt }) => {
    return <img src={src} alt={alt} style={{ width: "100%" }} />;
};

const HowToRide = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <BoxContainer>
            <Typography variant="h1" sx={{ display: "flex", justifyContent: "center", fontSize: "2rem", fontWeight: "bold" }}>
                ジプニーの乗り方
            </Typography>
            <Grid container spacing={isMobile ? 2 : (isTablet ? 5 : 10)} sx={{ marginTop: "25px", display: "flex", justifyContent: "center" }}>
                <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }} >
                    <Image src="../src/img/jeepney.jpeg" alt="" />
                </Grid>
                <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }} sx={{ padding: "10px" }}>
                    <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                        ①ジプニーの番号と行き先を確認する
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: "25px", padding: "10px" }}>
                        ジプニーの種類によって走行するルートが異なります。ジプニーには、番号と主要停車地が書かれています。
                        車種と走行ルートに関しては、ヘッダー下部のRoutesボタンより確認することができます。
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={isMobile ? 2 : (isTablet ? 5 : 10)} sx={{ marginTop: "25px", display: "flex", justifyContent: "center" }}>
                <Grid item xs={12} sm={6} sx={{ order: 1, padding: "10px" }}>
                    <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                        ②乗車する
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: "25px", padding: "10px" }}>
                        乗車したら、運転手に目的地を伝えます。例えば、目的地がSM Mallの場合には、「SM Mall」と伝えます。
                        目的地に到着するか不安な方は、運転手に聞いてみると良いでしょう。
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }} >
                    <Image src="../src/img/jeepney.jpeg" alt="" />
                </Grid>
            </Grid>
            <Grid container spacing={isMobile ? 2 : (isTablet ? 5 : 10)} sx={{ marginTop: "25px", display: "flex", justifyContent: "center" }}>
                <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }} >
                    <Image src="../src/img/jeepney.jpeg" alt="" />
                </Grid>
                <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }} sx={{ padding: "10px" }}>
                    <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                        ③乗車料金を支払う
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: "25px", padding: "10px" }}>
                        乗車料金を運転手に払います。料金はおおよそ12〜15ペソです。運転席から遠い場所に座る場合には、周りの乗客を通して料金を払います。
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={isMobile ? 2 : (isTablet ? 5 : 10)} sx={{ marginTop: "25px", display: "flex", justifyContent: "center" }}>
                <Grid item xs={12} sm={6} sx={{ order: 2 }} >
                    <Image src="../src/img/jeepney.jpeg" alt="" />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ order: 1, padding: "10px" }}>
                    <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                        ④到着
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: "25px", padding: "10px" }}>
                        目的地に近づいたら、「Get off（降ります）」などと運転手に降りる旨を伝えましょう。
                        この時手摺りをコインで叩くなどして降車の合図を伝えることもできます。
                    </Typography>
                </Grid>
            </Grid>
        </BoxContainer>
    );
};

export default HowToRide;
