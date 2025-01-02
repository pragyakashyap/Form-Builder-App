import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFormByLink, submitForm, trackView, trackStart, trackCompletion } from "../../services";
import styles from "./formViewer.module.css";
import toast from "react-hot-toast";
import chatIcon from "/chatIcon.png";

const FormViewer = () => {
  const { shareableLink } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submittedData, setSubmittedData] = useState({});  // Track submitted values
  const [selectedRating, setSelectedRating] = useState(null);

const handleRatingSelect = (rating,component) => {
  setSelectedRating(rating);
  handleChange({ target: { value: rating } }, component.name);
};


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
        setHasStarted(true);
      } catch (error) {
        console.error("Error tracking start:", error);
      }
    }
  };

  const handleFieldSubmit = async (componentId, componentName, componentType) => {
    if (!formData[componentName]) return;
    if (componentType === "Input Rating") {
      proceedSubmission(componentId, componentName);
      return;
    }

    
    const inputElement = document.querySelector(`input[name="${componentName}"]`);
    if (!inputElement.checkValidity()) {
      inputElement.reportValidity(); // Show browser's built-in validation message
      return;
    }
    
    proceedSubmission(componentId, componentName);

  };

  const proceedSubmission = (componentId,componentName)=>{
    setSubmittedData(prev => ({
      ...prev,
      [componentName]: formData[componentName]
    }));
    
    setFormData(prev => {
      const newData = { ...prev };
      delete newData[componentName];
      return newData;
    });
    
    setCurrentStep(currentStep + 1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allData = { ...submittedData, ...formData };
    const result = await submitForm(form._id, allData);
    if (result.success) {
      toast.success(result.message);
      await trackCompletion(form._id);
      setFormData({});
      setSubmittedData({});
      setCurrentStep(0);
    } else {
      toast.error(result.message);
    }
  };

  if (!form) return <p>Loading...</p>;

  const findNextInputIndex = () => {
    let index = 0;
    let inputCount = 0;
    
    while (index < form.components.length) {
      if (form.components[index].category === 'input') {
        if (inputCount === currentStep) {
          return index;
        }
        inputCount++;
      }
      index++;
    }
    return form.components.length;
  };

  const renderInputComponent = (component, isActive) => {
    const value = isActive ? formData[component.name] : submittedData[component.name];
    const isSubmitted = !!submittedData[component.name];
    const inputClass = `${styles.input} ${isSubmitted ? styles.submitted : ""}`;
  const buttonClass = `${styles.button} ${isSubmitted ? styles.submittedButton : ""}`;
    
    switch (component.type) {
      case 'Input Text':
        return (
          <div key={component._id} className={styles.inputcomponents}>
            
              <>
                <input
                  type="text"
                  name={component.name}
                  className={inputClass}
                  placeholder="Enter your text"
                  onChange={(e) => handleChange(e, component.name)}
                  value={value || ""}
                />
                <div
                  className={buttonClass}
                  onClick={() => handleFieldSubmit(component._id, component.name)}
                >
                  <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" alt="Send" />
                </div>
              </>
           
          </div>
        );
      case 'Input Button':
        return isActive ? (
          <button key={component._id} className={styles.submit} type="submit">
            Finish
          </button>
        ) : null;
      case 'Input Rating':
        return (
          <div key={component.name} className={styles.inputcomponents}>
            <div className={`${inputClass} ${styles.ratingInput}`}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <div
                  key={rating}
                 className={`${styles.ratings} ${selectedRating === rating ? styles.selected : ""}`}
                  tabIndex={0} // Make the div focusable
                  onClick={() =>
                    handleRatingSelect(rating,component)
                  }
                >
                  {rating}
                </div>
              ))}
            </div>
            <div
              key={component._id}
              className={buttonClass}
              onClick={() =>
                handleFieldSubmit(component._id, component.name, component.type)
              }
            >
              <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
            </div>
          </div>
        );
      case "Input Date":
        return (
          <div key={component.name} className={styles.inputcomponents}>
            <input
              type="date"
               name={component.name}
              className={inputClass}
              placeholder="Select a date"
              onChange={(e) => handleChange(e, component.name)}
              value={value || ""}
            />
            <div
              key={component._id}
              className={buttonClass}
              onClick={() =>
                handleFieldSubmit(component._id, component.name)
              }
            >
              <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
            </div>
          </div>
        );
      case "Input Number" :
        return (
          <div key={component.name} className={styles.inputcomponents}>
            <input
              type="number"
               name={component.name}
              className={inputClass}
              placeholder="Enter a number"
              onChange={(e) => handleChange(e, component.name)}
              value={value || ""}
            />
            <div
              key={component._id}
              className={buttonClass}
              onClick={() =>
                handleFieldSubmit(component._id, component.name)
              }
            >
              <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
            </div>
          </div>
        );
      case "Input Email":
        return (
          <div key={component.name} className={styles.inputcomponents}>
            <input
              type="email"
               name={component.name}
              className={inputClass}
              placeholder="Enter your email"
              onChange={(e) => handleChange(e, component.name)}
              value={value || ""}
            />
            <div
              key={component._id}
              className={buttonClass}
              onClick={() =>
                handleFieldSubmit(component._id, component.name)
              }
            >
              <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
            </div>
          </div>
        );
      case "Input Phone":
        return (
          <div key={component.name} className={styles.inputcomponents}>
            <input
              type="tel"
               name={component.name}
              className={inputClass}
              placeholder="Enter your phone"
              onChange={(e) => handleChange(e, component.name)}
              value={value || ""}
            />
            <div
              key={component._id}
              className={buttonClass}
              onClick={() =>
                handleFieldSubmit(component._id, component.name)
              }
            >
              <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735584505/send_aix5oe.png" />
            </div>
          </div>
        );
 
      default:
        return null;
    }
  };

  const renderComponents = () => {
    const nextInputIndex = findNextInputIndex();
    const components = [];
    let currentInputCount = 0;

    for (let i = 0; i < form.components.length; i++) {
      const component = form.components[i];
      
      if (i > nextInputIndex) break;

      if (component.category === 'bubble') {
        if (component.type === 'Text') {
          components.push(
            <div className={styles.textbubble}>
            <img
              style={{width:"28px"}}
               src={chatIcon}/>
            <div key={component._id} className={styles.components}>
              {component.content}
            </div>
            </div>
          );
        } else if (component.type === 'Image') {
          components.push(
            <div key={component._id} className={styles.components}>
              <img
                src={component.content}
                alt={component.name}
                className={styles.bubble}
              />
            </div>
          );
        }
      } else if (component.category === 'input') {
        const isActive = currentInputCount === currentStep;
        components.push(renderInputComponent(component, isActive));
        currentInputCount++;
      }
    }
    
    return components;
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className={styles.formViewer}>
      <h1>{form.name}</h1>
      <form className={styles.componentsContainer} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {renderComponents()}
      </form>
    </div>
  );
};

export default FormViewer;