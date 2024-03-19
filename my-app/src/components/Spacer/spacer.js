import * as React from "react";
const Spacer = ({ height, backgroundColor }) => {
  return (
    <section
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
      }}
    >
      <div className="container mx-auto px-4">
        <div style={{ height: height ? height : "" }}></div>
      </div>
    </section>
  );
};

export default Spacer;