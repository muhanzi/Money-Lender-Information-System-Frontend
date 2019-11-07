import project from "./static";
export default function projectStyles() {
  const myStyle = {
    mycenter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: project().projectColor
    },
    buttonStyle: {
      backgroundColor: project().projectColor,
      color: "white"
    },
    buttonStyle2: {
      backgroundColor: project().projectColor,
      color: "white",
      border: 0
    },
    spanStyle: {
      fontSize: 18,
      display: "flex",
      backgroundColor: project().projectColor,
      color: "white",
      marginBottom: 20
    },
    spanStyle2: {
      fontSize: 22,
      display: "flex",
      backgroundColor: project().projectColor,
      color: "white",
      marginBottom: 20
    }
  };
  return myStyle;
}
