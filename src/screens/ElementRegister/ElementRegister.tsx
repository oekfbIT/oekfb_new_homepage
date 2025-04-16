import React, { useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

// Reusable InputField Component
const InputField = ({
  type = "text",
  placeholder,
  required,
  name,
  value,
  onChange,
}: {
  type?: string;
  placeholder: string;
  required: boolean;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => (
  <div className="div-wrapper-3">
    <div className="authentication-form-wrapper">
      <div className="div-15">
        <div className="authentication-form-4">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="authentication-form-7"
            placeholder={required ? `${placeholder} *` : placeholder}
            required={required}
            aria-label={placeholder}
            style={{ backgroundColor: "clear" }}
          />
        </div>
      </div>
    </div>
  </div>
);

const DropdownField = ({
  placeholder,
  required,
  name,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  required: boolean;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}): JSX.Element => (
  <div className="div-wrapper-3">
    <div className="authentication-form-wrapper">
      <div className="div-15">
        <div className="authentication-form-4">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="authentication-form-7"
            required={required}
            aria-label={placeholder}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
);

const generatePassword = (length = 6) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const ElementRegister = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const authService = new AuthService();
  const clientController = new ClientController();
  const initial_password = generatePassword();

  // State Management
  const [formData, setFormData] = useState({
    primaryContact: {
      first: "",
      last: "",
      phone: "",
      email: "",
      identification: "",
    },
    secondaryContact: {
      first: "",
      last: "",
      phone: "",
      email: "",
      identification: "",
    },
    teamName: "",
    verein: "",
    bundesland: "",
    type: "",
    acceptedAGB: false,
    referCode: "",
    initial_password: initial_password,
  });

  // Additional State for Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Handle Other Field Changes
  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset feedback messages
    setSuccessMessage(null);
    setErrorMessage(null);

    // Format the data as specified
    const formattedData = {
      primaryContact: formData.primaryContact,
      secondaryContact: formData.secondaryContact,
      teamName: formData.teamName,
      verein: formData.verein,
      bundesland: formData.bundesland,
      type: formData.type,
      acceptedAGB: formData.acceptedAGB,
      referCode: formData.referCode,
      initial_password: formData.initial_password,
    };

    console.log("Formatted Data:", formattedData);

    // Set submitting state
    setIsSubmitting(true);

    try {
      const response = await clientController.register(formattedData);
      console.log("Registration successful:", response);

      // You can adjust the success message based on your API response
      setSuccessMessage("Registration successful! You can now log in.");

      // Optionally, reset the form
      setFormData({
        primaryContact: {
          first: "",
          last: "",
          phone: "",
          email: "",
          identification: "",
        },
        secondaryContact: {
          first: "",
          last: "",
          phone: "",
          email: "",
          identification: "",
        },
        teamName: "",
        verein: "",
        bundesland: "",
        type: "",
        acceptedAGB: false,
        referCode: "",
        initial_password: "",
      });

      // Optionally, redirect the user after successful registration
      // For example, using React Router's useHistory hook:
      // history.push('/login');
    } catch (error: any) {
      console.error("Registration failed:", error);

      // Extract error message from response if available
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bundeslandOptions = [
    { label: "Wien", value: "wien" },
    { label: "Niederösterreich", value: "niederoesterreich" },
    { label: "Oberösterreich", value: "oberoesterreich" },
    { label: "Steiermark", value: "steiermark" },
    { label: "Kärnten", value: "kaernten" },
    { label: "Salzburg", value: "salzburg" },
    { label: "Tirol", value: "tirol" },
    { label: "Vorarlberg", value: "vorarlberg" },
    { label: "Burgenland", value: "burgenland" },
  ];

  const vereinOptions = [
    { label: "Privat", value: "privat" },
    { label: "Exestierender Verein", value: "verein" },
  ];

  return (
    <div
      className="element-register"
      style={{ overflow: "hidden", minWidth: isMobile ? "366px" : "900px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="frame-wrapper">
        <div className="frame-5">
          <div className="authentication-form-14">
            <form onSubmit={handleSubmit} className="authentication-form">
              {/* Header Section */}
              <div className="div-15">
                <div className="div-wrapper-3">
                  <div className="authentication">
                    <div className="authentication-2">
                      Meine Mannschaft Anmelden
                    </div>

                    <p className="authentication-3">
                      Sie melden sich als Verein an. Die Richtigkeit Ihrer
                      Angaben ist entscheidend. Bitte füllen Sie das Formular
                      vollständig und sorgfältig aus.
                    </p>
                  </div>
                </div>
              </div>

              {/* Display Success or Error Messages */}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              {/* Primary Contact Section */}
              <div className="authentication-form-2">
                <div className="authentication-form-15">
                  PRIMÄRER ANSPRECHPARTNER
                </div>

                <InputField
                  type="text"
                  placeholder="Vorname"
                  required={true}
                  name="primaryContact.first"
                  value={formData.primaryContact.first}
                  onChange={handleChange}
                />

                <InputField
                  type="text"
                  placeholder="Familiename"
                  required={true}
                  name="primaryContact.last"
                  value={formData.primaryContact.last}
                  onChange={handleChange}
                />

                <InputField
                  type="tel"
                  placeholder="Telefonnummer"
                  required={true}
                  name="primaryContact.phone"
                  value={formData.primaryContact.phone}
                  onChange={handleChange}
                />

                <InputField
                  type="email"
                  placeholder="Email"
                  required={true}
                  name="primaryContact.email"
                  value={formData.primaryContact.email}
                  onChange={handleChange}
                />
              </div>

              {/* Secondary Contact Section */}
              <div className="authentication-form-2">
                <div className="authentication-form-15">
                  SEKUNDARER ANSPRECHPARTNER
                </div>

                <InputField
                  type="text"
                  placeholder="Vorname"
                  required={true}
                  name="secondaryContact.first"
                  value={formData.secondaryContact.first}
                  onChange={handleChange}
                />

                <InputField
                  type="text"
                  placeholder="Familiename"
                  required={true}
                  name="secondaryContact.last"
                  value={formData.secondaryContact.last}
                  onChange={handleChange}
                />

                <InputField
                  type="tel"
                  placeholder="Telefonnummer"
                  required={true}
                  name="secondaryContact.phone"
                  value={formData.secondaryContact.phone}
                  onChange={handleChange}
                />

                <InputField
                  type="email"
                  placeholder="Email"
                  required={true}
                  name="secondaryContact.email"
                  value={formData.secondaryContact.email}
                  onChange={handleChange}
                />
              </div>

              {/* Additional Details Section */}
              <div className="authentication-form-2">
                <div className="authentication-form-15">MANNSCHAFT DETAILS</div>

                <InputField
                  type="text"
                  placeholder="Team Name"
                  required={true}
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleOtherChange}
                />

                <DropdownField
                  placeholder="Privat oder Verein"
                  required={true}
                  name="type"
                  value={formData.verein} // will store enum value like "wien"
                  onChange={handleOtherChange}
                  options={vereinOptions} // label for display, value for submission
                />

                {/*<InputField*/}
                {/*    type="text"*/}
                {/*    placeholder="Bundesland"*/}
                {/*    required={true}*/}
                {/*    name="bundesland"*/}
                {/*    value={formData.bundesland}*/}
                {/*    onChange={handleOtherChange}*/}
                {/*/>*/}

                <DropdownField
                  placeholder="Wählen Sie Ihr Bundesland"
                  required={true}
                  name="bundesland"
                  value={formData.bundesland} // will store enum value like "wien"
                  onChange={handleOtherChange}
                  options={bundeslandOptions} // label for display, value for submission
                />

                <InputField
                  type="text"
                  placeholder="Verein (Optional)"
                  required={false}
                  name="verein"
                  value={formData.verein}
                  onChange={handleOtherChange}
                />

                {/*<InputField*/}
                {/*    type="text"*/}
                {/*    placeholder="Refer Code"*/}
                {/*    required={false}*/}
                {/*    name="referCode"*/}
                {/*    value={formData.referCode}*/}
                {/*    onChange={handleOtherChange}*/}
                {/*/>*/}

                {/* Additional Details Section */}
                <div className="authentication-form-2">
                  <div className="div-wrapper-3">
                    <div className="authentication-form-wrapper">
                      <div className="div-15">
                        <div className="authentication-form-4">
                          <label>
                            <input
                              type="checkbox"
                              name="acceptedAGB"
                              checked={formData.acceptedAGB}
                              onChange={handleOtherChange}
                            />
                            Ich akzeptiere die{" "}
                            <span
                              style={{
                                color: "black",
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => setIsModalOpen(true)}
                            >
                              Allgemeinen Geschäftsbedingungen
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="authentication-4">
                <div className="authentication-form-9">* REQUIRED</div>
                <div className="div-wrapper-3" onClick={handleSubmit}>
                  <div className="authentication-form-12">
                    <div className="authentication-form-13">REGISTRIEREN</div>
                  </div>
                </div>
                <div className="authentication-form-9">* Weitere Infos bekommen sie automatisch per Mail.</div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {/* Modal */}
      {isModalOpen && (
        <Modal
          title="Clubregeln und erforderliche Dokumente"
          content={`Wichtige Informationen und erforderliche Dokumente:
    - Vertrag: Diese bekommen Sie automatisch nach ihrer Registrierung per Mail zugesandt

    - Wohnsitz in Österreich.
    - Kosten:: 70 € pro Spiel.

    Weitere Informationen: Bei Fragen bitte FAQs durchlesen oder uns direkt kontaktieren.`}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const Modal = ({
  title,
  content,
  onClose,
}: {
  title: string;
  content: string;
  onClose: () => void;
}) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button onClick={onClose} className="close-button">
        &#x2715; {/* Close icon (X) */}
      </button>
      <h2 className="modal-title">{title}</h2>
      <pre className="modal-text">{content}</pre>
    </div>
  </div>
);
