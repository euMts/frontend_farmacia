function CustomTooltip({ payload }) {
  const { payload: internalPayload } = payload[1] || {};
  console.log(internalPayload?.original);
  return (
    <div
      className="custom-tooltip"
      style={{
        display: "flex",
        flexDirection: "column",
        // width: "300px",
        // height: "500px",
        justifyContent: "space-around",
        backgroundColor: "white"
      }}
    >
      {Object.entries(internalPayload?.original || {}).map(([key, value]) => (
        <div style={{ padding: "15px" }}>
          {key} -{value}
        </div>
      ))}
    </div>
  );
}

export default CustomTooltip;
