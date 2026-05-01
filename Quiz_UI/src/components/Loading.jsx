const Loading = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "#fff"
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #334155",
    borderTop: "5px solid #38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  text: {
    marginTop: "12px",
    fontSize: "16px"
  }
};

export default Loading;
