import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Box,
  Button,
  Divider,
} from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";
import { fDateTime } from "../utils/formatTime";
import { COLORS } from "../../assets/colors";
import { useNavigate } from "react-router-dom";

export default function History({ title, subheader, list, ...other }) {
  const navigate = useNavigate();

  const handleVendasEstoque = (e) => {
    e.preventDefault();
    navigate("..//vendasestoque");
  };
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <HistoryItem
              key={item.id}
              item={item}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
      <Divider />

      <Box style={{ padding: 10, textAlign: "right" }}>
        <Button size="small" color="inherit" onClick={handleVendasEstoque}>
          ver tudo
        </Button>
      </Box>
    </Card>
  );
}

function HistoryItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          style={{ color: COLORS.black, background: COLORS.black }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <h1 variant="subtitle2" style={{ fontSize: " 14px" }}>
          {title}
        </h1>

        <Typography variant="caption" sx={{ color: COLORS.black }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
