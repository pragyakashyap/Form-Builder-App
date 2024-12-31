import { useLocation } from "react-router-dom";

const FormStats = () => {
  const location = useLocation();
  const { analytics, formId } = location.state || {};

  if (!analytics || !formId) {
    return <p>No analytics data available!</p>;
  }

  const completedForms = analytics.filter((entry) => entry.completed);
  const partialForms = analytics.filter((entry) => !entry.completed);

  const completionRate = (
    (completedForms.length / analytics.length) *
    100
  ).toFixed(2);

  return (
    <div>
      <h1>Form Analytics</h1>
      <p>Form ID: {formId}</p>
      <p>Views: {analytics.length}</p>
      <p>Completion Rate: {completionRate}%</p>

      <h2>Responses</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {Object.keys(partialForms[0]?.responses || {}).map((field) => (
              <th key={field}>{field}</th>
            ))}
            <th>Submitted At</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((entry, index) => (
            <tr key={index}>
              {Object.values(entry.responses || {}).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
              <td>{entry.submittedAt}</td>
              <td>{entry.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormStats;
