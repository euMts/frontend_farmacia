import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardsWidget({
  pagePath,
  title1,
  title2,
  icon,
  color,
  bgcolor,
  sx,
  ...other
}) {
  const navigate = useNavigate();

  const submitHandler = (pagePath) => {
    navigate(pagePath);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 5,
        boxShadow: 3,
        textAlign: "center",
        color: color,
        bgcolor: bgcolor,
        borderRadius: "20px",
        height: "250px",
        maxWidth: "350px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        ...sx,
      }}
      {...other}
      onClick={() => submitHandler(pagePath)}
    >
      <div
        style={{
          display: "flex",
          backgroundImage:
            "linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
          width: 64,
          height: 64,
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: 24, height: 24 }}>{icon}</div>
      </div>

      <h3 style={{ fontWeight: "bold", paddingTop: "15px", fontSize: "32px" }}>
        {title1}
      </h3>

      <h4
        style={{
          opacity: 0.72,
          fontWeight: 600,
          padding: "10px 5px",
          fontSize: "14px",
        }}
      >
        {title2}
      </h4>
    </Card>
  );
}
