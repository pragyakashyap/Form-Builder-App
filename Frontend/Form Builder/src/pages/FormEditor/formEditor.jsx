import { useParams, useLocation } from "react-router-dom";
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
import toast from "react-hot-toast";
import deleteIcon from "/delete.png";
import closeIcon from "/close.png";
import FormResponses from "./formResponse";
import { useTheme } from "../../ThemeContext";

const FormEditor = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  const [components, setComponents] = useState([]);

  const [formName, setFormName] = useState("");

  const location = useLocation();

  const [permissions, setPermissions] = useState(
    location.state?.permissions || "edit"
  );
  useEffect(() => {
    console.log("Current permissions:", permissions);
    console.log("Location state:", location.state);
  }, [permissions]);


  const handleFormNameChange = (e) => {
    if (permissions === "view") return;
    const changedname = e.target.value;
    setFormName(() => changedname);
  };

  const [componentCounts, setComponentCounts] = useState({
    Text: 0,
    Image: 0,
  });

  const handleAddComponent = (type, category) => {
    if (permissions === "view") return;
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
      { type, name: `${type} ${newCount}`, category, content: "" },
    ]);
  };

  const handleContentChange = (index, newContent) => {
    if (permissions === "view") return;
    setComponents((prevComponents) =>
      prevComponents.map((component, i) =>
        i === index ? { ...component, content: newContent } : component
      )
    );
  };

  const componentMapping = {
    Text: TextBubble,
    Image: ImageBubble,
    "Input Text": InputText,
    "Input Number": InputNumber,
    "Input Email": EmailInput,
    "Input Phone": PhoneInput,
    "Input Date": DateInput,
    "Input Rating": RatingInput,
    "Input Button": ButtonInput,
  };

  useEffect(() => {
    const loadForm = async () => {
      try {
        const formData = await fetchFormById(formId);
        setForm(formData);
        setComponents(formData.components || []); // Populate components
        setFormName(formData.name || "");
      } catch (error) {
        console.error("Error fetching form:", error);
      }
      
    };

    loadForm();
  }, [formId]);


  const handleSave = async () => {
    if (permissions === "view") return;
    console.log(components);
    try {
      const updatedForm = { ...form, components, name: formName };
      console.log("Payload sent to updateForm:", updatedForm);
      await updateForm(formId, updatedForm);
      toast.success("Form updated successfully!");
      setForm(updatedForm);
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("Failed to update form. Please try again.");
    }
    console.log(form);
  };

  const handleDeleteComponent = (index) => {
    if (permissions === "view") return;
    setComponents((prevComponents) =>
      prevComponents.filter((_, i) => i !== index)
    );
  };

  const handleShare = async () => {
    try {
      const data = await fetchFormById(formId);

      const shareUrl = `${window.location.origin}/forms/${data.shareableLink}`;
      navigator.clipboard.writeText(shareUrl); // Copy link to clipboard
      toast("Link copied to clipboard!");
    } catch (error) {
      console.error("Error sharing form:", error);
      toast.error("Failed to generate shareable link.");
    }
  };

  const handleDelete = ()=>{
    setComponents(()=>[])
  }


  const { theme } = useTheme();



  const [activeView, setActiveView] = useState("flow");

  return (
    <div
      className={`${styles.FormEditor}`}
    >
      <div
        className={`${styles.topBar}`}
      >
        <div
          className={`${styles.topBarFormName}`}
        >
          <input
            type="text"
            name="formName"
            value={formName}
            placeholder="Enter Form Name"
            onChange={handleFormNameChange}
            disabled={permissions === "view"}
          />
        </div>

        <div className={styles.topBarFlowAndResponse}>
          <button
            className={styles.flow}
            disabled={permissions === "view"}
            onClick={() => setActiveView("flow")}
          >
            Flow
          </button>
          <button
            className={styles.response}
            disabled={permissions === "view"}
            onClick={() => setActiveView("response")}
          >
            Response
          </button>
        </div>

        <div className={styles.rightTopBar}>
          <ThemeSwitch />
          <div className={styles.shareAndSave}>
            <button className={styles.share} onClick={handleShare} disabled={components.length===0}>
              Share
            </button>
            {permissions === "edit" && (
              <button className={styles.save} onClick={handleSave} >
                Save
              </button>
            )}
          </div>
          <div className={styles.delete} onClick={handleDelete}>
            <img src={closeIcon} />
          </div>
        </div>
      </div>

      <div className={styles.mainArea}>
        {activeView === "flow" ? (
          <>
            {/* Left Panel */}
            <div
              className={`${styles.leftPanel}`}
            >
              <div className={styles.bubblesAndInputs}>
                <div className={styles.bubbles}>
                  <p style={{ fontSize: "14px" }}>Bubbles</p>
                  <div className={styles.contents}>
                    <div
                      className={`${styles.content}`}
                      onClick={() => handleAddComponent("Text", "bubble")}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735400510/SVG_3_atf6zu.png" />
                      Text
                    </div>
                    <div
                      className={`${styles.content}`}
                      onClick={() => handleAddComponent("Image", "bubble")}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735400510/SVG_4_pb5shf.png" />
                      Image
                    </div>
                  </div>
                  <div className={styles.contents}>
                    <div
                      className={`${styles.content}`}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735400510/Group_14_1_k3iegq.png" />
                      Video
                    </div>
                    <div
                      className={`${styles.content}`}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735400510/Container_1_m6wdyq.png" />
                      GIF
                    </div>
                  </div>
                </div>

                <div className={styles.inputs}>
                  <p style={{ fontSize: "14px" }}>Inputs</p>
                  <div className={styles.contents}>
                    <div
                      className={`${styles.content}`}
                      onClick={() => handleAddComponent("Input Text", "input")}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735401694/SVG_11_djqhpq.png" />
                      Text
                    </div>
                    <div
                      className={`${styles.content}`}
                      onClick={() =>
                        handleAddComponent("Input Number", "input")
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735401974/SVG_12_c0y8px.png" />
                      Number
                    </div>
                  </div>
                  <div className={styles.contents}>
                    <div
                      className={`${styles.content}`}
                      onClick={() => handleAddComponent("Input Email", "input")}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735401694/SVG_10_iuhe3v.png" />
                      Email
                    </div>
                    <div
                      className={`${styles.content}`}
                      onClick={() => handleAddComponent("Input Phone", "input")}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735401694/SVG_7_dghv8g.png" />
                      Phone
                    </div>
                  </div>

                  <div className={styles.contents}>
                    <div
                      className={`${styles.content}`}
                      onClick={() => handleAddComponent("Input Date", "input")}
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735401693/SVG_9_lekigc.png" />
                      Date
                    </div>
                    <div
                      className={`${styles.content}`}
                      onClick={() =>
                        handleAddComponent("Input Rating", "input")
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735400510/rating_2_ll3pvc.png" />
                      Rating
                    </div>
                  </div>

                  <div className={styles.contents}>
                    <div
                      className={`${styles.content}`}
                      onClick={() =>
                        handleAddComponent("Input Button", "input")
                      }
                    >
                      <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735401693/SVG_8_ygxqjc.png" />
                      Button
                    </div>
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
              <div
                className={styles.start}
              >
                <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1735298664/Vector_6_du4oob.png" />
                Start
              </div>

              {components.map((component, index) => {
                const Component = componentMapping[component.type];

                return (
                  <div className={styles.componentWrapper} key={index}>
                    {/* Delete Button */}
                    {permissions === "edit" && (
                      <div
                        className={styles.deleteIcon}
                        onClick={() => handleDeleteComponent(index)}
                      >
                        <img src={deleteIcon} />
                      </div>
                    )}

                    {/* Render the actual component */}
                    {component.category === "bubble" ? (
                      <Component
                        name={component.name}
                        content={component.content || ""}
                        onContentChange={(newContent) =>
                          handleContentChange(index, newContent)
                        }
                        disabled={permissions === "view"}
                      />
                    ) : (
                      <Component
                        name={component.name}
                        isInput
                        disabled={permissions === "view"}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          form && <FormResponses formId={form._id} formComponents={form.components} />
        )}
      </div>
    </div>
  );
};

export default FormEditor;
