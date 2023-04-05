import { CardMedia, Typography } from "@mui/material";
import { FlexBetween } from "../../components/FlexBetween";
import { WidgetWrapper } from "../../components/WidgetWrapper";

export default function AdWidget({ urlOrigin }) {
  return (
    <WidgetWrapper>
      <FlexBetween flexWrap="wrap">
        <Typography color="neutral.dark">Sponsored</Typography>
        <Typography
          sx={{ cursor: "pointer", color: "neutral.medium" }}
          onClick={() => console.log("qdf")}
        >
          Create Ad
        </Typography>
      </FlexBetween>

      <CardMedia
        component="img"
        image={`${urlOrigin}/assets/PONfwtOuaC6u0cj9nZ89o.jpg`}
        height="200"
        sx={{ my: 2 }}
      />
      <FlexBetween flexWrap="wrap">
        <Typography color="neutral.main">TomourBladi</Typography>
        <Typography
          sx={{ cursor: "pointer", color: "neutral.medium" }}
          onClick={() => console.log("qdf")}
        >
          tomourbladi.com
        </Typography>
      </FlexBetween>
      <Typography color="neutral.dark" mt={3}>
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
}
