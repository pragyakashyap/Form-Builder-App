import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFormByLink, submitForm, trackView, trackStart, trackCompletion } from "../../services";
import styles from "./formViewer.module.css";
import toast from "react-hot-toast"


const FormViewer = () => {
  const { shareableLink } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [hasStarted, setHasStarted] = useState(false);

  
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await fetchFormByLink(shareableLink);
        setForm(data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [shareableLink]);

  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  useEffect(() => {
    const trackViewEvent = async () => {
      try {
        if (form && form._id) {
          await trackView(form._id);
        }
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    trackViewEvent();
  }, [form]);




  

  const handleChange = async (e, componentName) => {
    const newValue = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [componentName]: newValue,
    }));
    if (!hasStarted) {
      try {
        await trackStart(form._id);
        setHasStarted(true); // Set started to true to avoid tracking the start multiple times
      } catch (error) {
        console.error("Error tracking start:", error);
      }
    }}


  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitForm(form._id, formData);

    if (result.success) {
      toast.success(result.message);
      await trackCompletion(form._id);
      console.log(formData)
      setFormData({}); // Clear the form after successful submission
    } else {
      toast.error(result.message);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className={styles.formViewer}>
      <h1>{form.name}</h1>
      <form className={styles.componentsContainer} onSubmit={handleSubmit}>
        {form.components.map((component) => {
          switch (component.category) {
            case "bubble":
              if (component.type === "Text") {
                return (
                  <div className={styles.components}>{component.content}</div>
                );
              }
              if (component.type === "Image") {
                return (
                  <div className={styles.components}>
                    <img
                      key={component._id}
                      src={component.content}
                      alt={component.name}
                      className={styles.bubble}
                    />
                  </div>
                );
              }
              break;
            case "input":
              if (component.type === "Input Text") {
                return (
                  <div key={component.name} className={styles.inputcomponents}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter your text"
                      onChange={(e) => handleChange(e, component.name)}
                      value={formData[component.name] || ""}
                    />
                    <div
                      key={component._id}
                      className={styles.button}
                      onClick={() =>
                        handleFieldSubmit(component._id, component.name)
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
                    </div>
                  </div>
                );
              }

              if (component.type === "Input Rating") {
                return (
                  <div key={component.name} className={styles.inputcomponents}>
                    <div className={`${styles.input} ${styles.ratingInput}`}>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div
                          key={rating}
                          className={styles.ratings}
                          onClick={() =>
                            handleChange(
                              { target: { value: rating } },
                              component.name
                            )
                          }
                        >
                          {rating}
                        </div>
                      ))}
                    </div>
                    <div
                      key={component._id}
                      className={styles.button}
                      onClick={() =>
                        handleFieldSubmit(component._id, component.name)
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
                    </div>
                  </div>
                );
              }

              if (component.type === "Input Date") {
                return (
                  <div key={component.name} className={styles.inputcomponents}>
                    <input
                      type="date"
                      className={styles.input}
                      placeholder="Select a date"
                      onChange={(e) => handleChange(e, component.name)}
                      value={formData[component.name] || ""}
                    />
                    <div
                      key={component._id}
                      className={styles.button}
                      onClick={() =>
                        handleFieldSubmit(component._id, component.name)
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
                    </div>
                  </div>
                );
              }

              if (component.type === "Input Number") {
                return (
                  <div key={component.name} className={styles.inputcomponents}>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="Enter a number"
                      onChange={(e) => handleChange(e, component.name)}
                      value={formData[component.name] || ""}
                    />
                    <div
                      key={component._id}
                      className={styles.button}
                      onClick={() =>
                        handleFieldSubmit(component._id, component.name)
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
                    </div>
                  </div>
                );
              }

              if (component.type === "Input Email") {
                return (
                  <div key={component.name} className={styles.inputcomponents}>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="Enter your email"
                      onChange={(e) => handleChange(e, component.name)}
                      value={formData[component.name] || ""}
                    />
                    <div
                      key={component._id}
                      className={styles.button}
                      onClick={() =>
                        handleFieldSubmit(component._id, component.name)
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
                    </div>
                  </div>
                );
              }

              if (component.type === "Input Phone") {
                return (
                  <div key={component.name} className={styles.inputcomponents}>
                    <input
                      type="tel"
                      className={styles.input}
                      placeholder="Enter your phone"
                      onChange={(e) => handleChange(e, component.name)}
                      value={formData[component.name] || ""}
                    />
                    <div
                      key={component._id}
                      className={styles.button}
                      onClick={() =>
                        handleFieldSubmit(component._id, component.name)
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
                    </div>
                  </div>
                );
              }
              if (component.type === "Input Button") {
                return (
                  <button className={styles.submit} type="submit">
                    Finish
                  </button>
                );
              }
              break;
            default:
              return null;
          }
        })}
      </form>
    </div>
  );
};

export default FormViewer;
