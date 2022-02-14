import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = "http://localhost:5000";
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          border: "solid 1px black",
          width: "50%",
          margin: "auto",
          marginTop: 50
        }}
      >
        <div style={{ width: "100%", display: "flex", textAlign: "center" }}>
          <div style={{ width: "50%", borderBottom: "solid 1px black" }}>
            Product Code
          </div>
          <div style={{ width: "50%", borderBottom: "solid 1px black" }}>
            Total
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%" }}>
            {data && (
              <div style={{ borderRight: "solid 1px black" }}>
                {data.map(d => (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      paddingTop: 10,
                      paddingBottom: 10,
                      border: "solid .4px lightgray"
                    }}
                  >
                    {d.id}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ width: "50%" }}>
            {data && (
              <div style={{ borderRight: "solid 1px black" }}>
                {data.map(d => (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      paddingTop: 10,
                      paddingBottom: 10,
                      border: "solid .4px lightgray"
                    }}
                  >
                    {d.diff}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
