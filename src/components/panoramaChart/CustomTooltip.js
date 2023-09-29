function CustomTooltip({ payload }) {
  const { payload: internalPayload } = payload[1] || {};
  // console.log(internalPayload?.original);
  return (
    <div
      className="custom-tooltip"
      style={{
        display: "flex",
        flexDirection: "column",
        // width: "300px",
        // height: "500px",
        justifyContent: "space-around",
        backgroundColor: "white",
        border: "1px solid #A9A9A9",
        borderRadius: "4px",
        // boxShadow: "10px 10px 20px black",
        padding: "4px"
      }}
    >
      {Object.entries(internalPayload?.original || {}).map(([key, value]) => (
        <div style={{ padding: "8px", fontSize: "12px" }}>
          {key === "month" ? (
            <p id="month-name" style={{ fontSize: "15px", fontWeight: "bold" }}>
              {value}
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "red",
                  marginRight: "5px",
                }}
                id="square-color"
              ></div>
              <div id="product-name-info">
                {key}: {value}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CustomTooltip;
