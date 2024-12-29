import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFormByLink } from "../../services";

const FormViewer = () => {
  const { shareableLink } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await fetchFormByLink(shareableLink)

        setForm(data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [shareableLink]);

  if (!form) return <p>Loading...</p>;

  return (
    <div> 
      <h1>{form.name}</h1>
      
    </div>
  );
};

export default FormViewer;
