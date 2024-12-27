import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFormById, updateForm } from "../../services";
import styles from "./formEditor.module.css";
import ThemeSwitch from "../ThemeSwitch";
import { TextBubble } from "./textBubble";
import { ImageBubble } from "./imageBubble";
import { InputText } from "./textInput";
import { InputNumber } from "./numberInput";
import { EmailInput } from "./emailInput";
import { PhoneInput } from "./phoneInput";
import { DateInput } from "./dateInput";
import { RatingInput } from "./ratingInput";
import { ButtonInput } from "./buttonInput";

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
      { type, name: `${type} ${newCount}`, category },
    ]);
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
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    loadForm();
  }, [formId]);

  const handleSave = async () => {
    try {
      await updateForm(formId, form);
      alert("Form updated successfully!");
    } catch (error) {
      console.error("Error updating form:", error);
    }
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
            <button>Save</button>
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

          {components.map((component, index) => {
            const Component = componentMapping[component.type];

            if (component.category === "bubble") {
              return <Component key={index} name={component.name} />;
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
