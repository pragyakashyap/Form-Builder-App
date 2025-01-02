import { useState, useEffect } from "react";
import styles from "./formResponse.module.css";
import { fetchFormById, fetchFormResponses } from "../../services";
import { PieChart } from "react-minimal-pie-chart";

const FormResponse = ({ formId, formComponents }) => {
  const [stats, setStats] = useState({
    views: 0,
    starts: 0,
    completed: 0,
  });

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResponses = async () => {
      try {
        const result = await fetchFormResponses(formId);
        if (result.success) {
          setResponses(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("An error occurred while fetching responses.");
      } finally {
        setLoading(false);
      }
    };

    loadResponses();
  }, [formId]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchFormById(formId);
        console.log(response);
        setStats({
          views: response.views,
          starts: response.starts,
          completed: response.completed,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    loadStats();
  }, [formId]);

  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };
  

  if (loading) return <p>Loading responses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    {responses.length===0 ? (
      <p className={styles.noResponse}>No Response yet collected</p>
    ) : (
      <div className={styles.container}>
         <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <h3 className={styles.statsLabel}>Views</h3>
          <p className={styles.statsValue}>{stats.views}</p>
        </div>
        <div className={styles.statsCard}>
          <h3 className={styles.statsLabel}>Starts</h3>
          <p className={styles.statsValue}>{stats.starts}</p>
        </div>
      </div>

    
      <div className={styles.tableContainer}>
        <table className={styles.responsesTable}>
          <thead>
            <tr>
              <th></th> {/* Serial Number Column */}
              <th>Submitted at</th>
              {formComponents
                .filter(
                  (component) =>
                    component.category === "input" &&
                    component.type !== "Input Button"
                )
                .map((component) => (
                  <th key={component.name}>
                    {component.name.replace(/^Input\s/, "")}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Serial Number */}
                <td>{formatDate(response.submissionDate)}</td>
                {formComponents
                  .filter(
                    (component) =>
                      component.category === "input" &&
                      response.responses?.[component.name]
                  )
                  .map((component) => (
                    <td key={component.name}>
                      {response.responses[component.name]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.piechartContainer}>
        <PieChart
          className={styles.piechart}
          data={[
            {
              value: 100 - ((stats.completed / stats.views) * 100),
              color: "#909090",
            },
            {
              value: ((stats.completed / stats.views) * 100),
              color: "#3B82F6",
            },
          ]}
        />
        <div className={styles.statsCard}>
          <h3 className={styles.statsLabel}>Completion Rate</h3>
          <p className={styles.statsValue}>
            {((stats.completed / stats.views) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
        </div>   
    )}
    </>
   
  );
};

export default FormResponse;
