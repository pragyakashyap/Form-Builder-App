import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFormById, updateForm } from "../../services";
import styles from "./formEditor.module.css";
import ThemeSwitch from "../ThemeSwitch";
import { TextBubble } from "./bubbles/textBubble";
import { ImageBubble } from "./bubbles/imageBubble";
import { InputText } from "./inputs/textInput";
import { InputNumber } from "./inputs/numberInput";
import { EmailInput } from "./inputs/emailInput";
import { PhoneInput } from "./inputs/phoneInput";
import { DateInput } from "./inputs/dateInput";
import { RatingInput } from "./inputs/ratingInput";
import { ButtonInput } from "./inputs/buttonInput";
import toast from "react-hot-toast"

const FormEditor = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  const [components, setComponents] = useState([]);

  const [componentCounts, setComponentCounts] = useState({
    Text: 0,
    Image: 0,
  });

  const handleAddComponent = (type, category) => {
    // Get the current count or initialize to 0
    const currentCount = componentCounts[type] || 0;
    const newCount = currentCount + 1;
  
    // Update counts
    setComponentCounts((prevCounts) => ({
      ...prevCounts,
      [type]: newCount,
    }));
  
    // Add the new component
    setComponents((prevComponents) => [
      ...prevComponents,
      { type, name: `${type} ${newCount}`, category, content:"" },
    ]);

  };

  const handleContentChange = (index, newContent) => {
    setComponents((prevComponents) =>
      prevComponents.map((component, i) =>
        i === index ? { ...component, content: newContent } : component
      )
    );
  };
  

  const componentMapping = {
    Text: TextBubble,
    Image: ImageBubble,
    "Input Text":InputText,
    "Input Number":InputNumber,
    "Input Email":EmailInput,
    "Input Phone":PhoneInput,
    "Input Date":DateInput,
    "Input Rating":RatingInput,
    "Input Button":ButtonInput
  };

  useEffect(() => {
    const loadForm = async () => {
      try {
        const formData = await fetchFormById(formId);
        setForm(formData);
        setComponents(formData.components || []); // Populate components
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    loadForm();
  }, [formId]);

  const handleSave = async () => {
    console.log(components) 
    try {
      const updatedForm = { ...form, components };
      console.log("Payload sent to updateForm:", updatedForm);
      await updateForm(formId, updatedForm);
      toast("Form updated successfully!");
      setForm(updatedForm)
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("Failed to update form. Please try again.");
    }
    console.log(form)
    

  };

  const handleDeleteComponent = (index) => {
    setComponents((prevComponents) => prevComponents.filter((_, i) => i !== index));
  };
  

  useEffect(() => {
    document.body.style.backgroundColor = "#1f1f23";
    
    //  Cleanup function to reset when component unmounts
    return () => {
      document.body.style.backgroundColor = "#18181b";
    };
  }, []);

  
  

  return (
    <div className={styles.FormEditor}>
      <div className={styles.topBar}>
        <div className={styles.topBarFormName}>
          <input
            type="text"
            name="formName"
            value={form ? form.name : ""}
            placeholder="Enter Form Name"
          />
        </div>

        <div className={styles.topBarFlowAndResponse}>
          <button>Flow</button>
          <button>Response</button>
        </div>

        <div className={styles.rightTopBar}>
          <ThemeSwitch />
          <div className={styles.shareAndSave}>
            <button>Share</button>
            <button onClick={handleSave}>Save</button>
          </div>
          <div className={styles.delete}>
            <img src="close.png" />
          </div>
        </div>
      </div>

      <div className={styles.mainArea}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.bubblesAndInputs}>
            <div className={styles.bubbles}>
              <p>Bubbles</p>
              <div className={styles.contents}>
                <div
                  className={styles.content}
                  onClick={() => handleAddComponent("Text", "bubble")}
                >
                  Text
                </div>
                <div
                  className={styles.content}
                  onClick={() => handleAddComponent("Image", "bubble")}
                >
                  Image
                </div>
              </div>
              <div className={styles.contents}>
                <div className={styles.content}>Video</div>
                <div className={styles.content}>GIF</div>
              </div>
            </div>

            <div className={styles.inputs}>
              <p>Inputs</p>
              <div className={styles.contents}>
                <div className={styles.content}  onClick={() => handleAddComponent("Input Text", "input")}>Text</div>
                <div className={styles.content}  onClick={() => handleAddComponent("Input Number", "input")}>Number</div>
              </div>
              <div className={styles.contents}>
                <div className={styles.content}  onClick={() => handleAddComponent("Input Email", "input")}>Email</div>
                <div className={styles.content}  onClick={() => handleAddComponent("Input Phone", "input")}>Phone</div>
              </div>

              <div className={styles.contents}>
                <div className={styles.content}  onClick={() => handleAddComponent("Input Date", "input")}>Date</div>
                <div className={styles.content}  onClick={() => handleAddComponent("Input Rating", "input")}>Rating</div>
              </div>

              <div className={styles.contents}>
                <div className={styles.content}  onClick={() => handleAddComponent("Input Button", "input")}>Button</div>
                <div
                  className={styles.content}
                  style={{ visibility: "hidden" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.start}>Start</div>

          {(components).map((component, index) => {
            const Component = componentMapping[component.type];

            if (component.category === "bubble") {
              return <Component key={index} name={component.name}  content={component.content || ""}
              onContentChange={(newContent) => handleContentChange(index, newContent)}/>;
            } else if (component.category === "input") {
              return <Component key={index} name={component.name} isInput />;
            }

            
          })}
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
